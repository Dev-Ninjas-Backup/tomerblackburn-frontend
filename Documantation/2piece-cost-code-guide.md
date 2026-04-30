# 2-Piece (Two Piece) — Cost Code Entry Guide

## How to Add Each Cost Code
Dashboard → Cost Management → Cost Codes → **Add Cost Code**

For all entries below:
- **Project Type:** Bathroom Renovation
- **Service Category:** Bathroom Renovation
- **Service:** Two Piece
- **Step:** 1 (Rough)
- **Is Active:** ✅

---

## BASE COST CODES (Included in Base Price)

---

### 1. Site Preparation

| Field | Value |
|---|---|
| **Code** | `Site Prep` |
| **Name** | `Site Preparation` |
| **Alias** | None |
| **Category** | Management |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `250` |
| **Markup** | `20%` |
| **Client Price** | `300` *(auto)* |
| **Included in Base Price** | ✅ |
| **BT Export** | ✅ |
| **Description** | `Create protective walkway from access point to work area - Protect flooring and adjacent surfaces - Set up staging area for materials and tools` |
| **Tips** | `A clear space near the work area is required for storing tools, materials, and daily work` |

---

### 2. Demolition

| Field | Value |
|---|---|
| **Code** | `2P-Demo` |
| **Name** | `Demolition` |
| **Alias** | None |
| **Category** | Demolition |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `400` |
| **Markup** | `20%` |
| **Client Price** | `480` *(auto)* |
| **Included in Base Price** | ✅ |
| **BT Export** | ✅ |
| **Description** | `Remove toilet - Remove vanity, sink, and faucet - Remove floor tile and baseboards - Remove mirror(s) and bathroom accessories` |
| **Tips** | `Additional costs may apply if multiple layers of flooring are found during demolition` |

---

### 3. Wall/Ceiling Tile Removal (Branch Question)

> ⚠️ Branch question — shown in estimator but **NOT exported** to Buildertrend.

| Field | Value |
|---|---|
| **Name** | `Is there any wall or ceiling tile being removed?` |
| **Category** | Demolition |
| **Question Type** | `BLUE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Included in Base Price** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

---

### 4. Plumbing

| Field | Value |
|---|---|
| **Code** | `2P-Plumbing` |
| **Name** | `Plumbing` |
| **Alias** | None |
| **Category** | Plumbing |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `600` |
| **Markup** | `20%` |
| **Client Price** | `720` *(auto)* |
| **Included in Base Price** | ✅ |
| **BT Export** | ✅ |
| **Description** | `Install and connect toilet in existing location - Install and connect single sink or vanity in existing location` |
| **Tips** | `Price assumes existing plumbing locations can be used for the new sink or vanity; relocation may add cost` |

---

### 5. Additional Plumbing (Branch Question)

> ⚠️ Branch question — NOT exported.

| Field | Value |
|---|---|
| **Name** | `Do you need any additional plumbing work beyond the scope listed above?` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Included in Base Price** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

> After creating this, the following upgrade options will be added as **YELLOW children** of this branch:
> - Water Shut Off Valves
> - Relocate Toilet
> - Convert to Wall-Hung Toilet
> - Toilet with Built in Bidet (Washlet)
> - Relocate Sink/Vanity
> - Convert Single to Double Vanity
> - Wall Mounted Faucets

---

### 6. Electric

| Field | Value |
|---|---|
| **Code** | `2P-Electric` |
| **Name** | `Electric` |
| **Alias** | None |
| **Category** | Electric |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `600` |
| **Markup** | `20%` |
| **Client Price** | `720` *(auto)* |
| **Included in Base Price** | ✅ |
| **BT Export** | ✅ |
| **Description** | `Replace vanity light fixture in existing location - Replace ceiling light fixture in existing location - Update outlets and switches in bathroom` |
| **Tips** | `Work beyond this scope will require additional electrician visits. See below.` |

---

### 7. Additional Electric (Branch Question)

> ⚠️ Branch question — NOT exported.

| Field | Value |
|---|---|
| **Name** | `Do you need any additional electrical work beyond the scope listed above?` |
| **Category** | Electric |
| **Question Type** | `BLUE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Included in Base Price** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

> After creating this, the following upgrade options will be added as **YELLOW children** of this branch:
> - Add new outlets
> - Relocate existing outlets or switches
> - Add Vanity light with switch
> - Convert One Vanity Light into Two
> - Add recessed lighting
> - Add ceiling light fixture with new switch
> - Install sconces instead of vanity light
> - Install dimmer switches
> - Install LED mirror
> - Install heated floors

---

### 8. HVAC

