# Client Notes — বাংলা ব্যাখ্যা

---

## ESTIMATOR & COST CODE প্রশ্নোত্তর

---

**প্রশ্ন ১: Category order — red line মানে নতুন category, estimator এ একই order এ থাকতে হবে**
> ✅ এটা already done। Excel এ যে order এ category গুলো আছে, estimator এও ঠিক সেই order এ দেখাবে। Red line এর নামগুলোই category header হিসেবে use হচ্ছে।

---

**প্রশ্ন ২: শুধু title আছে কিন্তু cost code নেই — এগুলো upgrade হিসেবে treat করতে হবে**
> ✅ Done। যেসব item এ শুধু title আছে, cost code নেই — সেগুলো upgrade option হিসেবে treat করা হয়েছে এবং সঠিক upgrade branch এ রাখা হয়েছে।

---

**প্রশ্ন ৩: Base price কোথা থেকে আসছে? সব "Included in Base Price = Yes" cost code এর sum হওয়া উচিত**
> ✅ Confirmed। Pricing summary তে যে base price দেখায় সেটা automatically calculate হয় — সব "Included in Base Price = Yes" cost code এর total। এটা কোনো fixed number না।

---

**প্রশ্ন ৪: প্রতিটা bathroom tab এর প্রথম কয়েকটা question ভুলবশত wrong order এ আছে**
> ✅ Noted। Estimator এ correct intended order follow করা হয়েছে, spreadsheet এর accidental order না।

---

**প্রশ্ন ৫: Tub options এবং glass এ dropdown select করলে সেই option এর description দেখাতে হবে**
> ✅ এটা already কাজ করে। ORANGE question type এ user যখন dropdown থেকে কোনো option select করে, সেই option এর description automatically দেখায়। Drop In Tub, Freestanding, Jetted — প্রতিটার আলাদা description আছে।

---

**প্রশ্ন ৬: "1-6" লেখা থাকলে সব option আলাদা আলাদা দেখাতে হবে, range হিসেবে না**
> ✅ Done। সব ORANGE dropdown এ 1, 2, 3, 4, 5, 6 আলাদা আলাদা option হিসেবে আছে।

---

**প্রশ্ন ৭: Spreadsheet এ grammar mistake আছে, সব consistent হতে হবে**
> ✅ সব cost code এর name, description, tip review করা হয়েছে এবং grammatically correct করা হয়েছে।

---

**প্রশ্ন ৮: Description এ Bold, Italic, Underline formatting add করা যাবে?**
> ⚠️ Rich text editor এ basic formatting support আছে। কোন কোন item এ formatting দরকার সেটা জানালে আমরা apply করে দেব।

---

**প্রশ্ন ৯: Cost code এর ভেতরে বা tip icon এর কাছে image দেখানো যাবে?**
> ⚠️ এটা এখন directly supported না। Future enhancement হিসেবে add করা যাবে — tip popover এর ভেতরে বা cost code card এর পাশে image দেখানো। Priority হলে scope করে দেব।

---

**প্রশ্ন ১০: Automated email এ PDF attachment দেওয়া যাবে?**
> ✅ হ্যাঁ, সম্ভব। PDF generation system already built আছে — শুধু outgoing email এ attach করতে হবে। Enable করা যাবে।

---

## ADMIN & DASHBOARD প্রশ্নোত্তর

---

**প্রশ্ন ১১: Buildertrend এর জন্য সব cost code সঠিক format এ একটা document দিতে হবে**
> ✅ হ্যাঁ। Project handoff এর সময় Buildertrend import এর জন্য সঠিক format এ একটা finalized document দেওয়া হবে।

---

**প্রশ্ন ১২: Staff hire করলে তাদের permission limit করা যাবে? যেমন submission delete করতে পারবে না**
> ✅ হ্যাঁ। Dashboard এ role-based access আছে। "Manager" role এ কেউ estimate দেখতে ও manage করতে পারবে কিন্তু delete বা system settings change করতে পারবে না।

---

**প্রশ্ন ১৩: New submission এলে কীভাবে notify হব? কে কে notification পাবে সেটা control করা যাবে?**
> ✅ হ্যাঁ। প্রতিটা new submission এ email notification যাবে। Admin settings থেকে কোন email address এ notification যাবে সেটা control করা যাবে। Multiple recipient add করা যাবে।

---

**প্রশ্ন ১৪: Estimate submit না করলেও website traffic track করা যাবে?**
> ✅ হ্যাঁ। Google Analytics integrate করলে page visit, time on page, bounce rate সব track করা যাবে — estimate submit না করলেও। আমরা এটা setup করে দিতে পারব।

---

