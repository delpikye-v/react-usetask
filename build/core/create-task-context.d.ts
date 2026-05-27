import type { TaskContext, TaskHandler, TaskNode } from '../store/types';
export interface TaskExecutor {
    <T>(task: TaskNode, handler: TaskHandler<T>): Promise<T>;
}
export declare function createTaskContext(task: TaskNode, execute: TaskExecutor): TaskContext;
