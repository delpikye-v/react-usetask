import type { TaskHandler, TaskNode } from '../store/types';
export interface TaskScope {
    readonly task: TaskNode;
    readonly signal: AbortSignal;
    readonly isCancelled: boolean;
    launch<T>(handler: TaskHandler<T>): Promise<T>;
    fork<T>(handler: TaskHandler<T>): Promise<T>;
    cancel(reason?: unknown): void;
    childCount(): number;
}
export interface UseTaskScopeOptions {
    autoCancel?: boolean;
}
export declare function useTaskScope(options?: UseTaskScopeOptions): TaskScope;
