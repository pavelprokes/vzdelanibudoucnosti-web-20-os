import * as yup from "yup"

export const contactFormValidationSchema = yup.object().shape({
  email: yup.string().email("Zadejte správný tvar emailové adresy.").required("Email je povinný."),
  message: yup.string().required("Zadejte vaší zprávu.")
})
