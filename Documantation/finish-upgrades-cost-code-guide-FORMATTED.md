# Finish Upgrades — Cost Code Entry Guide
# (Universal — applies to ALL bathroom types)

## How to Add
Dashboard → Cost Management → Cost Codes → **Add Cost Code**

For all entries:
- **Service:** Select the specific bathroom type (add each upgrade to ALL 4 services)
- **Step:** 2 (Finish)
- **Is Included In Base:** ❌
- **Is Optional:** ✅
- **Is Active:** ✅

---

## CARPENTRY UPGRADES

---

### 1. Additional Carpentry Items (Branch)

| Field | Value |
|---|---|
| **Code** | `Carpentry-Branch` |
| **Name** | `Do you need any additional carpentry work beyond the scope listed above?` |
| **Alias** | `DO NOT INCLUDE IN PRICE SUMMARY` |
| **Category** | Carpentry |
| **Question Type** | `BLUE` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

---

### 2. Floating Vanity *(child of Carpentry Branch)*

| Field | Value |
|---|---|
| **Code** | `Carpentry-Floating-Vanity` |
| **Name** | `Floating Vanity` |
| **Alias** | `Floating Vanity` |
| **Category** | Carpentry |
| **Question Type** | `BLUE` |
| **Base Price** | `300` |
| **Markup** | `20` |
| **Client Price** | `360` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Carpentry-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Open wall to install proper backing support for floating vanity - Install and patch drywall after backing installation` |
| **Tips** | `Floating vanities require proper structural backing within the wall, which may require opening walls and adding reinforcement based on existing conditions.` |

---

### 3. Recessed Mirror(s) *(child of Carpentry Branch)*

| Field | Value |
|---|---|
| **Code** | `Carpentry-Recessed-Mirror` |
| **Name** | `Recessed Mirror(s)` |
| **Alias** | `Recessed Mirror(s)` |
| **Category** | Carpentry |
| **Question Type** | `BLUE` |
| **Base Price** | `300` |
| **Markup** | `20` |
| **Client Price** | `360` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Carpentry-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Open wall and modify framing as needed to allow for installation of recessed mirror(s) - Feasibility to be determined after demolition based on existing structure and conditions - Relocation of plumbing, HVAC, or electrical within the wall is not included` |
| **Tips** | `Recessed mirrors require sufficient wall depth and may be limited by plumbing, electrical, or structural elements. Relocation of these items is not included.` |

---

### 4. Crown Molding *(child of Carpentry Branch)*

| Field | Value |
|---|---|
| **Code** | `Carpentry-Crown-Molding` |
| **Name** | `Crown Molding` |
| **Alias** | `Crown Molding` |
| **Category** | Carpentry |
| **Question Type** | `GREEN` |
| **Unit Type** | `PER_LF` |
| **Base Price** | `25` |
| **Markup** | `20` |
| **Client Price** | `30` *(auto)* |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Carpentry-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install stock MDF crown molding around bathroom ceiling - Includes painting of new molding - Upgrade to custom profiles available at additional cost` |
| **Tips** | `Measure the perimeter of the bathroom where crown molding will be installed (add all wall lengths together).` |

---

### 5. Replace Bathroom Door Branch *(child of Carpentry Branch)*

| Field | Value |
|---|---|
| **Code** | `Carpentry-Door-Branch` |
| **Name** | `Replace Bathroom Door` |
| **Alias** | `DO NOT INCLUDE IN PRICE SUMMARY` |
| **Category** | Carpentry |
| **Question Type** | `BLUE` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |
| **Parent** | `Carpentry-Branch` |
| **Show When Parent Value** | `true` |

> After creating, add 3 ORANGE options to this cost code (client can only select one):

| Option Name | Price Modifier |
|---|---|
| Swing Door to Swing Door | 720 |
| Swing Door to Pocket Door | 720 |
| Pocket Door to Swing Door | 720 |

---

### 6. Swing Door to Swing Door *(ORANGE option — add via Cost Code Options)*

| Field | Value |
|---|---|
| **Code** | `Carpentry-Replace-Swing` |
| **Name** | `Swing Door to Swing Door` |
| **Alias** | `Replace Door` |
| **Category** | Carpentry |
| **Question Type** | `ORANGE` |
| **Base Price** | `600` |
| **Markup** | `20` |
| **Client Price** | `720` |
| **BT Export** | ✅ |
| **Description** | `Remove existing swing door and frame - Install new prehung swing door in existing opening - Install trim as needed - Cost of door not included` |
| **Tips** | `We're happy to help you source a door to match your style. There are several options available, and we can review them with you during the selection process.` |

