export function formatCNPJAndCPF(document: string) {
  const documentFormatted = document.replace(/[^\d]/g, '')
  if (documentFormatted.length < 11) return ''
  if (documentFormatted.length > 11) {
    return documentFormatted.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    )
  } else {
    return documentFormatted.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    )
  }
}
export function formatCNPJAndCPFNumber(value: number, isCpf: boolean): string {
  if (isCpf) {
    const stringDefault = '00000000000'
    const qtdDigits = 11 - `${value}`.length

    let inicialCpfString = stringDefault.slice(0, qtdDigits)
    return `${inicialCpfString}${value}`.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    )
  }
  if (!isCpf) {
    const stringDefault = '0000000000000'
    const qtdDigits = 13 - `${value}`.length

    let inicialCpfString = stringDefault.slice(0, qtdDigits)

    return `${inicialCpfString}${value}`.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    )
  }
  return ''
}
