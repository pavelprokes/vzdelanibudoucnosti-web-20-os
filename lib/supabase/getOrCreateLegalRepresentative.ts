import { RegisterStudentContact } from "../../components/RegisterModal/types"
import { supabaseClient } from "./supabaseClient"

export const getOrCreateLegalRepresentative = async (legalRepresentative: RegisterStudentContact, studentId: number): Promise<LegalRepresentativeTable> => {
  try {
    if (!legalRepresentative) {
      return undefined
    }

    const remappedLegalRepresentative: Omit<LegalRepresentativeTable, "id"> = {
      email: legalRepresentative.email,
      name: legalRepresentative.firstname,
      phone: legalRepresentative.phone,
      relationship_to_student: legalRepresentative.relationToStudent,
      student: studentId,
      surname: legalRepresentative.lastname
    }

    let getOrCreateLegalRepresentativeRes = await supabaseClient
      .from<LegalRepresentativeTable>("legalRepresentative")
      .select("*", { count: "exact" })
      .eq("email", remappedLegalRepresentative.email)
      .single()

    if (!getOrCreateLegalRepresentativeRes.data) {
      getOrCreateLegalRepresentativeRes = await supabaseClient
        .from<LegalRepresentativeTable>("legalRepresentative")
        .insert(remappedLegalRepresentative, { returning: "representation" })
        .single()
    }

    return getOrCreateLegalRepresentativeRes.data
  } catch (e) {
    throw new Error(`Error when getting / creating legal representative. ${JSON.stringify(e)}`)
  }
}

export interface LegalRepresentativeTable {
  id: number
  email: string
  name: string
  surname: string
  phone: string
  relationship_to_student: string
  student: number
}
