import React from "react"
import styled from "@emotion/styled"
import { Col, Comment as AntdComment, Row, Typography } from "antd"
import { Comment } from "../../lib/comments"
import moment from "moment"
import "moment/locale/cs"
import Image from "next/image"
import { ColProps } from "antd/lib/col"
import { sm } from "../../styles/mediaQuery"
import { css } from "@emotion/react"
moment.locale("cs")

export const Comments = ({ comments, className, commentStyle, colProps }: Props) => {
  return (
    <div>
      <Row gutter={[10, 10]}>
        {comments.map((c, i) => {
          const dateTime = moment(c.dateTime).format("DD. MM. YYYY")
          const avatar = c.photoPath ? (
            <div
              css={css`
                width: 300px;
                height: 300px;
                position: relative;
                margin-right: 18px;

                ${sm} {
                  width: 100px;
                  height: 100px;
                }
              `}>
              <ImageRounded src={c.photoPath} layout="fill" objectFit="cover" />
            </div>
          ) : (
            c.avatarImagePath && <ImageRounded src={c.avatarImagePath} width={35} height={35} objectFit="cover" layout="fixed" />
          )

          return (
            <ColWithWidth key={`${c.dateTime}${i}`} {...colProps}>
              <BorderedAntdComment
                className={className}
                avatar={avatar}
                datetime={moment(c.dateTime).isValid() && <span style={commentStyle}>{dateTime}</span>}
                author={c.author && <span style={commentStyle}>{c.author}</span>}
                content={<Typography.Text style={commentStyle}>{c.content}</Typography.Text>}
                actions={c.actions}
              />
            </ColWithWidth>
          )
        })}
      </Row>
    </div>
  )
}

interface Props {
  comments: Comment[]
  className?: string
  commentStyle?: Record<string, unknown>
  colProps?: ColProps
}

const ImageRounded = styled(Image)`
  border-radius: 50%;
  overflow: hidden;
`

const ColWithWidth = styled(Col)`
  width: 100%;
`

const BorderedAntdComment = styled(AntdComment)`
  padding: 10px 35px 10px 35px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;

  .ant-comment-avatar {
    cursor: unset;
  }
`
