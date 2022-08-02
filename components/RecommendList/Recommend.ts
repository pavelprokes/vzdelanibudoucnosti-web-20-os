import React from "react"

export interface Recommend {
  id: string
  number_id: number
  slugify_name: string
  slug: string
  title: string
  text: React.ReactNode
  text_string: string
  background_image?: RecommendBackgroundImage
  button: RecommendButton
  more_text: string
}

export interface RecommendBackgroundImage {
  alt: string
  copyright: string | null
  dimensions: {
    width: number
    height: number
  }
  type: "image"
  url: string
}

export interface RecommendButton {
  text: string
  color: string
  link: string
}
