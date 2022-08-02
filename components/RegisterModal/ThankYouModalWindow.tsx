import React, { useState } from "react"
import { Modal } from "antd"
import { css } from "@emotion/react"
import { event } from "../../lib/ga"
import { md } from "../../styles/mediaQuery"

export const ThankYouModalWindow = ({ title, children }: Props) => {
  const [visible, setVisible] = useState(true)

  visible &&
    event({
      action: "thank you modal",
      category: "course"
    })

  return (
    <Modal
      title={title}
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width="80vw"
      css={css`
        .ant-modal-header,
        .ant-modal-footer {
          border: none;
        }

        .ant-modal-footer {
          padding-bottom: 24px;
          padding-right: 24px;
          padding-left: 24px;

          button.ant-btn {
            &:not(.ant-btn-primary) {
              display: none;
            }
          }
        }

        ${md} {
          .ant-modal-body {
            padding: 12px;
          }
        }
      `}>
      {children}
    </Modal>
  )
}

interface Props {
  title: React.ReactNode
  children: React.ReactNode
}
