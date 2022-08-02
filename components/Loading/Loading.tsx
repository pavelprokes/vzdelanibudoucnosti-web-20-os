import { css } from "@emotion/react"
import { Spin } from "antd"
import React from "react"

export const Loading = () => {
  return (
    <Spin
      css={css`
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 999;
      `}
    />
  )
}
