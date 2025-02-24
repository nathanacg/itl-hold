export function limitTextLength(text: string, maxLength: number) {
  if (text?.length > maxLength) {
    return text.slice(0, maxLength)
  }
  return text
}

export function afterLimitText(text: string) {
  return text.slice(300)
}

export function isLessTextLength(text: string, maxLength: number) {
  if (text?.length < maxLength) {
    return
  }
  return " ..."
}