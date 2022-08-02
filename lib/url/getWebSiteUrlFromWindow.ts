export const getWebSiteUrlFromWindow = () => {
  return process.browser ? `${window.location.protocol}//${window.location.host}` : undefined
}
