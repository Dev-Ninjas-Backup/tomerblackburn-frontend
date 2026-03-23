# 🔧 Backend Implementation Guide - Nested Questions

## 📋 Overview
Backend এ 3টা নতুন field add করতে হবে CostCode model এ এবং DTOs update করতে হবে।

---

## ✅ Step 1: Update Prisma Schema

### File: `/prisma/schema/CostCode.prisma`

**Current Code:**
```prisma
model CostCode {
  id                String  @id @default(uuid())
  categoryId        String
  serviceId         String?
  code              String  @unique
  name              String
  description       String?

  basePrice   Decimal  @default(0) @db.Decimal(10, 2)
  markup      Decimal  @default(0) @db.Decimal(5, 2)
  clientPrice Decimal  @default(0) @db.Decimal(10, 2)
  unitType    UnitType @default(FIXED)

  questionType QuestionType @default(WHITE)

  step             Int     @default(1)
  displayOrder     Int     @default(0)
  isIncludedInBase Boolean @default(false)
  requiresQuantity Boolean @default(false)
  isOptional       Boolean @default(false)
  isActive         Boolean @default(true)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  category         CostCodeCategory @relation(fields: [categoryId], references: [id])
  service          Service?         @relation(fields: [serviceId], references: [id])
  options          CostCodeOption[]
  serviceCostCodes ServiceCostCode[]
  submissionItems  SubmissionItem[]

  @@index([code])
  @@index([categoryId])
  @@index([serviceId])
  @@index([isActive])
  @@index([questionType])
  @@index([displayOrder])
  @@index([step])
  @@map("cost_codes")
}
```

**Updated Code (Add these 3 fields + relations):**
```prisma
model CostCode {
  id                String  @id @default(uuid())
  categoryId        String
  serviceId         String?
  code              String  @unique
  name              String
  description       String?

  basePrice   Decimal  @default(0) @db.Decimal(10, 2)
  markup      Decimal  @default(0) @db.Decimal(5, 2)
  clientPrice Decimal  @default(0) @db.Decimal(10, 2)
  unitType    UnitType @default(FIXED)

  questionType QuestionType @default(WHITE)

  step             Int     @default(1)
  displayOrder     Int     @default(0)
  isIncludedInBase Boolean @default(false)
  requiresQuantity Boolean @default(false)
  isOptional       Boolean @default(false)
  isActive         Boolean @default(true)

  // ✅ NEW FIELDS FOR NESTED QUESTIONS
  parentCostCodeId    String? // Parent question ID
  showWhenParentValue String? // Condition: "true", "false", "optionId", "ANY"
  nestedInputType     String? // "QUANTITY", "DROPDOWN", "CUSTOM_PRICE", "NONE"

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  category         CostCodeCategory @relation(fields: [categoryId], references: [id])
  service          Service?         @relation(fields: [serviceId], references: [id])
  options          CostCodeOption[]
  serviceCostCodes ServiceCostCode[]
  submissionItems  SubmissionItem[]

  // ✅ NEW RELATIONS FOR NESTED QUESTIONS
  parentCostCode CostCode?  @relation("NestedQuestions", fields: [parentCostCodeId], references: [id], onDelete: SetNull)
  childCostCodes CostCode[] @relation("NestedQuestions")

  @@index([code])
  @@index([categoryId])
  @@index([serviceId])
  @@index([isActive])
  @@index([questionType])
  @@index([displayOrder])
  @@index([step])
  @@index([parentCostCodeId]) // ✅ NEW INDEX
  @@map("cost_codes")
}
```

---

## ✅ Step 2: Create Migration

### Terminal Command:
```bash
cd /Users/masud/Desktop/projects/client/tomerblackburn-backend

npx prisma migrate dev --name add_nested_questions_to_cost_code
```

এটা automatically migration file তৈরি করবে এবং database update করবে।

