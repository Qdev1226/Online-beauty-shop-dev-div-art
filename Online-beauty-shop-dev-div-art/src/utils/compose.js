export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
export const reverseCompose = (...fns) => compose.apply(compose, fns.reverse());