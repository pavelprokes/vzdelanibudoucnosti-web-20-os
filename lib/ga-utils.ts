import * as ReactGA from "react-ga"
import { default as ReactGA4 } from "react-ga4"

const dev = process.env.NODE_ENV !== "production"

export const initGA = (id: string) => {
  if (!dev) {
    ReactGA.initialize(id)
  }
}

export const initGA4 = (id: string) => {
  if (!dev) {
    ReactGA4.initialize(id)
  }
}