### Expected Migration SQL:
```sql
-- AlterTable
ALTER TABLE "cost_codes" 
ADD COLUMN "parentCostCodeId" TEXT,
ADD COLUMN "showWhenParentValue" TEXT,
ADD COLUMN "nestedInputType" TEXT;

-- CreateIndex
CREATE INDEX "cost_codes_parentCostCodeId_idx" ON "cost_codes"("parentCostCodeId");

-- AddForeignKey
ALTER TABLE "cost_codes" 
ADD CONSTRAINT "cost_codes_parentCostCodeId_fkey" 
FOREIGN KEY ("parentCostCodeId") 
REFERENCES "cost_codes"("id") 
ON DELETE SET NULL 
ON UPDATE CASCADE;
```

---

## ✅ Step 3: Update DTOs

### File: `/src/modules/cost-codes/dto/create-cost-code.dto.ts`

**Add these fields after `isActive` field:**

```typescript
  @ApiProperty({
    description: 'Parent cost code ID for nested questions',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsString()
  @IsOptional()
  parentCostCodeId?: string;

  @ApiProperty({
    description: 'Condition to show this nested question (true/false/optionId/ANY)',
    example: 'true',
    required: false,
  })
  @IsString()
  @IsOptional()
  showWhenParentValue?: string;

  @ApiProperty({
    description: 'Type of nested input',
    example: 'QUANTITY',
    enum: ['QUANTITY', 'DROPDOWN', 'CUSTOM_PRICE', 'NONE'],
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(['QUANTITY', 'DROPDOWN', 'CUSTOM_PRICE', 'NONE'], {
    message: 'nestedInputType must be one of: QUANTITY, DROPDOWN, CUSTOM_PRICE, NONE',
  })
  nestedInputType?: string;
```

### File: `/src/modules/cost-codes/dto/update-cost-code.dto.ts`

এটা PartialType extend করে তাই automatically update হয়ে যাবে। কোনো change লাগবে না।

---

## ✅ Step 4: Update Service (Optional Validation)

### File: `/src/modules/cost-codes/cost-codes.service.ts`

**In `create()` method, add validation after serviceId validation:**

```typescript
      // Validate parentCostCodeId if provided
      if (createCostCodeDto.parentCostCodeId) {
        const parentExists = await this.prisma.costCode.findUnique({
          where: { id: createCostCodeDto.parentCostCodeId },
        });

        if (!parentExists) {
          throw new NotFoundException(
            `Parent cost code with ID ${createCostCodeDto.parentCostCodeId} not found`,
          );
        }

        // Prevent circular dependency
        if (createCostCodeDto.parentCostCodeId === id) {
          throw new ConflictException(
            'Cost code cannot be its own parent',
          );
        }
      }
```

**In `update()` method, add same validation after serviceId validation:**

```typescript
      // Validate parentCostCodeId if being updated
      if (updateCostCodeDto.parentCostCodeId) {
        const parentExists = await this.prisma.costCode.findUnique({
          where: { id: updateCostCodeDto.parentCostCodeId },
        });

        if (!parentExists) {
          throw new NotFoundException(
            `Parent cost code with ID ${updateCostCodeDto.parentCostCodeId} not found`,
          );
        }

        // Prevent circular dependency
        if (updateCostCodeDto.parentCostCodeId === id) {
          throw new ConflictException(
            'Cost code cannot be its own parent',
          );
        }
      }
```

---

## ✅ Step 5: Update Include Relations (Optional)

### File: `/src/modules/cost-codes/cost-codes.service.ts`

যদি nested cost codes frontend এ load করতে চাও, তাহলে include করতে পারো:

**In `findAll()`, `findOne()`, `findByCategory()` methods:**

```typescript
include: {
  category: true,
  service: true,
  options: {
    orderBy: { displayOrder: 'asc' },
  },
  parentCostCode: true,      // ✅ Add this
  childCostCodes: {          // ✅ Add this
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  },
},
```

তবে এটা optional। Frontend এ আলাদা করে load করলেও চলবে।

---

## ✅ Step 6: Generate Prisma Client

### Terminal Command:
```bash
npx prisma generate
```

এটা updated Prisma Client generate করবে নতুন fields সহ।

