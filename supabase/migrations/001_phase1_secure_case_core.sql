-- ============================================================
-- VALORAIPLUS Case Dashboard — Phase 1 Secure Case Control Core
-- Case: CUD-26-682107
-- Version: 1.0
-- Purpose:
--   Secure case/document metadata, redacted-vs-private evidence separation,
--   relationship mapping, deadlines, agency submissions, and audit logging.
--
-- Safety model:
--   1. Public/court view sees only redacted public records.
--   2. Agency view sees public_redacted + agency_restricted records.
--   3. Private evidence remains restricted to admin/editor roles.
--   4. Every material change can be logged.
-- ============================================================

begin;

create extension if not exists "pgcrypto";

-- ----------------------------
-- 0. Updated-at trigger helper
-- ----------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------------------------
-- 1. Enumerated types
-- ----------------------------
do $$ begin
  create type public.app_role as enum (
    'admin',
    'editor',
    'viewer',
    'agency_view',
    'court_readonly'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.doc_status as enum (
    'DRAFT',
    'STAGED',
    'FILED',
    'PENDING',
    'LODGED',
    'ACTIVE',
    'EXECUTED',
    'SUPERSEDED',
    'WITHHELD_PRIVATE'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.doc_visibility as enum (
    'public_redacted',
    'court_restricted',
    'agency_restricted',
    'private_evidence',
    'sealed_requested',
    'sealed_by_order'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.doc_priority as enum (
    'CRITICAL',
    'HIGH',
    'MEDIUM',
    'LOW'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.event_type as enum (
    'created',
    'uploaded',
    'staged',
    'filed',
    'served',
    'lodged',
    'emailed',
    'agency_submitted',
    'superseded',
    'redacted',
    'sealed_requested',
    'sealed',
    'reviewed',
    'deadline_added',
    'status_changed',
    'note_added'
  );
exception when duplicate_object then null;
end $$;

-- ----------------------------
-- 2. Case master table
-- ----------------------------
create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  case_number text not null unique,
  related_case text,
  court text not null,
  department text,
  judge text,
  plaintiff text,
  defendant text,
  defendant_status text,
  master_repository text,
  filing_date date,
  notes text,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_cases_updated_at on public.cases;
create trigger set_cases_updated_at
before update on public.cases
for each row execute function public.set_updated_at();

-- ----------------------------
-- 3. User roles
-- ----------------------------
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  case_id uuid references public.cases(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, role, case_id)
);

-- ----------------------------
-- 4. Documents
-- ----------------------------
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,

  doc_number text not null,
  sort_order integer,
  upload_order integer,

  title text not null,
  short_description text,
  doc_type text,
  stack text,

  status public.doc_status not null default 'DRAFT',
  visibility public.doc_visibility not null default 'public_redacted',
  priority public.doc_priority,

  filing_date date,
  filed_at timestamptz,
  served_at timestamptz,
  staged_at timestamptz,

  file_url text,
  redacted_file_url text,
  private_file_url text,
  repository_url text,

  clerk_note text,
  court_note text,
  agency_note text,
  internal_note text,

  sha256_hash text,
  redacted_sha256_hash text,
  page_count integer,

  is_redacted boolean not null default true,
  contains_private_contact_info boolean not null default false,
  contains_medical_info boolean not null default false,
  contains_witness_info boolean not null default false,
  contains_minor_info boolean not null default false,
  contains_financial_info boolean not null default false,

  is_operational boolean not null default true,
  is_reference_only boolean not null default false,
  is_duplicate boolean not null default false,
  supersedes_document_id uuid references public.documents(id) on delete set null,
  superseded_by_document_id uuid references public.documents(id) on delete set null,

  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint documents_not_both_duplicate_and_operational
    check (not (is_duplicate = true and is_operational = true)),

  constraint documents_private_requires_flag
    check (
      visibility not in ('private_evidence', 'court_restricted', 'agency_restricted', 'sealed_requested', 'sealed_by_order')
      or
      (
        contains_private_contact_info = true
        or contains_medical_info = true
        or contains_witness_info = true
        or contains_minor_info = true
        or contains_financial_info = true
        or is_redacted = false
      )
    ),

  unique(case_id, doc_number, title)
);

drop trigger if exists set_documents_updated_at on public.documents;
create trigger set_documents_updated_at
before update on public.documents
for each row execute function public.set_updated_at();

create index if not exists idx_documents_case_sort on public.documents(case_id, upload_order, sort_order);
create index if not exists idx_documents_case_doc_number on public.documents(case_id, doc_number);
create index if not exists idx_documents_status on public.documents(status);
create index if not exists idx_documents_visibility on public.documents(visibility);
create index if not exists idx_documents_priority on public.documents(priority);
create index if not exists idx_documents_private_flags on public.documents(
  contains_private_contact_info,
  contains_medical_info,
  contains_witness_info,
  contains_financial_info
);

-- ----------------------------
-- 5. Document relationships
-- ----------------------------
create table if not exists public.document_relationships (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  source_document_id uuid not null references public.documents(id) on delete cascade,
  target_document_id uuid not null references public.documents(id) on delete cascade,
  relationship_type text not null default 'related',
  note text,
  created_by uuid,
  created_at timestamptz not null default now(),

  constraint no_self_relationship check (source_document_id <> target_document_id),
  unique(source_document_id, target_document_id, relationship_type)
);

create index if not exists idx_doc_relationships_case on public.document_relationships(case_id);
create index if not exists idx_doc_relationships_source on public.document_relationships(source_document_id);
create index if not exists idx_doc_relationships_target on public.document_relationships(target_document_id);

-- ----------------------------
-- 6. Document events / chain of custody
-- ----------------------------
create table if not exists public.document_events (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  document_id uuid references public.documents(id) on delete set null,
  event_type public.event_type not null,
  event_title text not null,
  event_note text,
  event_time timestamptz not null default now(),
  actor_user_id uuid,
  actor_label text,
  source_system text,
  external_reference text,
  created_at timestamptz not null default now()
);

create index if not exists idx_document_events_case_time on public.document_events(case_id, event_time desc);
create index if not exists idx_document_events_document_time on public.document_events(document_id, event_time desc);
create index if not exists idx_document_events_type on public.document_events(event_type);

-- ----------------------------
-- 7. Deadlines
-- ----------------------------
create table if not exists public.deadlines (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  document_id uuid references public.documents(id) on delete set null,
  title text not null,
  deadline_at timestamptz not null,
  deadline_type text,
  status text not null default 'open'
    check (status in ('open', 'completed', 'continued', 'missed', 'cancelled')),
  alert_24h boolean not null default true,
  alert_72h boolean not null default true,
  alert_7d boolean not null default true,
  notes text,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_deadlines_updated_at on public.deadlines;
create trigger set_deadlines_updated_at
before update on public.deadlines
for each row execute function public.set_updated_at();

create index if not exists idx_deadlines_case_at on public.deadlines(case_id, deadline_at);
create index if not exists idx_deadlines_status on public.deadlines(status);

-- ----------------------------
-- 8. Agencies and agency submissions
-- ----------------------------
create table if not exists public.agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  agency_type text,
  contact_url text,
  contact_email text,
  phone text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.agency_submissions (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  agency_id uuid not null references public.agencies(id) on delete cascade,
  document_id uuid references public.documents(id) on delete set null,
  external_case_number text,
  submission_status text not null default 'submitted'
    check (submission_status in ('draft', 'submitted', 'received', 'pending', 'accepted', 'rejected', 'closed', 'unknown')),
  submitted_at timestamptz,
  receipt_url text,
  notes text,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_agency_submissions_updated_at on public.agency_submissions;
create trigger set_agency_submissions_updated_at
before update on public.agency_submissions
for each row execute function public.set_updated_at();

create index if not exists idx_agency_submissions_case on public.agency_submissions(case_id);
create index if not exists idx_agency_submissions_agency on public.agency_submissions(agency_id);
create index if not exists idx_agency_submissions_status on public.agency_submissions(submission_status);

-- ----------------------------
-- 9. Audit log
-- ----------------------------
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references public.cases(id) on delete cascade,
  document_id uuid references public.documents(id) on delete set null,
  actor_user_id uuid,
  actor_label text,
  action text not null,
  before_data jsonb,
  after_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_case_time on public.audit_log(case_id, created_at desc);
create index if not exists idx_audit_document_time on public.audit_log(document_id, created_at desc);
create index if not exists idx_audit_action on public.audit_log(action);

-- ----------------------------
-- 10. Public/court-safe view
-- ----------------------------
create or replace view public.public_court_documents as
select
  d.id,
  d.case_id,
  d.doc_number,
  d.upload_order,
  d.title,
  d.short_description,
  d.doc_type,
  d.stack,
  d.status,
  d.priority,
  d.filing_date,
  d.filed_at,
  d.redacted_file_url as file_url,
  d.repository_url,
  d.clerk_note,
  d.page_count,
  d.redacted_sha256_hash as sha256_hash,
  d.created_at,
  d.updated_at
from public.documents d
where
  d.visibility = 'public_redacted'
  and d.is_redacted = true
  and d.contains_private_contact_info = false
  and d.contains_medical_info = false
  and d.contains_minor_info = false
  and d.is_duplicate = false;

-- ----------------------------
-- 11. RLS helpers
-- ----------------------------
create or replace function public.has_role(required_role public.app_role)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = required_role
      and (case_id is null or case_id in (select id from public.cases))
  );
$$;

create or replace function public.has_case_role(target_case_id uuid, required_role public.app_role)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = required_role
      and (case_id is null or case_id = target_case_id)
  );
$$;

-- ----------------------------
-- 12. Enable RLS
-- ----------------------------
alter table public.cases enable row level security;
alter table public.user_roles enable row level security;
alter table public.documents enable row level security;
alter table public.document_relationships enable row level security;
alter table public.document_events enable row level security;
alter table public.deadlines enable row level security;
alter table public.agencies enable row level security;
alter table public.agency_submissions enable row level security;
alter table public.audit_log enable row level security;

-- ----------------------------
-- 13. RLS policies
-- ----------------------------

-- CASES
drop policy if exists "admin full cases" on public.cases;
create policy "admin full cases"
on public.cases for all
using (public.has_case_role(id, 'admin') or public.has_role('admin'))
with check (public.has_case_role(id, 'admin') or public.has_role('admin'));

drop policy if exists "read assigned cases" on public.cases;
create policy "read assigned cases"
on public.cases for select
using (
  public.has_case_role(id, 'editor')
  or public.has_case_role(id, 'viewer')
  or public.has_case_role(id, 'agency_view')
  or public.has_case_role(id, 'court_readonly')
  or public.has_role('admin')
);

-- USER ROLES
drop policy if exists "admin manages user roles" on public.user_roles;
create policy "admin manages user roles"
on public.user_roles for all
using (public.has_role('admin'))
with check (public.has_role('admin'));

drop policy if exists "users read own roles" on public.user_roles;
create policy "users read own roles"
on public.user_roles for select
using (user_id = auth.uid());

-- DOCUMENTS
drop policy if exists "admin full documents" on public.documents;
create policy "admin full documents"
on public.documents for all
using (public.has_case_role(case_id, 'admin') or public.has_role('admin'))
with check (public.has_case_role(case_id, 'admin') or public.has_role('admin'));

drop policy if exists "editor full metadata documents" on public.documents;
create policy "editor full metadata documents"
on public.documents for all
using (public.has_case_role(case_id, 'editor'))
with check (public.has_case_role(case_id, 'editor'));

drop policy if exists "viewer reads non-private documents" on public.documents;
create policy "viewer reads non-private documents"
on public.documents for select
using (
  public.has_case_role(case_id, 'viewer')
  and visibility in ('public_redacted', 'court_restricted')
);

drop policy if exists "agency reads agency documents" on public.documents;
create policy "agency reads agency documents"
on public.documents for select
using (
  public.has_case_role(case_id, 'agency_view')
  and visibility in ('public_redacted', 'agency_restricted')
);

drop policy if exists "court reads redacted public only" on public.documents;
create policy "court reads redacted public only"
on public.documents for select
using (
  public.has_case_role(case_id, 'court_readonly')
  and visibility = 'public_redacted'
  and is_redacted = true
  and contains_private_contact_info = false
  and contains_medical_info = false
  and contains_minor_info = false
);

-- RELATIONSHIPS
drop policy if exists "read relationships for visible docs" on public.document_relationships;
create policy "read relationships for visible docs"
on public.document_relationships for select
using (
  public.has_case_role(case_id, 'admin')
  or public.has_case_role(case_id, 'editor')
  or public.has_case_role(case_id, 'viewer')
  or public.has_case_role(case_id, 'agency_view')
  or public.has_case_role(case_id, 'court_readonly')
);

drop policy if exists "edit relationships admin editor" on public.document_relationships;
create policy "edit relationships admin editor"
on public.document_relationships for all
using (
  public.has_case_role(case_id, 'admin')
  or public.has_case_role(case_id, 'editor')
  or public.has_role('admin')
)
with check (
  public.has_case_role(case_id, 'admin')
  or public.has_case_role(case_id, 'editor')
  or public.has_role('admin')
);

-- EVENTS, DEADLINES, AGENCY SUBMISSIONS
drop policy if exists "read events assigned roles" on public.document_events;
create policy "read events assigned roles"
on public.document_events for select
using (
  public.has_case_role(case_id, 'admin')
  or public.has_case_role(case_id, 'editor')
  or public.has_case_role(case_id, 'viewer')
  or public.has_case_role(case_id, 'agency_view')
  or public.has_case_role(case_id, 'court_readonly')
);

drop policy if exists "edit events admin editor" on public.document_events;
create policy "edit events admin editor"
on public.document_events for all
using (public.has_case_role(case_id, 'admin') or public.has_case_role(case_id, 'editor') or public.has_role('admin'))
with check (public.has_case_role(case_id, 'admin') or public.has_case_role(case_id, 'editor') or public.has_role('admin'));

drop policy if exists "read deadlines assigned roles" on public.deadlines;
create policy "read deadlines assigned roles"
on public.deadlines for select
using (
  public.has_case_role(case_id, 'admin')
  or public.has_case_role(case_id, 'editor')
  or public.has_case_role(case_id, 'viewer')
);

drop policy if exists "edit deadlines admin editor" on public.deadlines;
create policy "edit deadlines admin editor"
on public.deadlines for all
using (public.has_case_role(case_id, 'admin') or public.has_case_role(case_id, 'editor') or public.has_role('admin'))
with check (public.has_case_role(case_id, 'admin') or public.has_case_role(case_id, 'editor') or public.has_role('admin'));

drop policy if exists "read agencies assigned roles" on public.agencies;
create policy "read agencies assigned roles"
on public.agencies for select
using (auth.uid() is not null);

drop policy if exists "edit agencies admin editor" on public.agencies;
create policy "edit agencies admin editor"
on public.agencies for all
using (public.has_role('admin'))
with check (public.has_role('admin'));

drop policy if exists "read agency submissions assigned roles" on public.agency_submissions;
create policy "read agency submissions assigned roles"
on public.agency_submissions for select
using (
  public.has_case_role(case_id, 'admin')
  or public.has_case_role(case_id, 'editor')
  or public.has_case_role(case_id, 'viewer')
  or public.has_case_role(case_id, 'agency_view')
);

drop policy if exists "edit agency submissions admin editor" on public.agency_submissions;
create policy "edit agency submissions admin editor"
on public.agency_submissions for all
using (public.has_case_role(case_id, 'admin') or public.has_case_role(case_id, 'editor') or public.has_role('admin'))
with check (public.has_case_role(case_id, 'admin') or public.has_case_role(case_id, 'editor') or public.has_role('admin'));

-- AUDIT LOG
drop policy if exists "admin reads audit log" on public.audit_log;
create policy "admin reads audit log"
on public.audit_log for select
using (public.has_role('admin') or public.has_case_role(case_id, 'admin'));

drop policy if exists "editor inserts audit log" on public.audit_log;
create policy "editor inserts audit log"
on public.audit_log for insert
with check (
  public.has_role('admin')
  or public.has_case_role(case_id, 'admin')
  or public.has_case_role(case_id, 'editor')
);

commit;
