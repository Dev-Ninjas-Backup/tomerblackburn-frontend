# Client Notes & Questions — Tomer Blackburn

---

## ESTIMATOR & COST CODE QUESTIONS

---

**Q: Category order — red line = category name, should match estimator order**
> ✅ Done. Categories in the estimator follow the exact same order as defined in the spreadsheet. The red line category names are used as section headers in the estimator.

---

**Q: Title-only items (no cost code) should be treated as additional upgrades**
> ✅ Done. Any item listed as a title only without a cost code is treated as an upgrade option and referenced under the appropriate upgrade branch.

---

**Q: Base price should equal the sum of all "Included in Base Price" cost codes**
> ✅ Confirmed. The base price shown in the pricing summary is automatically calculated as the sum of all cost codes where "Included in Base Price = Yes." It is not a fixed number.

---

**Q: First couple of questions on each bathroom tab are in a different order by accident**
> ✅ Noted and handled carefully. The display order in the estimator follows the correct intended order, not the accidental order in the spreadsheet.

---

**Q: Dropdown with description for tub options and glass — when user selects one, show its description**
> ✅ This is already how the ORANGE question type works. When a user selects an option from the dropdown, the cost code's description is shown. Each tub option (Drop In, Freestanding, Jetted) and each glass option has its own description that appears upon selection.

---

**Q: "1–6" or similar should list all unit options individually, not as a range**
> ✅ Done. All ORANGE dropdown options are listed individually (1, 2, 3, 4, 5, 6) — not as a range.

---

**Q: Grammar inconsistencies throughout the spreadsheet**
> ✅ All cost code names, descriptions, and tips have been reviewed and written to be consistent and grammatically correct in the estimator.

---

**Q: Bold, italics, underline formatting in cost code descriptions**
> ⚠️ Currently the rich text editor supports basic formatting. This can be enabled in the description fields if needed — let us know which specific items need formatting and we'll apply it.

---

**Q: Images inside cost codes / near tip icon**
> ⚠️ Not currently supported natively in the cost code system. This could be added as a future enhancement — images could appear inside the tip popover or next to the cost code card. Let us know if this is a priority and we can scope it out.

---

**Q: Can the automated email response include a PDF attachment?**
> ✅ Yes, this is possible. The confirmation email can include a PDF summary of the estimate. The PDF generation is already built into the system — we just need to attach it to the outgoing email. This can be enabled.

---

## ADMIN & DASHBOARD QUESTIONS

---

**Q: Buildertrend export document — finalized doc with all cost codes in correct format**
> ✅ Yes, we will provide a finalized export document with all cost codes formatted correctly for Buildertrend import. This will be delivered as part of the project handoff.

---

**Q: User permissions — can hired staff be limited so they can't delete submissions or make changes?**
> ✅ Yes. The dashboard has role-based access. You can add users with limited permissions — for example, a "manager" role that can view and manage estimates but cannot delete submissions or change system settings. Let us know what permission levels you need and we'll configure them.

---

**Q: New submission notifications — how will I be notified? Can I control who gets them?**
> ✅ Yes. Every new submission triggers an email notification. You can control which email addresses receive these notifications from the admin settings. Multiple recipients can be added.

---

**Q: Can I track website traffic even if users don't submit an estimate?**
> ✅ Yes. Google Analytics can be integrated into the website to track page visits, time on page, bounce rate, and more — even if no estimate is submitted. We can set this up for you.

---

**Q: Can I turn the estimator on and off? Will GoDaddy still be needed?**
> ✅ Yes, the estimator can be toggled on/off from the admin dashboard without taking the whole website down. When turned off, users will see a "coming soon" or maintenance message instead of the estimator. Your GoDaddy domain will still point to the site — the site itself stays live, only the estimator feature is hidden.

---

## UX & FLOW QUESTIONS

---

**Q: "How It Works" section — does it only appear from the Estimator nav tab, not from the home screen?**
> ✅ Correct. The "How It Works" section is part of the Estimator page and only appears when users navigate to the Estimator tab. Users who enter through the home screen CTA go directly into the estimator flow. This is the intended behavior — let us know if you'd like it to appear on the home screen as well.

---

**Q: User guidance — note telling users to answer as best they can, real person will review**
> ✅ This messaging is already included in the estimator flow. At the start of the estimator and in the confirmation email, users are informed that a real person will review their submission and follow up. We can also add a persistent note at the top of each step if you'd like it more visible.

---

**Q: Contact form vs estimator — should be clearly communicated**
> ✅ There is already a note on the estimator page directing users with non-standard projects to use the contact form instead. This can be made more prominent if needed.

---

