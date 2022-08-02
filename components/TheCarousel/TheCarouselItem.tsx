import React from "react"
import styled from "@emotion/styled"
import { md } from "../../styles/mediaQuery"

export const TheCarouselItem = ({ children, alone }: { children: React.ReactNode; alone?: boolean }) => {
  return (
    <TheCarouselItemWrapper className="carousel-item" alone={alone}>
      {children}
    </TheCarouselItemWrapper>
  )
}

const TheCarouselItemWrapper = styled.div<{ alone?: boolean }>`
  padding: 0 25px 25px 25px;
  height: 100%;

  ${md} {
    ${(props: { alone?: boolean }) => `padding: ${props.alone ? "0" : "0 0 15px 15px"};`}
  }
`
