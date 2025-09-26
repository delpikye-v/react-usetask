export type TaskFn = (controller?: AbortController) => void | Promise<void>;
export type TaskMode = "sequential" | "fixed";
export interface IFTaskOptions {
    fn?: TaskFn;
    delay?: number;
    repeat?: number | true;
    interval?: number;
    mode?: TaskMode;
    restartDelay?: number;
    retry?: number;
    retryDelay?: number;
    onComplete?: () => void;
    onStop?: () => void;
    onRun?: () => void;
    onError?: (err: any, repeatCount: number) => void;
}
export interface IFTaskState {
    timeoutId: ReturnType<typeof setTimeout> | null;
    fn?: TaskFn;
    delay: number;
    repeat: number | true;
    interval: number;
    mode: TaskMode;
    repeatCount: number;
    restartDelay?: number;
    stopped: boolean;
    completed: boolean;
    controller?: AbortController;
    retryCount: number;
    retry?: number;
    retryDelay: number;
    onComplete?: () => void;
    onStop?: () => void;
    onRun?: () => void;
    onError?: (err: any, repeatCount: number) => void;
}
declare function useTask(options?: IFTaskOptions): {
    executeAsync: (fn?: TaskFn, delay?: number, repeat?: number | true, interval?: number, mode?: TaskMode) => Promise<void>;
    execute: (fn?: TaskFn, delay?: number, repeat?: number | true, interval?: number, mode?: TaskMode) => void;
    run: () => void;
    runAfter: (d: number) => void;
    cancel: () => void;
    reset: () => void;
    stopped: boolean;
    completed: boolean;
};
export default useTask;
