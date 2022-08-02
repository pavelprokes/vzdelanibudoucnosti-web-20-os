import React from "react"

export interface Comment {
  avatarImagePath?: string
  photoPath?: string
  author: string
  content: React.ReactNode
  dateTime: string
  actions?: React.ReactNode[]
}
