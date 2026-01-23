# Toast Notifications Guide

This project uses **Sonner** for toast notifications with a custom utility wrapper for consistency.

## Setup

Toast notifications are already configured in the project:

1. **Toaster Component** - Added in `src/app/layout.tsx`
```tsx
import { Toaster } from "sonner";

<Toaster position="top-right" richColors />
```

2. **Toast Utility** - Located at `src/lib/toast.ts`

## Usage

### Basic Toast Notifications

```typescript
import { showToast } from "@/lib/toast";

// Success toast
showToast.success("Operation successful!");
showToast.success("Saved!", "Your changes have been saved.");

// Error toast
showToast.error("Something went wrong!");
showToast.error("Failed to save", "Please try again later.");

// Info toast
showToast.info("Information", "This is an informational message.");

// Warning toast
showToast.warning("Warning", "Please review your changes.");

// Loading toast
const toastId = showToast.loading("Processing...", "Please wait...");
// Later dismiss it
showToast.dismiss(toastId);
```

### Promise-based Toast

For async operations:

```typescript
import { showToast } from "@/lib/toast";

const saveData = async () => {
  const promise = api.post("/data", formData);
  
  showToast.promise(promise, {
    loading: "Saving...",
    success: "Data saved successfully!",
    error: "Failed to save data",
  });
};
```

### Pre-defined Messages

Use consistent messages across the app:

```typescript
import { showToast, toastMessages } from "@/lib/toast";

// Auth messages
const { message, description } = toastMessages.auth.loginSuccess("John");
showToast.success(message, description);

// Data operations
showToast.success(toastMessages.data.saveSuccess);
showToast.error(toastMessages.data.fetchError);

// Form validation
showToast.error(toastMessages.form.validationError);

// File operations
showToast.success(toastMessages.file.uploadSuccess);
showToast.error(toastMessages.file.sizeError);

// Network errors
showToast.error(toastMessages.network.offline);
```

## Available Toast Types

| Type | Duration | Use Case |
|------|----------|----------|
| `success` | 4s | Successful operations |
| `error` | 5s | Errors and failures |
| `info` | 4s | Informational messages |
| `warning` | 4s | Warnings and cautions |
| `loading` | ∞ | Ongoing operations (must dismiss manually) |
| `promise` | Auto | Async operations with loading/success/error states |

## Pre-defined Message Categories

### Authentication (`toastMessages.auth`)
- `loginSuccess(name)` - Login successful with user name
- `loginError` - Login failed
- `logoutSuccess` - Logout successful
- `sessionExpired` - Session expired
- `registerSuccess(name)` - Registration successful
- `registerError` - Registration failed

### Data Operations (`toastMessages.data`)
- `saveSuccess` - Changes saved
- `saveError` - Failed to save
- `deleteSuccess` - Deleted successfully
- `deleteError` - Failed to delete
- `updateSuccess` - Updated successfully
- `updateError` - Failed to update
- `createSuccess` - Created successfully
- `createError` - Failed to create
- `fetchError` - Failed to load data

### Form Validation (`toastMessages.form`)
- `validationError` - Form has errors
- `requiredFields` - Required fields missing

### File Operations (`toastMessages.file`)
- `uploadSuccess` - File uploaded
- `uploadError` - Upload failed
- `deleteSuccess` - File deleted
- `deleteError` - Delete failed
- `sizeError` - File too large
- `typeError` - Invalid file type

### Network (`toastMessages.network`)
- `offline` - No internet connection
- `error` - Network error

## Current Implementation

Toast notifications are already implemented in:

### ✅ Authentication System
- **Login** - Success/error toasts
- **Logout** - Info toast
- **Session Expiry** - Warning toast
- **Registration** - Success/error toasts

### ✅ API Interceptor
- **401 Errors** - Automatic session expired toast

## Examples from the Project

### Login Success
```typescript
// In authStore.ts
const { message, description } = toastMessages.auth.loginSuccess(user.name);
showToast.success(message, description);
// Shows: "Login successful! Welcome back, John!"
```

### Logout
```typescript
// In authStore.ts
const { message, description } = toastMessages.auth.logoutSuccess;
showToast.info(message, description);
// Shows: "Logged out successfully. You have been logged out of your account."
```

### Session Expired
```typescript
// In api.ts interceptor
const { message, description } = toastMessages.auth.sessionExpired;
showToast.error(message, description);
// Shows: "Session expired. Please login again to continue."
```

## Adding New Toast Messages

To add new toast messages, update `src/lib/toast.ts`:

```typescript
export const toastMessages = {
  // ... existing categories
  
  myNewCategory: {
    actionSuccess: "Action completed successfully",
    actionError: "Failed to complete action",
    customMessage: (param: string) => ({
      message: "Custom message",
      description: `Details: ${param}`,
    }),
  },
};
```

## Best Practices

1. **Use pre-defined messages** for consistency
2. **Keep messages short** and actionable
3. **Provide descriptions** for context when needed
4. **Use appropriate types** (success, error, info, warning)
5. **Dismiss loading toasts** after operations complete
6. **Don't spam toasts** - one at a time for related actions
7. **Use promise toasts** for async operations

## Customization

To customize toast appearance, update the Toaster component in `layout.tsx`:

```tsx
<Toaster 
  position="top-right"     // Position: top-left, top-center, top-right, etc.
  richColors               // Enable colored toasts
  expand={false}           // Don't expand on hover
  duration={4000}          // Default duration
  closeButton              // Show close button
  theme="light"            // Theme: light, dark, system
/>
```

## Testing

To test toast notifications:

1. **Login/Logout** - Test auth toasts
2. **Refresh page** - Test session expiry
3. **Network errors** - Test error handling
4. **Form submissions** - Test validation toasts
5. **File uploads** - Test file operation toasts

## Troubleshooting

**Toast not showing?**
- Check if `<Toaster />` is in `layout.tsx`
- Verify import: `import { showToast } from "@/lib/toast"`
- Check browser console for errors

**Toast showing twice?**
- Remove duplicate toast calls
- Check if error is thrown and caught multiple times

**Toast not dismissing?**
- For loading toasts, call `showToast.dismiss(toastId)`
- Check if duration is set correctly
