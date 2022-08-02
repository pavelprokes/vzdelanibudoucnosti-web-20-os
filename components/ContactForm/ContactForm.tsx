import { Formik, FormikHelpers } from "formik"
import React, { useState } from "react"
import { Button, Form, Input, notification } from "antd"
import { AntdFormItem } from "../AntdFormItem/AntdFormItem"
import styled from "@emotion/styled"
import { contactFormValidationSchema } from "./contactFormValidationSchema"
import { css } from "@emotion/react"
import { emailInlineHTML } from "../../lib/email/emailInlineHtml"
import { strippedString } from "../../lib/email/strippedString"
import axios from "axios"
import { contactEmail } from "../../lib/email/emailsDefinition"
import { event } from "../../lib/ga"
import { md } from "../../styles/mediaQuery"
import { SendEmail } from "../../lib/email/SendEmail"

const dev = process.env.NODE_ENV !== "production"

export const ContactForm = ({ sendTo = "info@vzdelanibudoucnosti.cz", contactFormName, contactFormUrl, children }: Props) => {
  const [formCompleteSend, setFormCompleteSend] = useState(false)
  const initialValues: ContactFormFields = {
    email: "",
    message: ""
  }

  const onSubmitHandler = async (initialValues: ContactFormFields, values: ContactFormFields, formikHelpers: FormikHelpers<ContactFormFields>) => {
    formikHelpers.setSubmitting(true)
    setFormCompleteSend(false)

    const emailLetter = contactEmail(values.email, values.message.replace(/\n/g, "<br />"), contactFormName, contactFormUrl)
    const config: SendEmail = {
      emailList: [sendTo, "info@vzdelanibudoucnosti.cz"],
      replyTo: values.email,
      html: emailInlineHTML(`Zpráva z webových stránek Vzdělání budoucnosti`, "", emailLetter),
      text: strippedString(emailLetter),
      subject: "Zpráva z webových stránek Vzdělání budoucnosti",
      attachments: [
        {
          filename: "vzdelanibudoucnosti-logo.png",
          path: `${dev ? "http://localhost:3003" : "https://vzdelanibudoucnosti.cz"}/images/vzdelanibudoucnosti_2_black_text.png`,
          cid: "vzdelanibudoucnosti-logo"
        }
      ]
    }

    return await axios
      .post("/api/email/send", config)
      .then((res) => {
        setFormCompleteSend(true)

        event({
          action: "send",
          category: "contactForm",
          label: contactFormName
        })

        notification.success({
          message: "Zpráva odeslána.",
          description: "Zpráva odeslána. Budeme se snažit Vám co nejdříve odpovědět. Děkujeme.",
          duration: 10
        })

        return res
      })
      .catch((err) => {
        notification.error({
          message: "Zpráva neodeslána.",
          description: "Při odesílání se stala chyba. Zkuste to později. Pokud obtíže přetrvají, kontaktujte nás. Děkujeme za pochopení.",
          duration: 10
        })
        console.error("sendRegisterEmail", err)
      })
      .finally(() => {
        formikHelpers.setSubmitting(false)
      })
  }

  return (
    <ContactFormWrapper>
      {children && (
        <div
          css={css`
            margin-bottom: calc(1em + 10px);
          `}>
          {children}
        </div>
      )}

      <Formik<ContactFormFields>
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => onSubmitHandler(initialValues, values, formikHelpers)}
        validationSchema={contactFormValidationSchema}>
        {({ values, handleSubmit, handleChange, handleBlur, touched, errors, isSubmitting }) => (
          <>
            <Form
              css={css`
                display: flex;
                flex-direction: column;
              `}>
              <AntdFormItem<ContactFormFields>
                name="email"
                label="Email"
                errors={errors}
                touched={touched}
                labelCol={{ lg: { span: 2 } }}
                wrapperCol={{ lg: { span: 22 } }}
                css={css`
                  margin-bottom: 0;
                `}>
                <Input value={values.email} onChange={handleChange} onBlur={handleBlur} />
              </AntdFormItem>

              <AntdFormItem<ContactFormFields>
                name="message"
                label="Zpráva"
                errors={errors}
                touched={touched}
                labelCol={{ lg: { span: 2 } }}
                wrapperCol={{ lg: { span: 22 } }}
                css={css`
                  margin-bottom: 0;
                `}>
                <Input.TextArea value={values.message} onChange={handleChange} onBlur={handleBlur} autoSize={{ minRows: 3, maxRows: 5 }} />
              </AntdFormItem>

              <Button
                type="primary"
                htmlType="submit"
                onClick={() => handleSubmit()}
                loading={isSubmitting}
                css={[
                  css`
                    align-self: flex-end;
                  `,
                  ...(isSubmitting
                    ? [
                        css`
                          point-events: none;
                        `
                      ]
                    : []),
                  ...(formCompleteSend
                    ? [
                        css`
                          background: #52c41a;
                          border-color: #52c41a;
                          point-events: none;
                        `
                      ]
                    : [])
                ]}>
                {formCompleteSend ? "Odesláno" : "Odeslat"}
              </Button>
            </Form>
          </>
        )}
      </Formik>

      {formCompleteSend && <div>Zpráva odeslána. Budeme se snažit Vám co nejdříve odpovědět. Děkujeme</div>}
    </ContactFormWrapper>
  )
}

interface Props {
  sendTo?: string
  contactFormName: string
  contactFormUrl: string
  children?: React.ReactNode
}

interface ContactFormFields {
  email: string
  message: string
}

const ContactFormWrapper = styled.div`
  margin-top: 20px;
  padding: 40px;
  background-color: #fff;
  border-radius: 20px;

  ${md} {
    padding: 20px;
  }
`
