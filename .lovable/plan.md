## Plan: Redesign Homepage, About, and Contact Pages

I need a fucking high quality low jargon, simple yet beautiful design

### Summary

Rewrite three pages to position Elismet LTD as a software development / AI startup with DocWise.pro as a launched product (not in development). Remove all "building" / "in development" language. Clean, professional, minimal design. Also fix the build error.

---

### Changes

#### 1. Homepage (`src/pages/Index.tsx`) — Full Rewrite

- **Hero**: "Elismet LTD — A Software Development Company" with clean tagline about building AI-powered products. Remove "is building" animation between logos. Show DocWise.pro as a launched product with a small elegant card/badge.
- **What We Do**: Brief section — software development, AI solutions, SaaS products. 3 clean cards (Custom Software, AI Solutions, SaaS Products).
- **Our Product — DocWise.pro**: Clean section with the DocWise logo, brief description ("Legal intelligence, simplified"), 3-4 feature highlights (Risk Detection, AI Drafting, Smart Templates, Multi-jurisdiction). Link to docwise.pro. Mark as "Launched" not "In Development".
- **Company Details**: Keep the existing company card (name, number, address, director) but simplified.
- **Stats**: Keep 4 stats but reframe (e.g., "50+ Global Projects", "Launched 2025", etc.). No dont add this, this one does shows we are an agency, not an ai startup.
- **CTA**: Schedule a call + Visit DocWise.pro.
- **Footer**: Keep existing footer structure, clean up links.
- Remove: Timeline/roadmap, "building in public", AI stack deep dive, target market section, traction section. Reduce content significantly.

#### 2. About Page (`src/pages/About.tsx`) — Simplify

- Keep hero but update copy: "We are a software development company" (remove "building the future one solution at a time" jargon).
- Keep company info section but cleaner.
- Shorten "Our Journey" — remove "in development" references. Mention DocWise.pro as launched product.
- Keep values section but reduce text.
- Remove or simplify "Our Approach" section.
- Keep CTA section.

#### 3. Contact Page (`src/pages/ContactDirect.tsx`) — Update

- Change title from "Build Your Custom CRM" to "Contact Us" or "Get in Touch".
- Remove CRM-specific language from labels and placeholders.
- Add a "Product or Service" select dropdown with one option: "DocWise Pro". Also an "Other" option.
- Update textarea placeholder to generic business inquiry language (remove CRM bullet points).
- Keep form functionality (saveCRMInquiry) unchanged.

#### 4. Fix Build Error

- The nodemailer error is in Supabase edge functions. Add a `deno.json` to the relevant function directory or ensure imports use URL-based imports instead of `npm:` specifiers. Will check which function uses nodemailer and fix the import.

---

### Technical Details

- All three pages rewritten in place, same file paths.
- No new dependencies needed.
- Navbar links remain the same.
- Form submission logic on contact page stays identical, just UI text changes.
- Will check which edge function imports nodemailer and fix it.