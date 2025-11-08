# CareMe - Login Page with Tailwind CSS & React Query

A modern React application with a beautiful login page built using Vite, TypeScript, Tailwind CSS, and React Query for API integration.

## 🚀 Features

- ✨ Beautiful, responsive login page with modern UI
- 🎨 Tailwind CSS for styling
- 🔄 React Query (@tanstack/react-query) for efficient API state management
- 📡 Axios for HTTP requests
- 🔒 Password visibility toggle
- ⚡ Fast development with Vite
- 📝 TypeScript for type safety
- 🎯 Sample API integration with JSONPlaceholder

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🏗️ Project Structure

```
src/
├── api/
│   └── auth.ts              # API functions and types
├── components/
│   └── Login.tsx            # Login page component
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point with React Query setup
└── index.css                # Global styles with Tailwind directives
```

## 🔧 Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration for Tailwind
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

## 🎨 Tailwind CSS Setup

The project is configured with Tailwind CSS v3. Custom theme extensions are available in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Custom primary color palette
      },
    },
  },
}
```

## 🔌 API Integration

The application uses React Query for API state management. Example setup:

### API Configuration (`src/api/auth.ts`)

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await api.get<User>('/users/1');
  return {
    id: response.data.id,
    name: response.data.name,
    email: response.data.email,
    token: 'mock-jwt-token-' + Date.now(),
  };
};
```

### Using React Query in Components

```typescript
import { useMutation } from '@tanstack/react-query';

const loginMutation = useMutation({
  mutationFn: (credentials: LoginRequest) => loginUser(credentials),
  onSuccess: (data) => {
    console.log('Login successful:', data);
  },
  onError: (error: Error) => {
    console.error('Login failed:', error);
  },
});

// Trigger the mutation
loginMutation.mutate({ email, password });
```

## 🎯 Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

3. You'll see a beautiful login page. Enter any email and password to test the API integration.

4. The app uses JSONPlaceholder as a mock API endpoint. In production, replace this with your actual authentication API.

## 🔐 Login Component Features

- Email and password inputs with validation
- Password visibility toggle
- Remember me checkbox
- Forgot password link
- Loading states during API calls
- Error handling and display
- Responsive design for all screen sizes
- Modern gradient backgrounds
- Smooth transitions and animations

## 🌐 Customizing the API

To use your own API endpoint, update `src/api/auth.ts`:

```typescript
const api = axios.create({
  baseURL: 'https://your-api-domain.com/api', // Change this
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  // Update to your actual login endpoint
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};
```

## 📱 Responsive Design

The login page is fully responsive and looks great on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1280px and up)

## 🎨 Styling

The project uses Tailwind CSS utility classes for styling. Key features include:

- Gradient backgrounds
- Smooth hover effects
- Focus states for accessibility
- Shadow effects
- Custom color palette
- Responsive spacing and sizing

## 🔄 State Management

React Query provides:
- Automatic caching
- Background refetching
- Optimistic updates
- Error handling
- Loading states
- Request deduplication

Configuration in `src/main.tsx`:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
```

## 📝 TypeScript Types

The project includes TypeScript types for:
- Login requests and responses
- User data
- API responses
- Component props

## 🚀 Next Steps

To extend this application, you can:

1. Add more pages (Dashboard, Profile, etc.)
2. Implement routing with React Router
3. Add form validation with libraries like React Hook Form
4. Implement JWT token management
5. Add protected routes
6. Create a registration page
7. Add password reset functionality
8. Implement OAuth/Social login

## 📄 License

This project is for demonstration purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
