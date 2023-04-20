import {useMemo as _useMemo, DependencyList} from 'react';

const $IS_USE_CALLBACK_FUNCTION_SYMBOL = Symbol('IS_RELY_ON_USE_CALLBACK_FUNCTION');

type ArrowFunction = (...args: any[]) => any

export interface ReliableCallback<T extends ArrowFunction> {
    (...args: Parameters<T>) : ReturnType<T>;
    [$IS_USE_CALLBACK_FUNCTION_SYMBOL]: true
}

const reliableCallbackFactory = <T extends ArrowFunction>(callback: T) => (): ReliableCallback<T> => {
    const newFn = (...args: Parameters<T>) => callback(...args);
    Object.defineProperty(newFn, $IS_USE_CALLBACK_FUNCTION_SYMBOL, { value: true });
    if (callback.name) {
        Object.defineProperty(newFn, 'name', { value: `rely(${callback.name})` });
    }

    return newFn as ReliableCallback<T>;
};

/**
 * Ignore using `extends Function`
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/52873#issuecomment-845806435
 */
export const useCallback = <T extends ArrowFunction>(callback: T, deps: DependencyList): ReliableCallback<T> =>
    _useMemo(reliableCallbackFactory(callback), deps);