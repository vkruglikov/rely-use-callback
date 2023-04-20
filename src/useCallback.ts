import {useMemo as _useMemo, DependencyList} from 'react';

const $IS_USE_CALLBACK_FUNCTION_SYMBOL = Symbol('IS_RELY_ON_USE_CALLBACK_FUNCTION');

export interface UseCallbackFunction<T extends (...args: any[]) => any > {
    (...args: Parameters<T>) : ReturnType<T>;
    [$IS_USE_CALLBACK_FUNCTION_SYMBOL]: true
}

/**
 * Ignore using `extends Function`
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/52873#issuecomment-845806435
 */
export const useCallback = <T extends (...args: any[]) => any>(callback: T, deps: DependencyList): UseCallbackFunction<T> =>
    _useMemo(() => {
        const newFn = (...args: Parameters<T>) => callback(...args);
        Object.defineProperty(newFn, $IS_USE_CALLBACK_FUNCTION_SYMBOL, { value: true });
        if (callback.name) {
            Object.defineProperty(newFn, 'name', { value: `rely(${callback.name})` });
        }

        return newFn as UseCallbackFunction<T>;
    }, deps);