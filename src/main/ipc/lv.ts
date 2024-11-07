import { IPC } from '@shared/constants/ipc'
import { ipcMain } from 'electron'
import * as lv from '@shared/types/lv'
import fs from 'node:fs'
import path from 'node:path'
import { insertSelssProduct } from '../models/sprodmgr'
import { insertSellTable } from '../models/selmgr'
import { insertSellFinisherTable } from '../models/selfinmgr'

type Product = {
  date: Date
  priceTotal: number
  priceUnity: number
  productCode: string
  productName: string
  quantity: number
  discount: number
  add: number
}

type Finalizator = {
  date: Date
  priceTotal: number
  codeFinalizator: string
}

function getDate(date: string, hour: string) {
  const year = `${date.substring(0, 4)}`
  const month = `${date.substring(4, 6)}`
  const day = `${date.substring(6, 8)}`
  return new Date(`${year}-${month}-${day}T${hour}`)
}

ipcMain.handle(IPC.LV.READ_FILES, async (): Promise<lv.ReadFilesLvResponse> => {
  const folder = 'F:/concentradorFx/logs'
  const processedFolderPath = path.join(folder, 'processados')
  if (!fs.existsSync(processedFolderPath)) {
    fs.mkdirSync(processedFolderPath, { recursive: true })
  }
  try {
    const files = fs.readdirSync(folder)
    const filteredFiles = files.filter((file) => file.startsWith('lv'))

    for (const file of filteredFiles) {
      const products: Product[] = []
      const finalizators: Finalizator[] = []
      let date: Date | null
      let pdvNumber: number | null
      const reader = fs.readFileSync(path.join(folder, file)).toString()
      const lines = reader.split('\n')

      for (const line of lines) {
        const lvLine = {
          documentNumber: Number(line.substring(0, 6)),
          documentType: line.substring(14, 15),
          registryType: line.substring(15, 17),
          productCode: line.substring(17, 37),
          productType: line.substring(37, 38),
          quantity: Number(line.substring(38, 46)) / 1000,
          priceUnity: Number(line.substring(46, 58)) / 1000,
          priceTotal: Number(line.substring(58, 70)) / 100,
          sellerCode: line.substring(70, 74),
          companyCode: line.substring(74, 77),
          clientCode: line.substring(77, 93),
          clientType: line.substring(93, 94), // L - Loja / C - Convênio
          shopNumber: line.substring(94, 97),
          pdvNumber: Number(line.substring(97, 100)),
          operator: Number(line.substring(100, 104)),
          data: line.substring(104, 112),
          hour: line.substring(112, 117), // HH:MM
          codeFinalizator: line.substring(117, 120),
          cpf: line.substring(120, 139),
          cmc7: line.substring(226, 296),
          change: line.substring(345, 357),
          taxe: line.substring(366, 372),
          coo: line.substring(392, 398),
          productName: line.substring(404, 464),
          ecf: line.substring(464, 467),
          date: line.substring(471, 479),
          discount: Number(line.substring(499, 511)) / 100,
          abatement: line.substring(511, 523),
          add: Number(line.substring(523, 535)) / 100,
          nfce: {
            key: line.substring(695, 740),
          },
        }
        if (lvLine.registryType === '00') {
          break
        }

        date = getDate(lvLine.date, lvLine.hour)
        pdvNumber = lvLine.pdvNumber

        if (lvLine.documentType === 'T') {
          if (lvLine.registryType === '01') {
            products.push({
              date,
              priceTotal: lvLine.priceTotal,
              priceUnity: lvLine.priceUnity,
              productCode: lvLine.productCode.trim(),
              productName: lvLine.productName.trim(),
              quantity: lvLine.quantity,
              discount: lvLine.discount,
              add: lvLine.add,
            })
          } else if (lvLine.registryType === '03') {
            finalizators.push({
              date,
              priceTotal: lvLine.priceTotal,
              codeFinalizator: lvLine.codeFinalizator,
            })
          }
        }
      }

      const totals = products.reduce(
        (acc, product) => {
          acc.discount += product.discount
          acc.add += product.add
          acc.priceTotal += product.priceTotal
          acc.grossValue += product.priceTotal + product.discount - product.add
          return acc
        },
        {
          discount: 0,
          add: 0,
          priceTotal: 0,
          grossValue: 0,
        },
      )
      const sell = {
        date: date!,
        total: totals.priceTotal,
        pdv_id: pdvNumber!,
        grossValue: totals.grossValue,
        discount: totals.discount,
        add: totals.add,
      }
      const sel_id = await insertSellTable({
        add: sell.add,
        date: sell.date,
        discount: sell.discount,
        grossValue: sell.grossValue,
        pdv_id: sell.pdv_id,
        total: sell.total,
      })

      for (const product of products) {
        await insertSelssProduct({
          date: product.date,
          priceTotal: product.priceTotal,
          priceUnity: product.priceUnity,
          productCode: Number(product.productCode),
          quantity: product.quantity,
          sel_id,
        })
      }
      for (const finisher of finalizators) {
        await insertSellFinisherTable({
          amount: finisher.priceTotal,
          fin_id: Number(finisher.codeFinalizator),
          sel_id,
        })
      }

      const sourcePath = path.join(folder, file)
      fs.copyFileSync(
        path.join(sourcePath),
        path.join(processedFolderPath, file),
      )
      fs.unlinkSync(sourcePath)
    }

    return {
      type: 'success',
    }
  } catch (e: any) {
    return {
      type: 'error',
      message: e.message,
    }
  }
})
