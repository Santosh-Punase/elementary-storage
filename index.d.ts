declare module LocalStorage {
  export function set<T>(key: string, value: T, expiryTimeInMs?: number): void
  export function get<T>(key: string, defaultValue?: T): { value: T | string; }
  export function remove(key: string): void
  export function clear(): void
}

export { LocalStorage }

declare module SessionStorage {
  export function set<T>(key: string, value: T, expiryTimeInMs?: number): void
  export function get<T>(key: string, defaultValue?: T): { value: T | string; }
  export function remove(key: string): void
  export function clear(): void
}

export { SessionStorage }
