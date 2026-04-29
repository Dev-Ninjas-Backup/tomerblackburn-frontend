# Upgrade Options — Cost Code Entry Guide
# (Universal — applies to ALL bathroom types)

## How to Add
Dashboard → Cost Management → Cost Codes → **Add Cost Code**

For all entries:
- **Service:** Select the specific bathroom type (add each upgrade to ALL 4 services)
- **Step:** 1 (Rough)
- **Is Included In Base:** ❌
- **Is Optional:** ✅
- **Is Active:** ✅

---

## DEMOLITION UPGRADES

---

### 1. Wall/Ceiling Tile Removal (Branch)

| Field | Value |
|---|---|
| **Code** | `Demo-WallTile-Branch` |
| **Name** | `Is there any wall or ceiling tile being removed?` |
| **Category** | Demolition |
| **Question Type** | `BLUE` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |
| **Tips** | `Is there any tile to be removed beyond the bathroom floor?` |

---

### 2. Tile Removal *(child of Wall/Ceiling Tile Branch)*

| Field | Value |
|---|---|
| **Code** | `Demo-Tile-Removal` |
| **Name** | `How many square feet of tile need to be removed?` |
| **Alias** | `Tile Removal` |
| **Category** | Demolition |
| **Question Type** | `GREEN` |
| **Unit Type** | `PER_SQFT` |
| **Base Price** | `20` |
| **Markup** | `20` |
| **Client Price** | `24` *(auto)* |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ❌ |
| **Parent** | `Demo-WallTile-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Remove tile from designated areas - Dispose of demolition debris off site - Install drywall where tile was removed - Tape, mud, and sand new drywall - Prime new drywall for paint` |
| **Tips** | `1) Square footage = length × width (measure each area and add them together if needed) - 2) If walls are plaster, include the full wall and ceiling area—not just tiled areas—as plaster does not blend with new drywall and must be fully replaced` |

---

## PLUMBING UPGRADES

---

### 3. Water Shut Off Valves

| Field | Value |
|---|---|
| **Code** | `Plumbing-Shut-Off-Valves` |
| **Name** | `Water Shut Off Valves` |
| **Alias** | `Water Shut Off` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Base Price** | `250` |
| **Markup** | `20` |
| **Client Price** | `300` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Description** | `Install water shut-off valves in accessible location within bathroom or behind access panel.` |
| **Tips** | `Shut-off valves are required in high-rise buildings and recommended in all bathrooms to isolate water when needed. Installation requires shutting off water to the unit or building for 2–3 hours.` |

---

### 4. Additional Plumbing Branch

| Field | Value |
|---|---|
| **Code** | `Plumbing-Branch` |
| **Name** | `Do you need any additional plumbing work beyond the scope listed above?` |
| **Alias** | `DO NOT INCLUDE IN PRICE SUMMARY` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |

---

### 5. Change Tub Style Branch *(child of Plumbing Branch)*

| Field | Value |
|---|---|
| **Code** | `Plumbing-TubStyle-Branch` |
| **Name** | `Change Tub Style (Alcove is included)` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **Is Included In Base** | ❌ |
| **Exclude From Export** | ✅ |
| **Is Optional** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |

> After creating, add 3 ORANGE options to this cost code:

| Option Name | Price Modifier |
|---|---|
| Drop In Tub | 960 |
| Freestanding Tub | 1920 |
| Jetted Tub | 1920 |

---

### 6. Drop In Tub *(ORANGE option — add via Cost Code Options)*

| Field | Value |
|---|---|
| **Code** | `Plumbing-Drop-In-Tub` |
| **Name** | `Drop In Tub` |
| **Alias** | `Drop In Tub` |
| **Category** | Plumbing |
| **Question Type** | `ORANGE` |
| **Base Price** | `800` |
| **Markup** | `20` |
| **Client Price** | `960` |
| **BT Export** | ✅ |
| **Description** | `Frame opening for drop-in tub in existing location - Install cement board on tub apron and prepare for tile - Install tile on tub apron` |
| **Tips** | `Drop-in tubs may require an access panel for future maintenance` |

