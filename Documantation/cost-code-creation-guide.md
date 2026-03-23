# Cost Code Creation — Universal Guide

---

## Step-by-Step: How to Create a Cost Code

### Step 1 — Create a Cost Code Category (if not exists)
1. Go to **Dashboard → Cost Management → Categories Tab**
2. Click **"Add Category"**
3. Fill in the fields:
   - **Name** — e.g. `Plumbing`, `Electric`, `Tile Install`
   - **Slug** — lowercase, hyphenated version of name e.g. `tile-install`
   - **Step Number** — which estimator step this category belongs to (1, 2, or 3)
   - **Display Order** — controls sort order in the list
4. Click **Create**

---

### Step 2 — Ensure a Service Exists
1. Go to **Dashboard → Web → Services**
2. Confirm the service you want to link this cost code to exists
3. If not, create it under the correct **Service Category** and **Project Type**

> Every cost code must be linked to a Service. The Service is the "bathroom type" or "project type" (e.g. Four Piece, Three Piece).

---

### Step 3 — Open the Cost Code Form
1. Go to **Dashboard → Cost Management → Cost Codes Tab**
2. Click **"Add Cost Code"**

---

### Step 4 — Fill the Service Linking Fields
These are cascading dropdowns — fill them in order:

1. **Project Type** — select the top-level type (e.g. `Bathroom`)
2. **Service Category** — select the mid-level category (e.g. `Bathroom Renovation`)
3. **Service** — select the specific service this cost code belongs to
4. **Category** — select the cost code category (e.g. `Plumbing`, `Electric`)

---

### Step 5 — Fill the Identity Fields

| Field | Notes |
|---|---|
| **Code** | Unique identifier. Must be unique across ALL cost codes. e.g. `FP-02-07` |
| **Name** | Full descriptive title shown in admin |
| **Name Alias (Elies)** | Short display name shown in the floating price summary. Optional. If filled, this shows instead of Name. |

---

### Step 6 — Add Tips (Optional)
- Click **"+ Add Tip"** to add helpful hints shown to users in the estimator
- Each tip is a single sentence from the user's perspective
- Add as many as needed — one per line
- Example: `"You can relocate your toilet up to 6 feet within the bathroom."`

---

### Step 7 — Add Description (Optional)
- Internal detailed description of the work scope
- Not shown to end users — used for admin reference

---

### Step 8 — Fill Pricing Fields

| Field | Notes |
|---|---|
| **Base Price** | The builder/labor cost |
| **Markup (%)** | Percentage markup. Default is `20` |
| **Client Price** | Auto-calculated. Can be manually overridden. |

> Client Price auto-calculates as: `Base Price × (1 + Markup / 100)`

---

### Step 9 — Select Unit Type

| Unit Type | When to use |
|---|---|
| `FIXED` | One-time flat cost, no quantity needed |
| `PER_SQFT` | Price × square footage entered by user |
| `PER_EACH` | Price × number of units entered by user |
| `PER_LOT` | Price per lot |
| `PER_SET` | Price per set |
| `PER_UPGRADE` | Price per upgrade selection |

> If Unit Type is anything other than `FIXED`, also check ✅ **Requires Quantity**

---

### Step 10 — Select Question Type

This controls how the cost code appears and behaves in the estimator. See the **Question Type Reference Card** below.

---

### Step 11 — Fill Step Number & Display Order

| Field | Notes |
|---|---|
| **Step Number** | Which estimator step this appears in (1, 2, or 3) |
| **Display Order** | Sort order within the category. Lower = appears first. Use gaps (10, 20, 30) so you can insert items later. |

---

### Step 12 — Nested Question Settings (Only for child questions)

Skip this section if this is a top-level (parent) question.

If this cost code should only appear based on another question's answer:

1. **Parent Question** — select the parent cost code from the dropdown
2. **Show When Parent Value** — the condition that triggers this child (see Nesting Rules below)
3. **Nested Input Type** — how the user interacts with this child

---

### Step 13 — Check the Flags

| Checkbox | When to check |
|---|---|
| ✅ **Is Included In Base** | WHITE items that are always part of the base price |
| ✅ **Requires Quantity** | GREEN items — user must enter a number |
| ✅ **Is Optional** | BLUE, YELLOW, GREEN, ORANGE items the user can toggle |
| ✅ **Is Active** | Always check unless it's a placeholder |
| ✅ **Branch Only (Exclude From Export)** | BLUE branch questions with Base Price = `0` — shown in estimator but NOT exported to Buildertrend |

---

### Step 14 — Save

Click **Create** (or **Update** if editing).

For **ORANGE** type: after saving, go to **Cost Code Options Tab** and add the dropdown options.

