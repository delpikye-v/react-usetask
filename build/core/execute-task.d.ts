import type { TaskHandler, TaskNode } from '../store/types';
export declare function executeTask<T>(task: TaskNode, handler: TaskHandler<T>): Promise<T>;
