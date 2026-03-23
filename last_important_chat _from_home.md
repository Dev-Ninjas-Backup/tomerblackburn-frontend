## Conversation Summary

- **Toast Notifications for BuildingTypesTab**: Added `showToast` (sonner-based) to all CRUD actions — create, update, delete, toggle active. Removed inline error banner and `error` state entirely.
- **Accessibility Fixes for BuildingTypesTab**: Added `title` attributes to 4 unlabelled form elements (Price input, Display Order input, Field Type select, Field Display Order input) to fix Microsoft Edge Tools accessibility errors.
- **Tips Field for Cost Codes**: Added `tips?: string[]` to `CostCode` and `CreateCostCodeDto` interfaces. Added Tips UI section in `CostCodeModal.tsx` — dynamic list of text inputs with add/remove, using `Plus` icon.
- **TipsPopover in CostCodeRenderer**: Added `TipsPopover` component with amber theme initially, then redesigned to match project's navy `#283878` theme. Features: pulse `animate-ping` ring on trigger button, smooth `scale+opacity+translateY` animation on open/close, numbered tips list, navy gradient footer accent, outside-click auto-close.
- **Mobile Sidebar Drawer in Header**: Replaced top-down dropdown mobile menu with left-side drawer. Uses `translate-x` CSS transition for smooth slide-in/out, semi-transparent backdrop with blur, navy header with logo, nav links as pills (active = solid navy), user section at bottom.
- **PDF Reading Attempt**: User shared `FP.pdf` path. Tool confirmed PDF is binary/compressed — unreadable. User was advised to copy-paste relevant sections as text.

## Files and Code Summary

- **`src/app/(dashboard-layout)/dashboard/web/_tabs/BuildingTypesTab.tsx`**: Removed `error` state and inline error banner. All CRUD actions now use `showToast.success/error`. Added `title` attributes to Price, Display Order, Field Type select, and Field Display Order inputs. Imports `showToast` from `@/lib/toast`. `X` icon removed from lucide imports.
- **`src/types/cost-management.types.ts`**: Added `tips?: string[]` to both `CostCode` interface and `CreateCostCodeDto` interface.
- **`src/app/(dashboard-layout)/dashboard/cost-management/_components/CostCodeModal.tsx`**: Added `Plus` to lucide imports. `formData` state includes `tips: []`. Edit mode loads `tips: data.tips || []`. Create mode resets `tips: []`. Tips UI section added after `elies` field — dynamic list with add/remove buttons.
- **`src/app/(main-layout)/estimator/_components/CostCodeRenderer.tsx`**: Added `useState` to React imports, added `Lightbulb` and `X as XIcon` from lucide. `CostCode` interface has `tips?: string[]`. `TipsPopover` component added before `CostCodeRenderer` — navy `#283878` themed, pulse animation on trigger, smooth popover with numbered tips list. All 5 question type renders (WHITE, BLUE, GREEN/YELLOW, ORANGE, PURPLE) have `TipsPopover` in top-right when `tips.length > 0`.
- **`src/components/shared/main/Header.tsx`**: Mobile menu completely replaced. Old `{isMenuOpen && <nav>}` dropdown removed. New structure: drawer panel (`fixed left-0 w-72 translate-x`) + backdrop overlay (`fixed inset-0 bg-black/40`). Drawer has navy header with logo, nav links section, user section at bottom. `translate-x-0` / `-translate-x-full` transition for open/close.

## Key Insights

