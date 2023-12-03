import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = 'my_app_token';

export const setTokenCookie = (token: string): void => {
  Cookies.set(TOKEN_COOKIE_NAME, token, { secure: true, httpOnly: true });
};

export const getTokenCookie = (): string | undefined => {
  return Cookies.get(TOKEN_COOKIE_NAME);
};

export const removeTokenCookie = (): void => {
  Cookies.remove(TOKEN_COOKIE_NAME);
};
