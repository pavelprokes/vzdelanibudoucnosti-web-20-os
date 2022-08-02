import React from "react"
import styled from "@emotion/styled"
import { Collapse, Typography } from "antd"
import { CollapsedPanelItem } from "../../lib/CollapsedPanelItem"

export const CollapsedPanel = ({ items }: Props) => {
  return (
    <CollapsedPanelWrapper className="page-white-border-r-block">
      <Collapse bordered={false} defaultActiveKey={items[0].name.toString()}>
        {items.map((item) => (
          <Collapse.Panel key={item.name.toString()} header={item.name}>
            <Typography.Text>{item.text}</Typography.Text>
          </Collapse.Panel>
        ))}
      </Collapse>
    </CollapsedPanelWrapper>
  )
}

const CollapsedPanelWrapper = styled.div`
  .ant-collapse-borderless {
    background-color: transparent;

    .ant-collapse-item {
      border: none;
    }
  }
`

interface Props {
  items: CollapsedPanelItem[]
}
