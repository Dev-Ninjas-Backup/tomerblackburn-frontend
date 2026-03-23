# Demo Cost Codes — Full Guide for Client Presentation

This guide contains **20 realistic demo cost codes** covering every question type (WHITE, BLUE, GREEN, ORANGE, YELLOW, PURPLE), parent-child nesting, and all major combinations. Use this to demonstrate the full power of the estimator system to the client.

---

## Prerequisites — Create These First

Before adding cost codes, you need these to exist in the system:

### 1. Cost Code Categories (Dashboard → Cost Management → Categories Tab)

| Name | Slug | Step Number | Display Order |
|---|---|---|---|
| Demolition | `demolition` | 1 | 1 |
| Plumbing | `plumbing` | 1 | 2 |
| Electric | `electric` | 2 | 3 |
| Tile Install | `tile-install` | 2 | 4 |
| Glass | `glass` | 3 | 5 |
| Management | `management` | 3 | 6 |

### 2. Service (Bathroom Type)
Make sure **"Four Piece"** service exists under a Service Category (e.g. "Bathroom Renovation") linked to a Project Type (e.g. "Bathroom").

---

## The 20 Demo Cost Codes

---

### 🟤 GROUP 1 — WHITE (Assumed Scope, No User Interaction)

---

#### #1 — Standard Demolition Package
> **Type**: WHITE | Informational only, always included, no user choice

| Field | Value |
|---|---|
| **Code** | `FP-01-00` |
| **Name** | `Demolition` |
| **Elies** | `Demo Package` |
| **Category** | Demolition |
| **Service** | Four Piece |
| **Question Type** | `WHITE` |
| **Base Price** | `800` |
| **Markup** | `20` |
| **Client Price** | `960` (auto-calculated) |
| **Unit Type** | `FIXED` |
| **Step** | `1` |
| **Display Order** | `1` |
| **Is Included In Base** | ✅ Yes |
| **Is Active** | ✅ Yes |
| **Tips** | `Existing toilet, floor tile, tub/shower surrounds, and vanity will all be removed.` |
| **Description** | `Remove existing toilet, floor tile, tub/shower surrounds including tile and backer, vanity and disconnect plumbing, and all accessories.` |

**How to add**: Dashboard → Cost Management → Cost Codes → Add Cost Code → fill fields above → Create

---

#### #2 — Waste Removal
> **Type**: WHITE | Always included in scope

| Field | Value |
|---|---|
| **Code** | `FP-01-01` |
| **Name** | `Waste Removal` |
| **Elies** | `Debris Disposal` |
| **Category** | Demolition |
| **Service** | Four Piece |
| **Question Type** | `WHITE` |
| **Base Price** | `1200` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `1` |
| **Display Order** | `2` |
| **Is Included In Base** | ✅ Yes |
| **Tips** | `All construction debris is safely hauled away off-site throughout the project.` |
| **Description** | `Safely and properly haul away and dispose of all construction debris off-site throughout the project.` |

---

### 🔵 GROUP 2 — BLUE (Yes/No Toggle)

---

#### #3 — Relocate Toilet
> **Type**: BLUE | User toggles Yes/No. If Yes → adds $960 to estimate.

| Field | Value |
|---|---|
| **Code** | `FP-02-07` |
| **Name** | `Relocate Toilet` |
| **Elies** | `Toilet Relocation` |
| **Category** | Plumbing |
| **Service** | Four Piece |
| **Question Type** | `BLUE` |
| **Base Price** | `800` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `1` |
| **Display Order** | `10` |
| **Is Optional** | ✅ Yes |
| **Tips** | `We can relocate your toilet up to 6 feet within the bathroom. Additional costs may apply for concrete subfloors.` |
| **Description** | `Relocate toilet within existing bathroom up to 6 feet. Patch subfloor after plumbing relocation is completed.` |

---

#### #4 — Heated Floors
> **Type**: BLUE | Premium add-on toggle

