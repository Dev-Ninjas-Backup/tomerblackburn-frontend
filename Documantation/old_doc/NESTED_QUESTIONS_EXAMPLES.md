# 🎯 Nested Questions - Practical Examples

## কিভাবে Admin Panel এ Nested Questions তৈরি করবেন

---

## Example 1: Wall Tile Removal (BLUE → GREEN)

### Step 1: Parent Question তৈরি করুন
```
Name: Wall tile removal?
Question Type: BLUE (Yes/No Toggle)
Base Price: 0
Client Price: 0
Parent Question: None (Top-level question)
Show When Parent Value: (empty)
Nested Input Type: NONE
```

### Step 2: Child Question তৈরি করুন
```
Name: Enter sqft of tile
Question Type: GREEN (Data Input)
Unit Type: PER_SQFT
Base Price: 5.50
Client Price: 5.50
Parent Question: [Select "Wall tile removal?" from dropdown]
Show When Parent Value: true
Nested Input Type: QUANTITY
```

**Result**: User যখন "Wall tile removal?" এ Yes করবে, তখন "Enter sqft of tile" input field show হবে।

---

## Example 2: Recessed Cans (BLUE → ORANGE → GREEN)

### Step 1: Parent Question (Level 1)
```
Name: Install recessed cans?
Question Type: BLUE
Base Price: 0
Parent Question: None
Show When Parent Value: (empty)
Nested Input Type: NONE
```

### Step 2: Child Question (Level 2) - Size Selection
```
Name: Select can size
Question Type: ORANGE (Dropdown)
Base Price: 0
Parent Question: [Select "Install recessed cans?"]
Show When Parent Value: true
Nested Input Type: DROPDOWN

Options to add:
- 6 inch → Price Modifier: 150
- 4 inch → Price Modifier: 120
- 2 inch → Price Modifier: 100
```

### Step 3: Grandchild Question (Level 3) - Quantity
```
Name: How many cans? (1-6)
Question Type: GREEN
Unit Type: PER_EACH
Base Price: 0 (price comes from parent option)
Parent Question: [Select "Select can size"]
Show When Parent Value: ANY
Nested Input Type: QUANTITY
```

**Result**: 
1. User "Install recessed cans?" এ Yes করল
2. "Select can size" dropdown show হল
3. User "6 inch" select করল
4. "How many cans?" input show হল
5. User 4 লিখল
6. Total: 4 × $150 = $600

---

## Example 3: LED Mirror (ORANGE → GREEN)

### Step 1: Parent Question
```
Name: Select mirror type
Question Type: ORANGE
Base Price: 0
Parent Question: None
Nested Input Type: NONE

Options:
- LED Mirror → Price: 500
- Recessed Mirror → Price: 600
- Standard Mirror → Price: 300
```

### Step 2: Child Question (শুধু LED Mirror এর জন্য)
```
Name: How many LED mirrors? (1-2)
Question Type: GREEN
Unit Type: PER_EACH
Base Price: 0
Parent Question: [Select "Select mirror type"]
Show When Parent Value: [LED Mirror এর option ID paste করুন]
Nested Input Type: QUANTITY
```

**Note**: Option ID পেতে হলে:
1. Cost Code Options tab এ যান
2. "LED Mirror" option এর ID copy করুন
3. "Show When Parent Value" field এ paste করুন

---

## Example 4: Custom Upgrade (BLUE → CUSTOM_PRICE)

### Step 1: Parent Question
```
Name: Custom upgrade needed?
Question Type: BLUE
Base Price: 0
Parent Question: None
Nested Input Type: NONE
```

### Step 2: Child Question
```
Name: Enter custom price
Question Type: GREEN
Unit Type: FIXED
Base Price: 0
Parent Question: [Select "Custom upgrade needed?"]
Show When Parent Value: true
Nested Input Type: CUSTOM_PRICE
```

---

## 📋 Show When Parent Value - চিট শিট

| Parent Type | Value | Meaning |
|------------|-------|---------|
| BLUE | `true` | Parent এ Yes হলে show হবে |
| BLUE | `false` | Parent এ No হলে show হবে |
| ORANGE | `ANY` | যেকোনো option select হলে show হবে |
| ORANGE | `option-id-123` | Specific option select হলে show হবে |

---

## 🎨 Visual Representation

```
[WHITE] Demolition - Remove fixtures (Included)

[BLUE] Wall tile removal?
  └─ [GREEN] Enter sqft of tile (if Yes)

[BLUE] Install recessed cans?
  └─ [ORANGE] Select can size (if Yes)
      └─ [GREEN] How many cans? (after size selected)

[ORANGE] Select mirror type
  ├─ [GREEN] How many LED mirrors? (if LED Mirror)
  └─ [GREEN] How many recessed mirrors? (if Recessed Mirror)
```

---

## ⚠️ Important Notes

1. **Backend Support Required**: Backend এ এই fields থাকতে হবে:
   - `parentCostCodeId`
   - `showWhenParentValue`
   - `nestedInputType`

2. **Option ID**: ORANGE question এর specific option এর জন্য nested question তৈরি করতে হলে option এর ID লাগবে

3. **Unlimited Nesting**: যতখুশি level এ nest করা যাবে (Parent → Child → Grandchild → Great-grandchild...)

4. **Display Order**: Nested questions এর display order parent এর পরে হওয়া উচিত

5. **Visual Indication**: Frontend এ nested questions indented (ml-8) এবং colored border দিয়ে show হবে

---

## 🚀 Testing Checklist

- [ ] Parent question toggle করলে child show/hide হচ্ছে কিনা
- [ ] Dropdown option change করলে সঠিক child show হচ্ছে কিনা
- [ ] Multi-level nesting কাজ করছে কিনা
- [ ] Price calculation সঠিক হচ্ছে কিনা
- [ ] Visual indentation ঠিক আছে কিনা

---

## 💡 Pro Tips

1. **Logical Grouping**: Related questions একসাথে group করুন display order দিয়ে
2. **Clear Names**: Nested question এর name clear এবং descriptive রাখুন
3. **Price Strategy**: Parent এ base price 0 রাখুন, child এ actual price দিন
4. **Testing**: প্রতিটা nested flow আলাদা করে test করুন

---

এই guide follow করে তুমি যেকোনো complex nested question flow তৈরি করতে পারবে! 🎉
