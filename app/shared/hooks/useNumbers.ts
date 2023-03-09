export const useNumbers = (num: number) => {
  const formatter = new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'short',
  })

  return formatter.format(num)
}