---

### 7. Freestanding (Soaking) Tub

| Field | Value |
|---|---|
| **Code** | `Plumbing-Freestanding-Tub` |
| **Name** | `Freestanding (Soaking) Tub` |
| **Alias** | `Freestanding Tub` |
| **Category** | Plumbing |
| **Question Type** | `ORANGE` |
| **Base Price** | `1600` |
| **Markup** | `20` |
| **Client Price** | `1920` |
| **BT Export** | ✅ |
| **Description** | `Relocate drain as needed for freestanding tub - Patch plywood subfloor as needed after relocation - Install tub filler (floor- or wall-mounted) - Install tile under freestanding tub - *May not be feasible in high-rise buildings or where concrete subfloors exist` |
| **Tips** | `A minimum of 6" clearance is recommended between freestanding tubs and surrounding walls` |

---

### 8. Jetted Tub

| Field | Value |
|---|---|
| **Code** | `Plumbing-Jacuzzi-Tub` |
| **Name** | `Jetted Tub` |
| **Alias** | `Jetted Tub` |
| **Category** | Plumbing |
| **Question Type** | `ORANGE` |
| **Base Price** | `1600` |
| **Markup** | `20` |
| **Client Price** | `1920` |
| **BT Export** | ✅ |
| **Description** | `Install jetted (jacuzzi) tub in existing tub location and connect to drain - Install tub faucet and controls - Connect water supply and test jet system for proper operation - *May not be feasible in high-rise buildings or where concrete subfloors exist` |
| **Tips** | `Jetted tubs may require an access panel for future maintenance` |

---

### 9. Relocate Tub

| Field | Value |
|---|---|
| **Code** | `Plumbing-Relocate-Tub` |
| **Name** | `Relocate Tub` |
| **Alias** | `Relocate Tub` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Base Price** | `800` |
| **Markup** | `20` |
| **Client Price** | `960` |
| **BT Export** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Open subfloor to relocate tub drain and water supply within 6 feet - Patch plywood subfloor after relocation - *May not be feasible in high-rise buildings or where concrete subfloors exist` |
| **Tips** | `Feasibility will be determined on site after demolition - If relocation exceeds 6 feet, select this option and provide details in the notes section at the end` |

---

### 10. Relocate Shower

| Field | Value |
|---|---|
| **Code** | `Plumbing-Relocate-Shower` |
| **Name** | `Relocate Shower` |
| **Alias** | `Relocate Shower` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Base Price** | `800` |
| **Markup** | `20` |
| **Client Price** | `960` |
| **BT Export** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Open subfloor to relocate shower drain and water supply within 6 feet - Patch plywood subfloor after relocation - *May not be feasible in high-rise buildings or where concrete subfloors exist` |
| **Tips** | `Feasibility will be determined on site after demolition - If relocation exceeds 6 feet, select this option and provide details in the notes section at the end` |

---

### 11. Convert to Wall-Hung Toilet

| Field | Value |
|---|---|
| **Code** | `Plumbing-Wall-Hung-Toilet` |
| **Name** | `Convert to Wall-Hung Toilet` |
| **Alias** | `Wall Hung Toilet` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Base Price** | `1800` |
| **Markup** | `20` |
| **Client Price** | `2160` |
| **BT Export** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Requires wall framing, installation of in-wall carrier system, and plumbing modifications - *Option not applicable in high-rise buildings or where concrete subfloors exist` |
| **Tips** | `An existing wall-mounted toilet setup is different from a new wall-hung system, which requires in-wall framing, a carrier system, and plumbing modifications. Example: Toto` |

---

### 12. Toilet with Built in Bidet (Washlet)

| Field | Value |
|---|---|
| **Code** | `Plumbing-Washlet` |
| **Name** | `Toilet with Built in Bidet (Washlet)` |
| **Alias** | `Washlet` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Base Price** | `500` |
| **Markup** | `20` |
| **Client Price** | `600` |
| **BT Export** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install bidet seat (washlet) on existing toilet - Connect to water supply and test for proper operation` |
| **Tips** | `Bidet seat attachments are different and do not require additional plumbing labor cost` |

