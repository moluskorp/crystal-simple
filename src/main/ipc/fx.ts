import { IPC } from '@shared/constants/ipc'
import { ipcMain } from 'electron'
import * as fx from '@shared/types/fx'
import { getAllGenerateFx } from '../models/peanmgr'
import fs from 'node:fs'
import { getStoreTable } from '../models/strmgr'
import { getAllIbptTable } from '../models/ibptmgr'
import { getListPdvTable } from '../models/pdvmgr'

type Totalizador = {
  percentage: string
  nature: string
}

function convertCurrency(currency: number): string {
  return String(currency.toFixed(2)).replaceAll('.', '').padStart(11, '0')
}

function codigoTotalizador(data: Totalizador): string {
  const percentage = Number(data.percentage)

  if (data.nature === 'free') {
    return '05'
  } else if (data.nature === 'substitution') {
    return '04'
  }
  if (percentage === 18) {
    return '00'
  } else if (percentage === 25) {
    return '07'
  } else if (percentage === 12) {
    return '08'
  }
  return '09'
}

function getCstIcms({ nature }: { nature: string }): string {
  if (nature === 'substitution') {
    return '60'
  } else if (nature === 'free') {
    return '40'
  }
  return '00'
}

function getPisCofinsPercentage({
  cst,
  storePercentage = 0,
  taxPercentage = 0,
}: {
  cst: string
  storePercentage?: number
  taxPercentage?: number
}): string {
  const pisPercentage = getPercentage(storePercentage)
  if (cst === '04' || cst === '06' || cst === '07') {
    return '0'.padStart(4, '0')
  } else if (cst === '01') {
    return pisPercentage
  }
  return getPercentage(taxPercentage)
}

function getPercentage(data: number): string {
  console.log(data)
  return String(data.toFixed(2)).replaceAll('.', '').padStart(4, '0')
}

async function convertToCsv(data: fx.Fx6[]) {
  const store = await getStoreTable()
  const ibpts = await getAllIbptTable()

  const rows = data.map((row) => {
    const ibpt = ibpts.find((ibpt) => ibpt.ncm === row.prd_ncm)
    const codigoTot = codigoTotalizador({
      nature: row.tax_icmsnature || '',
      percentage: row.tax_icmspercentage || '18',
    })
    const cstIcms = getCstIcms({ nature: row.tax_icmsnature || '' })
    const pisPercentage = getPisCofinsPercentage({
      cst: row.tax_piscofinscst || '01',
      storePercentage: store.pis,
      taxPercentage: Number(row.tax_pispercentage),
    })
    const cofinsPercentage = getPisCofinsPercentage({
      cst: row.tax_piscofinscst || '01',
      storePercentage: store.cofins,
      taxPercentage: Number(row.tax_cofinspercentage),
    })
    const formattedRows: string[] = [
      row.pean_ean.padStart(17, '0'), // 01
      row.prd_description.padEnd(45, ' '), // 02
      convertCurrency(row.prd_price1), // 03
      codigoTot, // 04
      row.prd_weightProduct ? '1' : '0', // 05
      String(row.prd_group_id).padStart(3, '0'), // 06
      convertCurrency(row.prd_price2), // 07
      convertCurrency(0), // 08
      convertCurrency(0), // 09
      String(row.prd_id).padStart(7, '0'), // 10
      'N', // 11
      '0', // 12
      '0', // 13
      '0', // 14
      '0', // 15
      '0', // 16
      'N', // 17
      '0000', // <<< Carga tributária estadual 36% = 3600      //18
      'N', // 19
      'N', // 20
      'N', // 21
      '0', // 22
      row.prd_weightProduct ? 'KG' : 'UN', // 23
      '0', // 24
      getPercentage(ibpt?.taxState || 0), // 25
      ibpt?.key.padStart(6, ' ') || ''.padStart(6, ' '), // 26
      'A', // 27
      'T', // 28
      row.prd_shortdescription.padStart(50, ' '), // 29
      ''.padStart(10, ' '), // 30
      row.prd_ncm, // 31
      row.tax_piscofinscst.padStart(2, '0'), // 32
      row.tax_piscofinscst.padStart(2, '0'), // 33
      String(row.code).padStart(2, '0'), // 34
      cstIcms, // 35
      pisPercentage, // 36
      cofinsPercentage, // 37
    ]
    return formattedRows.join(';')
  })
  return `${rows.join('\n')}`
}

async function generateCsvFile(csvData: string, fileName: string) {
  fs.writeFileSync(fileName, csvData, 'utf8')
}

function formatNumberWithLeadingZeros(number: number, width: number) {
  const numberString = number.toString()
  const leadingZeros = '0'.repeat(Math.max(0, width - numberString.length))
  return leadingZeros + numberString
}

ipcMain.handle(IPC.FX.GENERATE, async (): Promise<fx.GenerateFxResponse> => {
  try {
    const products = await getAllGenerateFx()
    console.log({ products })
    const csvData = await convertToCsv(products)
    const pdvs = await getListPdvTable()
    if (pdvs.length < 1) {
      throw new Error('Nenhum pdv cadastrado')
    }
    pdvs.forEach(async (pdv) => {
      const pdvNumber = formatNumberWithLeadingZeros(pdv.number, 3)
      const folderName = `F:\\concentradorFx\\carga\\${pdvNumber}`
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, { recursive: true })
      }
      await generateCsvFile(csvData, `${folderName}\\fx6.txt`)
      fs.writeFileSync(`${folderName}\\LSTCARGA.LPM`, 'FX6.TXT')
    })
    return { type: 'success' }
  } catch (e: any) {
    return {
      type: 'error',
      message: e.message,
    }
  }
})
