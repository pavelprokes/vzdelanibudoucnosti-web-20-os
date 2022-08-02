import { Col, Input, Row } from "antd"
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import { css } from "@emotion/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as yup from "yup"
import { debounce } from "lodash"

const signInEmailValidationSchema = yup.object({
  csrfToken: yup.string().required(),
  email: yup.string().email("Zadejte správný tvar emailové adresy.").required("Email je povinný.")
})

export const SignInEmailForm = ({ csrfToken }: Props) => {
  const [emailValue, setEmailValue] = useState<string>("")
  const [emailIsValid, setEmailIsValid] = useState<boolean | null>(null)
  const withError = !(emailIsValid === null || emailIsValid === true)

  const debounceOnChange = useMemo(
    () =>
      debounce((value: object) => {
        setEmailIsValid(signInEmailValidationSchema.isValidSync(value))
      }, 500),
    []
  )

  const onEmailFieldChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "") {
      setEmailValue(null)
    } else {
      setEmailValue(e.target.value)
    }
  }, [])

  useEffect(() => {
    if (emailValue !== "") {
      debounceOnChange({ email: emailValue, csrfToken })
    }
  }, [csrfToken, debounceOnChange, emailValue])

  return (
    <form
      method="post"
      action={emailIsValid ? "/api/auth/signin/email" : ""}
      css={css`
        display: flex;
        justify-content: center;
        height: 32px;
        margin-bottom: 20px;
      `}>
      <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />

      <Row gutter={4} justify="center">
        <Col>
          <label
            css={css`
              line-height: 32px;
              margin-right: 4px;
              width: 100%;
            `}>
            <Row gutter={4}>
              <Col
                css={
                  withError &&
                  css`
                    color: #ff4d4f;
                  `
                }>
                Email:
              </Col>
              <Col>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="muj@email.cz"
                  onChange={onEmailFieldChangeHandler}
                  value={emailValue}
                  css={css`
                    min-width: 250px;
                    ${withError ? "border-color: #ff4d4f;" : ""}
                  `}
                />
              </Col>
            </Row>
          </label>
        </Col>
        <Col>
          <button
            className="ant-btn"
            type="submit"
            css={
              withError &&
              css`
                pointer-events: none;
              `
            }>
            <FontAwesomeIcon
              icon="magic"
              css={css`
                margin-right: 8px;
                font-size: 110%;
              `}
            />
            Odeslat magický odkaz
          </button>
        </Col>
      </Row>
    </form>
  )
}

interface Props {
  csrfToken: string
}
