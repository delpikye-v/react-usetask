export type TaskStatus = 'idle' | 'running' | 'success' | 'error' | 'cancelled';
export interface RetryPolicy {
    maxAttempts?: number;
    delay?: number;
    maxDelay?: number;
    backoff?: 'fixed' | 'linear' | 'exponential';
    jitter?: boolean;
    retryIf?: (error: unknown) => boolean;
}
export interface TaskOptions {
    immediate?: boolean;
    timeout?: number;
    retry?: number | RetryPolicy;
    interval?: number;
}
export interface TaskState<T> {
    status: TaskStatus;
    data?: T;
    error?: unknown;
}
export interface TaskNode<T = unknown> {
    id: string;
    parent?: TaskNode;
    children: Set<TaskNode>;
    controller: AbortController;
    status: TaskStatus;
    data?: T;
    error?: unknown;
    createdAt: number;
    startedAt?: number;
    finishedAt?: number;
}
export interface TaskContext {
    signal: AbortSignal;
    task: TaskNode;
    delay(ms: number): Promise<void>;
    fork<T>(handler: TaskHandler<T>): Promise<T>;
    all<T>(tasks: Array<() => Promise<T>>): Promise<T[]>;
    race<T>(tasks: Array<() => Promise<T>>): Promise<T>;
}
export type TaskHandler<T> = (ctx: TaskContext) => Promise<T> | T;
export interface TaskRef<T> extends TaskState<T> {
    run(): Promise<T>;
    cancel(): void;
    restart(): Promise<T>;
    reset(): void;
    isIdle: boolean;
    isRunning: boolean;
    isSuccess: boolean;
    isError: boolean;
    isCancelled: boolean;
}