---

### 7. Swing Door to Pocket Door *(ORANGE option — add via Cost Code Options)*

| Field | Value |
|---|---|
| **Code** | `Carpentry-Swing-to-Pocket` |
| **Name** | `Swing Door to Pocket Door` |
| **Alias** | `Convert Door` |
| **Category** | Carpentry |
| **Question Type** | `ORANGE` |
| **Base Price** | `600` |
| **Markup** | `20` |
| **Client Price** | `720` |
| **BT Export** | ✅ |
| **Description** | `Remove existing swing door and frame - Remove drywall as needed - Reframe wall to accommodate pocket door system - Install pocket door frame - Install new drywall after pocket door installation - Install door slab within frame - Install trim around opening - Cost includes pocket door frame; door slab not included - Rerouting of plumbing, electrical, or HVAC within pocket door wall not included if found after demolition` |
| **Tips** | `We're happy to help you source a door slab to match your style. There are several options available, and we can review them with you during the selection process.` |

---

### 8. Pocket Door to Swing Door *(ORANGE option — add via Cost Code Options)*

| Field | Value |
|---|---|
| **Code** | `Carpentry-Pocket-to-Swing` |
| **Name** | `Pocket Door to Swing Door` |
| **Alias** | `Convert Door` |
| **Category** | Carpentry |
| **Question Type** | `ORANGE` |
| **Base Price** | `600` |
| **Markup** | `20` |
| **Client Price** | `720` |
| **BT Export** | ✅ |
| **Description** | `Remove drywall as needed to remove existing pocket door frame - Install new drywall where pocket door frame was removed - Install new prehung swing door in existing opening - Install door casing - Cost of door not included` |
| **Tips** | `We're happy to help you source a door to match your style. There are several options available, and we can review them with you during the selection process.` |

---

## SPECIALTY TILE UPGRADES

---

### 9. Specialty Tile Upgrades (Branch)

| Field | Value |
|---|---|
| **Code** | `Tile-Branch` |
| **Name** | `Do you need any specialty tile upgrades beyond the base scope?` |
| **Alias** | `DO NOT INCLUDE IN PRICE SUMMARY` |
| **Category** | Tile |
| **Question Type** | `BLUE` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

---

### 10. Additional Tile Install *(child of Tile Branch)*

| Field | Value |
|---|---|
| **Code** | `Tile-Additional-Square-Footage` |
| **Name** | `Additional Tile Install` |
| **Alias** | `Additional Tile Install` |
| **Category** | Tile |
| **Question Type** | `GREEN` |
| **Unit Type** | `PER_SQFT` |
| **Base Price** | `25` |
| **Markup** | `20` |
| **Client Price** | `30` *(auto)* |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Tile-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Enter the total square footage of any additional tile areas not included in above base scope, such as full-height walls, ceilings, or other surfaces outside the base scope` |
| **Tips** | `To calculate square footage: multiply length × width for floors/ceilings, or length × height for walls. Measure each area separately and add them together for the total.` |

---

### 11. Specialty Tile Size *(child of Tile Branch)*

| Field | Value |
|---|---|
| **Code** | `Tile-Sizes` |
| **Name** | `Specialty Tile Size` |
| **Alias** | `Specialty Tile Size` |
| **Category** | Tile |
| **Question Type** | `GREEN` |
| **Unit Type** | `PER_SQFT` |
| **Base Price** | `10` |
| **Markup** | `20` |
| **Client Price** | `12` *(auto)* |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Tile-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Tile sizes between 3x6 and 12x24 are included in the base scope. Sizes outside of this range may require additional labor. Do you plan to install tile outside of this size range? If yes, enter the total square footage of all areas using non-standard sizes.` |
| **Tips** | `Tile outside this range includes large format tiles, mosaics, or specialty sizes, which may require additional cutting, layout, and labor. Mosaic tiles on 12x12 sheets are included and do not require additional cost.` |