| Field | Value |
|---|---|
| **Code** | `FP-03-15` |
| **Name** | `Heated Floors` |
| **Elies** | `In-Floor Heating` |
| **Category** | Electric |
| **Service** | Four Piece |
| **Question Type** | `BLUE` |
| **Base Price** | `2200` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `2` |
| **Display Order** | `20` |
| **Is Optional** | ✅ Yes |
| **Tips** | `Includes Schluter Ditra-Heat system with programmable thermostat. Final price may vary based on floor area and subfloor conditions.` |
| **Description** | `Install new dedicated electrical circuit, Schluter Ditra-Heat uncoupling membrane and cable system, and standard programmable thermostat.` |

---

#### #5 — LED Mirror
> **Type**: BLUE | Optional upgrade

| Field | Value |
|---|---|
| **Code** | `FP-03-14` |
| **Name** | `LED Mirror` |
| **Elies** | `Backlit Mirror` |
| **Category** | Electric |
| **Service** | Four Piece |
| **Question Type** | `BLUE` |
| **Base Price** | `300` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `2` |
| **Display Order** | `21` |
| **Is Optional** | ✅ Yes |
| **Tips** | `Hardwired LED mirror installation. Final price may vary based on wall construction and distance to power source.` |

---

### 🟢 GROUP 3 — GREEN (Numeric Input — User Enters a Number)

---

#### #6 — Wall Tile Outside Wet Area
> **Type**: GREEN | User enters square footage → price = sqft × $25

| Field | Value |
|---|---|
| **Code** | `FP-05-15` |
| **Name** | `Tile on Walls Outside Wet Area` |
| **Elies** | `Accent Wall Tile` |
| **Category** | Tile Install |
| **Service** | Four Piece |
| **Question Type** | `GREEN` |
| **Base Price** | `25` |
| **Markup** | `20` |
| **Unit Type** | `PER_SQFT` |
| **Step** | `2` |
| **Display Order** | `30` |
| **Requires Quantity** | ✅ Yes |
| **Is Optional** | ✅ Yes |
| **Tips** | `Enter the total square footage of wall area outside the shower/tub that you want tiled (e.g. behind vanity, toilet wall, accent walls).` |
| **Description** | `Install tile on selected walls outside the shower or tub area. Applies RedGard waterproofing membrane prior to tile installation.` |

---

#### #7 — Body Sprays
> **Type**: GREEN | User enters number of spray units → price = units × $600

| Field | Value |
|---|---|
| **Code** | `FP-02-11` |
| **Name** | `Body Sprays` |
| **Elies** | `Shower Body Jets` |
| **Category** | Plumbing |
| **Service** | Four Piece |
| **Question Type** | `GREEN` |
| **Base Price** | `600` |
| **Markup** | `20` |
| **Unit Type** | `PER_EACH` |
| **Step** | `1` |
| **Display Order** | `15` |
| **Requires Quantity** | ✅ Yes |
| **Is Optional** | ✅ Yes |
| **Tips** | `Enter the number of body spray units you want installed. Each unit includes rough plumbing, diverter/mixing valve, and finish trim.` |

---

### 🟠 GROUP 4 — ORANGE (Dropdown — User Picks from Options)

---

#### #8 — Tub Selection
> **Type**: ORANGE | User picks tub type from dropdown. Each option has a different price.

| Field | Value |
|---|---|
| **Code** | `FP-02-00` |
| **Name** | `Tub Selection` |
| **Elies** | `Bathtub Type` |
| **Category** | Plumbing |
| **Service** | Four Piece |
| **Question Type** | `ORANGE` |
| **Base Price** | `3600` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `1` |
| **Display Order** | `5` |
| **Tips** | `Choose the type of tub you'd like installed. Alcove is standard. Drop-in and Freestanding are premium upgrades.` |

**Options to add after creating** (Dashboard → Cost Code Options):

| Option Name | Price Modifier | Is Default |
|---|---|---|
| `Alcove Tub (Standard)` | `0` | ✅ Yes |
| `Drop-in Tub` | `500` | No |
| `Freestanding Tub` | `800` | No |

---

#### #9 — Glass Door Selection
> **Type**: ORANGE | User picks glass door style

