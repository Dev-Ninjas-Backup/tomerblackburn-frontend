# Cost Code System — Full Documentation

## Overview

Cost codes are the core building blocks of the bathroom estimator. Each cost code represents a line item of work (e.g. "Demolition", "Alcove Tub Install", "Heated Floors") that gets shown to the user during estimation and exported to Buildertrend.

---

## Database Schema — `CostCode` Model

| Field | Type | Notes |
|---|---|---|
| `id` | String (UUID) | Auto-generated |
| `code` | String (unique) | e.g. `FP-01-00`, `FP-02-03` |
| `name` | String | Full title shown in admin |
| `elies` | String? | Alias/display name used in floating summary (`elies \|\| name`) |
| `tips` | String[] | Array of helpful hints shown to users in estimator via TipsPopover |
| `description` | String? | Detailed work description |
| `categoryId` | FK → CostCodeCategory | e.g. Demolition, Plumbing, Electric |
| `serviceId` | FK → Service | e.g. Four Piece bathroom type |
| `basePrice` | Decimal(10,2) | Builder cost |
| `markup` | Decimal(5,2) | Markup % (e.g. 20 = 20%) |
| `clientPrice` | Decimal(10,2) | Auto-calculated: `basePrice * (1 + markup / 100)` |
| `unitType` | Enum | See UnitType below |
| `questionType` | Enum | See QuestionType below — controls UI behavior |
| `step` | Int | Estimator step number (1, 2, 3...) |
| `displayOrder` | Int | Sort order within category |
| `isIncludedInBase` | Boolean | If true, included in base price (no extra charge) |
| `requiresQuantity` | Boolean | User must enter a quantity |
| `isOptional` | Boolean | Can be toggled on/off by user |
| `isActive` | Boolean | Active = shown in estimator |
| `excludeFromExport` | Boolean | Branch-only: shown in estimator but NOT exported to Buildertrend Excel |
| `parentCostCodeId` | FK → CostCode (self) | Parent question for nested/conditional questions |
| `showWhenParentValue` | String? | Condition: `"true"` / `"false"` / `optionId` / `"ANY"` |
| `nestedInputType` | String? | `QUANTITY` / `DROPDOWN` / `CUSTOM_PRICE` / `NONE` |

---

## Enums

### QuestionType — Controls UI behavior (color-coded)

| Value | Color | Behavior |
|---|---|---|
| `WHITE` | White | Fixed/assumed scope — no user interaction, just informational |
| `BLUE` | Blue | Yes/No toggle (default: No) — adds fixed price when enabled |
| `GREEN` | Green | Numeric data input (e.g. square footage) |
| `ORANGE` | Orange | Dropdown with preset options — user picks from `CostCodeOption[]` |
| `YELLOW` | Yellow | Conditional Yes/No — appears only after a previous Yes answer |
| `PURPLE` | Purple | Uses data/value from a previous question |
| `RED` | Red | Inactive/hidden placeholder |

### UnitType — How cost is calculated

| Value | Meaning |
|---|---|
| `FIXED` | One-time fixed cost |
| `PER_SQFT` | Price per square foot |
| `PER_EACH` | Price per unit/item |
| `PER_LOT` | Price per lot |
| `PER_SET` | Price per set |
| `PER_UPGRADE` | Price per upgrade selection |

---

## Related Models

### `CostCodeCategory`
Groups cost codes into sections (e.g. Demolition, Plumbing, Electric).

| Field | Notes |
|---|---|
| `name` | e.g. "Demolition", "Plumbing" |
| `slug` | URL-safe unique identifier |
| `stepNumber` | Which estimator step this category belongs to |
| `displayOrder` | Sort order |

### `CostCodeOption`
Used only for `ORANGE` question type — the dropdown choices.

| Field | Notes |
|---|---|
| `costCodeId` | FK → CostCode |
| `optionName` | Display name: "Standard", "Mid-Range", "Premium" |
| `optionValue` | Internal value/spec |
| `priceModifier` | Additional cost for this option (+$500, +$1200) |
| `isDefault` | Pre-selected option |
| `displayOrder` | Sort order |

### `ServiceCostCode` (Junction Table)
Links a `CostCode` to a `Service` (bathroom type) with optional overrides.

| Field | Notes |
|---|---|
| `serviceId` | FK → Service (e.g. Four Piece) |
| `costCodeId` | FK → CostCode |
| `isIncludedInBase` | Override: included in base for this service |
| `isRequired` | Required for this service |
| `isVisible` | Visible in estimator for this service |
| `defaultQuantity` | Default qty override |
| `priceOverride` | Price override for this service |
| `displayOrder` | Sort order for this service |

---

## API Endpoints — `/cost-codes`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/cost-codes` | Create a new cost code |
| `GET` | `/cost-codes` | Get all with filters (categoryId, serviceId, questionType, unitType, isActive) |
| `GET` | `/cost-codes/:id` | Get by ID |
| `GET` | `/cost-codes/code/:code` | Get by code string |
| `GET` | `/cost-codes/category/:categoryId` | Get all active in a category |
| `GET` | `/cost-codes/bathroom-type/:bathroomTypeId` | Get via ServiceCostCode junction (with overrides) |
| `GET` | `/cost-codes/question-type/:questionType` | Get by question type |
| `PATCH` | `/cost-codes/:id` | Update cost code |
| `PATCH` | `/cost-codes/:id/toggle-status` | Toggle isActive |
| `DELETE` | `/cost-codes/:id` | Delete (blocked if submission items exist) |

