import type { TaskHandler, TaskOptions, TaskRef } from '../store/types';
export declare function useTask<T>(handler: TaskHandler<T>, options?: TaskOptions): TaskRef<T>;
