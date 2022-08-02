import styled from "@emotion/styled"
import { Typography } from "antd"
import { md } from "../../styles/mediaQuery"

export const H1 = styled(Typography.Title)`
  margin-bottom: 5px;
`

export const h2Size = {}

export const H2 = styled(Typography.Title)`
  margin: 0 0 10px 0;
`

export const h3Size = {}

export const H3 = styled(Typography.Title)`
  margin: 0 0 5px 0;
`

export const H4 = styled(Typography.Title)`
  margin: 0 0 5px 0;
`

export const SmallBlock = styled.small`
  display: block;
  margin-bottom: 10px;
`

export const Paragraph = styled(Typography.Text)`
  margin-bottom: 5px;
  display: block;
`

export const Article = styled.article`
  margin-bottom: 15px;
`

export const ImageWrapperMargin = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 100%;
`

export const BorderedImageWrapper = styled.div`
  border-radius: 20px;
  overflow: hidden;

  > div {
    display: block !important;
  }

  ${md} {
    > div {
      width: 100% !important;
    }
  }
`

export const CommonArticles = styled.div`
  margin-top: 50px;
`
