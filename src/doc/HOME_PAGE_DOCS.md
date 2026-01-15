# Home Page Implementation Guide

## 📁 Project Structure

```
src/
├── app/
│   ├── (main-layout)/
│   │   ├── (home)/
│   │   │   ├── _components/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── MissionSection.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   └── SubscribeSection.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   └── layout.tsx
├── components/
│   ├── shared/
│   │   └── main/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   └── ui/
│       └── image-with-fallback.tsx
├── hooks/
│   └── useHomePage.ts
├── services/
│   └── home.service.ts
├── providers/
│   └── ReactQueryProvider.tsx
└── types/
    └── home.types.ts
```

## 🎨 Components Overview

### Common Components (Reusable)
- **Header**: Navigation bar with logo, menu items, and search
- **Footer**: Copyright, links, and social media icons

### Home Page Sections
1. **HeroSection**: Main banner with CTA button
2. **MissionSection**: Company mission statement
3. **ServicesSection**: 3 service cards with images
4. **SubscribeSection**: Newsletter subscription form

## 🔧 Features

### ✅ Fully Dynamic
All components accept props for easy customization:

```tsx
<HeroSection 
  title="Custom Title"
  subtitle="Custom Subtitle"
  ctaText="Custom Button"
  ctaLink="/custom-link"
  backgroundImage="/custom-image.jpg"
/>
```

### ✅ API Ready
- React Query hooks configured
- Service layer for API calls
- Type-safe with TypeScript
- Toast notifications for user feedback

### ✅ Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Responsive navigation menu

### ✅ Image Handling
- Fallback component for missing images
- Next.js Image optimization
- Placeholder backgrounds

## 🚀 How to Use

### 1. Add Images
Place your images in `public/images/`:
- `hero-bg.jpg` - Hero background
- `service-1.jpg` - Service card 1
- `service-2.jpg` - Service card 2
- `service-3.jpg` - Service card 3

### 2. Configure Environment
Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

### 3. Run Development Server
```bash
npm run dev
```

## 🔌 API Integration

### Subscribe to Newsletter
```typescript
// Already integrated in SubscribeSection
const { mutate: subscribe } = useSubscribeNewsletter();
subscribe(email);
```

### Fetch Home Page Data
```typescript
// To use dynamic data from API
const { data, isLoading } = useHomePageData();

// Then pass to components
<HeroSection {...data?.hero} />
<MissionSection {...data?.mission} />
```

## 📝 Customization

### Change Colors
Update the color values in components:
- Primary: `#2B4168` (Navy Blue)
- Replace with your brand colors

### Modify Content
All content is prop-based, so you can:
1. Pass props directly to components
2. Fetch from API and pass data
3. Use CMS integration

### Add New Sections
1. Create component in `_components/`
2. Import in `page.tsx`
3. Add to the page layout

## 🎯 Next Steps

1. **Add Real Images**: Replace placeholder images
2. **Connect Backend**: Update API_BASE_URL
3. **Test API Integration**: Verify subscribe functionality
4. **Add More Pages**: About, Portfolio, Contact, Estimator
5. **SEO Optimization**: Add meta tags, structured data

## 📦 Dependencies Used

- **@tanstack/react-query**: Data fetching and caching
- **axios**: HTTP client
- **sonner**: Toast notifications
- **lucide-react**: Icons
- **tailwindcss**: Styling
- **next**: Framework

## 🐛 Troubleshooting

### Images not showing?
- Check file paths in `public/images/`
- Verify image names match component props
- Fallback will show if image missing

### API not working?
- Check `.env.local` configuration
- Verify backend is running
- Check browser console for errors

### Styling issues?
- Clear `.next` cache: `rm -rf .next`
- Restart dev server
- Check Tailwind configuration

## 📞 Support

For questions or issues, refer to:
- Next.js docs: https://nextjs.org/docs
- React Query docs: https://tanstack.com/query
- Tailwind docs: https://tailwindcss.com/docs
