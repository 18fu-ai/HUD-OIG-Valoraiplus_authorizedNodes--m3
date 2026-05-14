# HUD-OIG-Valoraiplus_authorizedNodes

> Enterprise-grade Next.js 16 application with 105+ pages, Supabase integration, and comprehensive protocol layer.

## Project Overview

A sophisticated Next.js application featuring:
- **105+ pages** with specialized modules for intelligence, forensics, treasury, protocol, and governance
- **Supabase authentication** and real-time database integration
- **Advanced protocol layer** with governance, verification, and audit systems
- **Comprehensive API routes** for backend operations
- **Smart contract integration** with Solidity contracts for epistemic ledger and governance

## Quick Start

### Installation

```bash
pnpm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics
VERCEL_API_TOKEN=your_vercel_token
VERCEL_PROJECT_ID=your_project_id

# Optional: API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_API_SECRET=your_api_secret
```

### Development Server

```bash
pnpm dev
```

Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
app/
├── auth/                 # Authentication pages and callbacks
├── api/                  # API routes for backend operations
├── layout.tsx           # Root layout with theme provider
└── [page]/page.tsx      # Individual page components (105+ pages)

lib/
├── supabase/            # Supabase client setup
│   ├── client.ts        # Browser-side client
│   ├── server.ts        # Server-side client
│   └── proxy.ts         # Session proxy handler
├── protocol/            # Protocol layer implementations
│   ├── index.ts         # Central exports
│   ├── auditEngine.ts   # Audit functionality
│   ├── governanceKernel.ts  # Governance logic
│   ├── proofLedger.ts   # Proof ledger implementation
│   └── [other modules]
├── api/                 # API client
├── analytics/           # Traffic analytics
└── env-validation.ts    # Environment variable validation

components/
├── ui/                  # Shadcn UI components
├── cds/                 # Custom design system components
└── [other components]

middleware.ts           # Request middleware for auth
contracts/              # Solidity smart contracts
scripts/                # Deployment and utility scripts
```

## Key Features

### Authentication & Authorization
- Supabase Auth with email/password and OAuth support
- Session management via HTTP-only cookies
- Row Level Security (RLS) for data protection
- Auth callback handler for OAuth flows

### Protocol Layer
- **Governance Kernel**: Manages governance decisions and voting
- **Invariant Engine**: Enforces runtime invariants and rules
- **Proof Ledger**: Maintains cryptographic proof chains
- **Verification Pipeline**: Validates claims and signatures
- **Audit Engine**: Tracks and audits all operations
- **Export Policy**: Controls data export permissions

### API Architecture
- RESTful API routes with proper error handling
- Real-time WebSocket support
- Type-safe request/response handling
- Comprehensive API documentation at `/api-docs`

### Analytics & Monitoring
- Vercel Analytics integration (optional)
- Simulated analytics fallback
- Real-time traffic tracking
- Performance metrics collection

## Supabase Integration

### Database Setup

The database schema is configured through Supabase. Key tables include:

- `auth.users` - User authentication (managed by Supabase Auth)
- Custom tables can be created via SQL migrations

### Session Management

Sessions are managed automatically via the middleware proxy:

```typescript
import { createClient } from '@/lib/supabase/server'

const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
```

### Row Level Security

All data access is protected by RLS policies:

```sql
CREATE POLICY "users_select_own" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);
```

## Type Safety

The project uses TypeScript with strict mode enabled. Run type checking:

```bash
pnpm exec tsc --noEmit
```

## Code Quality

### Environment Variables Validation

Validate environment setup:

```typescript
import { validateEnvironment, logValidationWarnings } from '@/lib/env-validation'

const result = validateEnvironment()
logValidationWarnings()
```

### Error Handling

Comprehensive error handling across the application:

```typescript
try {
  const data = await supabase.from('table').select()
} catch (error) {
  console.error('Database error:', error)
  throw new Error('Failed to fetch data')
}
```

## Smart Contracts

Deploy smart contracts via Hardhat:

```bash
pnpm hardhat compile
pnpm hardhat deploy
```

### Contracts

- `CSSS_NegativeCaveat.sol` - Caveat system
- `EpistemicLedger.sol` - Knowledge/proof ledger
- `VALORAIPLUS_NULL_GHOST.sol` - Ghost/security protocol
- `ValoraiplusSovereignScript.sol` - Sovereignty management

## Deployment

### Vercel Deployment

```bash
vercel deploy
```

### Environment Variables

Set the following in Vercel project settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `VERCEL_API_TOKEN` (optional)
- `VERCEL_PROJECT_ID` (optional)

## Documentation

- **API Documentation**: Available at `/api-docs`
- **Architecture**: See `/app/architecture/page.tsx`
- **Protocol Details**: See `/app/protocol/page.tsx`

## Support

For issues or questions:
1. Check the documentation pages within the app
2. Review the API documentation
3. Examine error logs in the console

## License

All rights reserved. ValoraiplusAI.