- **Project Theme**: Primary colors `#2d4a8f` / `#243a73` (dashboard), `#283878` (estimator). All new UI should use these navy colors.
- **Toast Library**: Project uses `sonner` via `showToast` utility at `src/lib/toast.ts`. Use `showToast.success/error/info/warning` — never raw `toast`.
- **Stack**: Next.js (TypeScript, Tailwind, Zustand, React Query) frontend, NestJS (Prisma, PostgreSQL) backend.
- **Elies Field**: Cost code alias field — display priority is `elies || name` everywhere.
- **Tips Field**: `tips` is `string[]` on cost codes — array of helpful hints shown to users in estimator via `TipsPopover`.
- **PDF Files**: Cannot read binary PDF files. User must copy-paste text content.
- **Client Project**: Online bathroom estimator for Tomer Blackburn — 4 bathroom types (TP, TPS, TPT, FP), color-coded question types (WHITE/BLUE/GREEN/ORANGE/PURPLE/YELLOW/RED), Buildertrend Excel export format.

## Most Recent Topic

**Topic**: User shared `FP.pdf` (at `C:\Users\Masud\Desktop\Projects\Softvence\tomerblackburn-frontend\FP.pdf`) asking if it could be read for project context.

**Progress**: Attempted to read the file using `fsRead` tool. The file returned raw binary/compressed PDF data — completely unreadable as text. Informed user that PDF binary format cannot be parsed, and suggested alternatives: copy-paste relevant sections, convert to Google Docs/Word first, or describe what's needed verbally.

**Tools Used**:
- **fsRead on FP.pdf**: Read attempted — returned binary stream data (`%PDF-1.7` header followed by compressed binary). File is unreadable. No useful content extracted.

---

C:\Users\Masud\Downloads\FP.md eta porte paro?

---

হ্যাঁ, পড়তে পারছি! এটা Four Piece (FP) bathroom type-এর সম্পূর্ণ cost code structure। এখানে যা আছে তার summary:

