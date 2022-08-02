import { css } from "@emotion/react"
import { faMagic } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import React from "react"
import { AuthLayout } from "../../components/auth/AuthLayout"

const VerifyRequest = () => {
  return (
    <AuthLayout
      title={
        <>
          <FontAwesomeIcon
            icon={faMagic}
            css={css`
              margin-right: 8px;
            `}
          />
          Magický link odeslán
        </>
      }
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      `}>
      Mrkněte do vaší emailové schránky a kliknutím na tlačítko se přihlašte. <Link href={"/"}>Zpět na domovskou stránku.</Link>
    </AuthLayout>
  )
}

export default VerifyRequest