**Q: Process flow visual — submit → review → walkthrough → finalize**
> ✅ The 3-step process section you wrote is a great fit for the Estimator page or a dedicated "How It Works" section. Here's the content you provided — we can add this to the website:
>
> **1. Submit Your Estimate** — Complete the estimator with your project details. Do your best to answer each question, and use the notes section to add anything additional. You can also upload photos or videos to help us better understand your space.
>
> **2. We Review & Confirm** — Our team carefully reviews your selections and follows up to confirm scope and budget or ask any clarifying questions. If needed, we can coordinate a walkthrough to ensure everything is fully accounted for.
>
> **3. Walkthrough & Planning** — Once details are finalized, your project manager will meet with you on-site to take measurements and review the project in depth. We'll then develop a clear plan along with a visual rendering for your approval before construction begins.
>
> *Every estimate is personally reviewed to ensure accuracy before moving forward.*

---

## FUTURE FEATURES / VERSION 2

---

**Q: Step 3 — project details (materials, project management, design services, building type, sq footage)**
> 📋 Great idea. This can be added as Step 3 in a future update. It would collect additional project info (building type, square footage, design services interest) without affecting pricing. We'll scope this out for Version 2.

---

**Q: "How did you hear about us?" question**
> ✅ This can be added to the final info/submission form easily. It would be a simple dropdown or text field. Let us know where you'd like it (before or after the estimate form) and we'll add it.

---

**Q: Finish materials section — fixtures, tile, vanities, carpentry with supplier links**
> 📋 This is a solid Version 2 feature. It would allow users to select finish materials and get a more complete project price. We can explore integrating supplier links or images. We'll plan this for the next phase.

---

**Q: Display order / reordering cost codes — will it be hard to update in the future?**
> ⚠️ Currently, display order is managed by a numeric field on each cost code. If you need to reorder, you'd update the display order numbers. We can look into adding a drag-and-drop reorder feature in the dashboard to make this easier — let us know if that's a priority.

---

**Q: AWS / backend infrastructure setup**
> ✅ Yes, we will assist with setting up AWS or any required backend infrastructure as part of the deployment process. This includes server setup, environment configuration, and domain connection.

---

**Q: AI integration for Version 2 — detect scope from uploaded images**
> 📋 Interesting idea. AI-based scope detection from photos is technically feasible (e.g., using vision models to identify existing fixtures, tile conditions, etc.). This would be a significant Version 2 feature. We'll keep it on the roadmap and can provide a more detailed scope when you're ready.

---

**Q: Subscription-based model — pricing for leasing to other contractors**
> 📋 This is a separate project but very doable. It would involve multi-tenant architecture, billing/subscription management, and white-labeling. We can put together a separate proposal and pricing estimate for this when you're ready to explore it.

---

## STATUS TRACKER

| # | Question / Item | Answer | Status |
|---|---|---|---|
| 1 | Category order matches estimator | Follows spreadsheet order exactly | ✅ Done |
| 2 | Title-only items = upgrades | Treated as upgrade branches | ✅ Done |
| 3 | Base price = sum of base cost codes | Auto-calculated | ✅ Done |
| 4 | Dropdown with description (tub/glass) | ORANGE type already does this | ✅ Done |
| 5 | Unit options listed individually | All listed 1, 2, 3... not ranges | ✅ Done |
| 6 | Grammar review | Reviewed and corrected | ✅ Done |
| 7 | Bold/italic/underline in descriptions | Can be enabled on request | ⚠️ On request |
| 8 | Images in cost codes / tip icon | Future enhancement | ⚠️ Future |
| 9 | PDF in automated email | Can be enabled | ✅ Ready |
| 10 | Buildertrend export document | Delivered at handoff | 📋 Pending handoff |
| 11 | User permission levels | Role-based access available | ✅ Done |
| 12 | Submission notifications control | Configurable in admin settings | ✅ Done |
| 13 | Website traffic analytics | Google Analytics integration | ✅ Ready |
| 14 | Estimator on/off toggle | Available in admin dashboard | ✅ Done |
| 15 | "How It Works" visibility flow | Estimator tab only (as intended) | ✅ Done |
| 16 | User guidance note in estimator | Already included, can be made more visible | ✅ Done |
| 17 | Contact form vs estimator messaging | Already on estimator page | ✅ Done |
| 18 | Process flow visual on website | Content ready, can be added | 📋 Pending |
| 19 | Step 3 (project details) | Version 2 | 📋 Future |
| 20 | "How did you hear about us?" | Easy to add, confirm placement | 📋 Pending |
| 21 | Finish materials section | Version 2 | 📋 Future |
| 22 | Display order / drag-and-drop reorder | Can be added on request | ⚠️ On request |
| 23 | AWS setup assistance | Included in deployment | ✅ Included |
| 24 | AI integration (v2) | On roadmap | 📋 Future |
| 25 | Subscription-based model pricing | Separate proposal available | 📋 Future |
