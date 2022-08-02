import React from "react"
import Image from "next/image"
import styled from "@emotion/styled"
import { md, sm } from "../../styles/mediaQuery"

const FullWidthImage = ({ imageBgUrl, height }: Props) => {
  return (
    <FullWidthImageWrapper height={height}>
      <Image priority={true} alt="01_2022_vzdelani_budoucnosti_web_header_1920_1" src={imageBgUrl} layout="fill" objectFit="cover" />
    </FullWidthImageWrapper>
  )
}

const FullWidthImageWrapper = styled.div<{ height: string }>`
  position: relative;
  z-index: 0;
  transform: scaleX(-1);

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background-color: rgba(49, 106, 153, 0.5);
    z-index: 1;
  }

  ${(props: { height: string }) => `
        height: ${props.height};
    `}

  ${md} {
    min-height: 50vh;
    height: initial;
  }

  ${sm} {
    min-height: 50vh;
    height: initial;
  }

  @media (max-height: 770px) {
    height: 100vh;
  }
`

interface Props {
  imageBgUrl: string
  height: string
}

export default FullWidthImage
