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
| **Code** | `TP-SitePrep` |
| **Name** | `Site Preparation` |
| **Alias** | *(leave empty)* |
| **Category** | Management |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `250` |
| **Markup** | `20` |
| **Client Price** | `300` *(auto)* |
| **Is Included In Base** | ✅ |
| **Exclude From Export** | ❌ |
| **Description** | `Create protective walkway from access point to work area - Protect flooring and adjacent surfaces - Set up staging area for materials and tools` |
| **Tips** | `A clear space near the work area is required for storing tools, materials, and daily work` |

---

### 2. Demolition

| Field | Value |
|---|---|
| **Code** | `TP-Demo` |
| **Name** | `Demolition` |
| **Alias** | *(leave empty)* |
| **Category** | Demolition |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `400` |
| **Markup** | `20` |
| **Client Price** | `480` *(auto)* |
| **Is Included In Base** | ✅ |
| **Exclude From Export** | ❌ |
| **Description** | `Remove toilet - Remove vanity, sink, and faucet - Remove floor tile and baseboards - Remove mirror(s) and bathroom accessories` |
| **Tips** | `Additional costs may apply if multiple layers of flooring are found during demolition` |

---

### 3. Wall/Ceiling Tile Removal (Branch Question)

> ⚠️ This is a **branch question** — shown in estimator but NOT exported to Buildertrend.

| Field | Value |
|---|---|
| **Code** | `TP-WallTile-Branch` |
| **Name** | `Is there any wall or ceiling tile being removed?` |
| **Category** | Demolition |
| **Question Type** | `BLUE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

---

### 4. Plumbing

| Field | Value |
|---|---|
| **Code** | `TP-Plumbing` |
| **Name** | `Plumbing` |
| **Alias** | *(leave empty)* |
| **Category** | Plumbing |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `600` |
| **Markup** | `20` |
| **Client Price** | `720` *(auto)* |
| **Is Included In Base** | ✅ |
| **Exclude From Export** | ❌ |
| **Description** | `Install and connect toilet in existing location - Install and connect single sink or vanity in existing location` |
| **Tips** | `Price assumes existing plumbing locations can be used for the new sink or vanity; relocation may add cost` |

---

### 5. Additional Plumbing (Branch Question)

> ⚠️ Branch question — NOT exported.

| Field | Value |
|---|---|
| **Code** | `TP-Plumbing-Branch` |
| **Name** | `Do you need any additional plumbing work beyond the scope listed above?` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

> After creating this, the following upgrade options will be added as **YELLOW children** of this branch (from Upgrade Options tab):
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
| **Code** | `TP-Electric` |
| **Name** | `Electric` |
| **Alias** | *(leave empty)* |
| **Category** | Electric |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `600` |
| **Markup** | `20` |
| **Client Price** | `720` *(auto)* |
| **Is Included In Base** | ✅ |
| **Exclude From Export** | ❌ |
| **Description** | `Replace vanity light fixture in existing location - Replace ceiling light fixture in existing location - Update outlets and switches in bathroom` |
| **Tips** | `Work beyond this scope will require additional electrician visits. See below.` |

---

### 7. Additional Electric (Branch Question)

> ⚠️ Branch question — NOT exported.

| Field | Value |
|---|---|
| **Code** | `TP-Electric-Branch` |
| **Name** | `Do you need any additional electrical work beyond the scope listed above?` |
| **Category** | Electric |
| **Question Type** | `BLUE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

> After creating this, the following upgrade options will be added as **YELLOW children** of this branch (from Upgrade Options tab):
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

## NOTES

- **Branch questions** (`Exclude From Export = ✅`) are shown in the estimator to trigger child upgrade options but are NOT sent to Buildertrend Excel export.
- **WHITE** = always included, no user interaction
- **BLUE** = Yes/No toggle (branch questions default to No)
- All base items have `Is Included In Base = ✅`
- Image 3 data was incomplete — if there are additional base items (Tile, Paint, Accessories), add them following the same WHITE pattern above.
