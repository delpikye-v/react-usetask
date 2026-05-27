import type { RetryPolicy } from '../store/types';
export declare function retry<T>(fn: () => Promise<T>, signal: AbortSignal, policy?: number | RetryPolicy): Promise<T>;
