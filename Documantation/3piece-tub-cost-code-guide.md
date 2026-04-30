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
| **Code** | `3PT-Demo` |
| **Name** | `Demolition` |
| **Alias** | None |
| **Category** | Demolition |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `700` |
| **Markup** | `20%` |
| **Client Price** | `840` *(auto)* |
| **Included in Base Price** | ✅ |
| **BT Export** | ✅ |
| **Description** | `Uninstall and set aside agreed-upon items - Remove toilet - Remove tub or shower and surround - Remove vanity and sink - Remove floor tile - Remove mirror(s) and bathroom accessories` |
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
| **Code** | `3PT-Plumbing` |
| **Name** | `Plumbing` |
| **Alias** | None |
| **Category** | Plumbing |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `2200` |
| **Markup** | `20%` |
| **Client Price** | `2640` *(auto)* |
| **Included in Base Price** | ✅ |
| **BT Export** | ✅ |
| **Description** | `Install and connect toilet in existing location - Install and connect single sink or vanity in existing location - Install alcove tub in existing location and connect to drain - Install tub faucet and controls - Install copper piping for shower head and controls - Install rough-in valve for standard shower head - *Does not include repair or replacement of main drain lines if required` |
| **Tips** | `See below for additional tub style options` |

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

> After creating this, the following upgrade options will be added as **YELLOW children**:
> - Water Shut Off Valves
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
> - Replace Galvanized Pipes (Bathroom Only)

---

### 6. Electric

| Field | Value |
|---|---|
| **Code** | `3PT-Electric` |
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
| **Description** | `Replace vanity light fixture(s) in existing location - Replace ceiling light fixture in existing location - Update outlets and switches in bathroom` |
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

> After creating this, the following upgrade options will be added as **YELLOW children**:
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
| **Code** | `3PT-Carpentry` |
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
| **Code** | `3PT-Tile Install` |
| **Name** | `Tile Install` |
| **Alias** | None |
| **Category** | Tile |
| **Question Type** | `WHITE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `2500` |
| **Markup** | `20%` |
| **Client Price** | `3000` *(auto)* |
| **Included in Base Price** | ✅ |
| **BT Export** | ✅ |
| **Description** | `Apply RedGard waterproofing at tub walls - Install of ceramic/porcelain tile on bathroom floor and tub surround in standard pattern - Install grout on all new tile` |
| **Tips** | `Tile layout, pattern, and material selection can impact final cost. Specialty patterns or materials may require additional labor` |

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
> - Niche/Ledge

---

### 13. Patch and Paint

| Field | Value |
|---|---|
| **Code** | `3PT-Paint` |
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

### 16. Glass (Branch Question)

> ⚠️ Branch question — NOT exported.

| Field | Value |
|---|---|
| **Name** | `Glass` |
| **Category** | Glass |
| **Question Type** | `BLUE` |
| **Unit Type** | `FIXED` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Included in Base Price** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

> After creating this, the following upgrade options will be added as **YELLOW children**:
> - Door and Panel
> - Sliding Door
> - Stationary Panel

---

## KEY DIFFERENCES FROM 3-PIECE SHOWER

| Item | 3-Piece Tub | 3-Piece Shower |
|---|---|---|
| Plumbing scope | Alcove tub + tub faucet + shower rough-in | New drain + shower rough-in (no tub) |
| Plumbing price | Same ($2,200 / $2,640) | Same ($2,200 / $2,640) |
| Plumbing upgrades | Water Shut Off Valves, Change Tub Style, Relocate Tub | Water Shut Off Valves, Relocate Shower, Steam Shower |
| Tile description | RedGard waterproofing + floor + tub surround | Schluter system + floor + shower walls |
| Tile price | $2,500 / $3,000 | $3,000 / $3,600 |
| Specialty Tile | Additional Tile (not "Install additional tile...") | Install additional tile in areas not included above |
| Glass section | ✅ Door and Panel, Sliding Door, Stationary Panel | ✅ Same |
| Everything else | Same | Same |

---

## NOTES

- **Branch questions** (`Exclude From Export = ✅`) are shown in the estimator to trigger child upgrade options but are **NOT** sent to Buildertrend Excel export.
- **WHITE** = always included, no user interaction
- **BLUE** = Yes/No toggle (branch questions default to No)
- **YELLOW** = child upgrade options that appear when parent BLUE is toggled Yes
- All base items have `Included in Base Price = ✅`
