const withAntdLess = require("next-plugin-antd-less")
const withFonts = require("next-fonts")
const nextEnv = require("next-env")
const dotenvLoad = require("dotenv-load")
const withPlugins = require("next-compose-plugins")
const MomentTimezoneDataPlugin = require("moment-timezone-data-webpack-plugin")

dotenvLoad()
const withNextEnv = nextEnv()

const nextConfig = {
  webpack(config) {
    return config
  },
  images: {
    domains: ["pay-with-qr.vzdelanibudoucnosti.cz", "vzdelanibudoucnosti.cdn.prismic.io", "images.prismic.io", "prismic-io.s3.amazonaws.com", "i.ytimg.com"],
    deviceSizes: [320, 576, 768, 992, 1200, 1600]
  }
}

const withTMFontsCSSLessAntdCustom = withNextEnv(
  withFonts(
    withAntdLess({
      modifyVars: {
        "@body-background": "#f0f0f0",
        "@primary-color": "#F23C50",
        "@layout-footer-background": "#fff",
        "@layout-header-height": "40px",
        "@border-radius-base": "20px",
        "@menu-dark-bg": "transparent",
        "@menu-dark-item-active-bg": "transparent",
        "@menu-dark-item-hover-bg": "transparent",
        "@menu-item-font-size": "16px",
        "@menu-dark-submenu-bg": "#fff",
        "@menu-dark-color": "#fff",
        "@menu-highlight-color": "#fff",
        "@menu-item-padding-horizontal": "12px",
        "@btn-border-radius-base": "20px",
        "@font-size-base": "14px",
        "@heading-1-size": "ceil(@font-size-base * 2.4)",
        "@heading-2-size": "ceil(@font-size-base * 2)",
        "@heading-3-size": "ceil(@font-size-base * 1.41)",
        "@heading-4-size": "ceil(@font-size-base * 1)",
        "@heading-5-size": "ceil(@font-size-base * 0.8)"
      },
      lessVarsFilePath: "./styles/antd-custom.less",
      // for Next.js ONLY
      nextjs: {
        localIdentNameFollowDev: true // default false, for easy to debug on PROD mode
      }
    })
  )
)

module.exports = withPlugins(
  [
    withTMFontsCSSLessAntdCustom,
    new MomentTimezoneDataPlugin({
      matchZones: "Europe/Berlin"
    })
  ],
  nextConfig
)
