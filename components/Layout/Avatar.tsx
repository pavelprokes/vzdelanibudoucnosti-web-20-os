import { Avatar } from "antd"
import React from "react"
import randomColor from "randomcolor"
import styled from "@emotion/styled"

const getEmailLetter = (email: string): string => {
  if (!email) {
    return ""
  }

  const beforeEmail = email.split("@")
  if (!beforeEmail[0]) {
    return ""
  }

  const beforeEmailArray = beforeEmail[0].split(".")
  if (beforeEmailArray?.length === 0) {
    return ""
  }

  if (beforeEmailArray.length === 1) {
    return `${beforeEmailArray[0].slice(0, 1)}`.toUpperCase()
  }

  return `${beforeEmailArray[0].slice(0, 1)}${beforeEmailArray[1].slice(0, 1)}`.toUpperCase()
}

export const LayoutAvatar = ({ image, email, className, onClick }: Props) => {
  const color = randomColor({ seed: email, format: "rgb", luminosity: "dark" })

  return (
    <Wrapper onClick={onClick}>
      <Avatar src={image} className={className} style={{ backgroundColor: color }}>
        {getEmailLetter(email)}
      </Avatar>
    </Wrapper>
  )
}

interface Props {
  image?: string
  className?: string
  email?: string
  onClick?: () => void
}

const Wrapper = styled.div`
  display: inline-block;
`
