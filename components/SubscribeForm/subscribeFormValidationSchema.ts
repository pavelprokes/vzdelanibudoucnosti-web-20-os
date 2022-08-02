import * as yup from "yup"

export const subscribeFormValidationSchema = yup.object().shape({
  email: yup.string().email("Zadejte správný tvar emailové adresy.").required("Email je povinný.")
})
