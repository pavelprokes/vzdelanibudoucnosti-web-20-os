import React from "react"
import styled from "@emotion/styled"
import { md } from "../styles/mediaQuery"

export const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <SectionWithPadding className={className}>{children}</SectionWithPadding>
)

const SectionWithPadding = styled.section`
  padding: 40px 0 20px 0;

  ${md} {
    padding: 20px 0 20px 0;
  }
`
