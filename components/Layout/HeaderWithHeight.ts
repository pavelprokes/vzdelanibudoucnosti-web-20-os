import styled from "@emotion/styled"
import { Layout } from "antd"
import { sm } from "../../styles/mediaQuery"

export const HeaderWithHeight = styled(Layout.Header)`
  height: 80px;
  padding: 0 50px;
  line-height: 80px;
  background: #0000;
  margin-top: 30px;

  ${sm} {
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    padding: 0 20px;
  }
`