---

## ✅ Step 7: Restart Server

```bash
pnpm run start:dev
```

---

## 🧪 Testing

### Test with Postman/Thunder Client:

#### 1. Create Parent Cost Code (BLUE - Toggle)
```http
POST http://localhost:3000/cost-codes
Content-Type: application/json

{
  "categoryId": "your-category-id",
  "serviceId": "your-service-id",
  "code": "TILE-REMOVAL-1",
  "name": "Wall tile removal?",
  "description": "Remove existing wall tiles",
  "basePrice": 0,
  "markup": 0,
  "clientPrice": 0,
  "unitType": "FIXED",
  "questionType": "BLUE",
  "step": 1,
  "displayOrder": 1,
  "isActive": true
}
```

#### 2. Create Child Cost Code (GREEN - Number Input)
```http
POST http://localhost:3000/cost-codes
Content-Type: application/json

{
  "categoryId": "your-category-id",
  "serviceId": "your-service-id",
  "code": "TILE-SQFT-1",
  "name": "Enter sqft of tile",
  "description": "Square footage of tile to remove",
  "basePrice": 5.50,
  "markup": 0,
  "clientPrice": 5.50,
  "unitType": "PER_SQFT",
  "questionType": "GREEN",
  "step": 1,
  "displayOrder": 2,
  "isActive": true,
  "parentCostCodeId": "parent-cost-code-id-from-step-1",
  "showWhenParentValue": "true",
  "nestedInputType": "QUANTITY"
}
```

#### 3. Get All Cost Codes (Verify)
```http
GET http://localhost:3000/cost-codes?includeOptions=true&includeCategory=true
```

Response should include new fields:
```json
{
  "message": "Cost codes retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": "...",
      "name": "Wall tile removal?",
      "parentCostCodeId": null,
      "showWhenParentValue": null,
      "nestedInputType": null,
      ...
    },
    {
      "id": "...",
      "name": "Enter sqft of tile",
      "parentCostCodeId": "parent-id",
      "showWhenParentValue": "true",
      "nestedInputType": "QUANTITY",
      ...
    }
  ]
}
```

---

## 📊 Database Verification

### Check in Database:
```sql
-- Check if columns exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'cost_codes'
AND column_name IN ('parentCostCodeId', 'showWhenParentValue', 'nestedInputType');

-- Check data
SELECT id, name, "parentCostCodeId", "showWhenParentValue", "nestedInputType"
FROM cost_codes
ORDER BY "displayOrder";
```

---

## ⚠️ Important Notes

1. **Migration Backup**: Migration run করার আগে database backup নাও
2. **Circular Dependency**: Service এ validation add করেছি যাতে circular dependency না হয়
3. **Cascade Delete**: Parent delete করলে child এর `parentCostCodeId` NULL হয়ে যাবে (onDelete: SetNull)
4. **Index Added**: Performance এর জন্য `parentCostCodeId` এ index add করা হয়েছে
5. **Optional Fields**: সব 3টা field optional, existing data break হবে না

---

## 🎯 Summary

### Files to Modify:
1. ✅ `/prisma/schema/CostCode.prisma` - Add 3 fields + relations
2. ✅ `/src/modules/cost-codes/dto/create-cost-code.dto.ts` - Add 3 DTO fields
3. ✅ `/src/modules/cost-codes/cost-codes.service.ts` - Add validation (optional)

### Commands to Run:
```bash
# 1. Create migration
npx prisma migrate dev --name add_nested_questions_to_cost_code

# 2. Generate Prisma Client
npx prisma generate

# 3. Restart server
pnpm run start:dev
```

### Testing:
- Create parent cost code
- Create child cost code with parent reference
- Verify in GET response
- Test on frontend estimator page

---

**Total Time**: ~10 minutes
**Complexity**: Low (শুধু 3টা field add করতে হবে)
**Breaking Changes**: None (সব optional fields)

এই guide follow করলে backend implementation সম্পূর্ণ হয়ে যাবে! 🚀
