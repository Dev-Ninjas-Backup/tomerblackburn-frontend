# 🏗️ Component Structure & Data Flow

## Visual Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      Root Layout                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         React Query Provider                          │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │           Main Layout                           │ │  │
│  │  │  ┌───────────────────────────────────────────┐  │ │  │
│  │  │  │          Header (Sticky)                  │  │ │  │
│  │  │  │  - Logo                                   │  │ │  │
│  │  │  │  - Navigation Menu                        │  │ │  │
│  │  │  │  - Search Button                          │  │ │  │
│  │  │  └───────────────────────────────────────────┘  │ │  │
│  │  │                                                  │ │  │
│  │  │  ┌───────────────────────────────────────────┐  │ │  │
│  │  │  │          Home Page                        │  │ │  │
│  │  │  │                                           │  │ │  │
│  │  │  │  ┌─────────────────────────────────────┐ │  │ │  │
│  │  │  │  │      Hero Section                   │ │  │ │  │
│  │  │  │  │  - Background Image                 │ │  │ │  │
│  │  │  │  │  - Title & Subtitle                 │ │  │ │  │
│  │  │  │  │  - CTA Button                       │ │  │ │  │
│  │  │  │  └─────────────────────────────────────┘ │  │ │  │
│  │  │  │                                           │  │ │  │
│  │  │  │  ┌─────────────────────────────────────┐ │  │ │  │
│  │  │  │  │      Mission Section                │ │  │ │  │
│  │  │  │  │  - Title                            │ │  │ │  │
│  │  │  │  │  - Description                      │ │  │ │  │
│  │  │  │  │  - Highlighted Text                 │ │  │ │  │
│  │  │  │  │  - CTA Button                       │ │  │ │  │
│  │  │  │  └─────────────────────────────────────┘ │  │ │  │
│  │  │  │                                           │  │ │  │
│  │  │  │  ┌─────────────────────────────────────┐ │  │ │  │
│  │  │  │  │      Services Section               │ │  │ │  │
│  │  │  │  │  ┌───────────────────────────────┐  │ │  │ │  │
│  │  │  │  │  │  Service Card 1               │  │ │  │ │  │
│  │  │  │  │  │  - Image                      │  │ │  │ │  │
│  │  │  │  │  │  - Title                      │  │ │  │ │  │
│  │  │  │  │  │  - Description                │  │ │  │ │  │
│  │  │  │  │  └───────────────────────────────┘  │ │  │ │  │
│  │  │  │  │  ┌───────────────────────────────┐  │ │  │ │  │
│  │  │  │  │  │  Service Card 2               │  │ │  │ │  │
│  │  │  │  │  └───────────────────────────────┘  │ │  │ │  │
│  │  │  │  │  ┌───────────────────────────────┐  │ │  │ │  │
│  │  │  │  │  │  Service Card 3               │  │ │  │ │  │
│  │  │  │  │  └───────────────────────────────┘  │ │  │ │  │
│  │  │  │  └─────────────────────────────────────┘ │  │ │  │
│  │  │  │                                           │  │ │  │
│  │  │  │  ┌─────────────────────────────────────┐ │  │ │  │
│  │  │  │  │      Subscribe Section              │ │  │ │  │
│  │  │  │  │  - Title                            │ │  │ │  │
│  │  │  │  │  - Description                      │ │  │ │  │
│  │  │  │  │  - Email Input                      │ │  │ │  │
│  │  │  │  │  - Submit Button                    │ │  │ │  │
│  │  │  │  └─────────────────────────────────────┘ │  │ │  │
│  │  │  └───────────────────────────────────────────┘  │ │  │
│  │  │                                                  │ │  │
│  │  │  ┌───────────────────────────────────────────┐  │ │  │
│  │  │  │          Footer                           │  │ │  │
│  │  │  │  - Copyright                              │  │ │  │
│  │  │  │  - Links (Privacy, Terms)                 │  │ │  │
│  │  │  │  - Social Media Icons                     │  │ │  │
│  │  │  └───────────────────────────────────────────┘  │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Toaster (Notifications)                  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │
       │ User visits page
       ▼
