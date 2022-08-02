import React from "react"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { PrismicDocumentCollectionItem } from "../../lib/prismic/collection/getCollectionItems"
import Image from "next/image"
import { CollectionItemWrapper } from "./CollectionItemWrapper"

export const CollectionItem = ({
  d: {
    data: { name, embed_media }
  }
}: Props) => {
  return (
    <CollectionItemWrapper>
      <Above>
        <Typography.Title level={3}>{name[0].text}</Typography.Title>
      </Above>
      <Background>
        <Image src={embed_media.thumbnail_url} alt={embed_media.thumbnail_url} layout="fill" objectFit="cover" />
      </Background>
    </CollectionItemWrapper>
  )
}

interface Props {
  d: PrismicDocumentCollectionItem
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
