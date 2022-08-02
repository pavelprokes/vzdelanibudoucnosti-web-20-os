import React from "react"
import styled from "@emotion/styled"
import { PrismicDocumentCollectionGroup } from "../../lib/prismic/collection/getCollectionGroups"
import Image from "next/image"
import { Typography } from "antd"
import { CollectionItemWrapper } from "./CollectionItemWrapper"

export const CollectionGroupItem = ({
  d: {
    data: { cover_image, name, description }
  }
}: Props) => {
  return (
    <CollectionItemWrapper>
      <Above>
        <Typography.Title level={3}>{name[0].text}</Typography.Title>
        {/* @ts-ignore */}
        {description[0].text && <Typography.Text>{description[0].text}</Typography.Text>}
      </Above>
      <Background>
        <Image src={cover_image.url} alt={cover_image.alt} layout="fill" objectFit="cover" />
      </Background>
    </CollectionItemWrapper>
  )
}

interface Props {
  d: PrismicDocumentCollectionGroup
}

const Above = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 10px;
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
