import reactStringReplace from "react-string-replace"
import { Alert, Button } from "antd"
import Link from "next/link"
import React from "react"
import * as yup from "yup"
import { css } from "@emotion/react"

export enum SnippetType {
  button = "button"
}

export interface SnippetConfig {
  title: string
  href: string
}

export type Snippet = Record<SnippetType, SnippetConfig>

const snippetsValidationSchema = yup.object().shape({
  title: yup.string().required(),
  href: yup.string().required()
})

export const getSnippetsFromText = (string: string) => {
  return reactStringReplace(string, /(?:<snippet>)([\s\S]*)(?:<\/snippet>)/gi, (match, i) => {
    const parsedSnippet = JSON.parse(match)
    if (!parsedSnippet) {
      return <Alert message={`Error with adding snippet. Invalid config: ${JSON.stringify(match)}`} type="error" />
    }

    if (parsedSnippet.button) {
      const isSchemaValid = snippetsValidationSchema.isValidSync(parsedSnippet.button)
      if (isSchemaValid) {
        return (
          <Button
            key={match + i}
            size="large"
            type="primary"
            css={css`
              margin: 0 auto;
              margin-top: 20px;
              margin-bottom: 20px;
              display: block;
            `}>
            <Link href={`${parsedSnippet.button.href}?utm_source=blog&utm_medium=button&utm_campaign=htmlSerializer`}>{parsedSnippet.button.title}</Link>
          </Button>
        )
      }
    }

    return <Alert message={`Error with adding snippet. Invalid config: ${JSON.stringify(parsedSnippet)}`} type="error" />
  })
}
