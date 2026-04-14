# 3-Piece Tub (Three Piece - With Tub) — Cost Code Entry Guide

## How to Add Each Cost Code
Dashboard → Cost Management → Cost Codes → **Add Cost Code**

For all entries below:
- **Project Type:** Bathroom Renovation
- **Service Category:** Bathroom Renovation
- **Service:** Three Piece - With Tub
- **Step:** 1 (Rough)
- **Is Active:** ✅

---

## BASE COST CODES (Included in Base Price)

---

### 1. Site Preparation

| Field | Value |
|---|---|
| **Code** | `3PT-SitePrep` |
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
| **Code** | `3PT-Demo` |
| **Name** | `Demolition` |
| **Alias** | *(leave empty)* |
| **Category** | Demolition |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `700` |
| **Markup** | `20` |
| **Client Price** | `840` *(auto)* |
| **Is Included In Base** | ✅ |
| **Exclude From Export** | ❌ |
| **Description** | `Uninstall and set aside agreed-upon items - Remove toilet - Remove tub or shower and surround - Remove vanity and sink - Remove floor tile - Remove mirror(s) and bathroom accessories` |
| **Tips** | `Additional costs may apply if multiple layers of flooring are found during demolition` |

---

### 3. Wall/Ceiling Tile Removal (Branch Question)

> ⚠️ Branch question — NOT exported to Buildertrend.

| Field | Value |
|---|---|
| **Code** | `3PT-WallTile-Branch` |
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
| **Code** | `3PT-Plumbing` |
| **Name** | `Plumbing` |
| **Alias** | *(leave empty)* |
| **Category** | Plumbing |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `2200` |
| **Markup** | `20` |
| **Client Price** | `2640` *(auto)* |
| **Is Included In Base** | ✅ |
| **Exclude From Export** | ❌ |
| **Description** | `Install and connect toilet in existing location - Install and connect single sink or vanity in existing location - Install alcove tub in existing location and connect to drain - Install tub faucet and controls - Install copper piping for shower head and controls - Install rough-in valve for standard shower head - *Does not include repair or replacement of main drain lines if required` |
| **Tips** | `See below for additional tub style options` |

---

### 5. Additional Plumbing (Branch Question)

> ⚠️ Branch question — NOT exported.

| Field | Value |
|---|---|
| **Code** | `3PT-Plumbing-Branch` |
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

> Child upgrades (YELLOW, from Upgrade Options tab):
> - Change Tub Style (Alcove is included)
> - Relocate Tub
> - Handheld Shower Wand
> - Body Sprays
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
| **Code** | `3PT-Electric` |
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
| **Description** | `Replace vanity light fixture(s) in existing location - Replace ceiling light fixture in existing location - Update outlets and switches in bathroom` |
| **Tips** | `Work beyond this scope will require additional electrician visits. See below.` |

---

### 7. Additional Electric (Branch Question)

> ⚠️ Branch question — NOT exported.

| Field | Value |
|---|---|
| **Code** | `3PT-Electric-Branch` |
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

> Child upgrades (YELLOW, from Upgrade Options tab):
> - Add new outlets
> - Relocate existing outlets or switches
> - Add Vanity Light with switch
> - Convert One Vanity Light into Two
> - Add recessed lighting
> - Add ceiling light fixture with new switch
> - Install sconces instead of vanity light
> - Install dimmer switches
> - Install LED mirror
> - Install heated floors

---

## KEY DIFFERENCES FROM 2-PIECE

| Item | 2-Piece | 3-Piece Tub |
|---|---|---|
| Demolition price | $400 / $480 | $700 / $840 |
| Demolition description | No tub removal | Includes tub/shower removal |
| Plumbing price | $600 / $720 | $2,200 / $2,640 |
| Plumbing scope | Toilet + sink only | Toilet + sink + alcove tub + shower rough-in |
| Electric | Same | Same |
| Site Prep | Same | Same |
