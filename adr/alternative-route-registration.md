Wir hätten gerne ein Objekt aller existierenden Routen im `request` Objekt von Express, damit wir uns eine URI im Kontext eines Requests erzeugen können, also z.B. Zugriff auf BaseRoute und/oder Hostname haben.

Das heißt, wir bräuchten ein Objekt der Art:

```typescript
const routes = {
    getOrder: new Route<{orderId: string}, {}>('GET', ['orders', param('orderId')]),
    getArticles: new Route<{}, {foo: number[]}>('GET', ['articles']),
};
```

Jetzt haben wir schonmal das Problem, dass die generischen Type-Parameter `P` und `Q` der Routen jeweils unterschiedlich sind. Wir können also eigentlich keine typisierte Funktion bauen, die das routes Object nimmt und verarbeitet:

```typescript
function registerRoutes(
    app: IRouter, 
    routes: {[routeName: string]: Route<P, Q>}, // welches P? das von getOrder oder von getArticles?
    handlers: ????
    ) { 
    ...
}
```

Wir könnten die Dinger vielleicht einzeln registrieren:
```typescript
function registerRoute(app: IRouter, route: Route<P, Q>, handler: Handler<P, Q>) {
    // jetzt können wir zwar die einzelne Route mit ihrem Handler registrieren, haben aber keine Möglichkeit mehr, alle Routen in das Request-Objekt zu setzen:
    app.get(route.pathString, (req, res) => handler(allRoutesInReqContext, req, res)); // Woher bekommen wir alle Routen im request context?
}
