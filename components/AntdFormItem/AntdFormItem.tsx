import { get } from "lodash"
import { Form } from "antd"
import React from "react"
import { AntdFormItemProps } from "../RegisterModal/types"

export const AntdFormItem = <M,>({ className, children, touched, errors, name, label, labelCol, wrapperCol }: AntdFormItemProps<M>) => {
  const error = get(errors, name)
  const touch = get(touched, name)

  return (
    <Form.Item
      className={className}
      name={name}
      label={label}
      labelCol={
        labelCol || {
          lg: { span: 9 }
        }
      }
      wrapperCol={
        wrapperCol || {
          lg: { span: 15 }
        }
      }
      help={touch && error ? error : ""}
      validateStatus={touch && error ? "error" : "success"}>
      {children}
    </Form.Item>
  )
}
