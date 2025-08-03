# Employees Management Application

This is a React application for managing employees, built with React, TypeScript, and Vite.

## Features

- View a list of employees
- Filter employees by status
- Search employees by name or status
- Update employee status
- Create and edit employees

## Technology Stack

- **React**: UI library
- **TypeScript**: Type checking
- **Vite**: Build tool
- **React Query**: Data fetching and caching
- **Tailwind CSS**: Styling
- **Vitest**: Testing framework

## Getting Started

### Installation

```bash
pnpm install
```

### Running the Application

```bash
# Start the development server
pnpm run dev

# Start the mock API server
pnpm run server
```

### Running Tests

```bash
# Run unit tests once
pnpm test

# Run unit tests in watch mode
pnpm run test:watch
```

## Testing

### Unit Testing

This project uses Vitest and React Testing Library for unit testing. Tests are organized alongside the code they test:

- Component tests: `src/features/*/ui/components/__tests__/`
- Hook tests: `src/features/*/hooks/__tests__/`
- View tests: `src/features/*/ui/views/__tests__/`

