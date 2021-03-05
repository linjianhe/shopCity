// import Authorized from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
export const KEYS = {
  userInfo: 'u-info',
  userAuth: 'u-authority',
  adminAuthCode: 'admin',
}

export function getAuthority(str?: string) {
  const authorityString: any =
    'undefined' === typeof str ? localStorage.getItem(KEYS.userAuth) : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if ('string' === typeof authority) {
    return [authority];
  }
  return authority || [];
}

export function setAuthority(authority: any) {
  const proAuthority = 'string' === typeof authority ? [authority] : authority;
  return localStorage.setItem(KEYS.userAuth, JSON.stringify(proAuthority));
}

export function removeAuthority() {
  localStorage.removeItem(KEYS.userAuth)
  localStorage.removeItem(KEYS.userInfo)
}
