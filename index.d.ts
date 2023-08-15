declare module elementaryLocalStorage {
  export function set<T>(key: string, value: T, expireAt?: number): boolean
  export function get<T>(
    key: string,
    defaultValue?: T
  ): { value: T; expireAt: number | null; updatedAt: number | null }
  export function remove(key: string): void
  export function key(i: number): string
  export function clear(): void
}

export { elementaryLocalStorage }

declare module elementarySessionStorage {
  export function set<T>(key: string, value: T, expireAt?: number): boolean
  export function get<T>(
    key: string,
    defaultValue?: T
  ): { value: T; expireAt: number | null; updatedAt: number | null }
  export function remove(key: string): void
  export function key(i: number): string
  export function clear(): void
}

export { elementarySessionStorage }
