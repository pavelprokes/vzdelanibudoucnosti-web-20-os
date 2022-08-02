export const flattenObj = <T extends unknown>(value: unknown, currentKey?: any): T => {
  let result = {}

  Object.keys(value).forEach((key) => {
    const tempKey = currentKey ? `${currentKey}.${key}` : key

    if (typeof value[key] !== "object") {
      result[tempKey] = value[key]
    } else {
      result = { ...result, ...flattenObj(value[key], tempKey) }
    }
  })

  return result as T
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
