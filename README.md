# rely-use-callback

Rely on useCallback in your React app and control types 🥂

[![npm](https://img.shields.io/npm/v/rely-use-callback.svg)](https://www.npmjs.com/package/rely-use-callback)
[![types](https://badgen.net/npm/types/rely-use-callback)](https://npmjs.org/package/rely-use-callback)
[![License](https://badgen.net/github/license/vkruglikov/rely-use-callback)](https://github.com/vkruglikov/rely-use-callback/blob/master/LICENSE)

## ✨ When is it needed?

Sometimes you need to check if a function exact is created by `useCallback`.
 
For example, this is may necessary for functions that are passed depending on other hooks

```typescript jsx
import { useCallback } from 'react';

/** 
 * Imagine that we have a hook that call some business logic in useEffect
 */
const useSomethinkToDoOnEffect = (todoFunction: () => void) => {
    useEffect(() => {
        todoFunction()
    }, [
        /** 
         * {@link todoFunction} passed to hook dependencies,
         * so it is may important to save function 
         * reference by {@link useCallback} to keep business logic
         */
        todoFunction
    ]);
}

const App = () => {
    /** 
     * But currently TS types of {@link useSomethinkToDoOnEffect} 
     * can't warn us to use function created by {@link useCallback}
     * 
     * So we can use both variants without ts errors
     */
    
    useSomethinkToDoOnEffect(() => {});
    
    /** OR */
    
    const functionWithCallback = useCallback(() => {}, []);
    useSomethinkToDoOnEffect(functionWithoutCallback);

    return null;
}
```

## 🥂 License

[MIT](./LICENSE)