---

### 13. Relocate Sink/Vanity

| Field | Value |
|---|---|
| **Code** | `Plumbing-Sink-Move` |
| **Name** | `Relocate Sink/Vanity` |
| **Alias** | `Relocate Sink` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Base Price** | `800` |
| **Markup** | `20` |
| **Client Price** | `960` |
| **BT Export** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Relocate sink plumbing within 6 feet of existing location - Modify plumbing as required for new location - Patch walls as needed after relocation` |
| **Tips** | `If relocation exceeds 6 feet, select this option and provide details in the notes section at the end` |

---

### 14. Convert Single to Double Vanity

| Field | Value |
|---|---|
| **Code** | `Plumbing-Double-Vanity-Convert` |
| **Name** | `Convert Single to Double Vanity` |
| **Alias** | `Convert to Double Vanity` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Base Price** | `600` |
| **Markup** | `20` |
| **Client Price** | `720` |
| **BT Export** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install additional water supply and drain lines for second sink - Connect double vanity in existing or relocated location` |
| **Tips** | `1) Price assumes sufficient space and layout clearance for a double vanity. - 2) If you currently have a double vanity, don't select this, but let us know in the notes section at the end` |

---

### 15. Wall Mounted Faucets

| Field | Value |
|---|---|
| **Code** | `Plumbing-Wall-Faucets` |
| **Name** | `Wall Mounted Faucets` |
| **Alias** | `Wall Mounted Faucet(s)` |
| **Category** | Plumbing |
| **Question Type** | `ORANGE` |
| **Unit Type** | `PER_EACH` |
| **Base Price** | `300` |
| **Markup** | `20` |
| **Client Price** | `360` |
| **BT Export** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Relocate plumbing to accommodate wall-mounted faucet(s) - Modify water supply and drain as required for existing or relocated vanity` |
| **Tips** | `Keep this in mind when answering electrical questions, as fixture locations may impact lighting and outlet placement.` |

> Add ORANGE options: 1 Faucet ($360), 2 Faucets ($720)

---

### 16. Handheld Shower Wand

| Field | Value |
|---|---|
| **Code** | `Plumbing-Hand-Wand` |
| **Name** | `Handheld Shower Wand` |
| **Alias** | `Hand Wand(s)` |
| **Category** | Plumbing |
| **Question Type** | `ORANGE` |
| **Unit Type** | `PER_EACH` |
| **Base Price** | `250` |
| **Markup** | `20` |
| **Client Price** | `300` |
| **BT Export** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install rough plumbing with diverter and mixing valve for handheld shower wand(s) on existing plumbing wall - Connect handheld shower fixture(s) and test for proper operation` |
| **Tips** | `Want more than two handhelds or one on each side? Just add details in the notes section` |

> Add ORANGE options: 1 Wand ($300), 2 Wands ($600)

---

### 17. Body Sprays