| Field | Value |
|---|---|
| **Code** | `FP-09-00` |
| **Name** | `Glass Door Selection` |
| **Elies** | `Shower Glass` |
| **Category** | Glass |
| **Service** | Four Piece |
| **Question Type** | `ORANGE` |
| **Base Price** | `1750` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `3` |
| **Display Order** | `40` |
| **Tips** | `Standard is a frameless hinged door with stationary panel. Sliding door is a premium upgrade. Single panel gives a minimalist open-entry look.` |

**Options:**

| Option Name | Price Modifier | Is Default |
|---|---|---|
| `Frameless Hinged Door + Panel` | `0` | ✅ Yes |
| `Sliding Door Upgrade` | `600` | No |
| `Single Panel (No Door)` | `-400` | No |

---

#### #10 — Exhaust Fan Replacement
> **Type**: ORANGE | User picks fan type

| Field | Value |
|---|---|
| **Code** | `FP-04-00` |
| **Name** | `Exhaust Fan Replacement` |
| **Elies** | `Bathroom Fan` |
| **Category** | Electric |
| **Service** | Four Piece |
| **Question Type** | `ORANGE` |
| **Base Price** | `250` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `2` |
| **Display Order** | `25` |
| **Tips** | `Choose the type of exhaust fan. Fan with light is the most popular option.` |

**Options:**

| Option Name | Price Modifier | Is Default |
|---|---|---|
| `Replace Fan (No Light)` | `0` | ✅ Yes |
| `Replace Fan (With Light)` | `0` | No |
| `Replace Fan (No Light → With Light)` | `100` | No |

---

#### #11 — Recessed Can Size
> **Type**: ORANGE | User picks can size for new install

| Field | Value |
|---|---|
| **Code** | `FP-03-07` |
| **Name** | `Install New Recessed Can` |
| **Elies** | `Pot Light Install` |
| **Category** | Electric |
| **Service** | Four Piece |
| **Question Type** | `ORANGE` |
| **Base Price** | `250` |
| **Markup** | `20` |
| **Unit Type** | `PER_EACH` |
| **Step** | `2` |
| **Display Order** | `22` |
| **Requires Quantity** | ✅ Yes |
| **Is Optional** | ✅ Yes |
| **Tips** | `Enter the number of recessed cans you want installed, then select the size. 6" is most common for bathrooms.` |

**Options:**

| Option Name | Price Modifier | Is Default |
|---|---|---|
| `6" Recessed Can` | `0` | ✅ Yes |
| `4" Recessed Can` | `50` | No |
| `2" Recessed Can` | `100` | No |

---

### 🟡 GROUP 5 — YELLOW (Conditional — Appears After Parent = Yes)

> YELLOW questions are **children** of BLUE parents. They only appear when the user answers "Yes" to the parent question.

---

#### #12 — PARENT: Relocate Plumbing? (Branch Question)
> **Type**: BLUE | `excludeFromExport = true` — this is a branching question only, not exported

| Field | Value |
|---|---|
| **Code** | `FP-02-BRANCH` |
| **Name** | `Are you relocating any plumbing?` |
| **Category** | Plumbing |
| **Service** | Four Piece |
| **Question Type** | `BLUE` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Unit Type** | `FIXED` |
| **Step** | `1` |
| **Display Order** | `8` |
| **Exclude From Export** | ✅ Yes (Branch only) |
| **Tips** | `Answer Yes if you want to move the location of your shower, tub, sink, or toilet.` |

---

#### #13 — CHILD: Relocate Shower (appears when parent = Yes)
> **Type**: YELLOW | Child of `FP-02-BRANCH`, shows when parent = `true`

| Field | Value |
|---|---|
| **Code** | `FP-02-04` |
| **Name** | `Relocate Shower` |
| **Elies** | `Shower Relocation` |
| **Category** | Plumbing |
| **Service** | Four Piece |
| **Question Type** | `YELLOW` |
| **Base Price** | `1200` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `1` |
| **Display Order** | `9` |
| **Is Optional** | ✅ Yes |
| **Parent Cost Code** | `FP-02-BRANCH` (select from dropdown) |
| **Show When Parent Value** | `true` |
| **Nested Input Type** | `NONE` |
| **Tips** | `We can relocate your shower drain and water supply within 6 feet. Not available in high-rise buildings with concrete subfloors.` |

---

