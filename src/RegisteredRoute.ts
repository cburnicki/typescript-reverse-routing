import { IRouter, Request, Response } from 'express';
import { Route } from './Route';
import { Method, Path, QueryParams, UriParams } from './types';

export type Handler<P extends UriParams, Q extends QueryParams> = (
  request: Request & { params: P; query: Q },
  response: Response,
) => Response;

export class RegisteredRoute<P extends UriParams, Q extends QueryParams> extends Route<P, Q> {
  constructor(appOrRouter: IRouter, method: Method, path: Path<P>, handler: Handler<P, Q>) {
    super(method, path);
    this.register(appOrRouter, handler);
  }

  private register(appOrRouter: IRouter, handler: Handler<P, Q>) {
    switch (this.method) {
      case 'GET':
        appOrRouter.get(this.pathString, (req, res) => {});
        break;
      case 'POST':
        appOrRouter.post(this.pathString, this.handle(handler));
        break;
      case 'PATCH':
        appOrRouter.patch(this.pathString, this.handle(handler));
        break;
      case 'PUT':
        appOrRouter.put(this.pathString, this.handle(handler));
        break;
      case 'DELETE':
        appOrRouter.delete(this.pathString, this.handle(handler));
        break;
      case 'HEAD':
        appOrRouter.head(this.pathString, this.handle(handler));
        break;
      case 'CONNECT':
        appOrRouter.connect(this.pathString, this.handle(handler));
        break;
      case 'OPTIONS':
        appOrRouter.options(this.pathString, this.handle(handler));
        break;
      case 'TRACE':
        appOrRouter.trace(this.pathString, this.handle(handler));
        break;
      default:
        assertNever(this.method);
    }
  }

  private handle(handler: Handler<P, Q>): (req: Request, res: Response) => Response {
    return (req: Request, res: Response) =>
      handler(Object.assign(req, { params: req.params as P, query: req.query as Q }), res);
  }
}

function assertNever(val: never): never {
  throw new Error();
}
