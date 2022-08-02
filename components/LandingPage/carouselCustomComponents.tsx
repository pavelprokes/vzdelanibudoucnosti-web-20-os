import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Theme } from "../../styles/theme"
import { css } from "@emotion/react"
import { theme as themeColorPalette } from "../../styles/styles"

const customArrowsStyle = (theme: Theme, direction: "left" | "right") => css`
  color: ${theme === Theme.dark ? themeColorPalette.colors.dark.textWhite : "#000"};
  position: absolute !important;
  ${direction}: 30px;
  z-index: 3;
  display: inline-block;
  padding: 6px;
  cursor: pointer;
`

export const CustomLeftArrow = ({ theme, onClick }) => {
  return <FontAwesomeIcon onClick={onClick} icon="arrow-right" size={"4x"} css={customArrowsStyle(theme, "left")} />
}

export const CustomRightArrow = ({ theme, onClick }) => {
  return <FontAwesomeIcon onClick={onClick} icon="arrow-right" size={"4x"} css={customArrowsStyle(theme, "right")} />
}

export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}
