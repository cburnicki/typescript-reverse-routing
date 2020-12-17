import { IRouter } from 'express';
import { Handler, RegisteredRoute } from './RegisteredRoute';
import { Method, Path, QueryParams, UriParams } from './types';

export class RouteRegistry {
  constructor(private readonly appOrRouter: IRouter, options?: any) {}

  register<P extends UriParams, Q extends QueryParams>(
    method: Method,
    path: Path<P>,
    handler: Handler<P, Q>,
  ): RegisteredRoute<P, Q> {
    return new RegisteredRoute(this.appOrRouter, method, path, handler);
  }
}
