# 🎯 Nested Questions Implementation Guide

## Overview
এই system এ একটা question এর উত্তরের উপর ভিত্তি করে আরো questions show করা যাবে। যেমন BLUE question এ Yes করলে তার নিচে GREEN/ORANGE/Custom Price input দেখাবে।

---

## 📋 Database Schema Changes Needed

Backend এ `CostCode` table এ নতুন fields লাগবে:

```prisma
model CostCode {
  // ... existing fields
  
  // Nested Question Fields
  parentCostCodeId    String?   // যে question এর উপর depend করবে
  showWhenParentValue String?   // Parent এর কোন value তে show হবে (true/false/optionId)
  nestedInputType     String?   // QUANTITY, DROPDOWN, CUSTOM_PRICE, NONE
  
  // Relations
  parentCostCode      CostCode?  @relation("NestedQuestions", fields: [parentCostCodeId], references: [id])
  childCostCodes      CostCode[] @relation("NestedQuestions")
}
```

---

## 🎨 Use Cases & Examples

### Use Case 1: BLUE → GREEN (Toggle → Number Input)
**Scenario**: Wall tile removal করবেন? Yes → কত sqft?

```typescript
// Parent Question (BLUE)
{
  id: "cc-1",
  name: "Wall tile removal?",
  questionType: "BLUE",
  clientPrice: 0,
  // ... other fields
}

// Child Question (GREEN)
{
  id: "cc-2",
  name: "Enter sqft of tile",
  questionType: "GREEN",
  unitType: "PER_SQFT",
  clientPrice: 5.50,
  parentCostCodeId: "cc-1",
  showWhenParentValue: "true",  // Parent এ Yes হলে show হবে
  nestedInputType: "QUANTITY"
}
```

**User Experience**:
1. User "Wall tile removal?" toggle করে Yes করল
2. Automatically নিচে "Enter sqft of tile" input field show হবে
3. User 100 sqft লিখল
4. Total: 100 × $5.50 = $550

---

### Use Case 2: BLUE → ORANGE (Toggle → Dropdown)
**Scenario**: Recessed cans install করবেন? Yes → Size select করুন

```typescript
// Parent Question (BLUE)
{
  id: "cc-3",
  name: "Install recessed cans?",
  questionType: "BLUE",
  clientPrice: 0
}

// Child Question (ORANGE)
{
  id: "cc-4",
  name: "Select can size",
  questionType: "ORANGE",
  parentCostCodeId: "cc-3",
  showWhenParentValue: "true",
  nestedInputType: "DROPDOWN",
  options: [
    { optionName: "6 inch", priceModifier: 150 },
    { optionName: "4 inch", priceModifier: 120 },
    { optionName: "2 inch", priceModifier: 100 }
  ]
}
```

**User Experience**:
1. User "Install recessed cans?" toggle করে Yes করল
2. Dropdown show হবে size select করার জন্য
3. User "6 inch" select করল
4. Price: $150

---

### Use Case 3: BLUE → ORANGE → GREEN (Multi-level Nested)
**Scenario**: Recessed cans → Size → Quantity

```typescript
// Level 1: Parent (BLUE)
{
  id: "cc-5",
  name: "Install recessed cans?",
  questionType: "BLUE"
}

// Level 2: Child (ORANGE)
{
  id: "cc-6",
  name: "Select can size",
  questionType: "ORANGE",
  parentCostCodeId: "cc-5",
  showWhenParentValue: "true",
  options: [...]
}

// Level 3: Grandchild (GREEN)
{
  id: "cc-7",
  name: "How many cans? (1-6)",
  questionType: "GREEN",
  unitType: "PER_EACH",
  clientPrice: 150,
  parentCostCodeId: "cc-6",
  showWhenParentValue: "ANY",  // যেকোনো option select হলেই show হবে
  nestedInputType: "QUANTITY"
}
```

**User Experience**:
1. Toggle Yes → Size dropdown show হবে
2. Size select করল → Quantity input show হবে
3. Quantity 4 লিখল → Total: 4 × $150 = $600

---

### Use Case 4: BLUE → CUSTOM_PRICE
**Scenario**: Custom upgrade? Yes → Custom price enter করুন

```typescript
// Parent (BLUE)
{
  id: "cc-8",
  name: "Custom upgrade needed?",
  questionType: "BLUE"
}

// Child (Custom Price Input)
{
  id: "cc-9",
  name: "Enter custom price",
  questionType: "GREEN",
  parentCostCodeId: "cc-8",
  showWhenParentValue: "true",
  nestedInputType: "CUSTOM_PRICE"
}
```

---

### Use Case 5: ORANGE → GREEN (Dropdown → Quantity)
**Scenario**: LED Mirror select করুন → কয়টা লাগবে?

