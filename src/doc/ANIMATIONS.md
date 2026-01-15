# 🎬 Framer Motion Animations Added

## Overview
All landing page sections now have smooth, professional animations using Framer Motion.

## Animations by Section

### 1. Hero Section ✨
**Type:** Immediate on page load

**Animations:**
- **Card Container:** Fade in + slide up (0.8s)
- **Title:** Fade in + slide up with delay (0.8s, delay 0.2s)
- **Subtitle:** Fade in + slide up with delay (0.8s, delay 0.4s)
- **CTA Button:** Fade in + scale up (0.5s, delay 0.6s)

**Effect:** Staggered entrance creates a professional reveal

```tsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: "easeOut" }}
```

---

### 2. Mission Section 🎯
**Type:** Scroll-triggered (appears when scrolling into view)

**Animations:**
- **Title:** Fade in + slide up (0.6s)
- **First Paragraph:** Fade in + slide up with delay (0.6s, delay 0.2s)
- **Second Paragraph:** Fade in + slide up with delay (0.6s, delay 0.4s)
- **CTA Button:** Fade in + scale up (0.5s, delay 0.6s)

**Trigger:** 100px before section enters viewport

```tsx
const isInView = useInView(ref, { once: true, margin: "-100px" });
```

---

### 3. Services Section 🏗️
**Type:** Scroll-triggered with staggered cards

**Animations:**
- **Title:** Fade in + slide up (0.6s)
- **Cards:** Staggered fade in + slide up (0.6s each, 0.2s stagger)
- **Card Hover:** Lift up 10px (0.3s)
- **Image Hover:** Zoom in 1.1x (0.4s)

**Effect:** Cards appear one after another in sequence

```tsx
const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
```

**Hover Effects:**
- Card lifts up on hover
- Image zooms in smoothly

---

### 4. Subscribe Section 📧
**Type:** Scroll-triggered

**Animations:**
- **Title:** Fade in + slide up (0.6s)
- **Description:** Fade in + slide up with delay (0.6s, delay 0.2s)
- **Form:** Fade in + slide up with delay (0.6s, delay 0.4s)

**Trigger:** 100px before section enters viewport

---

## Animation Features

### ✅ Scroll-Triggered Animations
- Uses `useInView` hook from Framer Motion
- Animations trigger when section is 100px from viewport
- `once: true` ensures animations only play once (better performance)

### ✅ Staggered Animations
- Service cards appear in sequence
- Creates a professional, polished feel
- 0.2s delay between each card

### ✅ Hover Effects
- Service cards lift up on hover
- Images zoom in smoothly
- Enhances interactivity

### ✅ Performance Optimized
- Animations only play once
- GPU-accelerated transforms (opacity, scale, y)
- No layout shifts

## Animation Timing

```
Hero Section (Immediate):
├─ 0.0s: Card starts fading in
├─ 0.2s: Title starts fading in
├─ 0.4s: Subtitle starts fading in
└─ 0.6s: Button starts fading in

Mission Section (On Scroll):
├─ 0.0s: Title starts
├─ 0.2s: First paragraph starts
├─ 0.4s: Second paragraph starts
└─ 0.6s: Button starts

Services Section (On Scroll):
├─ 0.0s: Title starts
├─ 0.0s: Card 1 starts
├─ 0.2s: Card 2 starts
└─ 0.4s: Card 3 starts

Subscribe Section (On Scroll):
├─ 0.0s: Title starts
├─ 0.2s: Description starts
└─ 0.4s: Form starts
```

## Code Examples

### Basic Fade In + Slide Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Scroll-Triggered Animation
```tsx
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Staggered Children
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Hover Effect
```tsx
<motion.div
  whileHover={{ y: -10 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

## Browser Support

✅ All modern browsers (Chrome, Firefox, Safari, Edge)
✅ Mobile devices (iOS, Android)
✅ Graceful degradation (animations disabled if not supported)

## Performance Tips

1. **Use GPU-accelerated properties:**
   - ✅ opacity, scale, x, y, rotate
   - ❌ width, height, top, left

2. **Limit animations:**
   - Only animate what's necessary
   - Use `once: true` for scroll animations

3. **Optimize images:**
   - Use Next.js Image component
   - Proper image sizes

## Customization

### Change Animation Speed
```tsx
transition={{ duration: 1.0 }} // Slower
transition={{ duration: 0.3 }} // Faster
```

### Change Animation Delay
```tsx
transition={{ delay: 0.5 }}
```

### Change Easing
```tsx
transition={{ ease: "easeOut" }}
transition={{ ease: "easeInOut" }}
transition={{ ease: [0.6, 0.05, 0.01, 0.9] }} // Custom cubic bezier
```

### Disable Animations
Remove the `motion` wrapper and use regular HTML elements.

## Testing

1. **Load page** - Hero should animate immediately
2. **Scroll down** - Each section should animate as it comes into view
3. **Hover cards** - Service cards should lift and images should zoom
4. **Mobile** - All animations should work smoothly

## Summary

✅ **4 sections animated**
✅ **Scroll-triggered animations**
✅ **Staggered card animations**
✅ **Hover effects**
✅ **Performance optimized**
✅ **Mobile friendly**

All animations are smooth, professional, and enhance the user experience without being distracting! 🎉
