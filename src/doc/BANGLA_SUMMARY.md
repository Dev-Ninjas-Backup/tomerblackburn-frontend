# হোম পেজ ইমপ্লিমেন্টেশন সামারি

## ✅ যা যা করা হয়েছে

### 1. Common Components (সব জায়গায় ব্যবহার হবে)
- ✅ **Header/Navbar** - লোগো, মেনু, সার্চ বাটন সহ
- ✅ **Footer** - কপিরাইট, লিংক, সোশ্যাল মিডিয়া আইকন

### 2. Home Page Sections
- ✅ **HeroSection** - মূল ব্যানার + "Start My Estimate" বাটন
- ✅ **MissionSection** - "Our Mission" সেকশন
- ✅ **ServicesSection** - ৩টা সার্ভিস কার্ড (Responsive Communication, Accurate Budgeting, Smart Scheduling)
- ✅ **SubscribeSection** - ইমেইল সাবস্ক্রিপশন ফর্ম

### 3. API Integration Ready
- ✅ React Query setup করা হয়েছে
- ✅ Custom hooks তৈরি করা হয়েছে (`useHomePage.ts`)
- ✅ Service layer তৈরি করা হয়েছে (`home.service.ts`)
- ✅ TypeScript types define করা হয়েছে
- ✅ Toast notification setup করা হয়েছে

### 4. Extra Features
- ✅ Image fallback component (ছবি না থাকলে placeholder দেখাবে)
- ✅ Responsive design (mobile + desktop)
- ✅ Loading states (subscribe button এ)
- ✅ Error handling

## 📂 ফাইল স্ট্রাকচার

```
src/
├── components/shared/main/
│   ├── Header.tsx          ← নেভিগেশন বার
│   └── Footer.tsx          ← ফুটার
│
├── app/(main-layout)/(home)/_components/
│   ├── HeroSection.tsx     ← হিরো সেকশন
│   ├── MissionSection.tsx  ← মিশন সেকশন
│   ├── ServicesSection.tsx ← সার্ভিস কার্ড
│   └── SubscribeSection.tsx← সাবস্ক্রাইব ফর্ম
│
├── hooks/
│   └── useHomePage.ts      ← API hooks
│
├── services/
│   └── home.service.ts     ← API calls
│
├── types/
│   └── home.types.ts       ← TypeScript types
│
└── providers/
    └── ReactQueryProvider.tsx ← React Query setup
```

## 🎯 কিভাবে কাজ করে

### Static Content (এখন)
এখন সব content hardcoded আছে components এর মধ্যে default props হিসেবে।

### Dynamic Content (API integration এর পর)
যখন API ready হবে, তখন এভাবে use করবেন:

```typescript
// Home page এ
const { data } = useHomePageData();

<HeroSection {...data?.hero} />
<MissionSection {...data?.mission} />
<ServicesSection {...data?.services} />
```

## 🔧 এখন কি করতে হবে

### 1. Images Add করুন
`public/images/` folder এ এই images গুলো রাখুন:
- `hero-bg.jpg` - হিরো সেকশনের background
- `service-1.jpg` - প্রথম সার্ভিস কার্ড
- `service-2.jpg` - দ্বিতীয় সার্ভিস কার্ড
- `service-3.jpg` - তৃতীয় সার্ভিস কার্ড

### 2. Environment Variables
`.env.local` file তৈরি করুন:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

### 3. Development Server Run করুন
```bash
npm run dev
```

Browser এ যান: http://localhost:3000

## 🎨 Customization

### Colors Change করতে চাইলে
Components এ `#2B4168` (navy blue) খুঁজে আপনার color দিয়ে replace করুন।

### Content Change করতে চাইলে
প্রতিটা component এ props pass করুন:

```tsx
<HeroSection 
  title="আপনার টাইটেল"
  subtitle="আপনার সাবটাইটেল"
  ctaText="আপনার বাটন টেক্সট"
/>
```

## 🔌 API Integration

### Subscribe Newsletter
Already integrated! শুধু backend API ready করলেই কাজ করবে।

Endpoint: `POST /api/subscribe`
Body: `{ "email": "user@example.com" }`

### Home Page Data
Backend থেকে এই format এ data পাঠান:

```json
{
  "hero": {
    "title": "...",
    "subtitle": "...",
    "ctaText": "...",
    "ctaLink": "...",
    "backgroundImage": "..."
  },
  "mission": { ... },
  "services": {
    "title": "...",
    "services": [...]
  },
  "subscribe": { ... }
}
```

## ✨ Features

1. **Fully Responsive** - Mobile এবং Desktop উভয়েই perfect
2. **Type Safe** - TypeScript দিয়ে সব type define করা
3. **API Ready** - শুধু backend connect করলেই চলবে
4. **Reusable** - সব components reusable
5. **Error Handling** - Error হলে user friendly message
6. **Loading States** - Loading এর সময় proper feedback
7. **Image Fallback** - Image না থাকলে placeholder

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Next Steps

1. ✅ Home page complete
2. ⏳ Images add করুন
3. ⏳ About page বানান
4. ⏳ Portfolio page বানান
5. ⏳ Contact page বানান
6. ⏳ Estimator tool বানান (main feature)
7. ⏳ Backend API connect করুন

## 💡 Tips

- সব components `_components` folder এ আছে কারণ Next.js এ underscore দিয়ে শুরু হলে সেটা route হয় না
- Header ও Footer common components folder এ আছে কারণ এগুলো অন্য layout এও use হতে পারে
- Image optimization এর জন্য Next.js এর Image component use করা হয়েছে
- API calls এর জন্য React Query use করা হয়েছে যাতে caching, refetching automatic হয়

## 🎉 Summary

আপনার home page **fully functional** এবং **API integration ready**! 

শুধু:
1. Images add করুন
2. Backend API ready করুন
3. Environment variables set করুন

তাহলেই সব কিছু কাজ করবে! 🚀
