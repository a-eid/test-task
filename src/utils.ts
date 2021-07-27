export function sortAlphabetically(arr: Record<string, any>[], prop: string) {
  return arr.sort((a, b) => {
    if (a[prop].toLowerCase() < b[prop].toLowerCase()) return -1
    if (a[prop].toLowerCase() > b[prop].toLowerCase()) return 1
    return 0
  })
}
