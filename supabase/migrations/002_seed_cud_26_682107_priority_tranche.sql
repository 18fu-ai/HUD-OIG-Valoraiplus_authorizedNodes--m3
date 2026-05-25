-- ============================================================
-- VALORAIPLUS Case Dashboard — Phase 1 Seed Data
-- Case: CUD-26-682107
-- Insert baseline case and priority RapidLegal upload order.
-- Run after 001_phase1_secure_case_core.sql
-- ============================================================

begin;

insert into public.cases (
  case_number,
  related_case,
  court,
  department,
  judge,
  plaintiff,
  defendant,
  defendant_status,
  master_repository,
  filing_date,
  notes
)
values (
  'CUD-26-682107',
  'CCH-28-589086',
  'Superior Court of California, County of San Francisco',
  '12',
  'Hon. Michelle Tong',
  'Swords to Plowshares, a California Nonprofit Corporation',
  'Donald Ernest Gillson, aka Donny Gillson',
  'In Pro Per',
  'https://drive.google.com/drive/folders/1x9DGaev6hrRLngAx2plNBOoxrJzGw3f8',
  '2026-05-24',
  'Phase 1 secure case-control dashboard seed record. Public view must use redacted records only.'
)
on conflict (case_number) do update set
  related_case = excluded.related_case,
  court = excluded.court,
  department = excluded.department,
  judge = excluded.judge,
  plaintiff = excluded.plaintiff,
  defendant = excluded.defendant,
  defendant_status = excluded.defendant_status,
  master_repository = excluded.master_repository,
  filing_date = excluded.filing_date,
  updated_at = now();

with c as (
  select id as case_id
  from public.cases
  where case_number = 'CUD-26-682107'
)
insert into public.documents (
  case_id,
  doc_number,
  upload_order,
  title,
  short_description,
  doc_type,
  stack,
  status,
  visibility,
  priority,
  filing_date,
  clerk_note,
  is_redacted,
  is_operational
)
select
  c.case_id,
  v.doc_number,
  v.upload_order,
  v.title,
  v.short_description,
  v.doc_type,
  v.stack,
  v.status::public.doc_status,
  v.visibility::public.doc_visibility,
  v.priority::public.doc_priority,
  v.filing_date::date,
  v.clerk_note,
  true,
  true
