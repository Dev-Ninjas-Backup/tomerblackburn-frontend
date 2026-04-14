# 3-Piece Shower (Three Piece - With Shower) — Cost Code Entry Guide

## How to Add Each Cost Code
Dashboard → Cost Management → Cost Codes → **Add Cost Code**

For all entries below:
- **Project Type:** Bathroom Renovation
- **Service Category:** Bathroom Renovation
- **Service:** Three Piece - With Shower
- **Step:** 1 (Rough)
- **Is Active:** ✅

---

## BASE COST CODES (Included in Base Price)

---

### 1. Site Preparation

| Field | Value |
|---|---|
| **Code** | `3PS-SitePrep` |
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
| **Code** | `3PS-Demo` |
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
| **Code** | `3PS-WallTile-Branch` |
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
| **Code** | `3PS-Plumbing` |
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
| **Description** | `Install and connect toilet in existing location - Install and connect single sink or vanity in existing location - Install new drain and connect to main drain - Install copper piping for shower head and controls - Install rough-in valve for standard shower head - *Does not include repair or replacement of main drain lines if required` |
| **Tips** | `See below for available shower upgrade options.` |

---

### 5. Additional Plumbing (Branch Question)

> ⚠️ Branch question — NOT exported.

| Field | Value |
|---|---|
| **Code** | `3PS-Plumbing-Branch` |
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
> - Relocate Shower
> - Steam Shower
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
| **Code** | `3PS-Electric` |
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
| **Code** | `3PS-Electric-Branch` |
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
> - Convert One Vanity Light into Two
> - Add Vanity Light with switch
> - Add recessed lighting
> - Add ceiling light fixture with new switch
> - Install sconces instead of vanity light
> - Install dimmer switches
> - Install LED mirror
> - Install heated floors

---

## KEY DIFFERENCES FROM 3-PIECE TUB

| Item | 3-Piece Tub | 3-Piece Shower |
|---|---|---|
| Plumbing description | Alcove tub + tub faucet | New drain + shower rough-in (no tub) |
| Plumbing price | Same ($2,200 / $2,640) | Same ($2,200 / $2,640) |
| Plumbing upgrades | Change Tub Style, Relocate Tub | Relocate Shower, Steam Shower |
| Everything else | Same | Same |
