// /* eslint-disable import/no-mutable-exports */
let CURRENT = 'NULL'
/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = Authorized => (currentAuthority) => {
  if (currentAuthority) {
    if ('function' === typeof currentAuthority) {
      CURRENT = currentAuthority()
    }
    if (
      '[object String]' === Object.prototype.toString.call(currentAuthority) ||
      Array.isArray(currentAuthority)
    ) {
      CURRENT = currentAuthority
    }
  } else {
    CURRENT = 'NULL'
  }
  return Authorized
}

export { CURRENT }
export default Authorized => renderAuthorize(Authorized)
