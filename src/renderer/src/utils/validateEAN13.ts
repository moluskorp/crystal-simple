export function validateEAN13(codigoBarras: string): boolean {
  // Verifica se o código de barras contém apenas dígitos numéricos
  if (!/^\d{12,13}$/.test(codigoBarras)) {
    return false
  }

  // Adiciona zeros à frente do código de barras, se tiver menos de 13 dígitos
  if (codigoBarras.length < 13) {
    codigoBarras = codigoBarras.padStart(13, '0')
  }

  // Obtém os 12 primeiros dígitos do código de barras
  const digitos = codigoBarras.slice(0, 12)

  // Calcula o dígito verificador
  let soma = 0
  for (let i = 0; i < digitos.length; i++) {
    const digito = parseInt(digitos[i])
    soma += i % 2 === 0 ? digito : digito * 3
  }
  const proximoMultiplo10 = Math.ceil(soma / 10) * 10
  const digitoVerificadorCalculado = proximoMultiplo10 - soma

  // Compara o dígito verificador calculado com o último dígito do código de barras
  const digitoVerificador = parseInt(codigoBarras[12])
  return digitoVerificador === digitoVerificadorCalculado
}