---

### 12. Specialty Tile Material *(child of Tile Branch)*

| Field | Value |
|---|---|
| **Code** | `Tile-Material` |
| **Name** | `Specialty Tile Material` |
| **Alias** | `Specialty Tile Material` |
| **Category** | Tile |
| **Question Type** | `GREEN` |
| **Unit Type** | `PER_SQFT` |
| **Base Price** | `15` |
| **Markup** | `20` |
| **Client Price** | `18` *(auto)* |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Tile-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Installation of ceramic and porcelain tile is included in the base scope. Installation of natural stone (marble, travertine, granite, etc.) or handmade tiles requires additional labor. Do you plan to use either of these materials? If yes, enter the total square footage of all areas where they will be installed.` |
| **Tips** | `Natural stone and handmade tiles require more preparation, sealing, and precision, which increases installation cost.` |

---

### 13. Specialty Tile Pattern *(child of Tile Branch)*

| Field | Value |
|---|---|
| **Code** | `Tile-Patterns` |
| **Name** | `Specialty Tile Pattern` |
| **Alias** | `Specialty Tile Pattern` |
| **Category** | Tile |
| **Question Type** | `GREEN` |
| **Unit Type** | `PER_SQFT` |
| **Base Price** | `25` |
| **Markup** | `20` |
| **Client Price** | `30` *(auto)* |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Tile-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Installation of standard tile patterns (such as subway, brick, or stacked) is included in the base scope. Specialty patterns such as herringbone, chevron, mosaics, accents, or other custom layouts require additional labor. Do you plan to install any specialty tile patterns? If yes, enter the total square footage of those areas.` |
| **Tips** | `1) To calculate square footage: multiply length × width for floors/ceilings, or length × height for walls. Measure each area separately and add them together. - 2) Specialty tile patterns can vary in cost based on complexity. This is a good placeholder for budgeting. Let us know in the notes at the end what you're considering, and we can review and finalize pricing.` |

---

### 14. Tile Baseboards *(child of Tile Branch)*

| Field | Value |
|---|---|
| **Code** | `Tile-Baseboards` |
| **Name** | `Tile Baseboards` |
| **Alias** | `Tile Baseboards` |
| **Category** | Tile |
| **Question Type** | `GREEN` |
| **Unit Type** | `PER_LF` |
| **Base Price** | `15` |
| **Markup** | `20` |
| **Client Price** | `18` *(auto)* |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Tile-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install tile baseboards along perimeter of bathroom, including cutting, setting, grouting, and caulking at wall transition` |
| **Tips** | `Tile baseboards are measured by linear footage around the bathroom perimeter. To calculate, measure the length of each wall in feet, add them together, and subtract door openings for an accurate total.` |

---

### 15. Niche/Ledge *(child of Tile Branch)*

| Field | Value |
|---|---|
| **Code** | `Tile-Niche` |
| **Name** | `Niche/Ledge` |
| **Alias** | `Niche/Ledge` |
| **Category** | Tile |
| **Question Type** | `BLUE` |
| **Base Price** | `300` |
| **Markup** | `20` |
| **Client Price** | `360` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Tile-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Reframe wall studs as needed to accommodate installation of shower niche or ledge, including cutting, reinforcing, and securing framing for proper support` |
| **Tips** | `Installing a shower niche or ledge requires modifying existing wall framing. This may involve cutting and reinforcing studs to create proper support and ensure the niche or ledge is securely and correctly positioned.` |

---

### 16. Bench *(child of Tile Branch)*

