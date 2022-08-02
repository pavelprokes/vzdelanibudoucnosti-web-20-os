import React from "react"
import { css, Global } from "@emotion/react"
import { typography } from "./typohraphy"
import { mobileResponsive } from "./mobileResponsive"
import { md } from "./mediaQuery"

export const theme = {
  colors: {
    success: "#52c41a",
    "primary-color": "#F23C50",
    "main-color-blue": "#02589b",
    "neuronove-site": "#4fae32",
    python: "#316a99",
    arduino: "#2b8894",
    "3d-tisk": "#e35027",
    "c-plus-plus": "#004283",
    "main-color-red": "#F23C50",
    dark: {
      bgBlack: "#121212",
      bgGray: "#1f1f1f",
      textWhite: "#e1e1e1",
      mainYellow: "#0568A6"
    },
    gray3: "#f5f5f5",
    gray4: "#f0f0f0",
    gray5: "#d9d9d9"
  },
  fontFamily: {
    default:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
  },
  boxShadow: {
    default: "0 4px 15px rgb(0 0 0 / 20%)"
  },
  effects: {
    transition: {
      default: `all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)`
    }
  }
}

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        #__next {
          section {
            /* header */
            position: relative;
          }

          main {
            .ant-row {
              .ant-col {
                section {
                  /* page section */
                  /* padding: 40px 0 40px 0; */
                }
              }
            }
          }
        }
      }

      :root {
        --main-color-blue: ${theme.colors["main-color-blue"]};
        --main-color-yellow: #ffc205;
        --main-color-whiteBlue: #4ad9d9;
        --main-color-red: #f23c50;

        --python-color: ${theme.colors.python};
        --arduino-color: ${theme.colors.arduino};
        --neuron-networks-color: ${theme.colors["neuronove-site"]};
        --3d-print-color: ${theme.colors["3d-tisk"]};
        --c-plus-plus: ${theme.colors["c-plus-plus"]};
      }

      .ant-notification-notice {
        &:last-of-type {
          margin-bottom: 0;
        }
      }

      .cookie-notification {
        .ant-notification-notice-close {
          display: none;
        }

        ${md} {
          max-width: 45vw;
          font-size: 11px;
        }
      }

      .white-text {
        color: white;
      }

      .page-white-border-r-block {
        padding: 40px;
        background-color: #fff;
        border-radius: 20px;
        overflow: hidden;
      }

      .ant-menu-dark.ant-menu-submenu-popup {
        background: #fff;

        li {
          a {
            color: rgba(0, 0, 0, 0.85);

            &:hover {
              color: rgb(0, 0, 0);
            }
          }
        }
      }

      .prismic-image {
        width: 50%;

        ${md} {
          width: 100%;
        }
      }

      .prismic-embed {
        > * {
          width: 50%;
          height: 400px;

          ${md} {
            width: 100%;
          }
        }
      }

      ${typography}

      ${mobileResponsive}
    `}
  />
)
