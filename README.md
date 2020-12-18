# Express Reverse Routing

**There are some open problems as listed in [probleme.md](probleme.md)**

## The general idea

The idea was to provide reverse routing by creating a thin layer on top of Node Express.

This reverse routing layer should:

- use the TypeScript compiler to make sure there are no routes without a registered handler (no dangling routes)
- provide type safety for URI params used in a route
- provide type safety for query params used in a route
- respect the way applications and handlers are typically built using Node Express
- not make unnecessary assumptions on used technologies or architecture
- be flexible enough to blend in with other Express extensions

## Basic Concepts

### Simple Reverse Routing

The core of this library consists of a (generically typed) `Route` class. An instance of this class will contain type information about its path params and query params, and its http method. It can be used to construct a URI or a path string to be used in an Express app or router:

```typescript
const route = new Route<{ orderId: string }, { articles?: number[] }>('GET', ['orders', param('orderId')]);

console.log(route.pathString); // >> /orders/:orderId
console.log(route.buildUri({ orderId: 'abc' }, { articles: [2, 3] })); // >> /orders/abc?articles=2&articles=3
```

The first generic type parameter of `Route`, `P` is the type description of the routes path parameters, in this case a `string` parameter `orderId`.

The second generic type parameter is a type description of the possible query params, in this case an array of type `number` for `articles`.

This type information is used to ensure type safety in the `buildUri()` method as well as for the handlers (controller method) of a `RegisteredRoute`.

### Registered Routes for type assurances

A `RegisteredRoute` represents a `Route` combined with a handler function, registered with an Express app or router:

```typescript
const app = express();
const registry = new RouteRegistry(app);

export const getOrderRoute = registry.register<{ orderId: string }, { foo?: string }>(
  'GET',
  ['orders', param('orderId')],
  (req, res) => {
    console.log(req.params.orderId); // req.params is of type { orderId: string }
    console.log(req.query.foo); // req.query is of type { foo: number }
    return res.status(200);
  },
);

export const indexRoute = registry.register<{}, {}>('GET', [], (req, res) => {
  return res.send(`<a href="${getOrderRoute.buildUri({ orderId: 'foo' }, {})}">Order Foo</a>`);
});
```

The `baseRotes` object can now be used as a registry containing only routes that have a registered handler.
A small example of a multi file setup can be found in the `example` directory.
