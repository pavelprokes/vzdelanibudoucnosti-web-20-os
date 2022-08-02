import React from "react"
import styled from "@emotion/styled"

export const CollectionItemWrapper = ({ children }: Props) => {
  return (
    <Wrapper>
      <Inner>{children}</Inner>
    </Wrapper>
  )
}

interface Props {
  children: React.ReactNode
}

const Wrapper = styled.div`
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  padding-top: 56.25%;

  h3.ant-typography,
  .ant-typography h3,
  .ant-typography {
    color: #fff;
  }
`

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`
