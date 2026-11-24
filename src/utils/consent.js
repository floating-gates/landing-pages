const STORAGE_KEY = "fg-cookie-consent";
const LEGACY_STORAGE_KEY = "user-cookie-consent";
export const CONSENT_VERSION = 2;
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
export const GA_MEASUREMENT_ID = "G-MEL1434K2G";
export const OPEN_SETTINGS_EVENT = "fg-open-cookie-settings";
export const CONSENT_UPDATED_EVENT = "cookie-consent-updated";

export const defaultConsent = Object.freeze({
    essential: true,
    analytics: false,
    marketing: false,
});

export const cookieInventory = [
    {
        name: "fg-cookie-consent",
        provider: "Floating Gates",
        category: "essential",
        purpose: "Stores your cookie choices, the policy version, and the time of consent so we can honour and prove them.",
        type: "localStorage",
        lifetime: "6 months, then we ask again",
        pages: "All pages on floating-gates.com",
        lawfulBasis: "Legal obligation (ePrivacy / GDPR proof of consent)",
        region: "EEA and all visitors",
    },
    {
        name: "_ga",
        provider: "Google Ireland Limited / Google LLC",
        category: "analytics",
        purpose: "Distinguishes unique visitors for Google Analytics 4.",
        type: "cookie",
        lifetime: "24 months",
        pages: "All public marketing pages, only after analytics consent",
        lawfulBasis: "Consent",
        region: "EEA: blocked until opt-in",
        endpoint: "https://www.google-analytics.com, https://www.googletagmanager.com",
    },
    {
        name: "_ga_MEL1434K2G",
        provider: "Google Ireland Limited / Google LLC",
        category: "analytics",
        purpose: "Persists the GA4 session state for measurement ID G-MEL1434K2G.",
        type: "cookie",
        lifetime: "24 months",
        pages: "All public marketing pages, only after analytics consent",
        lawfulBasis: "Consent",
        region: "EEA: blocked until opt-in",
        endpoint: "https://www.google-analytics.com, https://www.googletagmanager.com",
    },
];

export const thirdPartyEndpoints = [
    {
        name: "Google Analytics 4 / gtag",
        category: "analytics",
        url: "https://www.googletagmanager.com/gtag/js?id=G-MEL1434K2G",
        data: "IP address, device/browser data, page views, coarse location. IP anonymization is enabled when the tag runs.",
        blockedUntil: "analytics consent",
    },
    {
        name: "Google Fonts",
        category: "functional",
        url: "https://fonts.googleapis.com and https://fonts.gstatic.com",
        data: "IP address and user-agent to serve Titillium Web. Google Fonts CSS does not set a tracking cookie.",
        blockedUntil: "not blocked; required to render the site typeface. Review if you later self-host fonts.",
    },
];

function emptyRecord() {
    return {
        version: CONSENT_VERSION,
        timestamp: null,
        source: null,
        categories: { ...defaultConsent },
    };
}

function isFresh(record) {
    if (!record?.timestamp || record.version !== CONSENT_VERSION) return false;
    const age = Date.now() - new Date(record.timestamp).getTime();
    return Number.isFinite(age) && age >= 0 && age < CONSENT_MAX_AGE_MS;
}

export function getConsentRecord() {
    if (typeof window === "undefined") return emptyRecord();
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return emptyRecord();
        const parsed = JSON.parse(raw);
        if (!isFresh(parsed)) return emptyRecord();
        return {
            ...parsed,
            categories: {
                ...defaultConsent,
                ...parsed.categories,
                essential: true,
            },
        };
    } catch {
        return emptyRecord();
    }
}

export function hasAnswered() {
    return Boolean(getConsentRecord().timestamp);
}

export function getConsent() {
    return getConsentRecord().categories;
}

function ensureGtagStub() {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
        window.gtag = function gtag() {
            window.dataLayer.push(arguments);
        };
    }
}

function setGoogleConsent(categories) {
    ensureGtagStub();
    const analytics = categories.analytics ? "granted" : "denied";
    const marketing = categories.marketing ? "granted" : "denied";
    window.gtag("consent", "update", {
        analytics_storage: analytics,
        ad_storage: marketing,
        ad_user_data: marketing,
        ad_personalization: marketing,
        functionality_storage: "granted",
        security_storage: "granted",
    });
}

function loadGoogleAnalytics() {
    if (typeof document === "undefined") return;
    if (document.getElementById("fg-ga-gtag")) return;
    ensureGtagStub();
    const script = document.createElement("script");
    script.id = "fg-ga-gtag";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.addEventListener("load", () => {
        window.gtag("js", new Date());
        window.gtag("config", GA_MEASUREMENT_ID, {
            anonymize_ip: true,
            allow_google_signals: false,
        });
    });
    document.head.appendChild(script);
}

export function applyConsent(categories) {
    if (typeof window === "undefined") return;
    const next = { ...defaultConsent, ...categories, essential: true };
    setGoogleConsent(next);
    if (next.analytics) {
        loadGoogleAnalytics();
    }
    window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: next }));
}

export function saveConsent(categories, source = "banner") {
    const record = {
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        source,
        categories: { ...defaultConsent, ...categories, essential: true },
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    applyConsent(record.categories);
    return record;
}

export function hydrateConsent() {
    if (typeof window === "undefined") return getConsent();
    const record = getConsentRecord();
    applyConsent(record.categories);
    return record.categories;
}

export function openCookieSettings() {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
}

export function inventoryByCategory(category) {
    return cookieInventory.filter((item) => item.category === category);
}
