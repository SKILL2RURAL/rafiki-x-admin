# Rafiki X Admin

A modern admin dashboard built with Next.js, React, and Tailwind CSS.

## Features

- Modern UI with responsive design
- Authentication system
- Dashboard analytics
- Interactive data visualization with Recharts
- Global map visualization with react-simple-maps
- Form validation with React Hook Form and Zod

## Tech Stack

- **Framework**: Next.js 15
- **UI**: React 19, Tailwind CSS 4
- **Styling**: Tailwind CSS with class-variance-authority
- **Form Handling**: React Hook Form with Zod validation
- **Components**: Radix UI primitives
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/SKILL2RURAL/rafiki-x-admin.git
   cd rafiki-x-admin
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the development server

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality

## Project Structure

```
rafiki-x-admin/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   │   ├── (auth)/     # Authentication routes
│   │   ├── (dashboard)/# Dashboard routes
│   ├── components/     # React components
│   │   ├── Dashboard/  # Dashboard-specific components
│   │   ├── Login/      # Authentication components
│   │   ├── Setting/    # Settings components
│   │   └── ui/         # Reusable UI components
│   └── lib/            # Utility functions and assets
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## License

[MIT](LICENSE)
