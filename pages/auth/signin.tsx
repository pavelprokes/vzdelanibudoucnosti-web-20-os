import { getCsrfToken, getProviders, SessionProvider, signIn } from "next-auth/react"
import { GetServerSideProps } from "next"
import { ClientSafeProvider, LiteralUnion } from "next-auth/react/types"
import { BuiltInProviderType } from "next-auth/providers"
import { Button, Typography } from "antd"
import { css } from "@emotion/react"
import { SignInEmailForm } from "../../components/auth/SignInEmailForm"
import React from "react"
import { GoogleOutlined } from "@ant-design/icons"
import { sm } from "../../styles/mediaQuery"
import { AuthLayout } from "../../components/auth/AuthLayout"

const SignIn = ({ providers, csrfToken }: Props) => {
  return (
    <SessionProvider>
      <AuthLayout title="Přihlášení">
        {Object.values(providers).map((provider) => {
          if (provider.id === "email") {
            return <SignInEmailForm key={provider.name} csrfToken={csrfToken} />
          }

          return (
            <div
              key={provider.name}
              css={css`
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
              `}>
              <Typography.Text
                type="secondary"
                css={css`
                  margin: 20px 0 20px 0;

                  &:first-of-type {
                    margin: 0 0 20px 0;
                    ${sm} {
                      margin: 20px 0 20px 0;
                    }
                  }
                `}>
                nebo se přihlašte pomocí
              </Typography.Text>

              <div>
                <Button
                  icon={
                    <GoogleOutlined
                      css={css`
                        font-size: 110%;
                      `}
                    />
                  }
                  onClick={() => signIn(provider.id)}>
                  {provider.name}
                </Button>
              </div>
            </div>
          )
        })}
      </AuthLayout>
    </SessionProvider>
  )
}

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null[]
  csrfToken: string
}

export default SignIn

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)

  return {
    props: { providers, csrfToken }
  }
}
