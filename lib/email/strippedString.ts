export const strippedString = (originalString: string): string => originalString.replace(/(<([^>]+)>)/gi, "")
