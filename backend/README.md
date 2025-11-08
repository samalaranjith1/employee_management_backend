# CareMe Backend

A Node.js Express server built with TypeScript for the CareMe healthcare application.

## Features

- 🚀 Express.js with TypeScript
- 🔒 Security middleware (Helmet, CORS)
- 📝 Request logging with Morgan
- ⚡ Performance optimizations (compression)
- 🔧 Environment configuration
- 📁 Organized project structure
- 🎯 Type-safe development
- 🛠️ Development tools (ESLint, Nodemon)

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Data models
│   ├── routes/         # Route definitions
│   ├── services/       # Business logic
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   └── index.ts        # Application entry point
├── dist/               # Compiled JavaScript output
├── .env                # Environment variables
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── eslint.config.js    # ESLint configuration
├── nodemon.json        # Nodemon configuration
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (>= 18.0.0)
- npm (>= 8.0.0)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration

### Development

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or your configured PORT)

### Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run clean` - Clean the dist directory

## API Endpoints

### Health Check
- `GET /` - Basic server info
- `GET /api/health` - Health check endpoint
- `GET /api/health/detailed` - Detailed health check with system info

## Environment Variables

See `.env.example` for all available environment variables.

Key variables:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend application URL

## Contributing

1. Follow the existing code style
2. Run `npm run lint` before committing
3. Ensure all types are properly defined
4. Add appropriate error handling
5. Update documentation as needed

## Security

- Helmet.js for security headers
- CORS configuration
- Input validation (to be implemented)
- Rate limiting (to be implemented)
- Authentication & Authorization (to be implemented)

## License

MIT License