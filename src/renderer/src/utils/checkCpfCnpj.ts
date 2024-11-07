interface Response {
  isValid: boolean
  tipoPessoa?: 'PF' | 'PJ'
}

export function checkCpfCnpj(cpf: string): Response {
  if (cpf.length < 12) {
    const cpfZeros = `00000000000${cpf}`.slice(-11)

    let multiplica = 10
    let resultado = 0

    for (let index = 0; index < cpfZeros.length - 2; index += 1) {
      resultado += Number(cpfZeros[index]) * multiplica
      multiplica -= 1
    }
    const resto = resultado % 11

    const digito1 = resto < 2 ? 0 : 11 - resto

    if (String(digito1) === cpfZeros[9]) {
      let multiplica2 = 11
      let resultado2 = 0

      for (let index = 0; index < cpfZeros.length - 1; index += 1) {
        resultado2 += Number(cpfZeros[index]) * multiplica2
        multiplica2 -= 1
      }

      const resto2 = resultado2 % 11

      const digito2 = resto2 < 2 ? 0 : 11 - resto2

      if (String(digito2) === cpfZeros[10]) {
        return {
          isValid: true,
          tipoPessoa: 'PF',
        }
      }
    }
  }

  const cnpj = `00000000000000${cpf}`.slice(-14)
  let resultado = 0
  const multiplo = '543298765432'

  // Cálculo do primeiro dígito verificador do CNPJ
  for (let index = 0; index < multiplo.length; index += 1) {
    resultado += Number(cnpj[index]) * Number(multiplo[index])
  }

  const resto1 = resultado % 11
  const verificador1 = resto1 < 2 ? 0 : 11 - resto1

  if (String(verificador1) === cnpj[12]) {
    // Cálculo do segundo dígito verificador do CNPJ
    const multiplo2 = '6543298765432'
    let resultado2 = 0

    for (let index = 0; index < multiplo2.length; index += 1) {
      resultado2 += Number(cnpj[index]) * Number(multiplo2[index])
    }

    const resto2 = resultado2 % 11
    const verificador2 = resto2 < 2 ? 0 : 11 - resto2

    if (String(verificador2) === cnpj[13]) {
      return {
        isValid: true,
        tipoPessoa: 'PJ',
      }
    }
  }

  return {
    isValid: false,
  }
}
