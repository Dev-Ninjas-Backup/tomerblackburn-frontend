# Bathroom Estimator System

## Overview
A fully functional bathroom remodeling estimator that guides users through selecting bathroom types, customizing options, and submitting estimates. All data is persisted in localStorage until final submission.

## Features
- ✅ 4 Bathroom Types (TP, TPT, TPS, FP) with different base prices
- ✅ Multi-step form with progress tracking
- ✅ Real-time price calculation
- ✅ Floating price card that follows user
- ✅ LocalStorage persistence (survives page refresh)
- ✅ Back/Forward navigation with data preservation
- ✅ File upload support (photos & videos)
- ✅ Responsive design (mobile & desktop)
- ✅ Color-coded question types (White, Blue, Orange, Green)

## User Flow

### 1. Choose Bathroom Type (`/estimator/choose-bathroom-type`)
- User selects one of 4 bathroom types
- Base price is set based on selection:
  - Two-Piece (TP): $4,000
  - Three-Piece w/ Tub (TPT): $10,000
  - Three-Piece w/ Shower (TPS): $13,000
  - Four-Piece (FP): $15,000

### 2. Step 1: Demolition & Flooring (`/estimator/step-1`)
**Demolition Section:**
- Wall Tile Removal (Yes/No toggle)
  - If Yes → Enter sqft (data input)
  - Cost: $5 per sqft

**Flooring Section:**
- Floor Tile Selection (dropdown)
  - Options: Ceramic, Porcelain, Natural Stone, Luxury Vinyl
  - Cost: +$10,000
- Heated Floor (Yes/No toggle)
  - Cost: +$15

### 3. Step 2: Fixtures & Layout (`/estimator/step-2`)
**Vanity & Countertop:**
- Vanity Size (dropdown + qty)
  - Options: 24", 36", 48", 60"
  - Cost: +$40,000
- Vanity Style (dropdown + qty)
  - Options: Modern, Traditional, Floating, Rustic
  - Cost: +$30,000
- Countertop Material (dropdown + qty)
  - Options: Quartz, Granite, Marble, Solid Surface
  - Cost: +$20,000
- Double Sink (toggle)
  - Cost: +$800

**Shower Design** (only for TPS & FP):
- Shower Door Type (dropdown + qty)
  - Options: Frameless, Semi-Frameless, Framed, Sliding
  - Cost: +$50
- Shower Niche (toggle) - Cost: +$250
- Bench Seat (toggle) - Cost: +$400
- Rain Shower Head (toggle) - Cost: +$350

**Bathtub Options** (only for TPT & FP):
- Tub Type Upgrade (dropdown + qty)
  - Options: Soaking Tub, Freestanding, Jetted, Walk-in
  - Cost: +$60

### 4. Step 3: Finishing Touches (`/estimator/step-3`)
**Lighting:**
- Vanity Light Upgrade (dropdown + qty)
  - Options: LED Modern, Sconce Pair, Chandelier, Backlit Mirror
  - Cost: +$30,000
- Recessed Lights (toggle)
  - Cost: +$800

**Fixtures & Hardware:**
- Toilet Upgrade (dropdown + qty)
  - Options: One-Piece, Comfort Height, Dual Flush, Smart Toilet
  - Cost: +$50
- Faucet Quality (dropdown + qty)
  - Options: Standard, Mid-Range, Premium, Luxury
  - Cost: +$60
- Towel Bars (toggle)
  - Cost: +$400

**Walls & Ceiling:**
- Wall Tile (toggle)
  - Cost: +$400

### 5. Preview & Submit (`/estimator/preview`)
**User Information Form:**
- Full Name (required)
- Email Address (required)
- Phone Number (required)
- Zip Code (required)
- Project Address (required)
- Project Notes (optional)

**File Uploads:**
- Photos: Max 10 images (PNG, JPG, JPEG - 10MB each)
- Videos: Max 2 videos (MP4, MOV - 50MB each)

**Estimate Summary:**
- Shows base price
- Lists all additional items with costs
- Displays total price

### 6. Confirmation (`/estimator/confirmation`)
- Success message with checkmark animation
- Estimate number generated
- Total price displayed
- "What happens next" timeline
- Options to start new estimate or return home

## Technical Implementation

### State Management
**Zustand Store** (`/src/store/estimatorStore.ts`):
- Persists to localStorage automatically
- Resets on final submission
- Handles all price calculations

### Components
- **FloatingPriceCard**: Sticky price summary that follows user
- **BathroomTypesSection**: Landing page component
- All step pages are self-contained with their own logic

### Color Coding System
- **White Background**: Included in base price (no additional cost)
- **Blue Background**: Yes/No toggle questions
- **Orange Background**: Dropdown selection questions
- **Green Background**: Data input fields (numbers only)

### Data Persistence
- All data saved to localStorage on every change
- User can navigate back/forward without losing data
- Data cleared only after successful submission

## Future API Integration
The system is ready for API integration. You'll need to:

1. Create API endpoint for estimate submission
2. Replace mock data with real cost codes from Buildertrend
3. Add file upload to cloud storage (S3, etc.)
4. Send email notifications
5. Generate Excel export in Buildertrend format

## File Structure
```
src/
├── app/(main-layout)/estimator/
│   ├── _components/
│   │   ├── BathroomTypesSection.tsx
│   │   ├── FloatingPriceCard.tsx
│   │   └── ...
│   ├── choose-bathroom-type/
│   │   └── page.tsx
│   ├── step-1/
│   │   └── page.tsx
│   ├── step-2/
│   │   └── page.tsx
│   ├── step-3/
│   │   └── page.tsx
│   ├── preview/
│   │   └── page.tsx
│   ├── confirmation/
│   │   └── page.tsx
│   └── page.tsx
├── store/
│   └── estimatorStore.ts
└── types/
    └── estimator.ts
```

## Notes
- All prices are placeholder values - update with real costs
- Dropdown quantity ranges can be customized per item type
- System supports conditional rendering based on bathroom type
- Mobile responsive with touch-friendly controls
- Smooth animations using Framer Motion
