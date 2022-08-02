import React, { useState } from "react"
import styled from "@emotion/styled"
import { Button, Form, Input, notification, Typography } from "antd"
import { Formik } from "formik"
import Link from "next/link"
import axios from "axios"
import { css } from "@emotion/react"
import { subscribeFormValidationSchema } from "./subscribeFormValidationSchema"
import { AntdFormItem } from "../AntdFormItem/AntdFormItem"
import { md, sm } from "../../styles/mediaQuery"
import { event } from "../../lib/ga"

const addSubscriberByEmail = async (email: string, tags: string[]) => {
  return axios(`/api/mailchimp/addSubscribeMember`, {
    method: "post",
    data: {
      email,
      tags
    }
  })
}

export const SubscribeForm = ({ tags, description }: Props) => {
  const [isSend, setIsSend] = useState(false)
  const initialValues = { email: "" }

  return (
    <ContactFormWrapper>
      {description && (
        <Typography.Paragraph
          css={css`
            text-align: center;
          `}>
          {description}
        </Typography.Paragraph>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={subscribeFormValidationSchema}
        onSubmit={async (values, { setSubmitting, setFieldValue, resetForm }) => {
          setSubmitting(true)

          await addSubscriberByEmail(values.email, tags)
            .then(() => {
              setSubmitting(false)
              setFieldValue("email", "")
              setIsSend(true)

              event({
                action: "send",
                category: "subscribeForm",
                label: tags.join(",")
              })

              notification.success({
                message: "Odběr novinek",
                description: "Váš email byl přidán k odběru novinek. Děkujeme",
                duration: 10
              })
            })
            .catch((err) => {
              console.error(err)
              setSubmitting(false)
              setFieldValue("email", "")

              notification.info({
                message: "Odběr novinek",
                description: "Váš email je již na seznamu.",
                duration: 10
              })
            })
            .finally(() =>
              resetForm({
                values: initialValues
              })
            )
        }}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <>
            <Form
              layout="inline"
              css={css`
                margin: 10px 0 10px 0;

                ${sm} {
                  margin: 0;
                }
              `}>
              <AntdFormItem name="email" label="Email" errors={errors} touched={touched}>
                <Input
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  css={css`
                    width: 250px;
                  `}
                />
              </AntdFormItem>

              <Button
                type="primary"
                htmlType="submit"
                onClick={() => handleSubmit()}
                loading={isSubmitting}
                {...(isSubmitting && {
                  css: css`
                    point-events: none;
                  `
                })}
                {...(isSend && {
                  css: css`
                    background: #52c41a;
                    border-color: #52c41a;
                    point-events: none;
                  `
                })}>
                {isSend ? "Odesláno" : "Odeslat"}
              </Button>
            </Form>
          </>
        )}
      </Formik>

      <span className="description">
        Odesláním souhlasím se{" "}
        <Link href="/zpracovani-osobnich-udaju">
          <a target="_blank">zpracování osobních údajů</a>
        </Link>
        .
      </span>
    </ContactFormWrapper>
  )
}

interface Props {
  tags: string[]
  description?: string
}

const ContactFormWrapper = styled.div`
  padding: 20px 40px 40px 40px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${md} {
    padding: 20px;
  }
`
