import readingTime from "reading-time"

export const getReadingTime = (content: DocumentContent[]) => {
  const rt = readingTime(
    content
      .filter((c) => c.type === "paragraph")
      .map((c) => c.text)
      .join(" ") || ""
  )
  const minutes = Math.ceil(rt.minutes)

  return {
    ...rt,
    czechText: `${minutes} ${minutes === 1 ? "minuta" : "minut"} čtení`
  }
}

export interface DocumentContent {
  type: string
  text: string
}