| Field | Value |
|---|---|
| **Code** | `Tile-Bench` |
| **Name** | `Bench` |
| **Alias** | `Niche/Ledge` |
| **Category** | Tile |
| **Question Type** | `BLUE` |
| **Base Price** | `300` |
| **Markup** | `20` |
| **Client Price** | `360` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Tile-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Reframe wall studs as needed to accommodate installation of shower bench, including cutting, reinforcing, and securing framing for proper support` |
| **Tips** | `Installing a shower bench requires modifying existing wall framing. This may involve cutting and reinforcing studs to create proper support and ensure the bench is securely and correctly positioned.` |

---

## PAINT UPGRADES

---

### 17. Paint Options (Branch)

| Field | Value |
|---|---|
| **Code** | `Paint-Branch` |
| **Name** | `Do you have any additional paint or wallpaper needs?` |
| **Alias** | `DO NOT INCLUDE IN PRICE SUMMARY` |
| **Category** | Paint |
| **Question Type** | `BLUE` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |
| **Tips** | `Select "Yes" if you have any additional paint or wallpaper needs so they can be included and priced accurately in your project scope.` |

---

### 18. Multiple Paint Colors *(child of Paint Branch)*

| Field | Value |
|---|---|
| **Code** | `Paint-Multiple-Paint-Colors` |
| **Name** | `How many different paint colors are you planning to have on the bathroom walls?` |
| **Alias** | `Multiple Paint Colors` |
| **Category** | Paint |
| **Question Type** | `ORANGE` |
| **Unit Type** | `PER_EACH` |
| **Base Price** | `75` |
| **Markup** | `20` |
| **Client Price** | `90` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Paint-Branch` |
| **Show When Parent Value** | `true` |
| **Tips** | `Using multiple paint colors in one bathroom increases material usage and labor, which results in additional costs.` |

> Add ORANGE options: 2 Colors ($180), 3 Colors ($270), 4 Colors ($360)

---

### 19. Wallpaper Install *(child of Paint Branch)*

| Field | Value |
|---|---|
| **Code** | `Wallcovering-Wallpaper` |
| **Name** | `Wallpaper Install` |
| **Alias** | `Wallpaper Install` |
| **Category** | Paint |
| **Question Type** | `BLUE` |
| **Base Price** | `800` |
| **Markup** | `20` |
| **Client Price** | `960` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Paint-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Measure and cut wallpaper to fit designated areas for glue-down installation, ensuring proper alignment and pattern continuity - Placeholder for budgeting - Final price depends on number of rolls and pattern repeat` |
| **Tips** | `Wallpaper pattern repeat affects how many rolls are needed. Larger or complex repeats create more material waste, which can increase the total quantity required.` |

---

### 20. Refinish Vanity Branch *(child of Paint Branch)*

| Field | Value |
|---|---|
| **Code** | `Paint-Refinish-Branch` |
| **Name** | `Refinish Vanity` |
| **Alias** | `DO NOT INCLUDE IN PRICE SUMMARY` |
| **Category** | Paint |
| **Question Type** | `BLUE` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |
| **Parent** | `Paint-Branch` |
| **Show When Parent Value** | `true` |

> After creating, add 2 ORANGE options to this cost code (client can only select one):

| Option Name | Price Modifier |
|---|---|
| Refinish Single Vanity | 720 |
| Refinish Double Vanity | 960 |

---

### 21. Refinish Single Vanity *(ORANGE option — add via Cost Code Options)*

| Field | Value |
|---|---|
| **Code** | `Paint-Refinish-Single-Vanity` |
| **Name** | `Refinish Single Vanity` |
| **Alias** | `Refinish Vanity` |
| **Category** | Paint |
| **Question Type** | `ORANGE` |
| **Base Price** | `600` |
| **Markup** | `20` |
| **Client Price** | `720` |
| **BT Export** | ✅ |
| **Description** | `Refinish existing single vanity, including surface preparation, sanding, minor repairs, priming, and application of new finish/paint - Install hardware in existing holes` |
| **Tips** | `Refinishing updates the appearance of your vanity but does not change its structure or layout. Existing wear, door alignment, and cabinet condition can affect the final result.` |

---

### 22. Refinish Double Vanity *(ORANGE option — add via Cost Code Options)*

| Field | Value |
|---|---|
| **Code** | `Paint-Refinish-Double-Vanity` |
| **Name** | `Refinish Double Vanity` |
| **Alias** | `Refinish Vanity` |
| **Category** | Paint |
| **Question Type** | `ORANGE` |
| **Base Price** | `800` |
| **Markup** | `20` |
| **Client Price** | `960` |
| **BT Export** | ✅ |
| **Description** | `Refinish existing double vanity, including surface preparation, sanding, minor repairs, priming, and application of new finish/paint - Install hardware in existing holes` |
| **Tips** | `Refinishing updates the appearance of your vanity but does not change its structure or layout. Existing wear, door alignment, and cabinet condition can affect the final result.` |

---

## GLASS UPGRADES

---

### 23. Door and Panel (Branch)

| Field | Value |
|---|---|
| **Code** | `Glass-Door-Panel-Branch` |
| **Name** | `Door and Panel` |
| **Alias** | `Door and Panel` |
| **Category** | Glass |
| **Question Type** | `BLUE` |
| **Base Price** | `1750` |
| **Markup** | `20` |
| **Client Price** | `2100` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Description** | `Purchase, measure, and fabricate 1/2" clear glass for shower door and stationary panel, based on a standard size of 60" x 80" - Hardware finish can be selected to match your bathroom fixtures` |
| **Tips** | `1) Upgraded handle styles beyond the standard "C" handle are available at an additional cost. - 2) Doors can be configured to swing in and out for easier access and cleaning.` |

