import {useCallback as _useCallback, DependencyList} from 'react';

const $IS_USE_CALLBACK_FUNCTION_SYMBOL = Symbol('__IS_USE_CALLBACK_FUNCTION_SYMBOL');

export interface UseCallbackFunction<T extends Function> {
    [$IS_USE_CALLBACK_FUNCTION_SYMBOL]: true
}

export const useCallback = <T extends Function>(callback: T, deps: DependencyList): UseCallbackFunction<T> => {
    const _callback = _useCallback(callback, deps);
    _callback[$IS_USE_CALLBACK_FUNCTION_SYMBOL] = true;

    return _callback as unknown as UseCallbackFunction<T>
}
