export function useStorage(key: string) {
    const storage = localStorage;

    return {
        read<T>(): T | null {
            const value = storage.getItem(key);

            if(!value) {
                return null;
            }

            try{
                return JSON.parse(value);
            }
            catch {
                return null;
            }
        },
        write(value: any) {
            if(typeof(value) !== 'string') {
                value = JSON.stringify(value);
            }
            
            storage.setItem(key, value);
        }
    }
}