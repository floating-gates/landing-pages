import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
    CONSENT_VERSION,
    cookieInventory,
    defaultConsent,
    getConsent,
    hasAnswered,
    inventoryByCategory,
    saveConsent,
} from './consent.js'

function installStorage() {
    const store = new Map()
    const localStorage = {
        getItem: (key) => (store.has(key) ? store.get(key) : null),
        setItem: (key, value) => { store.set(key, String(value)) },
        removeItem: (key) => { store.delete(key) },
        clear: () => { store.clear() },
    }
    globalThis.localStorage = localStorage
    globalThis.window = {
        localStorage,
        dispatchEvent: () => true,
        addEventListener: () => {},
        dataLayer: [],
        gtag() {},
    }
}

describe('cookie consent', () => {
    beforeEach(() => {
        installStorage()
    })

    afterEach(() => {
        localStorage.clear()
    })

    it('defaults to essential only', () => {
        expect(defaultConsent).toEqual({
            essential: true,
            analytics: false,
            marketing: false,
        })
        expect(hasAnswered()).toBe(false)
        expect(getConsent()).toEqual(defaultConsent)
    })

    it('classifies every inventory item', () => {
        const categories = new Set(cookieInventory.map((item) => item.category))
        expect(categories.has('essential')).toBe(true)
        expect(categories.has('analytics')).toBe(true)
        expect(inventoryByCategory('analytics').every((item) => item.lawfulBasis === 'Consent')).toBe(true)
    })

    it('stores a versioned consent record', () => {
        const record = saveConsent({ analytics: true, marketing: false }, 'test')
        expect(record.version).toBe(CONSENT_VERSION)
        expect(record.categories.essential).toBe(true)
        expect(record.categories.analytics).toBe(true)
        expect(hasAnswered()).toBe(true)
        expect(getConsent().analytics).toBe(true)
    })
})