**Categories:**
- `FP-01` — Demolition (Waste Removal, Wall Tile Removal)
- `FP-02` — Plumbing (Alcove/Drop-in/Freestanding Tub, Relocate Shower/Tub/Sink/Toilet, Washlet, Handheld Wand, Body Sprays, Rainfall Head, Steam Shower)
- `FP-03` — Electric (Add/Relocate Outlets & Switches, Recessed Cans 2"/4"/6", Sconces, Dimmer, Ceiling Fixture, LED Mirror, Heated Floors)
- `FP-04` — HVAC (Replace Fan No Light/With Light, Relocate Fan, New Exhaust System)
- `FP-05` — Tile Install (Standard, Outside Wet Walls, Size Upgrade, Natural Stone, Specialty Design)
- `FP-06` — Carpentry (Floating Vanity, Recessed Mirror)
- `FP-07` — Patch & Paint
- `FP-08` — Accessories
- `FP-09` — Glass (Sliding Door, Single Panel Partition, Low Iron Upgrade)
- `FP-10` — Stone
- `FP-11` — Site Prep / Management (Rough Materials, Project Management, Building Questions — HOA, Floor, Parking)

**Pricing structure প্রতিটিতে:**
`Builder Cost → 20% Markup → Client Price → 16.67% Margin → Profit`

এই data দিয়ে কী করতে চাও? Cost codes seed করতে চাও database-এ, নাকি অন্য কিছু?

---

accha eta mone rakho thika ache?

---

হ্যাঁ, এই conversation-এর মধ্যে মনে থাকবে। কিন্তু **নতুন conversation শুরু হলে এটা চলে যাবে।**

তাই safe থাকতে চাইলে —

- এই FP.md file টা `Downloads`-এ আছে, দরকার হলে আবার read করতে পারব
- অথবা আগের মতো conversation summary-তে add করে রাখতে পারো next session-এর শুরুতে

এখন কী করতে চাও এই FP data দিয়ে?

---

ekhon amader project er kivabe cost code create  kore egulo ki ki logic sob tumi grabe koro dorkar hole tumi frontend theke jhelakhe dashboard a costcode kivabe create kore segulor sob field theke jante paro tarpor tumi tarpor backend theke full details tajte paro database schema all read kore egulo poro C:\Users\Masud\Desktop\Projects\Softvence\tomerblackburn-backend

---

Let me read everything systematically.

---

সব পড়া হয়ে গেছে। এখন পুরো picture clear। এখানে সব কিছু summarize করছি:

---

## Cost Code System — Full Understanding

### Database Schema (CostCode model)

| Field | Type | Notes |
|---|---|---|
| `code` | String (unique) | e.g. `FP-01-00`, `FP-02-03` |
| `name` | String | Full title |
| `elies` | String? | Alias/display name in summary |
| `tips` | String[] | Helpful hints shown in estimator |
| `description` | String? | Detailed work description |
| `categoryId` | FK → CostCodeCategory | e.g. Demolition, Plumbing, Electric |
| `serviceId` | FK → Service | e.g. Four Piece bathroom |
| `basePrice` | Decimal | Builder cost |
| `markup` | Decimal | % (e.g. 20) |
| `clientPrice` | Decimal | Auto-calculated: `basePrice * (1 + markup/100)` |
| `unitType` | Enum | FIXED / PER_SQFT / PER_EACH / PER_LOT / PER_SET / PER_UPGRADE |
| `questionType` | Enum | WHITE/BLUE/GREEN/ORANGE/YELLOW/RED/PURPLE |
| `step` | Int | Estimator step (1, 2, 3...) |
| `displayOrder` | Int | Order within category |
| `isIncludedInBase` | Boolean | Included in base price |
| `requiresQuantity` | Boolean | User must enter qty |
| `isOptional` | Boolean | Can be toggled on/off |
| `isActive` | Boolean | Active/inactive |
| `excludeFromExport` | Boolean | Branch-only, not exported to Buildertrend |
| `parentCostCodeId` | FK → CostCode (self) | Nested question parent |
| `showWhenParentValue` | String? | `"true"` / `"false"` / `optionId` / `"ANY"` |
| `nestedInputType` | String? | `QUANTITY` / `DROPDOWN` / `CUSTOM_PRICE` / `NONE` |

---

### Question Types (UI behavior)
- **WHITE** — Fixed/assumed scope, no user interaction
- **BLUE** — Yes/No toggle (default: No), adds fixed price when Yes
- **GREEN** — Numeric data input (e.g. sq footage)
- **ORANGE** — Dropdown with preset options (has `CostCodeOption[]`)
- **YELLOW** — Conditional Yes/No (appears after previous Yes)
- **PURPLE** — Uses data from previous questions
- **RED** — Inactive/hidden placeholder

---

### FP.md → Cost Code Mapping

FP data structure: `FP-{category}-{index}` e.g. `FP-02-03`

| FP Category | Code Prefix | CostCodeCategory |
|---|---|---|
| Demolition | FP-01 | Demolition |
| Plumbing | FP-02 | Plumbing |
| Electric | FP-03 | Electric |
| HVAC | FP-04 | HVAC |
| Tile Install | FP-05 | Tile Install |
| Carpentry | FP-06 | Carpentry |
| Patch & Paint | FP-07 | Patch & Paint |
| Accessories | FP-08 | Accessories |
| Glass | FP-09 | Glass |
| Stone | FP-10 | Stone |
| Site Prep/Management | FP-11 | Management |

---

### Create Flow (Frontend → Backend)

1. **POST `/cost-codes`** — body হলো `CreateCostCodeDto`
2. Backend auto-calculates `clientPrice = basePrice * (1 + markup/100)` যদি না দেওয়া হয়
3. ORANGE type হলে আলাদাভাবে **POST `/cost-code-options/bulk`** call হয়
4. `ServiceCostCode` junction table-এ service-এর সাথে link হয়

---

এখন কী করতে চাও? FP.md-এর সব cost code গুলো **seed script** হিসেবে লিখে দিতে পারি backend-এ, অথবা অন্য কিছু?

---

ei summary ta tumi 
C:\Users\Masud\Desktop\Projects\Softvence\tomerblackburn-frontend\Documantation ekhane ekta .md file a likhe rakho to ekhon

---

Create the Documentation folder if it doesn't exist

---

```shell
if not exist "C:\Users\Masud\Desktop\Projects\Softvence\tomerblackburn-frontend\Documantation" mkdir "C:\Users\Masud\Desktop\Projects\Softvence\tomerblackburn-frontend\Documantation"
```

---

Create the cost-code-system.md documentation file in the Documentation folder

---

লেখা হয়ে গেছে! ফাইলটা এখানে আছে:

`Documantation/cost-code-system.md`

এতে আছে:
- Full database schema (সব field + notes)
- QuestionType ও UnitType enum details
- Related models (Category, Option, ServiceCostCode junction)
- সব API endpoints
- Frontend → Backend create flow
- FP.md category mapping + pricing structure
- Frontend ও Backend file locations
- Key business rules
- Project context (theme, stack, export target)

পরের session-এ শুধু এই file টা `@cost-code-system.md` দিয়ে context-এ add করলেই সব মনে থাকবে।

---

accha aso ekhon main context a main kaj a ekhon amak tumi dummay but real like kichu cost code bananor guide dao jekhane ami sob gulo rules llogic miliye mishiye cost code Question Parant child wihite blue orange yellow green purple sob kichu combination thakbe arki emon 5/10/20 ta costcode baniye dao to jate ami client ke dekhate pari sob kichu thakbe sob example thakle valo hoy arki . egulor content ar egulo add korar a - a guide dekhao jate korte pari , (ejonno tomake eto kichur context feed korlam)

bujhte perecho kikorte hobe?

---

হ্যাঁ, পুরোপুরি বুঝেছি! তুমি চাও —

একটা **realistic demo cost code set** যেখানে সব question type (WHITE, BLUE, GREEN, ORANGE, YELLOW, PURPLE), parent-child nesting, সব combination থাকবে — যেটা দিয়ে client-কে দেখাতে পারবে। সাথে **step-by-step guide** কিভাবে dashboard থেকে add করতে হবে।

আগে existing data একটু দেখি:

---

সব বুঝলাম। এখন পুরো guide + demo data লিখছি:

---

please continue

---

hi are you there please continue

---

হ্যাঁ আছি! লিখছি এখনই।

---

Create the demo cost codes guide with all question types, parent-child combinations, and step-by-step instructions

---

লেখা হয়ে গেছে! ফাইলটা এখানে সেভ হয়েছে:

`Documantation/demo-cost-codes-guide.md`

---

## কী কী আছে এই guide-এ:

**20টা realistic demo cost code** — সব type cover করা:

| # | Code | Type | Feature |
|---|---|---|---|
| 1-2 | FP-01-00, FP-01-01 | ⬜ WHITE | Always included, no interaction |
| 3-5 | FP-02-07, FP-03-15, FP-03-14 | 🔵 BLUE | Yes/No toggle add-ons |
| 6-7 | FP-05-15, FP-02-11 | 🟢 GREEN | Numeric input (sqft, units) |
| 8-11 | FP-02-00, FP-09-00, FP-04-00, FP-03-07 | 🟠 ORANGE | Dropdown with options |
| 12-14 | FP-02-BRANCH + children | 🔵→🟡 BLUE+YELLOW | Parent-child nesting |
| 15-16 | FP-05-18 + FP-05-17 | 🟢→🟣 GREEN+PURPLE | Quantity inheritance |
| 17-18 | FP-09-03 + FP-09-04 | 🔵→🟠 BLUE+ORANGE | Nested dropdown chain |
| 19-20 | FP-11-00, FP-11-02 | 🟠 ORANGE + ⬜ WHITE | Building type + PM |

সাথে আছে:
- **Step-by-step add করার guide** (7 steps)
- **Nesting rules table**
- **Pricing formula**
- **Client demo tips** — কোন order-এ দেখালে সবচেয়ে impressive হবে

---

accha onek sundor hoyeche ekhon ekta kaj koro seta hocche emon kore full cost code toiri korar full details baniye dao Documentation folder a

---

আগে FP.md এর পুরো data আরেকবার দেখি এবং existing documentation check করি:

---

এখন FP.md এর সব real data দিয়ে complete cost code creation file লিখছি:

---

ami seta boli nai ami bolechi je C:\Users\Masud\Desktop\Projects\Softvence\tomerblackburn-frontend\Documantation\demo-cost-codes-guide.md ekhane dekho sese kivabe cost code create kore setar moto kore details invidula ekta guide doc likhe dao seta bolechi

---


এখন `demo-cost-codes-guide.md` টা পড়ি আগে ভালো করে:

---


বুঝেছি এখন পুরোপুরি। তুমি চাইছ FP.md এর **সব real cost code** গুলো এই same format এ — মানে প্রতিটার জন্য individual detailed entry — একটা আলাদা doc এ। লিখছি:

---

Create the full FP cost code creation guide with every single cost code from FP.md in the same individual detailed format as demo-cost-codes-guide.md

---

You stopped your current work, please provide additional examples or ask another question.

---

are &#39;বুঝেছি এখন পুরোপুরি। তুমি চাইছ FP.md এর সব real cost code গুলো এই same format এ — মানে প্রতিটার জন্য individual detailed entry — একটা আলাদা doc এ। লিখছি:&#39;
eta boli nai to ufffffff.

ami bolechi amader project a je cost code create kora jay only cost code create korar full detaisl guide likhe dite shudhu FP er jonno na in general sob kichur jonno ovarall . ekta universal guide of cost code creation.


bujhte perecho?

---

বুঝেছি! তুমি চাইছ একটা **universal guide** — "কিভাবে এই system-এ cost code create করতে হয়" — সব field কী, কোনটা কখন use করতে হয়, কোন type কখন choose করতে হয়, nesting কিভাবে কাজ করে — সব কিছু মিলিয়ে একটা complete reference doc। FP specific না, general।

---

Create a universal cost code creation guide covering all fields, question types, nesting logic, and best practices

---


হয়ে গেছে! ফাইল সেভ হয়েছে:

`Documantation/cost-code-creation-guide.md`

---

এই guide-এ যা আছে:

- **Prerequisites** — Category আর Service আগে কিভাবে বানাতে হবে
- **প্রতিটা form field** — কী, কেন, কখন fill করতে হবে
- **প্রতিটা Question Type** (WHITE/BLUE/GREEN/ORANGE/YELLOW/PURPLE/RED) — আলাদা আলাদা করে কখন use করতে হবে, কী settings দিতে হবে, example সহ
- **Unit Type** — কোনটা কখন
- **Nested Question Settings** — সব values (`true`/`false`/`ANY`/`optionId`) explain করা
- **7টা complete workflow** — A থেকে G পর্যন্ত, প্রতিটা combination এর জন্য step-by-step
- **Quick Decision Guide** — flowchart style, কোন type কখন choose করবে
- **Common Mistakes** — কী ভুল হয় আর কিভাবে fix করতে হবে
- **Code naming convention** — FP/TP/TPS/TPT prefix rules
- **Pricing rules summary**

এটা FP specific না — যেকোনো bathroom type বা future service এর জন্য use করা যাবে।

---

evabe chai nai to ami uff ....
---

## Step-by-Step: How to Add These in the Dashboard

### Step 1 — Create Categories
1. Go to **Dashboard → Cost Management → Categories Tab**
2. Click **&quot;Add Category&quot;**
3. Fill in: Name, Slug, Step Number, Display Order
4. Click **Create**
5. Repeat for all 6 categories listed above

---

### Step 2 — Ensure Service Exists
1. Go to **Dashboard → Web → Services** (or Project Management)
2. Confirm **&quot;Four Piece&quot;** service exists
3. If not, create it under the correct Service Category and Project Type

---

### Step 3 — Add a Simple WHITE Cost Code (Example: #1)
1. Go to **Dashboard → Cost Management → Cost Codes Tab**
2. Click **&quot;Add Cost Code&quot;**
3. Select **Project Type** → Select **Service Category** → Select **Service** (Four Piece)
4. Select **Category** (Demolition)
5. Fill: Code = `FP-01-00`, Name = `Demolition`, Elies = `Demo Package`
6. Add Tips text
7. Base Price = `800`, Markup = `20` → Client Price auto-fills to `960`
8. Unit Type = `FIXED`, Question Type = `WHITE`
9. Step = `1`, Display Order = `1`
10. Check ✅ **Is Included In Base**, ✅ **Active**
11. Click **Create** ✅

---

### Step 4 — Add a BLUE Toggle Cost Code (Example: #3)
Same as Step 3, but:
- Question Type = `BLUE`
- Check ✅ **Is Optional**
- Do NOT check Is Included In Base

---

### Step 5 — Add an ORANGE Dropdown Cost Code (Example: #8)
1. Fill all fields as above
2. Question Type = `ORANGE`
3. Click **Create**
4. After creation, go to **Cost Code Options Tab**
5. Click **&quot;Add Option&quot;** for this cost code
6. Add each option: Name, Price Modifier, Is Default
7. Repeat for all options

---

### Step 6 — Add a PARENT + CHILD (Nesting) — Example: #12 + #13

**First, create the PARENT (#12):**
1. Add cost code `FP-02-BRANCH` with Question Type = `BLUE`
2. Check ✅ **Exclude From Export** (branch-only question)
3. Base Price = `0`
4. Click **Create**

**Then, create the CHILD (#13):**
1. Add cost code `FP-02-04` with Question Type = `YELLOW`
2. Scroll to **&quot;Nested Question Settings&quot;** section
3. **Parent Question** → select `FP-02-BRANCH - Are you relocating any plumbing?`
4. **Show When Parent Value** → type `true`
5. **Nested Input Type** → `NONE`
6. Click **Create** ✅

Now in the estimator: `FP-02-04` will only appear when user answers **Yes** to `FP-02-BRANCH`.

---

### Step 7 — Add PURPLE Child (Example: #16)
Same as Step 6, but:
- Question Type = `PURPLE`
- Show When Parent Value = `ANY`
- Nested Input Type = `QUANTITY`

This means: whenever the parent has ANY value entered, this child appears and uses the same quantity.

---

## Full Question Type Reference Card

| Color | Type | User Sees | When to Use |
|---|---|---|---|
| ⬜ WHITE | Informational | Fixed line item, no interaction | Always-included scope items |
| 🔵 BLUE | Yes/No Toggle | On/Off switch | Optional add-ons |
| 🟢 GREEN | Number Input | Enter a number (sqft, units) | Quantity-based pricing |
| 🟠 ORANGE | Dropdown | Pick from list | Tiered options (Standard/Premium) |
| 🟡 YELLOW | Conditional Yes/No | Appears after parent = Yes | Follow-up questions after a Yes |
| 🟣 PURPLE | Inherits from parent | Uses parent&#39;s value/quantity | Calculated upgrades based on prior answer |
| 🔴 RED | Hidden | Not shown | Placeholder / inactive |

---

## Parent-Child Nesting Rules

| Scenario | Parent Type | Child Type | Show When Parent Value |
|---|---|---|---|
| Follow-up after Yes/No | BLUE | YELLOW | `true` |
| Follow-up after No | BLUE | YELLOW | `false` |
| Follow-up after any answer | BLUE/GREEN | PURPLE | `ANY` |
| Follow-up after specific dropdown option | ORANGE | YELLOW/PURPLE | `{optionId}` (copy from DB) |
| Branch question (no export) | BLUE | any | `true` / `false` |

---

## Pricing Formula

```
Client Price = Base Price × (1 + Markup / 100)

Example:
  Base Price = $800
  Markup     = 20%
  Client Price = $800 × 1.20 = $960
  Profit     = $960 - $800 = $160  (16.67% margin)
```

`clientPrice` is **auto-calculated** by the backend when you save. You can also manually override it in the form.

---

## Tips for Client Demo

1. Start with **WHITE** codes to show &quot;always included&quot; scope
2. Toggle a **BLUE** code on/off to show live price update
3. Enter sqft in a **GREEN** code to show quantity-based pricing
4. Pick different options in an **ORANGE** dropdown to show tier pricing
5. Answer Yes to a **BLUE branch** question to reveal hidden **YELLOW** children
6. Show **PURPLE** child auto-calculating from parent&#39;s input
7. Show **Building Type ORANGE** (#19) to demonstrate how logistics costs are added
8. Show the **Exclude From Export** flag — explain it controls Buildertrend Excel output


erokom je guide seta cheyechi but full details a kono FP referance na bathromm referaence na global universel way te general way te cost code er full details guideline

understand?

---

বুঝেছি! `demo-cost-codes-guide.md` এর শেষের part — Step-by-Step, Reference Card, Nesting Rules, Pricing Formula — এই **same format এ** কিন্তু **FP/bathroom specific কিছু ছাড়া**, pure universal guide। লিখছি:

---

Create a universal cost code creation guide in the exact same format as the demo guide's step-by-step section but fully general with no FP/bathroom references

---


এইবার ঠিক হয়েছে! `Documantation/cost-code-creation-guide.md` সেভ হয়েছে।

**Same format** — demo guide এর মতোই step-by-step, tables, reference cards — কিন্তু:
- কোনো FP reference নেই
- কোনো bathroom specific example নেই
- পুরোটা **universal** — যেকোনো service, যেকোনো project type এর জন্য কাজ করবে

Structure:
- Step 1–14 → পুরো form fill করার guide
- ORANGE options কিভাবে add করতে হয়
- Question Type Reference Card
- Nesting Rules table
- Pricing Formula (simple + ORANGE)
- Quick Decision flowchart
- Common Mistakes table

---

 **@photo_2026-03-20_11-37-08.jpg** 

ekhane dekho to client abar ki bole egulo valo kore full breakdown kore bujhiye dao to ki ki bolte chay ar amra ki seta korte parbo naki.?

---


Client এর message টা পুরো পড়লাম। সব points breakdown করছি:

---

## Client এর Questions — Full Breakdown

### 1. 🏢 Building Type Pricing Logic

**Client বলছে:**
> "Building type selection should dynamically adjust the price from that **same dropdown** — not ask it once for pricing in the initial stage and then again later."

**মানে কী:**
Client চায় Building Type (Single Family / Townhome / High-Rise / HOA) একটাই জায়গায় থাকবে, সেখান থেকেই price adjust হবে। আলাদা করে দুইবার জিজ্ঞেস করা যাবে না।

**আমরা কি করতে পারব?**
✅ হ্যাঁ — এটা already ORANGE type দিয়ে করা যায়। Building Type = ORANGE dropdown, প্রতিটা option এ price modifier। একটাই cost code, একটাই dropdown। এটা already system এ possible।

---

### 2. 📄 PDF — Base Scope Details

**Client বলছে:**
> "The included base scope should be **described in detail** in the PDF — not just shown as $18,000. It should outline what's included (demolition, standard items etc). Two options:
> - Option A: Top section = included base scope + base price, then additional items below
> - Option B: Each category shows both included scope AND upgrade items together"

**মানে কী:**
এখন PDF এ শুধু total price দেখায়। Client চায় WHITE (included) items গুলো detail এ দেখাক — কী কী কাজ base price এ include আছে সেটা clearly লেখা থাকুক।

**আমরা কি করতে পারব?**
✅ হ্যাঁ — এটা PDF generator service এ change করতে হবে। `excludeFromExport = false` এবং `isIncludedInBase = true` এমন cost codes গুলো আলাদা section এ description সহ দেখানো যাবে। Backend এ `pdf-generator.service.ts` modify করতে হবে।

---

### 3. 💡 Tips Position

**Client বলছে:**
> "Can the tips section be moved **closer to the actual question mark** or placed at the **end of each question** instead of all the way off to the right side?"

**মানে কী:**
এখন TipsPopover (💡 icon) question এর একদম right side এ থাকে। Client চায় এটা question এর কাছাকাছি থাকুক — হয় question mark এর পাশে, অথবা question এর শেষে।

**আমরা কি করতে পারব?**
✅ হ্যাঁ — `CostCodeRenderer.tsx` এ TipsPopover এর position change করতে হবে। Simple CSS/layout change।

---

### 4. 📧 Automated Email Wording

**Client বলছে:**
> "Can I edit the wording of the automated email that gets sent once the user submits the form?"

**মানে কী:**
Submission হলে যে email যায়, সেটার text client নিজে edit করতে চায় dashboard থেকে।

**আমরা কি করতে পারব?**
✅ হ্যাঁ — কিন্তু এটা নতুন feature। এখন email template hardcoded আছে `email.service.ts` এ। Dashboard এ একটা "Email Template" settings page বানাতে হবে যেখানে client wording edit করতে পারবে। Medium কাজ।

---

### 5. 🔢 Relocate Plumbing → "2" কেন দেখাচ্ছে?

**Client বলছে:**
> "When relocate plumbing = Yes, I noticed the **number 2 was entered**. What does that represent? I expected it to show options like:
> - Toilet with a price
> - Shower or tub with a price
> - Sink/vanity with a price"

**মানে কী:**
Client দেখেছে "Relocate Plumbing?" = Yes দিলে একটা number input আসছে (value = 2)। কিন্তু সে চায় Yes দিলে **individual options** আসুক — Toilet, Shower, Sink — প্রতিটা আলাদা toggle বা dropdown হিসেবে।

**আমরা কি করতে পারব?**
✅ হ্যাঁ — এটা exactly আমাদের **parent-child nesting** দিয়ে করা যায়।

এখন যা আছে: Relocate Plumbing (BLUE parent) → একটা QUANTITY input child (সেটাই "2" দেখাচ্ছে)

Client যা চায়:
```
Relocate Plumbing? (BLUE parent, excludeFromExport)
  ↳ Relocate Toilet?     (YELLOW child, showWhen = true) → price
  ↳ Relocate Shower?     (YELLOW child, showWhen = true) → price
  ↳ Relocate Sink/Vanity? (YELLOW child, showWhen = true) → price
```

এটা cost code data change — code change না। Existing child cost code এর `nestedInputType` = `NONE` করতে হবে, আর প্রতিটা relocation item আলাদা YELLOW child হিসেবে add করতে হবে।

---

### 6. 🏷️ Alias Name (Elies) — Client বুঝছে না

**Client বলছে:**
> "Can you explain the alias name again? I'm still not fully following that part."

**মানে কী:**
`elies` field টা client এর কাছে unclear।

**Explanation যা দিতে পারো:**
> "The alias name is an optional short display name. In the estimator's floating price summary on the right side, instead of showing the full cost code name (e.g. 'Tile on Walls Outside of Wet Area'), it shows the shorter alias (e.g. 'Accent Wall Tile'). It's just for cleaner display — the full name still shows in the question itself."

---

## Summary — কোনটা কতটুকু কাজ

| # | Request | Possible? | Effort |
|---|---|---|---|
| 1 | Building type = single dropdown with price | ✅ Already possible | Data fix only |
| 2 | PDF base scope details | ✅ Yes | Medium — PDF service change |
| 3 | Tips position closer to question | ✅ Yes | Small — CSS/layout |
| 4 | Editable email template | ✅ Yes | Medium-Large — new feature |
| 5 | Relocate plumbing → individual options | ✅ Yes | Data fix — add YELLOW children |
| 6 | Alias name explanation | ✅ Just explain | No code needed |