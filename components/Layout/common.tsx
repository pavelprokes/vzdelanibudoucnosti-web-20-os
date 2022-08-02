import styled from "@emotion/styled"
import { md, sm, xl, xlMin, xxl } from "../../styles/mediaQuery"
import { CSSProperties } from "react"

export const ContentAboveWrapper = styled.div`
  margin-top: 100px;
  padding: 0 40px 0 40px;
  z-index: 2;
  position: absolute;
  display: flex;
  width: 100%;
  height: calc(100% - 100px);
  align-items: center;
  justify-content: center;

  ${xlMin} {
    padding: 0 50px 0 50px;
  }

  ${md} {
    padding: 0;
  }

  ${sm} {
    margin-top: 50px;
    height: calc(100% - 50px);
    flex-direction: column;
  }
`

export const ContentAboveContent = styled.div`
  width: 100%;

  ${sm} {
    margin: 20px 0 20px 0;
  }

  ${md} {
    width: 100%;
    padding: 15px;
  }
`
export const whiteText: CSSProperties = {
  color: "white"
}
