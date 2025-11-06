# Multi-Agent Chat System

## Overview

This is a full-stack web application featuring an intelligent multi-agent chat system with specialized AI assistants (medical, cybersecurity) alongside organizational visualization, mission tracking, and strategy recommendation features. Built with React, Express, TypeScript, and PostgreSQL (via Drizzle ORM and Neon serverless), it provides an interactive platform for users to engage with domain-specific AI agents and manage mission-based operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **UI Components**: Shadcn/ui (Radix UI primitives) with Tailwind CSS for styling
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting dark mode

**Design Decisions:**
- Component-based architecture with separation of concerns (pages, components, utilities)
- Use of Shadcn/ui provides accessible, customizable components following the "New York" style variant
- Path aliases (`@/`, `@shared/`, `@assets/`) simplify imports and maintain clean code structure
- Thai language support through Google Fonts (Noto Sans Thai) for internationalization

**Key Features:**
- Multi-page application with chat UI, organization chart, mission dashboard, and strategy recommender
- Real-time chat interface with typing indicators and message status badges
- Agent selection system with visual cards and tooltips
- Data visualization using Recharts for mission analytics
- Message sanitization using DOMPurify for security
- Responsive design with mobile-first approach

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for HTTP server
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling

**Design Decisions:**
- Minimal backend footprint with placeholder routes for future API expansion
- In-memory storage implementation (`MemStorage`) as a development placeholder, designed to be swapped with database-backed storage
- Middleware for request logging with JSON response capture
- Error handling middleware for centralized error responses
- Vite integration in development mode for HMR (Hot Module Replacement)

**Application Structure:**
- `server/index.ts`: Main Express application setup with middleware and error handling
- `server/routes.ts`: Route registration (currently minimal, designed for expansion)
- `server/storage.ts`: Storage interface abstraction with in-memory implementation
- `server/vite.ts`: Development-only Vite server integration

**Storage Layer Design:**
- `IStorage` interface defines CRUD operations (getUser, getUserByUsername, createUser)
- `MemStorage` provides in-memory implementation for development
- Designed to be replaced with database-backed implementation using Drizzle ORM
- User schema already defined in `shared/schema.ts` with validation using Zod

### Database Schema

**ORM Configuration:**
- Drizzle Kit configured for PostgreSQL with migrations directory at `./migrations`
- Schema location: `./shared/schema.ts`
- Database URL expected from environment variable `DATABASE_URL`

**Current Schema:**
- **users table**: Basic user authentication structure
  - `id`: Serial primary key
  - `username`: Unique text field
  - `password`: Text field (should be hashed in production)
  - Zod validation schema (`insertUserSchema`) for type-safe insertions

**Design Rationale:**
- Shared schema directory allows both frontend and backend to import types
- Drizzle provides type-safe database operations with minimal overhead
- Schema uses PostgreSQL-specific types for optimal performance
- Neon serverless connector for scalable, serverless PostgreSQL access

### External Dependencies

**Key Third-Party Services:**
- **@neondatabase/serverless**: Serverless PostgreSQL database connector optimized for edge and serverless environments
- **Neon Database**: Cloud PostgreSQL service (requires `DATABASE_URL` environment variable)

**Major Libraries:**
- **UI Framework**: 
  - Radix UI primitives (accordion, dialog, dropdown, tooltip, etc.)
  - Shadcn/ui component library
  - Tailwind CSS for styling
  - class-variance-authority (cva) for component variants
  
- **Data & State Management**:
  - @tanstack/react-query for server state
  - @tanstack/react-virtual for virtualized lists
  - react-hook-form with @hookform/resolvers for form validation
  - Zod for schema validation
  
- **Utilities**:
  - DOMPurify for HTML sanitization
  - date-fns for date manipulation
  - nanoid for ID generation
  - wouter for routing
  
- **Development**:
  - @replit/vite-plugin-runtime-error-modal for error overlay
  - @replit/vite-plugin-cartographer for Replit integration

**API Integration Points:**
- Application currently has no external API integrations
- Placeholder files in `attached_assets/` suggest planned integrations:
  - OpenAI API (chat.py, content files reference GPT-4)
  - SportMonks API (predict.py files for sports data)
  - FastAPI/Flask backend references (not currently implemented)

**Security Considerations:**
- DOMPurify sanitization prevents XSS attacks in chat messages
- Environment variables for sensitive data (DATABASE_URL, API keys)
- CORS configuration expected for production deployment
- Password hashing should be implemented before production use