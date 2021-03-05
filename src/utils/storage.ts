/**
 * set localStorage
 * @param key 
 * @param value 
 */
export const setStorage = (key: string, value: any) => {
  try {
    if (window.localStorage) {
      localStorage.removeItem(key)
      if (typeof value !== "string") {
        value = JSON.stringify(value)
      }
      localStorage.setItem(key, value)
    }
  } catch (e) { }
}
/**
 * get localStorage
 * @param key 
 */
export const getStorage = (key: string) => {
  if (window.localStorage) {
    let value = null
    value = localStorage.getItem(key)
    if (value && typeof value === "string" && value === "undefined") {
      value = undefined
    }
    try {
      return value ? JSON.parse(value) : undefined
    } catch (err) {
      return value
    }
  }
}
/**
 * remove localStorage
 * @param key 
 */
export const removeStorage = (key: string) => {
  if (window.localStorage) {
    localStorage.removeItem(key)
  }
}
/**
 * set sessionStorage
 * @param key 
 * @param value 
 */
export const setSession = (key: string, value: any) => {
  if (window.sessionStorage) {
    try {
      sessionStorage.removeItem(key)
      if (typeof value !== "string") {
        value = JSON.stringify(value)
      }
      sessionStorage.setItem(key, value)
    } catch (e) { }
  }
}
/**
 *  get sessionStorage
 * @param key 
 */
export const getSession = (key: string) => {
  if (window.sessionStorage) {
    try {
      let value = sessionStorage.getItem(key)
      if (value && typeof value === "string" && value === "undefined") {
        value = null
      }
      try {
        return value ? JSON.parse(value) : null
      } catch (err) {
        return value
      }
    } catch (e) { }
  }
}
/**
 * remove sessionStorage
 * @param key 
 */
export const removeSession = (key: string) => {
  if (window.sessionStorage) {
    sessionStorage.removeItem(key)
  }
}