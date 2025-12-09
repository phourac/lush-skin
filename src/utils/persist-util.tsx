// LocalStorage
export const persistState = (storageKey: string, state: object | string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }
};

export const getPersistedState = (storageKey: string) => {
  if (typeof window !== 'undefined') {
    const savedState = window.localStorage.getItem(storageKey);
    try {
      if (!savedState) return undefined;
      return JSON.parse(savedState);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
};

// SessionStorage
export const persistStateSession = (storageKey: string, state: any) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(storageKey, JSON.stringify(state));
  }
};

export const getPersistedStateSession = (storageKey: string) => {
  if (typeof window !== 'undefined') {
    const savedState = window.sessionStorage.getItem(storageKey);
    try {
      if (!savedState) return undefined;
      return JSON.parse(savedState);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
};

// Cookies
export const setCookie = (name: string, value: any, days = 7) => {
  if (typeof document !== 'undefined') {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      JSON.stringify(value)
    )};expires=${expires.toUTCString()};path=/`;
  }
};

export const getCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, val] = cookie.split('=');
      if (key === name) {
        try {
          return JSON.parse(decodeURIComponent(val));
        } catch {
          return val;
        }
      }
    }
  }
  return undefined;
};

export const deleteCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
};

export const persistStateCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value}; path=/;`;
};

export const getPersistedStateCookie = (key: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
  return match ? match[2] : null;
};