---

## Create Flow (Frontend → Backend)

1. User fills `CostCodeModal` form in dashboard → `cost-management`
2. **POST `/cost-codes`** with `CreateCostCodeDto`
3. Backend auto-calculates `clientPrice = basePrice * (1 + markup / 100)` if not manually provided
4. If `questionType === "ORANGE"` → **POST `/cost-code-options/bulk`** with options array
5. Cost code gets linked to a service via `ServiceCostCode` junction table

---

## FP.md → Cost Code Category Mapping

The Four Piece (FP) bathroom type uses the following category structure:

| FP Category | Code Prefix | Category Name |
|---|---|---|
| Demolition | `FP-01` | Demolition |
| Plumbing | `FP-02` | Plumbing |
| Electric | `FP-03` | Electric |
| HVAC | `FP-04` | HVAC |
| Tile Install | `FP-05` | Tile Install |
| Carpentry | `FP-06` | Carpentry |
| Patch & Paint | `FP-07` | Patch & Paint |
| Accessories | `FP-08` | Accessories |
| Glass | `FP-09` | Glass |
| Stone | `FP-10` | Stone |
| Site Prep / Management | `FP-11` | Management |

### FP Pricing Structure (from FP.md)
Every cost code in FP follows this pattern:
```
Builder Cost → 20% Markup → Client Price → 16.67% Margin → Profit
```
Example: `$800 base → $960 client price → $160 profit`

---

## Frontend Files

| File | Purpose |
|---|---|
| `src/app/(dashboard-layout)/dashboard/cost-management/page.tsx` | Main cost management page |
| `src/app/(dashboard-layout)/dashboard/cost-management/_tabs/CostCodesTab.tsx` | Cost codes list tab |
| `src/app/(dashboard-layout)/dashboard/cost-management/_tabs/CostCodeCategoriesTab.tsx` | Categories tab |
| `src/app/(dashboard-layout)/dashboard/cost-management/_tabs/CostCodeOptionsTab.tsx` | Options tab |
| `src/app/(dashboard-layout)/dashboard/cost-management/_components/CostCodeModal.tsx` | Create/Edit modal |
| `src/app/(dashboard-layout)/dashboard/cost-management/_components/CostCodeCategoryModal.tsx` | Category modal |
| `src/app/(dashboard-layout)/dashboard/cost-management/_components/CostCodeOptionModal.tsx` | Option modal |
| `src/app/(dashboard-layout)/dashboard/cost-management/_components/BulkCreateOptionsModal.tsx` | Bulk option creation |
| `src/app/(main-layout)/estimator/_components/CostCodeRenderer.tsx` | Renders cost codes in estimator UI |
| `src/types/cost-management.types.ts` | TypeScript interfaces |

---

## Backend Files

| File | Purpose |
|---|---|
| `prisma/schema/CostCode.prisma` | CostCode model + QuestionType + UnitType enums |
| `prisma/schema/CostCodeCategory.prisma` | Category model |
| `prisma/schema/CostCodeOption.prisma` | Option model (for ORANGE type) |
| `prisma/schema/ServiceCostCode.prisma` | Junction table: Service ↔ CostCode |
| `src/modules/cost-codes/cost-codes.controller.ts` | REST endpoints |
| `src/modules/cost-codes/cost-codes.service.ts` | Business logic |
| `src/modules/cost-codes/dto/create-cost-code.dto.ts` | Create DTO with validation |
| `src/modules/cost-codes/dto/update-cost-code.dto.ts` | Update DTO |

---

## Key Business Rules

- `code` must be **unique** across all cost codes
- `clientPrice` is **auto-calculated** from `basePrice + markup%` unless manually overridden
- `ORANGE` type **requires** at least one `CostCodeOption`
- Cost codes **cannot be deleted** if they have existing `SubmissionItem` records
- `excludeFromExport = true` means the question shows in estimator but is **not exported** to Buildertrend Excel (used for branching/conditional logic questions like "Relocating Plumbing?")
- `elies` field takes priority over `name` for display in the floating summary
- `tips` is a `String[]` — shown to users via `TipsPopover` (navy `#283878` themed) in the estimator

---

## Project Context

- **Client**: Tomer Blackburn (online bathroom estimator)
- **Bathroom Types**: TP, TPS, TPT, FP (Four Piece)
- **Theme Colors**: `#2d4a8f` / `#243a73` (dashboard), `#283878` (estimator)
- **Toast Library**: `sonner` via `showToast` utility at `src/lib/toast.ts`
- **Stack**: Next.js (TypeScript, Tailwind, Zustand, React Query) + NestJS (Prisma, PostgreSQL)
- **Export Target**: Buildertrend Excel format
