import { supabaseClient } from "./supabaseClient"
import { RegisterStudent } from "../../components/RegisterModal/types"

export const getOrCreateStudent = async (student: RegisterStudent): Promise<StudentTable> => {
  try {
    const remappedStudentFormData: Omit<StudentTable, "id" | "created_at" | "updated_at"> = {
      email: student.email,
      name: student.firstname,
      surname: student.lastname,
      grade: student.yearOfStudies,
      school: student.school,
      region: student.schoolRegion,
      phone: student.phone
    }

    let getOrCreateStudentRes = await supabaseClient
      .from<StudentTable>("student")
      .select("*", { count: "exact" })
      .eq("email", remappedStudentFormData.email)
      .single()
    if (!getOrCreateStudentRes.data) {
      getOrCreateStudentRes = await supabaseClient.from<StudentTable>("student").insert([remappedStudentFormData], { returning: "representation" }).single()
    }

    const studentDataToUpdate = getNewStudentDataToUpdate(getOrCreateStudentRes.data, remappedStudentFormData)
    await supabaseClient.from<StudentTable>("student").update(studentDataToUpdate).single()

    return getOrCreateStudentRes.data
  } catch (e) {
    throw new Error(`Error when getting / creating student. ${JSON.stringify(e)}`)
  }
}

const getNewStudentDataToUpdate = (currentStudentData: StudentTable, remappedStudentFormData: Omit<StudentTable, "id" | "created_at" | "updated_at">) => {
  let studentDataToUpdate = {}
  Object.keys(currentStudentData).forEach((key) => {
    if (
      (currentStudentData[key] === "" || currentStudentData[key] === null) &&
      remappedStudentFormData[key] &&
      (remappedStudentFormData[key] !== "" || remappedStudentFormData[key] !== null)
    ) {
      studentDataToUpdate[key] = remappedStudentFormData[key]
    }
  })

  return studentDataToUpdate
}

export interface StudentTable {
  id: number
  email: string
  name: string
  surname: string
  grade: string
  school: string
  region: string
  phone: string
  created_at: string
  updated_at: string
}