> After creating, add the following child options:

---

### 24. Low Iron — Door and Panel *(child of Door and Panel Branch)*

| Field | Value |
|---|---|
| **Code** | `Glass-Door-Panel-Low-Iron` |
| **Name** | `Low Iron (Door and Panel)` |
| **Alias** | `Low Iron` |
| **Category** | Glass |
| **Question Type** | `BLUE` |
| **Base Price** | `560` |
| **Markup** | `20` |
| **Client Price** | `672` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Glass-Door-Panel-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install Low Iron (ultra-clear) glass for standard-sized shower door and panel` |
| **Tips** | `Low iron glass is ultra-clear and has less of the green tint found in standard glass, making tile colors and finishes appear more true and vibrant.` |

---

### 25. Towel Bar — Door and Panel *(child of Door and Panel Branch)*

| Field | Value |
|---|---|
| **Code** | `Glass-Towel-Bar-Door-Panel` |
| **Name** | `Towel Bar (Door and Panel)` |
| **Alias** | `Towel Bar` |
| **Category** | Glass |
| **Question Type** | `BLUE` |
| **Base Price** | `180` |
| **Markup** | `20` |
| **Client Price** | `216` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Glass-Door-Panel-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install towel bar on shower glass door or stationary panel` |
| **Tips** | `Towel bars mounted on glass help save wall space and keep towels within easy reach, but their placement should be planned carefully to avoid interfering with door movement or handle clearance.` |

---

### 26. Sliding Door (Branch)

| Field | Value |
|---|---|
| **Code** | `Glass-Sliding-Door-Branch` |
| **Name** | `Sliding Door` |
| **Alias** | `Sliding Door` |
| **Category** | Glass |
| **Question Type** | `BLUE` |
| **Base Price** | `2250` |
| **Markup** | `20` |
| **Client Price** | `2700` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Description** | `Purchase, fabricate, and install 3/8" Serenity sliding glass door with stationary panel, based on standard size of 60" x 80" - Hardware finish can be selected to match your bathroom fixtures` |
| **Tips** | `This option can be configured as either two sliding doors or a bypass system. See option below.` |

> After creating, add the following child options:

---

### 27. Bypass System *(child of Sliding Door Branch)*

