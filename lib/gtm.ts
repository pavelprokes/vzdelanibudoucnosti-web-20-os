const dev = process.env.NODE_ENV !== "production"

export const pageView = (url: string) => {
  if (!process.browser) {
    return
  }

  interface PageEventProps {
    event: string
    page: string
  }

  const pageEvent: PageEventProps = {
    event: "pageview",
    page: url
  }

  if (dev) {
    console.log(pageEvent)
  } else {
    window &&
      // @ts-ignore
      window.dataLayer &&
      // @ts-ignore
      window.dataLayer.push(pageEvent)
  }

  return pageEvent
}
