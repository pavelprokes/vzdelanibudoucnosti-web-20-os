import React from "react"
import { BackTop } from "antd"
import { HeaderMenu } from "./HeaderMenu"
import { Footer } from "./Footer"
import { HeaderWithHeight } from "./HeaderWithHeight"

export const Layout = ({ children }: Props) => {
  return (
    <>
      <HeaderWithHeight style={{ position: "absolute", zIndex: 1, width: "100%", top: 0 }}>
        <HeaderMenu />
      </HeaderWithHeight>

      <div>{children}</div>

      <Footer />

      <BackTop />
    </>
  )
}

interface Props {
  children: React.ReactNode
}
