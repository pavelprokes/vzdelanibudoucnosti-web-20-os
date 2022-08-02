import * as yup from "yup"

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

export const phoneYupValidationSchema = yup.string().matches(phoneRegExp, "Zadejte správný tvar telefoního čísla (+420123456789).")
