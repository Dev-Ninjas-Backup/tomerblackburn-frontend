# Authentication Setup Guide

This document explains the authentication system implementation in the BBurn Builders frontend application.

## ✅ Implementation Status: COMPLETE

All authentication features have been successfully implemented and tested.

## Overview

The authentication system uses JWT tokens with client-side state management via Zustand. It includes:

- ✅ Login functionality (no register page as per requirements)
- ✅ Protected routes
- ✅ Token management with expiry validation
- ✅ Automatic logout on 401 errors
- ✅ Logout functionality in sidebar
- ✅ Beautiful login UI with diagonal split background

## Architecture

### 1. Auth Storage (`src/lib/auth.ts`)

Handles localStorage operations for tokens and user data:

```typescript
- getToken(): Get JWT token from localStorage
- setToken(token): Save JWT token
- getUser(): Get user data
- setUser(user): Save user data
- clear(): Remove all auth data
- isTokenValid(token): Check if token is expired
- getDecodedToken(token): Decode JWT token
```

### 2. API Client (`src/lib/api.ts`)

Axios instance with interceptors:

- **Request Interceptor**: Automatically adds JWT token to all requests
- **Response Interceptor**: Handles 401 errors and redirects to login

### 3. Auth Store (`src/store/authStore.ts`)

Zustand store managing authentication state:

```typescript
State:
- user: User | null
- token: string | null
- isAuthenticated: boolean
- isLoading: boolean
- error: string | null

Actions:
- login(email, password): Login user
- logout(): Clear auth state and redirect to /login
- checkAuth(): Validate stored token on app load
- clearError(): Clear error messages
```

### 4. Auth Provider (`src/components/auth/AuthProvider.tsx`)

Global provider that checks authentication on app load. Wraps the entire app in `src/app/layout.tsx`.

### 5. Protected Route (`src/components/auth/ProtectedRoute.tsx`)

Wrapper component that:
- Checks authentication status
- Shows loading spinner while checking
- Redirects to `/login` if not authenticated
- Renders children if authenticated

## File Structure

```
src/
├── app/
│   ├── (auth-layout)/
│   │   └── login/
│   │       └── page.tsx          # Login page (correct location)
│   ├── (dashboard-layout)/
│   │   └── layout.tsx            # Protected with ProtectedRoute
│   └── layout.tsx                # Wrapped with AuthProvider
├── components/
│   ├── auth/
│   │   ├── AuthProvider.tsx      # Global auth state checker
│   │   └── ProtectedRoute.tsx    # Route protection wrapper
│   └── dashboard/
│       └── Sidebar.tsx           # Includes logout button
├── lib/
│   ├── auth.ts                   # Token utilities
│   └── api.ts                    # Axios with interceptors
└── store/
    └── authStore.ts              # Zustand auth store
```

## Usage

### Protecting Routes

The dashboard layout is already protected:

```tsx
// src/app/(dashboard-layout)/layout.tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
```

### Using Auth Store

```tsx
import { useAuthStore } from "@/store/authStore";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  // Access user data
  console.log(user?.name, user?.email);
  
  // Logout
  const handleLogout = () => logout();
}
```

### Making Authenticated API Calls

```tsx
import api from "@/lib/api";

// Token is automatically added to headers
const response = await api.get("/protected-endpoint");
const data = await api.post("/create-something", { name: "Test" });
```

## Backend API

### Base URL
```
https://tomerblackburn-backend.saikat.com.bd
```

### Endpoints

**POST /auth/login**
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "User Name",
    "email": "user@example.com",
    "role": "USER",
    "isActive": true,
    "avatarFile": null,
    "lastLoginAt": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Environment Variables

Already configured in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://tomerblackburn-backend.saikat.com.bd
NEXT_PUBLIC_API_URL=https://tomerblackburn-backend.saikat.com.bd
```

## Authentication Flow

```
1. User visits /dashboard (protected route)
   ↓
2. ProtectedRoute checks authentication
   ↓
3. If not authenticated → Redirect to /login
   ↓
4. User enters email and password
   ↓
5. Form validation with Zod
   ↓
6. Login action called in authStore
   ↓
7. POST request to /auth/login
   ↓
8. Backend validates credentials
   ↓
9. Token and user data stored in localStorage
   ↓
10. Auth state updated in Zustand
   ↓
11. Redirect to /dashboard
   ↓
12. All subsequent API requests include token
   ↓
13. On 401 error → Auto logout and redirect to /login
```

## Security Features

1. ✅ **Token Validation**: Checks token expiry using jwt-decode
2. ✅ **Automatic Logout**: On 401 responses via axios interceptor
3. ✅ **Protected Routes**: Client-side route protection
4. ✅ **Secure Storage**: Uses localStorage (consider httpOnly cookies for production)
5. ✅ **Error Handling**: Graceful error messages with toast notifications
6. ✅ **Password Visibility Toggle**: Eye icon to show/hide password
7. ✅ **Form Validation**: Zod schema validation
8. ✅ **Loading States**: Prevents multiple submissions

## Testing Checklist

- [x] Navigate to `/dashboard` without login → Redirects to `/login`
- [x] Enter invalid credentials → Shows error message
- [x] Enter valid credentials → Redirects to `/dashboard`
- [x] Refresh page while logged in → Stays authenticated
- [x] Click logout button → Redirects to `/login`
- [x] Try to access `/dashboard` after logout → Redirects to `/login`
- [x] Token expiry handling → Auto logout on expired token
- [x] 401 error handling → Auto logout and redirect

## Login Page Features

- Beautiful diagonal split background (blue and white)
- BBurn Builders logo
- Email and password fields with validation
- Password visibility toggle
- Loading state with spinner
- Error message display
- Smooth animations with Framer Motion
- Responsive design

## Notes

- ✅ Old unused auth pages at `src/app/auth/` have been deleted
- ✅ Login page is correctly located at `src/app/(auth-layout)/login/page.tsx`
- ✅ No register page (as per requirements)
- ✅ All redirects point to `/login` (not `/auth/login`)
- ✅ Dashboard layout is protected with ProtectedRoute
- ✅ Sidebar includes logout functionality
- ✅ All TypeScript errors resolved

## Production Considerations

For production deployment, consider:

1. **httpOnly Cookies**: Store tokens in httpOnly cookies instead of localStorage
2. **Refresh Tokens**: Implement refresh token mechanism
3. **Rate Limiting**: Add rate limiting on login endpoint
4. **HTTPS Only**: Ensure all requests use HTTPS
5. **CSRF Protection**: Implement CSRF tokens
6. **Session Timeout**: Add automatic session timeout
7. **Remember Me**: Optional "remember me" functionality
8. **Two-Factor Auth**: Consider 2FA for enhanced security
