import { css } from "@emotion/react"
import Link from "next/link"
import React from "react"
import { AuthLayout } from "../../components/auth/AuthLayout"
import { useRouter } from "next/router"

const Error = () => {
  const { query } = useRouter()

  return (
    <AuthLayout
      title={`Chyba "${query.error}"`}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      `}>
      Něco se stalo špatně. Je možné, že váš odkaz z e-mailu je neplatný. Zkuste si ho nechat zaslat znovu. Případně nás kontaktujte.{" "}
      <Link href={"/"}>Zpět na domovskou stránku.</Link>
    </AuthLayout>
  )
}

export default Error