#### #14 — CHILD: Relocate Sink/Vanity (appears when parent = Yes)
> **Type**: YELLOW | Child of `FP-02-BRANCH`, shows when parent = `true`

| Field | Value |
|---|---|
| **Code** | `FP-02-06` |
| **Name** | `Relocate Sink / Vanity` |
| **Elies** | `Vanity Relocation` |
| **Category** | Plumbing |
| **Service** | Four Piece |
| **Question Type** | `YELLOW` |
| **Base Price** | `700` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `1` |
| **Display Order** | `11` |
| **Is Optional** | ✅ Yes |
| **Parent Cost Code** | `FP-02-BRANCH` |
| **Show When Parent Value** | `true` |
| **Nested Input Type** | `NONE` |
| **Tips** | `Sink/vanity can be relocated within 6 feet. Additional costs may apply if walls are concrete or plaster.` |

---

### 🟣 GROUP 6 — PURPLE (Uses Data from Previous Question)

> PURPLE questions are children that **inherit or calculate from** a parent's answer (e.g. quantity entered in a GREEN question).

---

#### #15 — PARENT: Specialty Tile Design Upgrade (GREEN — user enters sqft)
> **Type**: GREEN | Parent question — user enters sqft of specialty tile area

| Field | Value |
|---|---|
| **Code** | `FP-05-18` |
| **Name** | `Specialty Tile Design` |
| **Elies** | `Custom Tile Pattern` |
| **Category** | Tile Install |
| **Service** | Four Piece |
| **Question Type** | `GREEN` |
| **Base Price** | `15` |
| **Markup** | `20` |
| **Unit Type** | `PER_SQFT` |
| **Step** | `2` |
| **Display Order** | `32` |
| **Requires Quantity** | ✅ Yes |
| **Is Optional** | ✅ Yes |
| **Tips** | `Enter the square footage of area where you want a specialty pattern (herringbone, chevron, basketweave, diagonal, mosaic inlays, Versailles).` |

---

#### #16 — CHILD: Natural Stone Sealing Upgrade (PURPLE — uses parent sqft)
> **Type**: PURPLE | Child of `FP-05-18`, shows when parent = `ANY`, uses same sqft

| Field | Value |
|---|---|
| **Code** | `FP-05-17` |
| **Name** | `Natural Stone Upgrade` |
| **Elies** | `Stone Sealing` |
| **Category** | Tile Install |
| **Service** | Four Piece |
| **Question Type** | `PURPLE` |
| **Base Price** | `5` |
| **Markup** | `20` |
| **Unit Type** | `PER_SQFT` |
| **Step** | `2` |
| **Display Order** | `33` |
| **Is Optional** | ✅ Yes |
| **Parent Cost Code** | `FP-05-18` |
| **Show When Parent Value** | `ANY` |
| **Nested Input Type** | `QUANTITY` |
| **Tips** | `If using natural stone (marble, travertine, slate, limestone), this covers sealing and unsanded grout. Client is responsible for ongoing resealing.` |

---

### 🔗 GROUP 7 — ORANGE PARENT + YELLOW/PURPLE CHILDREN (Full Nesting Chain)

---

#### #17 — PARENT: Low Iron Glass Upgrade? (BLUE)
> **Type**: BLUE | Parent — user toggles if they want low iron glass

| Field | Value |
|---|---|
| **Code** | `FP-09-03` |
| **Name** | `Low Iron Glass Upgrade` |
| **Elies** | `Ultra-Clear Glass` |
| **Category** | Glass |
| **Service** | Four Piece |
| **Question Type** | `BLUE` |
| **Base Price** | `600` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `3` |
| **Display Order** | `41` |
| **Is Optional** | ✅ Yes |
| **Tips** | `Low iron glass provides enhanced clarity and a cleaner, more transparent look — especially beautiful with light tile or stone. Applies to Door+Panel or Sliding Door.` |

---

#### #18 — CHILD: Hardware Finish Selection (ORANGE — appears when Low Iron = Yes)
> **Type**: ORANGE | Child of `FP-09-03`, shows when parent = `true`

