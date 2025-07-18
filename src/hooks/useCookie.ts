export function useCookie() {
    return {
        clearToken() {
            document.cookie = 'token=; max-age=-1';
        },
        getToken() {
            if(!document.cookie.startsWith('token')) {
                return null;
            }

            const value = document.cookie.match(/token=?(.+)/);

            return value ? atob(decodeURIComponent(value[1])): null;
        },
        setToken(value: string) {
            const date = new Date(Date.now() + 3600e3);
            const encoded = encodeURIComponent(btoa(value));

            document.cookie = `token=${encoded}; expires=${date.toUTCString()}`;
        }
    }
}