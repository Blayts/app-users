import { describe, expect, it } from 'vitest';
import { useStorage } from './useStorage';

describe('Use storage', () => {
    it('Read empty value', () => {
        const { read } = useStorage('test');

        expect(read()).toBeNull();
    });
    it('Write and read', () => {
        const { read, write } = useStorage('test');
        const value = { a: 1, b: 'test', c: true };

        write(value);
        expect(read()).toEqual(value);
    });
})