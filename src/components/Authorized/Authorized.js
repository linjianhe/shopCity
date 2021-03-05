import CheckPermissions from './CheckPermissions'

const Authorized = ({ children, authority, noMatch = null }) => {
  const childrenRender = 'undefined' === typeof children ? null : children
  return CheckPermissions(authority, childrenRender, noMatch)
}

export default Authorized