---

## Adding Options for ORANGE Type

After creating an ORANGE cost code:

1. Go to **Cost Management → Cost Code Options Tab**
2. Click **"Add Option"**
3. Select the cost code
4. Fill:
   - **Option Name** — display label e.g. `Standard`, `Premium`, `Matte Black`
   - **Price Modifier** — amount added to base price. Can be `0`, positive, or negative.
   - **Display Order** — sort order
   - **Is Default** — ✅ check for the pre-selected option
5. Click **Create**
6. Repeat for each option

> Or: when Question Type = `ORANGE` is selected in the form, an inline options section appears at the bottom — you can add options before saving.

> ⚠️ Always set one option as **Is Default = true**

---

## Question Type Reference Card

| Type | Color | User Sees | When to Use |
|---|---|---|---|
| `WHITE` | ⬜ White | Fixed line item, no interaction | Always-included scope items |
| `BLUE` | 🔵 Blue | Yes/No toggle switch | Optional add-ons, branch questions |
| `GREEN` | 🟢 Green | Number input field | Quantity-based pricing (sqft, units) |
| `ORANGE` | 🟠 Orange | Dropdown list | Tiered options (Standard / Premium) |
| `YELLOW` | 🟡 Yellow | Appears after parent = Yes | Follow-up questions after a Yes answer |
| `PURPLE` | 🟣 Purple | Inherits parent's value | Calculated upgrades based on prior answer |
| `RED` | 🔴 Red | Not shown | Placeholder / inactive |

---

## Parent-Child Nesting Rules

| Scenario | Parent Type | Child Type | Show When Parent Value |
|---|---|---|---|
| Show after parent toggled Yes | `BLUE` | `YELLOW` | `true` |
| Show after parent toggled No | `BLUE` | `YELLOW` | `false` |
| Show after parent has any value | `BLUE` / `GREEN` | `PURPLE` | `ANY` |
| Show after specific dropdown option selected | `ORANGE` | `YELLOW` / `PURPLE` | `{optionId}` — copy from DB |
| Branch question (no cost, no export) | `BLUE` | any | `true` / `false` |

**Nested Input Type values:**

| Value | Meaning |
|---|---|
| `NONE` | No extra input — child is a simple toggle |
| `QUANTITY` | Child inherits the parent's quantity value |
| `DROPDOWN` | Child shows its own dropdown |
| `CUSTOM_PRICE` | Child allows a custom price entry |

> ⚠️ Always create the **parent first**, then create the child and link it.

---

## Pricing Formula

```
Client Price = Base Price × (1 + Markup / 100)

Example:
  Base Price   = $800
  Markup       = 20%
  Client Price = $800 × 1.20 = $960
  Profit       = $960 - $800 = $160  (16.67% margin)
```

`clientPrice` is auto-calculated by the backend when you save. You can manually override it in the form.

For **ORANGE** type:
```
Final Price = Base Price + selected option's Price Modifier

Example:
  Base Price = $3,600
  Option "Standard"  → modifier $0   → total $3,600
  Option "Premium"   → modifier $800 → total $4,400
  Option "Budget"    → modifier -$400 → total $3,200
```

---

## Quick Decision — Which Question Type?

```
Is this work always included, no user choice?
→ WHITE

Does the user turn it on or off?
→ BLUE
  → Also reveals sub-questions? → BLUE (parent) + YELLOW or PURPLE (children)
  → No cost, just branching? → BLUE + Exclude From Export ✅ + Base Price = 0

Does the user enter a number (sqft, units, etc.)?
→ GREEN + Requires Quantity ✅ + Unit Type = PER_SQFT or PER_EACH

Does the user pick from a list?
→ ORANGE + add options after creating

Should this only appear after a Yes answer?
→ YELLOW (child of BLUE, Show When Parent Value = true)

Should this inherit quantity from a previous question?
→ PURPLE (child of GREEN or BLUE, Show When Parent Value = ANY)

Not ready yet / placeholder?
→ RED + Is Active ❌
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Creating a child before the parent | Always create parent first |
| ORANGE type with no options | Add at least one option after creating |
| GREEN type without Requires Quantity | Check ✅ Requires Quantity |
| GREEN type with Unit Type = FIXED | Change to PER_SQFT or PER_EACH |
| Duplicate code | Each code must be unique — check existing codes first |
| Branch question with a price | Branch questions should have Base Price = `0` |
| No default option on ORANGE | Always set one option as Is Default = true |
| Show When Parent Value left blank on a child | Must fill — `true`, `false`, or `ANY` |
| Forgetting Exclude From Export on branch questions | Check ✅ Branch Only for questions that only control logic |
