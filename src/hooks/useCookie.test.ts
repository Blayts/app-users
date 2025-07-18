import { describe, expect, it } from 'vitest';
import { useCookie } from './useCookie';

describe('Use cookie', () => {
    it('Read empty value', () => {
        const { getToken } = useCookie();

        expect(getToken()).toBeNull();
    });
    it('Write and read', () => {
        const { getToken, setToken } = useCookie();
        const value = 'test';

        setToken(value);

        expect(getToken()).toBe(value);
    });
    it('Write, read and clear', () => {
        const { clearToken, getToken, setToken } = useCookie();
        const value = '123';

        setToken(value);

        expect(getToken()).toBe(value);

        clearToken();

        expect(getToken()).toBeNull();
    });
})