| Field | Value |
|---|---|
| **Code** | `FP-09-04` |
| **Name** | `Hardware Finish Selection` |
| **Elies** | `Glass Hardware Finish` |
| **Category** | Glass |
| **Service** | Four Piece |
| **Question Type** | `ORANGE` |
| **Base Price** | `0` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `3` |
| **Display Order** | `42` |
| **Parent Cost Code** | `FP-09-03` |
| **Show When Parent Value** | `true` |
| **Nested Input Type** | `DROPDOWN` |
| **Tips** | `Select your preferred hardware finish for the glass door handles and mounting hardware.` |

**Options:**

| Option Name | Price Modifier | Is Default |
|---|---|---|
| `Brushed Nickel` | `0` | ✅ Yes |
| `Matte Black` | `150` | No |
| `Polished Chrome` | `0` | No |
| `Brushed Gold` | `200` | No |

---

### 🏢 GROUP 8 — BUILDING QUESTIONS (Management / Site Prep)

---

#### #19 — Building Type Selection (ORANGE — affects logistics cost)
> **Type**: ORANGE | User selects building type — price modifier added to estimate

| Field | Value |
|---|---|
| **Code** | `FP-11-00` |
| **Name** | `Building Type` |
| **Elies** | `Property Type` |
| **Category** | Management |
| **Service** | Four Piece |
| **Question Type** | `ORANGE` |
| **Base Price** | `0` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `3` |
| **Display Order** | `50` |
| **Tips** | `Select your building type. High-rise buildings and HOA properties may require additional coordination, access logistics, and working hour restrictions.` |

**Options:**

| Option Name | Price Modifier | Is Default |
|---|---|---|
| `Single-Family Home (No HOA)` | `0` | ✅ Yes |
| `Townhome or Low-Rise Condo (1–4 stories)` | `500` | No |
| `High-Rise Building (5+ stories)` | `1000` | No |
| `Home with HOA or Architectural Review` | `500` | No |

---

#### #20 — Project Management (WHITE — always included)
> **Type**: WHITE | Always included, no user interaction

| Field | Value |
|---|---|
| **Code** | `FP-11-02` |
| **Name** | `Project Management` |
| **Elies** | `PM & Coordination` |
| **Category** | Management |
| **Service** | Four Piece |
| **Question Type** | `WHITE` |
| **Base Price** | `4000` |
| **Markup** | `20` |
| **Unit Type** | `FIXED` |
| **Step** | `3` |
| **Display Order** | `52` |
| **Is Included In Base** | ✅ Yes |
| **Tips** | `Includes full project coordination: material orders, deliveries, site visits, quality checks, and client communication throughout the project.` |
| **Description** | `Confirm scope and design details, coordinate all material orders and deliveries, conduct site visits to monitor progress, ensure quality, and communicate with client throughout the project.` |

---

## Step-by-Step: How to Add These in the Dashboard

### Step 1 — Create Categories
1. Go to **Dashboard → Cost Management → Categories Tab**
2. Click **"Add Category"**
3. Fill in: Name, Slug, Step Number, Display Order
4. Click **Create**
5. Repeat for all 6 categories listed above

---

### Step 2 — Ensure Service Exists
1. Go to **Dashboard → Web → Services** (or Project Management)
2. Confirm **"Four Piece"** service exists
3. If not, create it under the correct Service Category and Project Type

---

### Step 3 — Add a Simple WHITE Cost Code (Example: #1)
1. Go to **Dashboard → Cost Management → Cost Codes Tab**
2. Click **"Add Cost Code"**
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
5. Click **"Add Option"** for this cost code
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
2. Scroll to **"Nested Question Settings"** section
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
| 🟣 PURPLE | Inherits from parent | Uses parent's value/quantity | Calculated upgrades based on prior answer |
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

1. Start with **WHITE** codes to show "always included" scope
2. Toggle a **BLUE** code on/off to show live price update
3. Enter sqft in a **GREEN** code to show quantity-based pricing
4. Pick different options in an **ORANGE** dropdown to show tier pricing
5. Answer Yes to a **BLUE branch** question to reveal hidden **YELLOW** children
6. Show **PURPLE** child auto-calculating from parent's input
7. Show **Building Type ORANGE** (#19) to demonstrate how logistics costs are added
8. Show the **Exclude From Export** flag — explain it controls Buildertrend Excel output