| Field | Value |
|---|---|
| **Code** | `Plumbing-Body-Spray` |
| **Name** | `Body Sprays` |
| **Alias** | `Body Spray(s)` |
| **Category** | Plumbing |
| **Question Type** | `ORANGE` |
| **Unit Type** | `PER_EACH` |
| **Base Price** | `500` |
| **Markup** | `20` |
| **Client Price** | `600` |
| **BT Export** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install rough plumbing for body spray(s) - Install diverter valve as required for body spray system` |
| **Tips** | `Body sprays require additional plumbing, valves, and sufficient water pressure; system upgrades may be needed` |

> Add ORANGE options: 1 ($600), 2 ($1200), 3 ($1800), 4 ($2400)

---

### 18. Steam Shower

| Field | Value |
|---|---|
| **Code** | `Plumbing-Steam-Shower` |
| **Name** | `Steam Shower` |
| **Alias** | `Steam Shower Allowance` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Base Price** | `5000` |
| **Markup** | `20` |
| **Client Price** | `6000` |
| **BT Export** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install steam generator unit in designated location - Connect water supply from unit to steam shower - Install electrical outlet and dedicated circuit for steam unit - Install tile on shower walls and ceiling for steam application - Install full-height glass enclosure to ceiling for steam containment - *This cost is an allowance. Consultation required.` |
| **Tips** | `Steam shower installation costs vary based on project conditions; final design and pricing will be reviewed during consultation` |

---

### 19. Replace Galvanized Pipes (Bathroom Only)

| Field | Value |
|---|---|
| **Code** | `Plumbing-Galvanized-to-Copper` |
| **Name** | `Replace Galvanized Pipes (Bathroom Only)` |
| **Alias** | `Galvanized Pipes` |
| **Category** | Plumbing |
| **Question Type** | `BLUE` |
| **Base Price** | `900` |
| **Markup** | `20` |
| **Client Price** | `1080` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Parent** | `Plumbing-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Remove and replace existing galvanized piping with copper piping within bathroom area only. Modify water supply and connections as needed. Final scope and pricing to be confirmed after demolition. Labor and materials included.` |
| **Tips** | `If you have other exposed galvanized piping (such as in a basement), this is a good time to consider upgrading those sections as well. Please note it in the comments if applicable.` |

---

## ELECTRIC UPGRADES

---

### 20. Additional Electric Branch

| Field | Value |
|---|---|
| **Code** | `Electric-Trip-Charge` |
| **Name** | `Do you need any additional electrical work beyond the scope listed above?` |
| **Alias** | `Electrician Trip Charge` |
| **Category** | Electric |
| **Question Type** | `BLUE` |
| **Base Price** | `400` |
| **Markup** | `20` |
| **Client Price** | `480` |
| **BT Export** | ✅ |
| **Exclude From Export** | ❌ |
| **Is Optional** | ✅ |
| **Description** | `This additional trip charge covers the work required for any of the upgrade options below. **Electrical costs may vary based on existing conditions, wiring discovered during demolition, re-routing requirements, junction boxes, and circuit capacity. Electrical panel work is not included` |
| **Tips** | `Even minor electrical changes require an additional electrician trip` |

---

### 21. Add New Outlets or Switch

| Field | Value |
|---|---|
| **Code** | `Electric-Add-Outlets` |
| **Name** | `Add new outlets or switch` |
| **Alias** | `New Outlet/Switch` |
| **Category** | Electric |
| **Question Type** | `ORANGE` |
| **Unit Type** | `PER_EACH` |
| **Base Price** | `300` |
| **Markup** | `20` |
| **Client Price** | `360` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Open drywall as needed to add conduit and wiring for outlet or switch - Patch drywall after electrical work - Pricing may vary based on the number of wires present in existing outlets or switches` |
| **Tips** | `Will your toilet or tub require an electrical outlet?` |

> Add ORANGE options: 1-6 units ($360 each)

---

### 22. Relocate Existing Outlets or Switches

| Field | Value |
|---|---|
| **Code** | `Electric-Relocate-Outlet` |
| **Name** | `Relocate existing outlets or switches` |
| **Alias** | `Relocate Outlet/Switch` |
| **Category** | Electric |
| **Question Type** | `ORANGE` |
| **Unit Type** | `PER_EACH` |
| **Base Price** | `200` |
| **Markup** | `20` |
| **Client Price** | `240` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Open drywall as needed to relocate wiring for outlet or switch - Patch drywall after electrical work - Pricing may vary based on the number of wires present in existing outlets or switches` |
| **Tips** | `Will your toilet or tub require an electrical outlet?` |

