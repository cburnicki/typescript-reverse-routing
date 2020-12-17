# Hier ein paar offene Probleme, die ich aktuell mit dem Ansatz sehe

### 1. Generische Typparameter sind optional

Das mit der Typisierung funktioniert sehr gut, so lange bei `Route<P, Q>` die Parameter P und Q übergeben werden. Das ist allerdings wegen Type inference nicht erforderlich. Wenn diese Parameter nicht übergeben werden, gibt es auch keine Typinformation in der Route oder im Handler.

### 2. Typisierung ist zur Laufzeit nicht sichergestellt.

Zwar stimmt die Typinformation zwischen von RegisteredRoutes generierten URLS und Handlern, zur Laufzeit werden aber alle Parameter die in der Uri stehen zu strings. Hier ist also immernoch ein type check im Handler erforderlich. Sowas ließe sich generisch wohl nur lösen, wenn die QueryParameter einer Route eine Klasse sind. Ich glaube allerdings, das sollte nicht Teil des ReverseRoutings sein. Es lässt sich problemlos erweitern und ich könnte mir vorstellen hier eher mit sowas wie "Hooks" in der `RouteRegistry` zu arbeiten.

### 3. Zusammenfügen mehrerer Router

Im `example` Ordner ist ein Beispiel dafür, wie man Handler im Sinne von Express auf mehrere Files aufteilen könnte. Allerdings: sobald ich beim Einbinden eines Routers über `app.use(articleRouter)` ein Pfadprefix übergebe (`app.use('/articles', articleRouter)`) funktioniert das ganze nicht mehr, da die in `article-routes.ts` definierten Routen diese Information nicht haben.
Ich sehe aktuell keine Möglichkeit das Problem ohne zirkuläre Abhängigkeiten sauber zu lösen. Vielleicht ist das auch verzichtbar.

### 4. Resource Builder

Obendrauf würde ich gerne eine Art Resource Builder bauen, mit dem sich einfach und deklarativ REST-artige APIs definieren lassen, etwa so in der Art:

```typescript
const orders = new Resource<{ orderId: string }>('orders');
const articles = new Resource<{ articleId: string }>('articles', orders); // orders als parent registriert

const GET_ARTICLES = articles.get<{ someQueryParam?: string }>();

const uri = GET_ARTICLES.buildUri({ orderId: 'abc', articleId: 'def' }); // >> /orders/abc/articles/def
```

Das Problem ist, die Typ Informationen für beliebig viele Parents in einer Resource Klasse mit unterzubringen. Vielleicht ist der Ansatz hier falsch und man muss einen Weg gehen, bei dem diese Parameter nicht in Form eines Types, sondern vielleicht als Strings übergeben werden. Das hätte allerdings zur Folge, dass diese Information im Handler fehlt und man dort nur noch über ein generisches `params.id` dran kommt, was implizit eine strenge Ausrichtung an REST-Resourcen voraussetzt...
