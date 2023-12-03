import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = 'token';

export const setTokenCookie = (token: string): void => {
  console.log("SET TOKEN",token);
  Cookies.set(TOKEN_COOKIE_NAME, token, { secure: true, sameSite: "None" } );
};

export const getTokenCookie = (): string | undefined => {
  return Cookies.get(TOKEN_COOKIE_NAME);
};

export const removeTokenCookie = (): void => {
  Cookies.remove(TOKEN_COOKIE_NAME);
};