> Add ORANGE options: 1-6 units ($240 each)

---

### 23. Add Recessed Lighting Branch

| Field | Value |
|---|---|
| **Code** | `Electric-Recessed-Branch` |
| **Name** | `Add recessed lighting` |
| **Category** | Electric |
| **Question Type** | `BLUE` |
| **Base Price** | `0` |
| **Markup** | `0` |
| **Client Price** | `0` |
| **BT Export** | ❌ |
| **Exclude From Export** | ✅ |
| **Parent** | `Electric-Branch` |
| **Show When Parent Value** | `true` |

---

### 24. Install 2" Recessed Can Lights

| Field | Value |
|---|---|
| **Code** | `Electrical-2-Inch-Cans` |
| **Name** | `Install 2" recessed can lights with new switch` |
| **Alias** | `2" Recessed Can(s)` |
| **Category** | Electric |
| **Question Type** | `ORANGE` |
| **Unit Type** | `PER_EACH` |
| **Base Price** | `300` |
| **Markup** | `20` |
| **Client Price** | `360` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Recessed-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install 2" recessed can light in new location with switch - Patch drywall after installation` |
| **Tips** | `2" recessed lights alone may not be enough to fully light a bathroom` |

> Add ORANGE options: 1-6 units ($360 each)

---

### 25. Install 4" Recessed Can Lights

| Field | Value |
|---|---|
| **Code** | `Electrical-4-Inch-Cans` |
| **Name** | `Install 4" recessed can lights with new switch` |
| **Alias** | `4" Recessed Can(s)` |
| **Category** | Electric |
| **Question Type** | `ORANGE` |
| **Unit Type** | `PER_EACH` |
| **Base Price** | `300` |
| **Markup** | `20` |
| **Client Price** | `360` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Recessed-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install 4" recessed can light in new location with switch - Patch drywall after installation` |
| **Tips** | `4" recessed lights are a great all-around option for balanced bathroom lighting` |

> Add ORANGE options: 1-6 units ($360 each)

---

### 26. Install 6" Recessed Can Lights

| Field | Value |
|---|---|
| **Code** | `Electrical-6-Inch-Cans` |
| **Name** | `Install 6" recessed can lights with new switch` |
| **Alias** | `6" Recessed Can(s)` |
| **Category** | Electric |
| **Question Type** | `ORANGE` |
| **Unit Type** | `PER_EACH` |
| **Base Price** | `300` |
| **Markup** | `20` |
| **Client Price** | `360` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Recessed-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install 6" recessed can light in new location with switch - Patch drywall after installation` |
| **Tips** | `6" recessed lights provide the most light coverage but may feel too bright in smaller bathrooms.` |

> Add ORANGE options: 1-6 units ($360 each)

---

### 27. Add Ceiling Light Fixture with New Switch

| Field | Value |
|---|---|
| **Code** | `Electric-Add-Ceiling-Light` |
| **Name** | `Add ceiling light fixture with new switch` |
| **Alias** | `Add Ceiling Light` |
| **Category** | Electric |
| **Question Type** | `BLUE` |
| **Base Price** | `500` |
| **Markup** | `20` |
| **Client Price** | `600` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install new ceiling light and switch in new location - Open drywall as needed to run new wiring - Patch wall and ceiling after electrical work` |
| **Tips** | `This is to add a new light, not replace an existing light, which is already included in the scope` |

---

### 28. Install Sconces Instead of Vanity Light

| Field | Value |
|---|---|
| **Code** | `Electric-Add-Sconces` |
| **Name** | `Install sconces instead of vanity light` |
| **Alias** | `Sconces` |
| **Category** | Electric |
| **Question Type** | `ORANGE` |
| **Unit Type** | `PER_EACH` |
| **Base Price** | `200` |
| **Markup** | `20` |
| **Client Price** | `240` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Rewire existing vanity light to install sconce(s) on existing switch - Patch walls after electrical work` |
| **Tips** | `Sconces are typically installed on either side of the mirror, while vanity lights are mounted above` |

