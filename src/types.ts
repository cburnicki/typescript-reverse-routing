import querystring from 'querystring';
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE';

type UriParam = string | number;

export type UriParams = { [paramName: string]: UriParam };

export type QueryParams = querystring.ParsedUrlQueryInput;
export class PathParam<P extends UriParams> {
  constructor(public readonly paramName: keyof P) {}
}

export type Path<P extends UriParams> = (string | PathParam<P>)[];
