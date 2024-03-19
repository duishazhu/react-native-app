/* eslint-disable @typescript-eslint/no-var-requires */
const { v4: uuid } = require('uuid');
const helper = require('../helper');

const { getDomain } = helper;

const GUEST_ID_COOKIE_NAME = 'guestId';
const GUEST_ID_COOKIE_EXPIRY_TIME = 1000 * 60 * 60 * 24 * 365;

module.exports =
  ({ options }) =>
  async (ctx, next) => {
    let guestId = ctx.cookies.get(GUEST_ID_COOKIE_NAME) || uuid();
    ctx.cookies.set(GUEST_ID_COOKIE_NAME, guestId, {
      domain: getDomain(ctx.host, options),
      maxAge: GUEST_ID_COOKIE_EXPIRY_TIME,
    });

    await next();
  };
