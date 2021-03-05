import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'

export default function PromiseRender(props) {
  const [component, setComponent] = useState(null)

  useEffect(() => {
    setRenderComponent(props)
  },[props])

  // set render Component : ok or error
  const setRenderComponent = (props) => {
    const ok = checkIsInstantiation(props.ok)
    const error = checkIsInstantiation(props.error)
    props.promise.then(() => {
      setComponent(ok)
    }).catch(() => {
      setComponent(error)
    })
  }

  // Determine whether the incoming component has been instantiated
  // AuthorizedRoute is already instantiated
  // Authorized  render is already instantiated, children is no instantiated
  // Secured is not instantiated
  const checkIsInstantiation = (target) => {
    if (!React.isValidElement(target)) {
      return target
    }
    return () => target
  }
  const { ok, error, promise, ...rest } = props
  return component ? (<Component {...rest} />)
    : (
    <div 
      style={{
        width: '100%',
        height: '100%',
        margin: 'auto',
        paddingTop: 50,
        textAlign: 'center',
      }}
    >
      <Spin size="large" />
    </div>
  )
}
