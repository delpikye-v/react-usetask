export declare class Store<T> {
    private listeners;
    private state;
    constructor(initialState: T);
    getState: () => T;
    setState: (partial: Partial<T> | ((prev: T) => Partial<T>)) => void;
    subscribe: (listener: () => void) => () => void;
}
