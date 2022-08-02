import { PrismicDocument } from "@prismicio/types"
import { RichText } from "prismic-reactjs"
import { htmlSerializer } from "../../lib/prismic/htmlSerializer"
import React from "react"
import { theme } from "../../styles/styles"
import { slugifyCourse } from "../../lib/prismic/mapData"
import { Recommend } from "./Recommend"

export const mapRecommend = (d: PrismicDocument<any>): Recommend => {
  const { slugify_name, number_id, slug } = slugifyCourse(d)

  return {
    id: d.id,
    number_id,
    slugify_name,
    slug,
    title: (d.data.title[0] && d.data.title[0].text) || "",
    text: <RichText render={d.data.text} htmlSerializer={htmlSerializer} />,
    text_string: (d.data.text[0] && d.data.text[0].text) || "",
    background_image: d.data.background_image || undefined,
    button: {
      text: (d.data.button_text && d.data.button_text[0] && d.data.button_text[0].text) || "Přejít na nabídku",
      color: (d.data.button_color && d.data.button_color[0] && d.data.button_color[0].text) || theme.colors["main-color-red"],
      link: d.data.button_link
    },
    more_text: (d.data.more_text && d.data.more_text[0] && d.data.more_text[0].text) || undefined
  }
}
