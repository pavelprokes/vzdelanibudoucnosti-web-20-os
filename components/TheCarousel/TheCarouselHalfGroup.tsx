import React from "react"
import styled from "@emotion/styled"

export const TheCarouselHalfItem = ({ children }: { children: React.ReactNode }) => {
  return <TheCarouselHalfItemWrapper>{children}</TheCarouselHalfItemWrapper>
}

const TheCarouselHalfItemWrapper = styled.div`
  display: flex;
  height: 100%;
`
