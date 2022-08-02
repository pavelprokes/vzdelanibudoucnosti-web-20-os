import { isArray, last } from "lodash"
import * as yup from "yup"

export const firstnameValidationSchema = yup.string().required("Jméno je povinné.")
export const lastnameValidationSchema = yup.string().required("Přijmení je povinné.")
export const birthValidationSchema = yup.number().min(1900).required("Rok narození je povinný údaj.")
export const relationToStudentValidationSchema = yup.string().required("Vztah kontaktní osoby k žákovi je povinný údaj.")
export const yearOfStudiesValidationSchema = yup.string().required("Ročník žáka je povinný údaj.")
export const schoolRegionValidationSchema = yup.string().required("Kraj školy je povinný údaj.")
export const schoolValidationSchema = yup.string()
export const courseRegistrationIsSignValidationSchema = yup.boolean().oneOf([true], "Prosím zatrněte souhlas.").required()
export const courseRegistrationCourseWithEquipmentValidationSchema = {
  equipmentBuyFromOrganization: yup.boolean().required("Prosím vyberte zda chcete zakoupit a zaslat vybavení od nás nebo zajistíte sami."),
  equipmentSendToAddress: yup.string()
}

const emailDomainsBlackList = ["google.cz", "gmail.cz", "gamil.com", "seznam.com", "icloud.cz", "test.cc"]
const replaceToSuggest = (value: string): string => {
  const newValue = value.replace(".cz", ".com") || value.replace(".com", ".cz") || false
  if (value === newValue) {
    return ""
  }

  return ` Neměl(a) jste na mysli ${newValue}?`
}

export const emailValidationSchema = yup
  .string()
  .email("Zadejte správný tvar emailové adresy.")
  .test(
    "deny-domains-validation",
    ({ value }) => `Zadejte správný tvar domény za zavináčem "@". "${value}" je nevalidní.${replaceToSuggest(value)}`,
    (value: string) => {
      const domain = last(value?.split("@"))
      return !(domain && emailDomainsBlackList.includes(domain))
    }
  )
  .test("deny-diacritics-letters-validation", `Diakritické znaménka nejsou povolena. Email bez háčků a čárek, prosím.`, (value: string) => {
    const match = value?.match(/[\u00C0-\u024F\u1E00-\u1EFF]+/g)
    return isArray(match) ? match.length === 0 : !match
  })
  .required("Email je povinný.")
