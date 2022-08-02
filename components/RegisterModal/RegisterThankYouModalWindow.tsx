import { ThankYouModalWindow } from "./ThankYouModalWindow"
import { Space, Spin, Typography } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"
import { theme } from "../../styles/styles"
import moment from "moment"
import { css } from "@emotion/react"
import Link from "next/link"
import React from "react"
import { CourseLecturer, MappedCourse } from "../../lib/prismic/mapData"
import { qrImageUrl } from "../../config/payments"
import Image from "next/image"
import { md } from "../../styles/mediaQuery"
import { RegisterStudentCourse } from "./types"
import { OutputCourseRegistration } from "../../lib/supabase/insertCourseRegistration"

export const RegisterThankYouModalWindow = ({ course, lecturer, values, register }: Props) => {
  const qrUrl = qrImageUrl(register.payment.variableNumber, register.payment.amount.value, undefined, register.payment.comment)

  return (
    <ThankYouModalWindow
      title={
        <Typography.Title level={2}>
          <CheckCircleOutlined style={{ color: theme.colors.success, marginRight: 10 }} />
          Vaše registrace v &quot;{course.name}&quot; je potvrzena
        </Typography.Title>
      }>
      <Typography.Title level={3}>Děkujeme vám za vaši registraci. Platbu proveďte prosím následovně:</Typography.Title>
      <Typography.Paragraph>
        Platbu můžete provést z vašeho účtu později nebo přímo odtud pomocí QR kódu a to <strong>do {moment().add(7, "days").format("D. M. YYYY")}</strong> (7
        kalendářních dnů), zároveň nejpozději v pátek, týden před začátkem kroužku (kurzu).
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>
          Veškeré tyto údaje vám byly nyní odeslány do mailu{" "}
          {values.studentContact?.email ? [values.studentContact.email, values.student.email].join(" a ") : values.student.email}.
        </strong>
      </Typography.Paragraph>

      <Typography.Text>
        <strong>Položky:</strong>
      </Typography.Text>
      <Typography.Paragraph>
        1x registrace {course.name}
        {register.payment.amount?.discount > 0 ? <> (aplikována sleva kuponu {register.payment.coupon?.code})</> : <></>}
        {values.equipmentBuyFromOrganization ? <> + vybavení</> : <></>} = {register.payment.amount.value} Kč
      </Typography.Paragraph>

      <Space
        align="start"
        size={20}
        css={css`
          display: flex;
          justify-content: space-between;

          ${md} {
            flex-direction: column;
          }
        `}>
        <div>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            <strong>Informace k platbě bankovním převodem:</strong>
          </Typography.Paragraph>

          <Typography.Paragraph style={{ marginBottom: 0 }}>
            Banka: <strong>Fio banka</strong>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            Číslo účtu:{" "}
            <strong>
              {register.payment.account}/{register.payment.bank}
            </strong>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            Variabilní symbol: <strong>{register.payment.variableNumber}</strong>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            Částka: <strong>{register.payment.amount.value} Kč</strong>
          </Typography.Paragraph>
          <Typography.Paragraph>
            Poznámka: <strong>{register.payment.comment}</strong>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            (Pro platbu ze zahraničí použijte SEPA platbu na číslo účtu ve formátu IBAN: {register.payment.ibanAccount})
          </Typography.Paragraph>
        </div>

        <div
          css={css`
            position: relative;
          `}>
          {qrUrl ? <Image src={qrUrl} width={300} height={300} quality={100} unoptimized={true} alt="qr-payment-code" /> : <Spin />}
        </div>
      </Space>

      <Typography.Title level={3}>Kdy?</Typography.Title>
      <Typography.Text>{course.when}</Typography.Text>

      <Typography.Title level={3}>Kontakt na lektora</Typography.Title>
      <Typography.Text>
        {lecturer.name} -{" "}
        <Link href={`mailto:${lecturer.email}`}>
          <a title={lecturer.email}>{lecturer.email}</a>
        </Link>
      </Typography.Text>
    </ThankYouModalWindow>
  )
}

interface Props {
  course: MappedCourse
  lecturer: CourseLecturer
  values: RegisterStudentCourse
  register: OutputCourseRegistration
}
