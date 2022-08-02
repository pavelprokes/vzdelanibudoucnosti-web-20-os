import React from "react"
import styled from "@emotion/styled"
import { md } from "../../styles/mediaQuery"

const FullwidthBgColor = ({ color, height, children }: Props) => {
  return (
    <FullwidthBgColorWrapper color={color} height={height}>
      {children && children}
    </FullwidthBgColorWrapper>
  )
}

const FullwidthBgColorWrapper = styled.div<Props>`
  ${(props: Props) => `
        background-color: ${props.color};
        color: white;
        height: calc(80px + ${props.height});
        width: 100%;
        
        ${md} {
          height: unset;
          min-height: calc(50px + 10vh);
        } 
    `}
`

interface Props {
  height: string
  color: string
  children?: React.ReactNode
}

export default FullwidthBgColor