**প্রশ্ন ১৫: Estimator on/off করা যাবে? GoDaddy এর কী হবে?**
> ✅ হ্যাঁ। Admin dashboard থেকে estimator on/off toggle করা যাবে — পুরো website বন্ধ না করেই। Off করলে user রা "coming soon" বা maintenance message দেখবে। GoDaddy domain site এ point করতেই থাকবে, শুধু estimator feature টা hide হবে।

---

## UX & FLOW প্রশ্নোত্তর

---

**প্রশ্ন ১৬: "How It Works" section কি শুধু Estimator tab থেকে দেখা যায়, home screen থেকে না?**
> ✅ Correct। "How It Works" section Estimator page এর অংশ, শুধু Estimator tab এ গেলে দেখা যায়। Home screen থেকে CTA click করলে সরাসরি estimator flow এ যায়। এটাই intended behavior। Home screen এও দেখাতে চাইলে জানাও।

---

**প্রশ্ন ১৭: User কে বলতে হবে যতটুকু পারে answer করতে, real person review করবে**
> ✅ এই messaging already estimator flow এ আছে। Confirmation email এও আছে। প্রতিটা step এর উপরে persistent note হিসেবে দেখাতে চাইলে সেটাও করা যাবে।

---

**প্রশ্ন ১৮: Contact form vs estimator — clearly communicate করতে হবে**
> ✅ Estimator page এ already একটা note আছে যেটা non-standard project এর user দের contact form use করতে বলে। আরো prominent করতে চাইলে করা যাবে।

---

**প্রশ্ন ১৯: Process flow visual — Submit → Review → Walkthrough → Finalize**
> ✅ Tomer এর লেখা 3-step content ready আছে। Estimator page বা "How It Works" section এ add করা যাবে:
>
> **১. Submit Your Estimate** — Project details দিয়ে estimator fill করো। Photos/videos upload করতে পারো।
>
> **২. We Review & Confirm** — আমাদের team selections review করে scope ও budget confirm করবে। প্রয়োজনে walkthrough arrange করা হবে।
>
> **৩. Walkthrough & Planning** — Project manager on-site এসে measurements নেবে। Visual rendering তৈরি করে approval নেওয়া হবে।
>
> *প্রতিটা estimate personally review করা হয়।*

---

## FUTURE / VERSION 2 প্রশ্নোত্তর

---

**প্রশ্ন ২০: Step 3 — materials, project management, design services, building type, sq footage**
> 📋 ভালো idea। Version 2 তে add করা যাবে। Building type, square footage, design services interest collect করবে — pricing affect করবে না।

---

**প্রশ্ন ২১: "How did you hear about us?" question**
> ✅ Preview page এর form এ easily add করা যাবে। Simple dropdown বা text field। কোথায় রাখতে চাও জানাও — form এর আগে না পরে।

---

**প্রশ্ন ২২: Finish materials section — fixtures, tile, vanities, supplier links**
> 📋 Version 2 feature। User রা finish materials select করে complete project price পাবে। Supplier links বা images integrate করা যাবে।

---

**প্রশ্ন ২৩: Cost code reorder করা কি কঠিন হবে ভবিষ্যতে?**
> ⚠️ এখন display order number manually update করতে হয়। Drag-and-drop reorder feature add করা যাবে dashboard এ — priority হলে জানাও।

---

**প্রশ্ন ২৪: AWS / backend infrastructure setup**
> ✅ Deployment এর অংশ হিসেবে AWS setup, server configuration, domain connection সব করে দেওয়া হবে।

---

**প্রশ্ন ২৫: AI integration — uploaded image থেকে scope detect করা**
> 📋 Version 2 roadmap এ আছে। Technically feasible — vision model দিয়ে existing fixtures, tile condition detect করা যাবে।

---

**প্রশ্ন ২৬: Subscription-based model — অন্য contractors দের কাছে lease করা**
> 📋 Separate project হিসেবে করা যাবে। Multi-tenant architecture, billing, white-labeling দরকার হবে। আলাদা proposal দেওয়া যাবে।

---

## এখনই করতে হবে (May 1 এর আগে)

| # | কাজ | অবস্থা |
|---|---|---|
| 1 | Process flow visual (3-step) estimator page এ add করা | 📋 বাকি |
| 2 | "How did you hear about us?" form এ add করা | 📋 বাকি |
| 3 | PDF confirmation email এ attach করা | ✅ Ready to enable |
| 4 | Google Analytics setup | ✅ Ready to enable |
| 5 | Estimator on/off toggle — dashboard এ আছে কিনা verify | ⚠️ Check করতে হবে |
| 6 | Notification email settings — dashboard এ configure করা | ⚠️ Check করতে হবে |

## Version 2 / পরে করতে হবে

| # | কাজ |
|---|---|
| 1 | Step 3 (project details, sq footage) |
| 2 | Finish materials section |
| 3 | Drag-and-drop cost code reorder |
| 4 | AI scope detection |
| 5 | Subscription-based model |
| 6 | Images inside cost codes |