> Add ORANGE options: 1-4 units ($240 each)

---

### 29. Add Vanity Light with Switch

| Field | Value |
|---|---|
| **Code** | `Electric-Add-Vanity-Light` |
| **Name** | `Add Vanity Light with Switch` |
| **Alias** | `Add Vanity Light` |
| **Category** | Electric |
| **Question Type** | `BLUE` |
| **Base Price** | `500` |
| **Markup** | `20` |
| **Client Price** | `600` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Open walls as needed to run new wiring for vanity light and switch - Install vanity light in new location with switch - Patch walls after electrical work` |
| **Tips** | `This is for adding a new vanity light, not replacing an existing one, which is included in the scope` |

---

### 30. Convert One Vanity Light into Two

| Field | Value |
|---|---|
| **Code** | `Electric-Split-Vanity-Light` |
| **Name** | `Convert One Vanity Light into Two` |
| **Alias** | `Second Vanity Light` |
| **Category** | Electric |
| **Question Type** | `BLUE` |
| **Base Price** | `500` |
| **Markup** | `20` |
| **Client Price** | `600` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Open walls as needed to run new wiring for second vanity light on existing switch - Install vanity lights in new locations - Patch walls after electrical work` |
| **Tips** | `This is to convert one existing vanity light into two separate vanity lights.` |

---

### 31. Install Dimmer Switches

| Field | Value |
|---|---|
| **Code** | `Electric-Dimmers` |
| **Name** | `Install dimmer switches` |
| **Alias** | `Dimmers` |
| **Category** | Electric |
| **Question Type** | `ORANGE` |
| **Unit Type** | `PER_EACH` |
| **Base Price** | `75` |
| **Markup** | `20` |
| **Client Price** | `90` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Replace existing switches with dimmer switches in same locations` |
| **Tips** | `Not all dimmers are compatible with all light fixtures.` |

> Add ORANGE options: 1-4 units ($90 each)

---

### 32. Install LED Mirror

| Field | Value |
|---|---|
| **Code** | `Electric-LED-Mirror` |
| **Name** | `Install LED mirror` |
| **Alias** | `LED Mirror` |
| **Category** | Electric |
| **Question Type** | `BLUE` |
| **Base Price** | `200` |
| **Markup** | `20` |
| **Client Price** | `240` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install electrical connection to hardwire LED mirror` |
| **Tips** | `LED mirrors should be hardwired with a disconnect for safety and maintenance` |

---

### 33. Install Heated Floors

| Field | Value |
|---|---|
| **Code** | `Electric-Heated-Floors` |
| **Name** | `Install heated floors` |
| **Alias** | `Heated Floors Allowance` |
| **Category** | Electric |
| **Question Type** | `BLUE` |
| **Base Price** | `2000` |
| **Markup** | `20` |
| **Client Price** | `2400` |
| **BT Export** | ✅ |
| **Parent** | `Electric-Branch` |
| **Show When Parent Value** | `true` |
| **Description** | `Install new dedicated electrical circuit for heated floor system - Install Schluter Ditra heating system and run heating cables - Install thermostat and connect system - Prepare floor for tile installation - Pricing may vary based on existing site conditions and size of heated area` |
| **Tips** | `Electrical panel work not included, if needed` |

---

## HVAC UPGRADES

---

### 34. Replace Exhaust Fan

| Field | Value |
|---|---|
| **Code** | `HVAC-Replace-Exhaust-Fan` |
| **Name** | `Replace Exhaust Fan` |
| **Alias** | `None` |
| **Category** | HVAC |
| **Question Type** | `BLUE` |
| **Base Price** | `400` |
| **Markup** | `20` |
| **Client Price** | `480` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Description** | `Replace existing exhaust fan in existing location. Includes installation of standard exhaust fan. Price assumes existing ductwork is in working condition; modifications or replacement of ductwork not included.` |
| **Tips** | `Exhaust fan must vent to the exterior of the home. If existing ductwork is not properly vented or in working condition, additional work may be required.` |

