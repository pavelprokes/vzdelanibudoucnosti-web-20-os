import React, { useState } from "react"
import { GetServerSideProps } from "next"
import { getSession, useSession } from "next-auth/react"
import { getRegistrations } from "../../lib/supabase/registrations/getRegistrations"
import { PostgrestResponse } from "@supabase/supabase-js"
import { RegistrationTableWithPaymentStudentLegalRepre } from "../../lib/supabase/insertCourseRegistration"
import { CollectionLayout } from "../../components/Collection/CollectionLayout"
import { Button, Modal, Space, Table, Tag, Tooltip, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { Section } from "../../components/Section"
import Link from "next/link"
import moment from "moment"
import "moment/locale/cs"
import { css } from "@emotion/react"
import { theme } from "../../styles/styles"
import styled from "@emotion/styled"
import randomColor from "randomcolor"
import ContainerWide from "../../components/Layout/ContainerWide"
import { H1 } from "../../components/blog/common"
import { whiteText } from "../../components/Layout/common"
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined, ExclamationOutlined, MailOutlined } from "@ant-design/icons"
import axios from "axios"
import { sendPaymentData } from "../../components/RegisterModal/sendPaymentData"
moment.locale("cs")

const { confirm } = Modal

const Admin = ({ registrations: registrationsFromBackend }: Props) => {
  const { status } = useSession()
  const [asyncRequestLoading, setAsyncRequestLoading] = useState<boolean>(false)
  const [registrationsFromFetch, setRegistrationsFromFetch] = useState<PostgrestResponse<RegistrationTableWithPaymentStudentLegalRepre> | undefined>(undefined)
  const registrations = registrationsFromFetch || registrationsFromBackend

  const fetchRegistrations = async () => {
    setAsyncRequestLoading(true)
    await axios
      .post("/api/course-registration/getRegistrations")
      .then((res) => setRegistrationsFromFetch(res.data))
      .catch((err) => console.error(err))
      .finally(() => setAsyncRequestLoading(false))
  }

  const onClickPayedHandler = (paymentId: number) => {
    confirm({
      title: "Chcete označit registraci opravdu jako zaplacenou?",
      icon: <ExclamationCircleOutlined />,
      okText: "Ano",
      cancelText: "Ne",
      onOk: async () => {
        setAsyncRequestLoading(false)

        await axios
          .post("/api/course-registration/setPayed", { paymentId, is_payed: true })
          .then((res) => console.log(res.data))
          .catch((err) => console.error(err))
          .finally(() => setAsyncRequestLoading(true))

        await fetchRegistrations()
      },
      onCancel: () => {}
    })
  }

  const onClickCancelHandler = (registrationId: number) => {
    confirm({
      title: "Chcete registraci opravdu zrušit?",
      content: "Smazána nebude.",
      icon: <ExclamationCircleOutlined />,
      okText: "Ano",
      cancelText: "Ne",
      onOk: async () => {
        setAsyncRequestLoading(false)

        await axios
          .post("/api/course-registration/setCancelled", { registrationId, cancel_reason: "" })
          .then((res) => console.log(res.data))
          .catch((err) => console.error(err))
          .finally(() => setAsyncRequestLoading(true))

        await fetchRegistrations()
      },
      onCancel: () => {}
    })
  }

  const onClickSendPaymentEmailHandler = (record: RegistrationTableWithPaymentStudentLegalRepre) => {
    confirm({
      title: "Chcete opravdu poslat platební údaje?",
      content: "Budou zaslány e-mailové zprávy studentovi a zák. zástupci (pokud je uveden). Takové jako při registraci.",
      icon: <ExclamationCircleOutlined />,
      okText: "Ano",
      cancelText: "Ne",
      onOk: async () => {
        setAsyncRequestLoading(false)

        await sendPaymentData(record, (err) => {
          console.error(err)
        })
      },
      onCancel: () => {}
    })
  }

  const onClickRemindHandler = (paymentId: number) => {
    confirm({
      title: "Chcete registraci opravdu označit jako upomínkovanou?",
      content: "Bude označena s dnešním datem a jménem přihlášeného uživatele.",
      icon: <ExclamationCircleOutlined />,
      okText: "Ano",
      cancelText: "Ne",
      onOk: async () => {
        setAsyncRequestLoading(false)

        await axios
          .post("/api/course-registration/setReminder", { paymentId })
          .then((res) => console.log(res.data))
          .catch((err) => console.error(err))
          .finally(() => setAsyncRequestLoading(true))

        await fetchRegistrations()
      },
      onCancel: () => {}
    })
  }

  const columns: ColumnsType<RegistrationTableWithPaymentStudentLegalRepre> = [
    {
      title: "Stav",
      key: "payment.is_paid",
      render: (value, record) => (
        <div>
          <Dot color={record.payment.is_paid ? theme.colors.success : theme.colors["main-color-red"]} />
        </div>
      ),
      // @ts-ignore
      sorter: (a, b) => a.payment.is_paid - b.payment.is_paid,
      filterSearch: true,
      filters: [true, false].map((value) => ({ text: value ? "zaplaceno" : "nezaplaceno", value })),
      onFilter: (value, record) => record.payment.is_paid === value
    },
    {
      title: "Jméno a příjmení",
      key: "student.name",
      render: (value, record) => (
        <div>
          {record.student.name} {record.student.surname}
        </div>
      ),
      sorter: (a, b) => `${a.student.name} ${a.student.surname}`.localeCompare(`${b.student.name} ${b.student.surname}`),
      filterSearch: true,
      filters: [...new Set(registrations?.data.map((r) => `${r.student.name} ${r.student.surname}`))].map((value) => ({ text: value, value })),
      onFilter: (value, record) => `${record.student.name} ${record.student.surname}`.includes(value.toString())
    },
    {
      title: "E-mail",
      key: "student.email",
      render: (value, record) => <div>{record.student.email}</div>,
      sorter: (a, b) => a.student.email.localeCompare(b.student.email),
      filterSearch: true,
      filters: [...new Set(registrations?.data.map((r) => r.student.email))].map((value) => ({ text: value, value })),
      onFilter: (value, record) => record.student.email.includes(value.toString())
    },
    {
      title: "Ročník",
      key: "student.grade",
      render: (value, record) => <div>{record.student.grade}</div>,
      sorter: (a, b) => a.student.grade.localeCompare(b.student.grade),
      filterSearch: true,
      filters: [...new Set(registrations?.data.map((r) => r.student.grade))].map((value) => ({ text: value, value })),
      onFilter: (value, record) => record.student.grade.includes(value.toString())
    },
    {
      title: "Kraj školy",
      key: "student.region",
      render: (value, record) => <div>{record.student.region}</div>,
      sorter: (a, b) => a.student.region.localeCompare(b.student.region),
      filterSearch: true,
      filters: [...new Set(registrations?.data.map((r) => r.student.region))].map((value) => ({ text: value, value })),
      onFilter: (value, record) => record.student.region.includes(value.toString())
    },
    {
      title: "Telefon",
      key: "student.phone",
      render: (value, record) => <div>{record.student.phone}</div>,
      sorter: (a, b) => a.student.phone.localeCompare(b.student.phone),
      filterSearch: true,
      filters: [...new Set(registrations?.data.map((r) => r.student.phone))].map((value) => ({ text: value, value })),
      onFilter: (value, record) => record.student.phone.includes(value.toString())
    },
    {
      title: "Kroužek",
      key: "course_slug",
      render: (value, record) => (
        <Link href={`https://vzdelanibudoucnosti.cz/registrace/${record.course_slug}`}>
          <a target="_blank">{record.course_slug}</a>
        </Link>
      ),
      sorter: (a, b) => a.course_slug.localeCompare(b.course_slug),
      filterSearch: true,
      filters: [...new Set(registrations?.data.map((r) => r.course_slug))].map((value) => ({ text: value, value })),
      onFilter: (value, record) => record.course_slug.includes(value.toString())
    },
    {
      title: "Další",
      key: "student.equipment_buy_from_organization",
      render: (value, record) => (
        <Space size="small" wrap direction="vertical">
          {record.agreement_with_sign_in && !record.cancel_when && <Tag>přihlášen</Tag>}
          {record.payment.is_paid && <Tag color={theme.colors.success}>zaplaceno</Tag>}
          {record.equipment_buy_from_organization && (
            <Tag color={randomColor({ seed: "equipment_buy_from_organization", luminosity: "dark" })}>zaslat vybavení</Tag>
          )}
          {record.payment.first_reminder && <Tag color={theme.colors["main-color-red"]}>upomínkován</Tag>}
          {record.agreement_with_newsletter && <Tag color={randomColor({ seed: "newsletter", luminosity: "dark" })}>newsletter</Tag>}
          {record.agreement_with_newsletter_acquisition_of_persons_photos && <Tag>můžeme fotit</Tag>}
          {record.cancel_when && <Tag>zrušeno</Tag>}
        </Space>
      )
    },
    {
      title: "Vytvořeno",
      key: "student.phone",
      render: (value, record) => (
        <div>
          <Tooltip title={moment(record.created_at).format("l h:mm:ss")}>
            {moment(record.created_at).format("l")}
            <br />
            <Typography.Text
              type="secondary"
              css={css`
                font-size: 11px;
              `}>
              ({moment(record.created_at).startOf("day").fromNow()})
            </Typography.Text>
          </Tooltip>
        </div>
      )
    },
    {
      title: "Akce",
      key: "actions",
      render: (value, record) => (
        <Space>
          <Tooltip title="označit jako zaplaceno">
            <Button
              icon={<CheckOutlined />}
              loading={asyncRequestLoading}
              type="primary"
              onClick={() => onClickPayedHandler(record.payment.id)}
              disabled={record.payment.is_paid || !!record.cancel_when}
            />
          </Tooltip>
          <Tooltip title="poslat platební údaje">
            <Button
              icon={<MailOutlined />}
              loading={asyncRequestLoading}
              onClick={() => onClickSendPaymentEmailHandler(record)}
              disabled={record.payment.is_paid || !!record.cancel_when}
            />
          </Tooltip>
          <Tooltip title="upomínkován">
            <Button
              icon={<ExclamationOutlined />}
              loading={asyncRequestLoading}
              onClick={() => onClickRemindHandler(record.payment.id)}
              disabled={record.payment.is_paid || !!record.cancel_when}
            />
          </Tooltip>
          <Tooltip title="zrušin registraci">
            <Button icon={<CloseOutlined />} loading={asyncRequestLoading} onClick={() => onClickCancelHandler(record.id)} disabled={!!record.cancel_when} />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <CollectionLayout
      moveUp="40vh"
      contentAboveWrapperClassName={css`
        margin-top: -40px;
      `}
      contentAbove={
        <>
          <H1 className="ml11" style={whiteText} css>
            Registrace ({registrations.data.length} registrací celkem)
          </H1>
        </>
      }>
      <ContainerWide>
        <Section>
          {status === "authenticated" && registrations ? (
            <Table
              size="small"
              dataSource={registrations?.data || []}
              columns={columns}
              rowKey="id"
              loading={asyncRequestLoading}
              expandable={{
                expandedRowRender: (record) => (
                  <div>
                    {record.legal_representative && (
                      <Typography.Paragraph>
                        Rodič: {record.legal_representative.name} {record.legal_representative.surname}{" "}
                        <Typography.Text type="secondary">({record.legal_representative.relationship_to_student})</Typography.Text>{" "}
                        {record.legal_representative.email} {record.legal_representative.phone}
                      </Typography.Paragraph>
                    )}

                    {record.payment && (
                      <Typography.Paragraph>
                        Platba:{" "}
                        {record.payment.is_paid ? (
                          <span
                            css={css`
                              color: ${theme.colors.success};
                            `}>
                            zaplaceno
                          </span>
                        ) : (
                          <span
                            css={css`
                              color: ${theme.colors["main-color-red"]};
                            `}>
                            nezaplaceno
                          </span>
                        )}{" "}
                        {record.payment.first_reminder && (
                          <>
                            <span
                              css={css`
                                color: ${theme.colors["main-color-red"]};
                              `}>
                              a upomínkován dne <Tooltip title={moment(record.created_at).format("l h:mm:ss")}>{moment(record.created_at).format("l")}</Tooltip>
                            </span>
                            <br />
                            <Typography.Text
                              type="secondary"
                              css={css`
                                font-size: 11px;
                              `}>
                              ({moment(record.created_at).startOf("day").fromNow()})
                            </Typography.Text>
                          </>
                        )}
                        variabilní číslo <Tooltip title={record.payment.comment}>{record.payment.variable_number}</Tooltip> s částkou {record.payment.amount},-
                        Kč
                      </Typography.Paragraph>
                    )}
                  </div>
                )
              }}
            />
          ) : (
            <div>no auth</div>
          )}
        </Section>
      </ContainerWide>
    </CollectionLayout>
  )
}

interface Props {
  registrations?: PostgrestResponse<RegistrationTableWithPaymentStudentLegalRepre>
}

export default Admin

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const session = await getSession(context)
  if (!session?.user?.email.includes("@vzdelanibudoucnosti.cz")) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin?callbackUrl=http://localhost:3003/admin"
      },
      props: {}
    }
  }

  const registrations = await getRegistrations()

  return {
    props: {
      registrations
    }
  }
}

const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props: { color: string }) => props.color};
`
