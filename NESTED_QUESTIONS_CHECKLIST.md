# ✅ Backend Implementation Checklist

## 🎯 Quick Steps (10 minutes)

### Step 1: Update Prisma Schema ⏱️ 2 min
- [ ] Open `/prisma/schema/CostCode.prisma`
- [ ] Add 3 fields after `isActive`:
  ```prisma
  parentCostCodeId    String?
  showWhenParentValue String?
  nestedInputType     String?
  ```
- [ ] Add 2 relations after `submissionItems`:
  ```prisma
  parentCostCode CostCode?  @relation("NestedQuestions", fields: [parentCostCodeId], references: [id], onDelete: SetNull)
  childCostCodes CostCode[] @relation("NestedQuestions")
  ```
- [ ] Add index after existing indexes:
  ```prisma
  @@index([parentCostCodeId])
  ```

### Step 2: Run Migration ⏱️ 1 min
```bash
cd /Users/masud/Desktop/projects/client/tomerblackburn-backend
npx prisma migrate dev --name add_nested_questions_to_cost_code
```
- [ ] Migration created successfully
- [ ] Database updated

### Step 3: Update DTO ⏱️ 3 min
- [ ] Open `/src/modules/cost-codes/dto/create-cost-code.dto.ts`
- [ ] Add 3 fields after `isActive` field (copy from NESTED_QUESTIONS_BACKEND_GUIDE.md)
- [ ] Save file

### Step 4: Generate Prisma Client ⏱️ 1 min
```bash
npx prisma generate
```
- [ ] Prisma Client generated

### Step 5: Restart Server ⏱️ 1 min
```bash
pnpm run start:dev
```
- [ ] Server running without errors

### Step 6: Test API ⏱️ 2 min
- [ ] POST `/cost-codes` with new fields works
- [ ] GET `/cost-codes` returns new fields
- [ ] Frontend can create nested questions

---

## 🧪 Quick Test

### Create Parent:
```json
POST /cost-codes
{
  "categoryId": "...",
  "serviceId": "...",
  "code": "TEST-PARENT",
  "name": "Test Parent Question",
  "questionType": "BLUE",
  "basePrice": 0
}
```

### Create Child:
```json
POST /cost-codes
{
  "categoryId": "...",
  "serviceId": "...",
  "code": "TEST-CHILD",
  "name": "Test Child Question",
  "questionType": "GREEN",
  "basePrice": 10,
  "parentCostCodeId": "parent-id-from-above",
  "showWhenParentValue": "true",
  "nestedInputType": "QUANTITY"
}
```

### Verify:
```
GET /cost-codes
```
Should return both with nested fields populated.

---

## ✅ Done!
- [ ] All steps completed
- [ ] Tests passed
- [ ] Frontend notified

---

**Total Time**: ~10 minutes
**Files Modified**: 2 files
**Commands Run**: 3 commands

See `NESTED_QUESTIONS_BACKEND_GUIDE.md` for detailed instructions.