from c
cross join (values
  ('099-R1', 1, 'Amended Request for Judicial Notice / Court-Readability Index', 'Opening orientation and judicial-notice request for existence, dates, titles, filing/transmission status, procedural relationship, and threshold issues.', 'RJN', 'J', 'FILED', 'public_redacted', 'CRITICAL', '2026-05-23', 'Open first. Explains how to read the filing tranche.'),
  ('000-AA0-R1', 2, 'Lead Clerk Filing Statement and Master Repository Roadmap', 'Primary roadmap paper providing no-repeat upload guidance and superseding repository link.', 'IDX', 'A', 'FILED', 'public_redacted', 'CRITICAL', '2026-05-24', 'Open second. Provides master repository orientation.'),
  ('092', 3, 'Electronic MC-410 Accommodation Request', 'Operative accommodation filing requesting ADA / Rule 1.100 processing and e-filing access treatment.', 'ADA', 'J', 'PENDING', 'public_redacted', 'CRITICAL', '2026-05-20', 'Prioritize ADA processing before merits handling where applicable.'),
  ('102', 4, 'Amendment to Statement of Facts / Preservation Record', 'Confirms priority filing tranche and preserves staged RapidLegal / LegalConnect materials as non-abandoned ESI/discovery record.', 'NOT', 'J', 'FILED', 'public_redacted', 'HIGH', '2026-05-24', 'Preserves non-abandonment of staged materials.'),
  ('102-R2', 5, 'Targeted Veterans / VTU Retaliation Notice', 'Identifies related Veterans Tenant Union context and alleged related tenant impact.', 'NOT', 'J', 'FILED', 'public_redacted', 'HIGH', '2026-05-24', 'Use redacted version only for public access.'),
  ('103-R1', 6, 'Courtesy Transmission / Witness Preservation Notice', 'Preserves text-message courtesy transmissions, witness-identification context, and related-tenant contacts without treating them as formal service.', 'NOT', 'J', 'FILED', 'public_redacted', 'HIGH', '2026-05-24', 'Public version must be redacted; private contact info remains restricted.'),
  ('106', 7, 'FBI San Francisco Notice', 'Agency-intake and evidence-preservation notice regarding alleged court-access obstruction, ADA/housing retaliation, and ESI preservation.', 'NOT', 'J', 'FILED', 'agency_restricted', 'CRITICAL', '2026-05-24', 'Agency notice; keep public redactions in place.'),
  ('02', 8, 'Declaration of Donald Ernest Gillson', 'Defendant declaration authenticating factual background, service defects, federal-enclave issue, ADA needs, and exhibit record.', 'DEC', 'A', 'FILED', 'public_redacted', 'HIGH', '2026-04-15', 'Factual foundation declaration.'),
  ('20', 10, 'Pre-Hearing Procedural Briefing Notice', 'Threshold briefing identifying jurisdiction, notice, retaliation, ADA, and agency-review issues.', 'NOT', 'D', 'FILED', 'public_redacted', 'HIGH', '2026-04-20', 'Procedural orientation.'),
  ('21', 11, 'Declaration and Exhibit Packet', 'Declaration and exhibit packet supporting factual background, service defects, ADA needs, and record authentication.', 'DEC', 'E', 'FILED', 'public_redacted', 'HIGH', '2026-04-22', 'Use as exhibit foundation.'),
  ('27', 12, 'Actual Knowledge and ADA Interactive Process Declaration', 'Declaration documenting actual knowledge of accommodation requests and alleged termination of interactive process.', 'DEC', 'E', 'FILED', 'public_redacted', 'HIGH', '2026-04-23', 'ADA/FHA interactive-process foundation.'),
  ('28', 13, 'Motion to Quash Service of Summons', 'Motion challenging service and jurisdiction, including federal-enclave and personal-jurisdiction arguments.', 'MOT', 'F', 'FILED', 'public_redacted', 'CRITICAL', '2026-04-25', 'Jurisdiction/service threshold motion.'),
  ('29-R2', 14, 'Reissued Declaration re Kolby Losik', 'Reissued declaration concerning witness context, unauthorized disclosure concerns, and supportive-services conduct.', 'DEC', 'F', 'FILED', 'court_restricted', 'HIGH', '2026-04-25', 'Review privacy before public release.'),
  ('42', 15, 'Motion to Dismiss / Fraud on Court / Void Notice', 'Motion seeking dismissal based on alleged void 3-day notice, court-fraud concerns, property-management authority issues, and sanctions theories.', 'MOT', 'H', 'FILED', 'public_redacted', 'CRITICAL', '2026-05-01', 'Dispositive/threshold motion.'),
  ('56', 16, 'Consolidated Forensic Dossier', 'Master forensic analysis and evidence compilation.', 'DEC', 'J', 'FILED', 'court_restricted', 'HIGH', '2026-05-08', 'Restrict if unredacted personal data appears.'),
  ('57B', 17, 'Omnibus Notice — Reasonable Accommodation and New Evidence R2', 'Omnibus notice addressing reasonable accommodation and newly preserved evidence.', 'NOT', 'J', 'FILED', 'public_redacted', 'HIGH', '2026-05-08', 'Accommodation/new evidence notice.'),
  ('59', 18, 'Notice of Lodging and Transmittal of Documents 56–58', 'Notice lodging and transmitting documents 56 through 58.', 'NOT', 'J', 'FILED', 'public_redacted', 'MEDIUM', '2026-05-10', 'Lodging/transmittal wrapper.'),
  ('60', 19, 'Administrative Contradiction and Continued Tenancy Notice', 'Notice arguing inspection scheduling and administrative treatment contradict unlawful-detainer posture.', 'NOT', 'J', 'FILED', 'public_redacted', 'HIGH', '2026-05-10', 'Administrative contradiction record.'),
  ('64', 20, 'Bad Faith Litigation Conduct Summary Statement R2', 'Statement alleging procedural abuse, sanctions basis, and technical/e-service obstruction concerns.', 'MOT', 'J', 'FILED', 'public_redacted', 'HIGH', '2026-05-19', 'Sanctions/bad-faith record.'),
  ('65', 21, 'Denial of Reasonable Accommodations Chronological Record R2', 'Chronological record of alleged ADA/FHA accommodation denials and interactive-process failures.', 'DEC', 'J', 'FILED', 'public_redacted', 'HIGH', '2026-05-14', 'Use R2 only.'),
  ('66', 22, 'Constructive Eviction Chronological Record R2', 'Two-period chronological record addressing habitability, service withdrawal, unauthorized entry, and retaliation theories.', 'DEC', 'J', 'FILED', 'public_redacted', 'HIGH', '2026-05-19', 'Chronology evidence.'),
  ('69', 23, 'Amended Clerk-Direct Hard Block and Manual Lodgment Notice', 'Notice of alleged e-filing hard block and Mimecast 550 registry; demand for manual lodgment and ADA routing.', 'NOT', 'J', 'FILED', 'public_redacted', 'HIGH', '2026-05-19', 'Access-barrier record.'),
  ('70', 24, 'Retaliatory Campaign by Landrum Chronological Record R2', 'Five-act chronological record concerning Landrum-related retaliation allegations.', 'DEC', 'J', 'FILED', 'public_redacted', 'CRITICAL', '2026-05-19', 'Core retaliation chronology.'),
  ('72', 25, 'Master Gateway Index', 'Gateway orientation for ADA accommodation, e-filing compliance, and full defense record.', 'GTW', 'J', 'EXECUTED', 'public_redacted', 'CRITICAL', '2026-05-19', 'Gateway filing.'),
  ('74', 26, 'Notice of Related Case and Cross-Lodgment R2', 'Notice to Department 12 regarding related CCH matter and cross-lodgment relationship.', 'NOT', 'J', 'FILED', 'public_redacted', 'CRITICAL', '2026-05-19', 'Related-case coordination.'),
  ('75', 27, 'Judge Tong RO Primary Cross-Reference to CUD Case R2', 'Direct notice connecting restraining-order proceeding and CUD action.', 'NOT', 'J', 'FILED', 'public_redacted', 'CRITICAL', '2026-05-19', 'RO/CUD cross-reference.'),
  ('76', 28, 'Zanghi False Representation — March 19 Hearing R2', 'Notice concerning alleged false representations and request for appropriate review.', 'NOT', 'J', 'FILED', 'public_redacted', 'CRITICAL', '2026-05-19', 'Use court-safe language in summaries.'),
  ('78', 29, 'Omnibus ADA, Elder Abuse, and Mandated Reporter Notice R2', 'Omnibus notice addressing ADA Title II, elder/dependent-adult abuse, mandated reporter issues, APS/DA referral context.', 'NOT', 'J', 'FILED', 'court_restricted', 'CRITICAL', '2026-05-21', 'Privacy review required before public display.'),
  ('085', 30, 'Declaration Node Map / Residential Address and Business Nodes R2', 'Declaration identifying operational node map, address of record, business entities, and document-control nodes.', 'DEC', 'J', 'FILED', 'court_restricted', 'HIGH', '2026-05-21', 'Restrict due address/business-node sensitivity.'),
  ('089-R2', 31, 'Amended Motion to Compel Financial Disclosure / Retainer', 'Motion demanding disclosure of liability insurance, surety/bonding, and related financial-disclosure categories.', 'MOT', 'J', 'FILED', 'public_redacted', 'HIGH', '2026-05-21', 'Discovery/financial disclosure motion.'),
  ('091-R2', 32, 'Notice of Willful Regulatory Non-Compliance', 'Notice alleging willful non-compliance after repeated opportunities to cure.', 'NOT', 'J', 'FILED', 'public_redacted', 'HIGH', '2026-05-22', 'Upload once only.'),
  ('094-R1/R2', 33, 'Final Notice Expanded Distribution / MC-410 / ADA E-Filing', 'Final notice of expanded routing, ADA coordinator notice, and written-response request.', 'NOT', 'J', 'FILED', 'public_redacted', 'CRITICAL', '2026-05-20', 'Final distribution notice.')
) as v(doc_number, upload_order, title, short_description, doc_type, stack, status, visibility, priority, filing_date, clerk_note)
on conflict (case_id, doc_number, title) do update set
  upload_order = excluded.upload_order,
  short_description = excluded.short_description,
  doc_type = excluded.doc_type,
  stack = excluded.stack,
  status = excluded.status,
  visibility = excluded.visibility,
  priority = excluded.priority,
  filing_date = excluded.filing_date,
  clerk_note = excluded.clerk_note,
  updated_at = now();

insert into public.agencies (name, agency_type, contact_url, contact_email, phone, notes)
values
  ('San Francisco Superior Court', 'court', null, 'SFefiling@sftc.org', null, 'Court e-filing / civil filing reference.'),
  ('California Civil Rights Department', 'state civil rights', null, null, null, 'CRD Intake No. 202601-33270627 referenced in record.'),
  ('HHS Office for Civil Rights Region IX', 'federal civil rights', null, null, null, 'HHS-OCR Case No. 25-621293 referenced in record.'),
  ('FBI San Francisco Field Office', 'federal law enforcement intake', null, null, null, 'Agency notice / preservation reference only.'),
  ('California Department of Real Estate', 'state licensing/regulatory', null, null, null, 'DRE licensing / property-management review reference.')
on conflict (name) do update set
  agency_type = excluded.agency_type,
  notes = excluded.notes;

commit;