---

### 35. Relocate Existing Exhaust Fan

| Field | Value |
|---|---|
| **Code** | `HVAC-Relocate-Exhaust-Fan` |
| **Name** | `Relocate existing Exhaust Fan` |
| **Alias** | `Relocate Exhaust Fan` |
| **Category** | HVAC |
| **Question Type** | `BLUE` |
| **Base Price** | `600` |
| **Markup** | `20` |
| **Client Price** | `720` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Description** | `Relocate existing exhaust fan to new location within bathroom. Connect to existing exterior vent. Includes installation of standard exhaust fan. Price assumes existing ductwork is in working condition; modifications or replacement of ductwork not included. Final pricing may vary based on feasibility after demolition.` |
| **Tips** | `Exhaust fan relocation depends on joist direction and access to an exterior vent. Final placement will be determined based on existing conditions.` |

---

### 36. Install New Exhaust Fan

| Field | Value |
|---|---|
| **Code** | `HVAC-New-Exhaust-Fan` |
| **Name** | `Install New Exhaust Fan` |
| **Alias** | `New Exhaust Fan` |
| **Category** | HVAC |
| **Question Type** | `BLUE` |
| **Base Price** | `1500` |
| **Markup** | `20` |
| **Client Price** | `1800` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Description** | `Install new exhaust fan in bathroom where one does not currently exist. Includes placeholder pricing; final cost and feasibility to be determined after site visit based on framing, electrical, and access to exterior venting.` |
| **Tips** | `Some high-rise buildings and condo associations do not allow installation of new exhaust fans. Please check building requirements if applicable.` |

---

### 37. Exhaust Fan with Features

| Field | Value |
|---|---|
| **Code** | `HVAC-Exhaust-Fan-Features` |
| **Name** | `Exhaust fan with features` |
| **Alias** | `Exhaust Fan W/ Function` |
| **Category** | HVAC |
| **Question Type** | `BLUE` |
| **Base Price** | `250` |
| **Markup** | `20` |
| **Client Price** | `300` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Description** | `Upgrade selected exhaust fan (from options above) to include additional features such as integrated light, Bluetooth speaker, humidity sensor, or other non-standard functions. Final pricing will vary based on selected model and installation requirements.` |
| **Tips** | `Upgraded exhaust fans with added features (light, speaker, sensors) require additional wiring or switches depending on the model.` |

---

### 38. Relocate HVAC Vent

| Field | Value |
|---|---|
| **Code** | `HVAC-Relocate-HVAC` |
| **Name** | `Relocate HVAC vent` |
| **Alias** | `Relocate HVAC` |
| **Category** | HVAC |
| **Question Type** | `BLUE` |
| **Base Price** | `800` |
| **Markup** | `20` |
| **Client Price** | `960` |
| **Is Included In Base** | ❌ |
| **BT Export** | ✅ |
| **Description** | `Relocate HVAC vent in floor or wall to new location within bathroom. Includes placeholder pricing; final cost and feasibility to be determined after demolition based on existing duct layout, framing, and access.` |
| **Tips** | `HVAC vent relocation depends on existing duct layout and joist direction. Final placement may be adjusted based on site conditions.` |

---

## IMPORTANT NOTES

- All upgrade options must be added to **ALL 4 services** (TP, TPS, TPT, FP)
- Branch questions with `Exclude From Export = ✅` are shown in estimator but NOT sent to Buildertrend
- ORANGE type items need **Cost Code Options** added after creation
- Parent-child relationships must be set using **Parent Question** + **Show When Parent Value = true**
- BT Export = Yes means `excludeFromExport = ❌`
- BT Export = No means `excludeFromExport = ✅`