┌──────────────────────────────────────────────────────────┐
│                    Home Page Component                    │
│                                                           │
│  Option 1: Static Content (Current)                      │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Default props → Components → Render               │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  Option 2: Dynamic Content (After API Integration)       │
│  ┌────────────────────────────────────────────────────┐  │
│  │  useHomePageData() hook                            │  │
│  │         ↓                                           │  │
│  │  React Query fetches data                          │  │
│  │         ↓                                           │  │
│  │  homePageService.getHomePageData()                 │  │
│  │         ↓                                           │  │
│  │  Axios calls backend API                           │  │
│  │         ↓                                           │  │
│  │  Data returned & cached                            │  │
│  │         ↓                                           │  │
│  │  Props passed to components                        │  │
│  │         ↓                                           │  │
│  │  Components render with API data                   │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│              Subscribe Form Submission                    │
│                                                           │
│  User enters email → Submit button clicked               │
│         ↓                                                 │
│  useSubscribeNewsletter() hook                           │
│         ↓                                                 │
│  React Query mutation triggered                          │
│         ↓                                                 │
│  homePageService.subscribeNewsletter(email)              │
│         ↓                                                 │
│  Axios POST to backend                                   │
│         ↓                                                 │
│  ┌─────────────────┐    ┌─────────────────┐             │
│  │    Success      │    │     Error       │             │
│  │  - Toast shown  │    │  - Toast shown  │             │
│  │  - Form cleared │    │  - Form kept    │             │
│  └─────────────────┘    └─────────────────┘             │
└──────────────────────────────────────────────────────────┘
```

## File Dependencies

```
page.tsx (Home Page)
    │
    ├─→ HeroSection.tsx
    │       └─→ Button (UI component)
    │
    ├─→ MissionSection.tsx
    │       └─→ Button (UI component)
    │
    ├─→ ServicesSection.tsx
    │       └─→ ImageWithFallback (UI component)
    │
    └─→ SubscribeSection.tsx
            ├─→ Input (UI component)
            ├─→ Button (UI component)
            └─→ useSubscribeNewsletter (hook)
                    └─→ homePageService
                            └─→ axios

layout.tsx (Main Layout)
    ├─→ Header.tsx
    │       ├─→ Button (UI component)
    │       └─→ Menu, X, Search icons
    │
    └─→ Footer.tsx
            └─→ Facebook, Instagram, Twitter icons

layout.tsx (Root Layout)
    ├─→ ReactQueryProvider
    │       └─→ QueryClient
    │
    └─→ Toaster
```

## State Management

```
┌─────────────────────────────────────────────────────────┐
│                   React Query Cache                      │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Query: "homePageData"                             │ │
│  │  Status: idle | loading | success | error          │ │
│  │  Data: HomePageData | undefined                    │ │
│  │  Stale Time: 5 minutes                             │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Mutation: "subscribeNewsletter"                   │ │
│  │  Status: idle | loading | success | error          │ │
│  │  On Success: Show toast, clear form                │ │
│  │  On Error: Show error toast                        │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   Component State                        │
│                                                          │
│  Header:                                                 │
│    - isMenuOpen: boolean (mobile menu toggle)           │
│                                                          │
│  SubscribeSection:                                       │
│    - email: string (form input)                         │
│                                                          │
│  ImageWithFallback:                                      │
│    - error: boolean (image load error)                  │
└─────────────────────────────────────────────────────────┘
```

## Props Flow

```
Static Mode (Current):
─────────────────────
Component uses default props → Renders with hardcoded content

Dynamic Mode (After API):
─────────────────────────
API Response
    ↓
useHomePageData() hook
    ↓
Home Page Component receives data
    ↓
Spreads data to child components
    ↓
    ├─→ <HeroSection {...data.hero} />
    ├─→ <MissionSection {...data.mission} />
    ├─→ <ServicesSection {...data.services} />
    └─→ <SubscribeSection {...data.subscribe} />
```

## Color Scheme

```
Primary Color: #2B4168 (Navy Blue)
├─→ Header background
├─→ Hero card background
├─→ Button backgrounds
├─→ Section titles
└─→ Footer background (darker: #1a2744)

Secondary Colors:
├─→ White: #FFFFFF (backgrounds, text on dark)
├─→ Gray-50: #F9FAFB (section backgrounds)
├─→ Gray-700: #374151 (text)
└─→ Gray-300: #D1D5DB (borders, muted text)
```

## Responsive Breakpoints

```
Mobile First Approach:

Base (Mobile):     < 768px
    ↓
    ├─→ Single column layout
    ├─→ Stacked navigation
    ├─→ Full-width cards
    └─→ Larger touch targets

Tablet (md):       768px - 1024px
    ↓
    ├─→ Two column layout (some sections)
    ├─→ Horizontal navigation
    └─→ Grid layouts start

Desktop (lg):      > 1024px
    ↓
    ├─→ Three column layout
    ├─→ Full navigation visible
    ├─→ Larger containers
    └─→ Hover effects active
```

---

This structure ensures:
✅ Clear separation of concerns
✅ Reusable components
✅ Easy to maintain
✅ Scalable architecture
✅ Type-safe data flow
