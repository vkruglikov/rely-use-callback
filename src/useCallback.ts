/**
 * @author Valentin Kruglikov <dev.n@bk.ru>
 */

import {useMemo as _useMemo, DependencyList} from 'react';

const $IS_USE_RELY_CALLBACK_HOOK = Symbol('IS_USE_RELY_CALLBACK_HOOK');

type AnyCallbackFunction = (...args: any[]) => any

/**
 * Use this type everywhere, when you want to expect callback exactly with save reference
 * For this you need to use {@link useCallback} instead {@link react#useCallback}
 *
 * @see https://github.com/vkruglikov/rely-use-callback#readme
 */
export interface RelyCallback<T extends AnyCallbackFunction = AnyCallbackFunction> {
    (...args: Parameters<T>) : ReturnType<T>;
    /**
     * @remarks
     * If you use {@link useCallback} function from 'rely-use-callback'
     * instead {@link react#useCallback} from 'react' it is property will be true
     *
     * @see https://github.com/vkruglikov/rely-use-callback#readme
     */
    [$IS_USE_RELY_CALLBACK_HOOK]: true
}

/**
 * User-defined type guards function for {@link RelyCallback}
 */
export const isRelyCallback = (callback: AnyCallbackFunction): callback is RelyCallback =>
    typeof callback === 'function' &&
    !!callback[$IS_USE_RELY_CALLBACK_HOOK]

/**
 * This is hook return the same result as {@link react#useCallback}
 * but with additional type guard, what possible us to check callback type
 * by {@link RelyCallback} type
 *
 * @remarks
 * Ignore using `extends Function`
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/52873#issuecomment-845806435
 */
export const useCallback = <T extends AnyCallbackFunction>(callback: T, deps: DependencyList): RelyCallback<T> =>
    _useMemo((): RelyCallback<T> => {
        const newFn = (...args: Parameters<T>) => callback(...args);
        Object.defineProperty(newFn, $IS_USE_RELY_CALLBACK_HOOK, { value: true });
        if (callback.name) {
            Object.defineProperty(newFn, 'name', { value: `rely(${callback.name})` });
        }

        return newFn as RelyCallback<T>;
    }, deps);