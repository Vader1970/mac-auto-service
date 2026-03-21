# Contact form + Resend

The **contact/booking form** posts to **`/api/contact`**, a Vercel serverless function that sends email via **Resend** (notification to you + auto-reply to the customer).

---

## `.env` vs `.env.example` (important)

| File | Purpose | Commit to Git? |
|------|---------|----------------|
| **`.env.example`** | Template with **fake** placeholders (`re_xxxxxxxx`). Shows which variables exist. | **Yes** — safe for GitHub |
| **`.env`** or **`.env.local`** | Your **real** API key and emails. | **No** — listed in `.gitignore` |

**Do not rename `.env.example` to `.env` and commit it.**  
Instead:

1. Keep **`.env.example`** as the public template (no real secrets).
2. Create **`.env.local`** (or `.env`) in the project root and paste your real values there.
3. **`.env.example` is not in `.gitignore` on purpose** — only files that hold secrets are ignored.

---

## 1. Resend

1. [resend.com](https://resend.com) → API key → copy (`re_...`).
2. For quick tests, use **`RESEND_FROM`** = `Mac Auto Services <onboarding@resend.dev>` (limits may apply until you verify a domain).
3. Production: verify the client domain in Resend, then use e.g. `Mac Auto Services <contact@theirdomain.co.nz>`.

---

## 2. Environment variables

Copy **`.env.example`** → **`.env.local`** and replace placeholders:

- `RESEND_API_KEY` — your real key  
- `RESEND_FROM` — verified sender  
- `NOTIFICATION_EMAIL` — inbox that receives enquiries  
- `SITE_URL` — your live site (optional; used in the customer email)

### Vercel

**Project → Settings → Environment Variables** — add the same **server** variables (`RESEND_*`, `NOTIFICATION_EMAIL`, `SITE_URL`). No `VITE_*` needed for the form now (unless you use `VITE_CONTACT_API_URL` for a custom API URL).

Redeploy after changing env vars.

---

## 3. Local testing

### If you see `POST …/api/contact 404` on `localhost:5173`

That means you’re using **`npm run dev`** (Vite only). Vite **does not** run the serverless function — there is no `/api/contact` on port **5173**.

**Do this instead:**

1. Stop `npm run dev`.
2. From the project root (with `.env` or `.env.local` filled in):

   ```bash
   npx vercel login
   npx vercel link    # once per machine, link to your Vercel project
   npm run dev:vercel
   ```

3. In the terminal, note the URL Vercel prints — often **`http://localhost:3000`** (not 5173).
4. Open that URL, go to **Contact**, submit the form.

On **Vercel production**, the same `/api/contact` path works because Vercel runs the `api/` function there.

---

### Commands

`npm run dev` — frontend only; **form submit will 404** locally.

`npm run dev:vercel` (or `npx vercel dev`) — frontend **and** `/api/contact` together.

Put secrets in **`.env.local`** or **`.env`** in the project root so `vercel dev` can read them.

---

## 4. Transfer to client

- [ ] Verify their domain in Resend; update `RESEND_FROM`  
- [ ] Set `NOTIFICATION_EMAIL` to the workshop inbox  
- [ ] Match `SITE_URL` to the live site  
- [ ] Rotate API key if handing off the Resend project  

Edit email wording in **`api/contact.js`** if needed.

---

## 5. Troubleshooting

| Issue | Check |
|--------|--------|
| 404 on submit | Use `vercel dev` locally, or deploy to Vercel. |
| Resend errors | Domain / `from` address verified; API key in Vercel env. |

---

## Files

| File | Role |
|------|------|
| `api/contact.js` | Validates payload, sends 2 emails via Resend |
| `src/components/ContactForm/ContactForm.jsx` | Form + `fetch` to `/api/contact` |
| `.env.example` | Template only (no real secrets) |
| `vercel.json` | SPA routes except `/api/*` |
