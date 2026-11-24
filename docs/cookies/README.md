# Cookie compliance pack (marketing site)

Scope date: 24 November 2026  
Site in scope: `https://www.floating-gates.com` and paths served by this repository.  
Out of scope until separately reviewed: `app.floating-gates.com`, partner app, customer-hosted Good2Manufacture.

This pack follows the ISMS cookie steps. It is evidence of how the public site is built. It is not a signed audit opinion or a substitute for a DPA review.

## 1. Scope and context

| Item | In this repo |
| --- | --- |
| Domains | floating-gates.com, www.floating-gates.com |
| Regional variants | None (single English site) |
| CMS / tag manager / A/B / chat | None |
| CDN / fonts | Google Fonts CSS for Titillium Web |
| Analytics | Google Analytics 4 `G-MEL1434K2G`, loaded only after consent |
| Marketing pixels | None |
| Third-party landing pages | None operated from this repo |

System path: `index.html` sets Google consent defaults to denied → Vue hydrates stored consent → `CookieBanner` collects a choice → `src/utils/consent.js` injects gtag only if analytics is granted.

## 2. Inventory

Source of truth: `src/utils/consent.js` (`cookieInventory`, `thirdPartyEndpoints`). The Cookie Policy page renders the same objects so the public list cannot drift from the implementation.

Representative flows scanned: `/`, `/pricing`, `/docs`, `/privacy-policy`, `/cookie-policy`, `/huckster-interface`, `/mcp`, `/good2manufacture`.

## 3. Classification and lawful basis

| Category | Lawful basis (EEA) | Pre-consent behaviour |
| --- | --- | --- |
| Essential | Legal obligation / contract | Allowed |
| Analytics | Consent | Script not in first paint; `analytics_storage=denied` |
| Marketing | Consent (none active) | Category reserved; no tag |

Consent lifetime: 6 months, then the banner is shown again. Changing the inventory version (`CONSENT_VERSION`) also re-prompts.

## 4. Risk notes

| Risk | Treatment |
| --- | --- |
| GA loaded before consent | Treated. Removed from `index.html`. |
| Banner present but tags fire early | Treated. gtag.js is injected only after opt-in. |
| Unknown tags added via GTM | Accepted residual / avoided: no GTM. New trackers must be added in `consent.js` and reviewed. |
| Google Fonts IP transfer | Accepted for now (no tracking cookie). Prefer self-hosting later. |
| No server-side consent log | Accepted residual on this static site. Proof is the versioned `localStorage` record. Add a backend log if enterprise buyers require it. |
| Vendor DPA / SCC for Google | Open. Keep Google Analytics under a GDPR processing term before relying on it in enterprise reviews. |

## 5. Consent implementation

- First layer: Reject non-essential, Customize, Accept all.
- Second layer: per-category toggles; essential locked on.
- Withdrawal: footer **Cookie settings** and Cookie Policy button.
- Logging (client): `{ version, timestamp, source, categories }`.
- Google Consent Mode v2 defaults denied in `index.html`.

## 6. Policies

- Privacy Policy cookie section points here and to `/cookie-policy`.
- Cookie Policy lists inventory, vendors, and withdrawal.
- Internal rule: do not add a tracker without an inventory row and a consent category.

## 7. Vendor list (marketing site)

| Vendor | Role | Data | Status |
| --- | --- | --- | --- |
| Google Ireland / Google LLC | Analytics 4 | IP, device, page views | Consent-gated; DPA still to file |
| Google Fonts | Webfont delivery | IP, user-agent | No cookie; consider self-host |

## 8. Publishing controls

- No shared tag manager, so least-privilege for GTM does not apply.
- Tracker changes go through this repository (review + deploy).
- Rollback: revert the commit that added the script and bump `CONSENT_VERSION` if users must re-choose.

## 9. Recurring checks

After each release that touches `index.html`, `src/utils/consent.js`, or third-party scripts:

1. Load `/` with empty storage: no request to `googletagmanager.com/gtag/js`.
2. Click **Reject non-essential**: still no gtag request; `fg-cookie-consent` exists.
3. Click **Accept all** or enable Analytics: gtag loads once.
4. Open **Cookie settings**, disable Analytics, confirm no new gtag config with storage granted.
5. Confirm `/cookie-policy` still matches `cookieInventory`.

## Metrics to keep

- Trackers by category: 1 essential record, 2 analytics cookies, 0 marketing.
- Pages that must pass “no non-essential before consent”: all public routes.
- Vendor count: 1 analytics vendor.