```typescript
// Parent (ORANGE)
{
  id: "cc-10",
  name: "Select mirror type",
  questionType: "ORANGE",
  options: [
    { id: "opt-1", optionName: "LED Mirror", priceModifier: 500 },
    { id: "opt-2", optionName: "Recessed Mirror", priceModifier: 600 }
  ]
}

// Child (GREEN)
{
  id: "cc-11",
  name: "How many mirrors? (1-2)",
  questionType: "GREEN",
  unitType: "PER_EACH",
  parentCostCodeId: "cc-10",
  showWhenParentValue: "opt-1",  // শুধু LED Mirror select হলে show হবে
  nestedInputType: "QUANTITY"
}
```

---

## 🔧 Frontend Implementation

### Step 1: Update Types

```typescript
// types/cost-management.types.ts
export interface CostCode {
  // ... existing fields
  parentCostCodeId?: string;
  showWhenParentValue?: string;
  nestedInputType?: 'QUANTITY' | 'DROPDOWN' | 'CUSTOM_PRICE' | 'NONE';
}
```

### Step 2: Update CostCodeRenderer Logic

```typescript
// Check if nested question should be visible
const shouldShowNestedQuestion = (costCode: CostCode): boolean => {
  if (!costCode.parentCostCodeId) return true;
  
  const parentSelection = getSelection(costCode.parentCostCodeId);
  if (!parentSelection) return false;
  
  // Parent is BLUE (toggle)
  if (costCode.showWhenParentValue === "true") {
    return parentSelection.isEnabled === true;
  }
  
  // Parent is ORANGE (dropdown)
  if (costCode.showWhenParentValue === "ANY") {
    return !!parentSelection.selectedOptionId;
  }
  
  // Specific option selected
  return parentSelection.selectedOptionId === costCode.showWhenParentValue;
};
```

---

## 📊 Dropdown Ranges (Requirements থেকে)

```typescript
const DROPDOWN_RANGES = {
  LED_MIRROR: { min: 1, max: 2 },
  RECESSED_MIRROR: { min: 1, max: 2 },
  RECESSED_CANS: { min: 1, max: 6 },
  WALLPAPER: { min: 7, max: 12 },
  BODY_SPRAYS: { min: 1, max: 3 },
  DEFAULT: { min: 1, max: 4 }
};
```

---

## 🎯 Admin Panel এ Cost Code Create করার সময়

```typescript
// CostCodeModal.tsx এ নতুন fields
<div>
  <label>Parent Question (Optional)</label>
  <select
    value={formData.parentCostCodeId}
    onChange={(e) => setFormData({...formData, parentCostCodeId: e.target.value})}
  >
    <option value="">None (Top-level question)</option>
    {costCodes.map(cc => (
      <option key={cc.id} value={cc.id}>{cc.name}</option>
    ))}
  </select>
</div>

<div>
  <label>Show When Parent Value</label>
  <input
    placeholder="true / false / optionId / ANY"
    value={formData.showWhenParentValue}
    onChange={(e) => setFormData({...formData, showWhenParentValue: e.target.value})}
  />
</div>

<div>
  <label>Nested Input Type</label>
  <select
    value={formData.nestedInputType}
    onChange={(e) => setFormData({...formData, nestedInputType: e.target.value})}
  >
    <option value="NONE">None</option>
    <option value="QUANTITY">Quantity Input</option>
    <option value="DROPDOWN">Dropdown</option>
    <option value="CUSTOM_PRICE">Custom Price</option>
  </select>
</div>
```

---

## 💡 Key Points

1. **Unlimited Nesting**: যতখুশি level এ nest করা যাবে (Parent → Child → Grandchild...)
2. **Conditional Display**: Parent এর value অনুযায়ী child show/hide হবে
3. **Auto-calculation**: Nested questions এর price automatically calculate হবে
4. **Clean UX**: Indentation দিয়ে nested questions visually আলাদা দেখাবে
5. **Backend Support**: Backend এ এই fields add করতে হবে migration দিয়ে

---

## 🚀 Next Steps

1. ✅ Backend এ migration run করে নতুন fields add করুন
2. ✅ Frontend types update করুন
3. ✅ CostCodeRenderer এ nested logic implement করুন
4. ✅ CostCodeModal এ parent selection fields add করুন
5. ✅ Testing করুন different scenarios দিয়ে

---

## 📝 Example: Complete Bathroom Renovation Flow

```
[WHITE] Demolition - Remove fixtures, tile, etc. (Included)

[BLUE] Wall tile removal?
  └─ [GREEN] Enter sqft of tile (if Yes)

[BLUE] Install recessed cans?
  └─ [ORANGE] Select can size (if Yes)
      └─ [GREEN] How many cans? 1-6 (after size selected)

[ORANGE] Select mirror type
  └─ [GREEN] How many mirrors? 1-2 (if LED Mirror selected)

[BLUE] Custom upgrade needed?
  └─ [GREEN] Enter custom price (if Yes)
```

এভাবে পুরো estimator flow টা nested questions দিয়ে dynamic এবং user-friendly হবে! 🎉
