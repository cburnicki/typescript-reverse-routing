import { expect } from 'chai';
import { param, Route } from '../src/Route';

describe('Route definition', () => {
  it('should contain the correct method', () => {
    const getRoute = new Route('GET', ['orders']);
    const traceRoute = new Route('TRACE', ['orders']);
    expect(getRoute.method).to.equal('GET');
    expect(traceRoute.method).to.equal('TRACE');
  });

  it('should default to "/" for an empty path', () => {
    const route = new Route('GET', []);
    expect(route.pathString).to.equal('/');
    expect(route.buildUri({}, {})).to.equal('/');
  });

  it('should build the correct express path string, including uri params', () => {
    const route = new Route('GET', ['orders', param('orderId'), 'articles', param('articleId')]);
    expect(route.pathString).to.equal('/orders/:orderId/articles/:articleId');
  });

  it('should build the correct uri, including string and number params', () => {
    const route = new Route('GET', ['orders', param('orderId'), 'articles', param('articleId')]);
    expect(route.buildUri({ orderId: 'order-a', articleId: 23 }, {})).to.equal('/orders/order-a/articles/23');
  });

  it('should append simple query params', () => {
    const route = new Route<{ orderId: string }, { a: string; b: number; c: boolean }>('GET', [
      'orders',
      param('orderId'),
    ]);
    const uri = route.buildUri({ orderId: 'order-a' }, { a: 'foo', b: 23, c: false });
    expect(uri).to.equal('/orders/order-a?a=foo&b=23&c=false');
  });

  it('should append array query params', () => {
    const route = new Route<{ orderId: string }, { a: string[]; b: number[]; c: boolean[] }>('GET', [
      'orders',
      param('orderId'),
    ]);
    const uri = route.buildUri({ orderId: 'order-a' }, { a: ['foo', 'bar'], b: [23, -2], c: [] });
    expect(uri).to.equal('/orders/order-a?a=foo&a=bar&b=23&b=-2');
  });
});
