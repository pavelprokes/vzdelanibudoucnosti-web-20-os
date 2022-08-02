export const collectPaymentComment = (courseName: string, registrationEmail: string, equipmentBuyFromOrganization?: boolean): string => {
  const paymentComment = `${courseName}, ${registrationEmail}`
  return equipmentBuyFromOrganization ? `${paymentComment}, vybavení` : paymentComment
}

export const countFinalAmount = (
  coursePrice: number,
  equipmentPrice: number,
  equipmentBuyFromOrganization?: boolean,
  couponValue?: number
): { value: number; discount?: number } => {
  let value = coursePrice
  let discount = undefined

  if (couponValue && couponValue > 0) {
    discount = value * (couponValue / 100)
    value = value - discount
  }

  if (equipmentBuyFromOrganization && equipmentPrice && equipmentPrice > 0) {
    value = value + equipmentPrice
  }

  return {
    value,
    discount
  }
}