> Upgrade options only — no base WHITE item. Add the following as **YELLOW children** under HVAC category:
> - Replace Exhaust Fan
> - Relocate existing exhaust fan
> - Install new exhaust fan
> - Exhaust fan with additional features
> - Relocate HVAC vent

---

### 9. Carpentry

| Field | Value |
|---|---|
| **Code** | `2P-Carpentry` |
| **Name** | `Carpentry` |
| **Alias** | None |
| **Category** | Carpentry |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `500` |
| **Markup** | `20%` |
| **Client Price** | `600` *(auto)* |
| **Included in Base Price** | ✅ |
| **BT Export** | ✅ |
| **Description** | `Install vanity in existing location or new location if selected in rough plumbing - Install stock MDF baseboard/trim to match existing as closely as possible; custom baseboard/trim available at additional cost` |
| **Tips** | `We will match existing baseboards/trim as closely as possible; exact matches may require custom fabrication at additional cost` |

---

### 10. Additional Carpentry (Branch Question)

> ⚠️ Branch question — NOT exported.

| Field | Value |
|---|---|
| **Name** | `Additional Carpentry Items` |
| **Category** | Carpentry |
| **Question Type** | `BLUE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Included in Base Price** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

> After creating this, the following upgrade options will be added as **YELLOW children**:
> - Floating Vanity
> - Recessed Mirror
> - Crown Molding
> - Replace Door

---

### 11. Tile Install

| Field | Value |
|---|---|
| **Code** | `2P-Tile Install` |
| **Name** | `Tile Install` |
| **Alias** | None |
| **Category** | Tile |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `1000` |
| **Markup** | `20%` |
| **Client Price** | `1200` *(auto)* |
| **Included in Base Price** | ✅ |
| **BT Export** | ✅ |
| **Description** | `Install of ceramic/porcelain tile on bathroom floor in standard pattern - Install grout on all new tile` |
| **Tips** | `Tile layout, pattern, and material selection can impact final cost. Speciality patterns or materials may require additional labor` |

---

### 12. Specialty Tile Options (Branch Question)

> ⚠️ Branch question — NOT exported.

| Field | Value |
|---|---|
| **Name** | `Specialty Tile Options` |
| **Category** | Tile |
| **Question Type** | `BLUE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Included in Base Price** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

> After creating this, the following upgrade options will be added as **YELLOW children**:
> - Additional Tile
> - Tile Sizes
> - Tile Material
> - Tile Patterns
> - Tile Baseboard

---

### 13. Patch and Paint

| Field | Value |
|---|---|
| **Code** | `2P-Paint` |
| **Name** | `Patch and Paint` |
| **Alias** | None |
| **Category** | Paint |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `500` |
| **Markup** | `20%` |
| **Client Price** | `600` *(auto)* |
| **Included in Base Price** | ✅ |
| **BT Export** | ✅ |
| **Description** | `Patch minor drywall imperfections, caulk new baseboards where applicable, and apply two coats of paint to walls, ceiling, and trim` |
| **Tips** | `Bathrooms benefit from moisture-resistant paint finishes. Satin or semi-gloss is recommended for walls and trim as it provides better durability, easier cleaning, and improved resistance to humidity.` |

---

### 14. Paint Options (Branch Question)

> ⚠️ Branch question — NOT exported.

| Field | Value |
|---|---|
| **Name** | `Paint Options` |
| **Category** | Paint |
| **Question Type** | `BLUE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Included in Base Price** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

> After creating this, the following upgrade options will be added as **YELLOW children**:
> - Multiple Colors
> - Wallpaper
> - Refinish Vanity

---

### 15. Accessories

| Field | Value |
|---|---|
| **Code** | `Accessories` |
| **Name** | `Accessories` |
| **Alias** | None |
| **Category** | Accessories |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `250` |
| **Markup** | `20%` |
| **Client Price** | `300` *(auto)* |
| **Included in Base Price** | ✅ |
| **BT Export** | ✅ |
| **Description** | `Install bathroom accessories including towel bar, toilet paper holder, and robe hooks` |
| **Tips** | `If you have any additional accessories to install, let us know in the notes at the end and upload any specs or photos so we can review and include them accurately` |

---

## NOTES

- **Branch questions** (`Exclude From Export = ✅`) are shown in the estimator to trigger child upgrade options but are **NOT** sent to Buildertrend Excel export.
- **WHITE** = always included, no user interaction
- **BLUE** = Yes/No toggle (branch questions default to No)
- **YELLOW** = child upgrade options that appear when parent BLUE is toggled Yes
- All base items have `Included in Base Price = ✅`
- Codes updated from `TP-` prefix to `2P-` prefix per latest Excel