| Field | Value |
|---|---|
| **Code** | `Glass-Bypass-System` |
| **Name** | `Bypass System` |
| **Alias** | `Bypass System` |
| **Category** | Glass |
| **Question Type** | `BLUE` |
| **Base Price** | `200` |
| **Markup** | `20` |
| **Client Price** | `240` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Glass-Sliding-Door-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install bypass system to accommodate two sliding glass panels` |
| **Tips** | `A bypass system allows both panels to slide, providing flexible access from either side.` |

---

### 28. Low Iron — Sliding Door *(child of Sliding Door Branch)*

| Field | Value |
|---|---|
| **Code** | `Glass-Sliding-Door-Low-Iron` |
| **Name** | `Low Iron (Sliding Door)` |
| **Alias** | `Low Iron` |
| **Category** | Glass |
| **Question Type** | `BLUE` |
| **Base Price** | `560` |
| **Markup** | `20` |
| **Client Price** | `672` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Glass-Sliding-Door-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install Low Iron (ultra-clear) glass for standard-sized sliding door` |
| **Tips** | `Low iron glass is ultra-clear and has less of the green tint found in standard glass, making tile colors and finishes appear more true and vibrant.` |

---

### 29. Towel Bar — Sliding Door *(child of Sliding Door Branch)*

| Field | Value |
|---|---|
| **Code** | `Glass-Towel-Bar-Sliding` |
| **Name** | `Towel Bar (Sliding Door)` |
| **Alias** | `Towel Bar` |
| **Category** | Glass |
| **Question Type** | `BLUE` |
| **Base Price** | `180` |
| **Markup** | `20` |
| **Client Price** | `216` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Glass-Sliding-Door-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install towel bar on shower sliding door` |
| **Tips** | `Towel bars mounted on glass help save wall space and keep towels within easy reach, but their placement should be planned carefully to avoid interfering with door movement or handle clearance.` |

---

### 30. Stationary Panel (Branch)

| Field | Value |
|---|---|
| **Code** | `Glass-Stationary-Panel-Branch` |
| **Name** | `Stationary Panel` |
| **Alias** | `Stationary Panel` |
| **Category** | Glass |
| **Question Type** | `BLUE` |
| **Base Price** | `1200` |
| **Markup** | `20` |
| **Client Price** | `1440` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Description** | `Purchase, fabricate, and install 1/2" stationary glass panel (approximately 30" wide based on a 60" opening) - Hardware finish can be selected to match your bathroom fixtures` |
| **Tips** | `Stationary panels can be installed as fixed glass or configured to swing in and out for easier access and cleaning.` |

> After creating, add the following child options:

---

### 31. Low Iron — Stationary Panel *(child of Stationary Panel Branch)*

| Field | Value |
|---|---|
| **Code** | `Glass-Stationary-Panel-Low-Iron` |
| **Name** | `Low Iron (Stationary Panel)` |
| **Alias** | `Low Iron` |
| **Category** | Glass |
| **Question Type** | `BLUE` |
| **Base Price** | `280` |
| **Markup** | `20` |
| **Client Price** | `336` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Glass-Stationary-Panel-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install Low Iron (ultra-clear) glass for standard-sized stationary panel` |
| **Tips** | `Low iron glass is ultra-clear and has less of the green tint found in standard glass, making tile colors and finishes appear more true and vibrant.` |

---

### 32. Towel Bar — Stationary Panel *(child of Stationary Panel Branch)*

| Field | Value |
|---|---|
| **Code** | `Glass-Towel-Bar-Stationary` |
| **Name** | `Towel Bar (Stationary Panel)` |
| **Alias** | `Towel Bar` |
| **Category** | Glass |
| **Question Type** | `BLUE` |
| **Base Price** | `180` |
| **Markup** | `20` |
| **Client Price** | `216` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Glass-Stationary-Panel-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install towel bar on stationary panel` |
| **Tips** | `Towel bars mounted on glass help save wall space and keep towels within easy reach, but their placement should be planned carefully to avoid interfering with door movement or handle clearance.` |

---

## IMPORTANT NOTES

- All upgrade options must be added to **ALL 4 services** (TP, TPS, TPT, FP)
- Branch questions with `Exclude From Export = ✅` are shown in estimator but NOT sent to Buildertrend
- ORANGE type items need **Cost Code Options** added after creation
- Parent-child relationships must be set using **Parent Question** + **Show When Parent Value = true**
- BT Export = Yes means `excludeFromExport = ❌`
- BT Export = No means `excludeFromExport = ✅`
- Glass Branch items (Door and Panel, Sliding Door, Stationary Panel) each have their own child options — add children AFTER the parent is created
