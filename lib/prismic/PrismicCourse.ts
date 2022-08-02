import { LinkField, NumberField, RelationField, RichTextField, SelectField, TimestampField, TitleField } from "@prismicio/types"
import { CourseAgeGroup, CourseType, CourseVariant } from "./Course"

/* declare type AnyRegularField =
TitleField
| RichTextField
| ImageField
| RelationField
| LinkField
| LinkToMediaField
| DateField
| TimestampField
| ColorField
| NumberField
| KeyTextField
| SelectField
| BooleanField
| EmbedField
| GeoPointField
| IntegrationFields;
*/

export interface PrismicCourse {
  title: TitleField
  age_group: SelectField<CourseAgeGroup>
  type: SelectField<CourseType>
  difficulty: SelectField<"1" | "2" | "3" | "4" | "5">
  course_type: SelectField<CourseVariant>
  technology: RelationField<any>
  capacity: NumberField
  excerpt: RichTextField
  registration_google_spreadsheet_url: LinkField
  registration_open_from: TimestampField
  registration_open_to: TimestampField
  when: RichTextField
  where: RichTextField
  price: NumberField
  additional_information: RichTextField
  content: RichTextField
  lecturer: RelationField<any>
  equipment_price: NumberField
  equipment_info: RichTextField
}
