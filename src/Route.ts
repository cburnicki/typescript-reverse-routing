import querystring from 'querystring';
import { Method, Path, PathParam, QueryParams, UriParams } from './types';

export class Route<P extends UriParams, Q extends QueryParams> {
  constructor(public readonly method: Method, private readonly path: Path<P>) {}

  buildUri(pathParams: P, queryParams: Q): string {
    const uri = '/' + this.path.map((p) => (p instanceof PathParam ? pathParams[p.paramName] : p)).join('/');
    const query = querystring.stringify(queryParams);
    return query.length ? `${uri}?${query}` : uri;
  }

  get pathString(): string {
    return '/' + this.path.map((p) => (p instanceof PathParam ? `:${p.paramName}` : p)).join('/');
  }
}

export function param<P extends UriParams>(paramName: keyof P): PathParam<P> {
  return new PathParam(paramName);
}
