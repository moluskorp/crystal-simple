import { countNcmTable, createNcmTable, insertNcmTable } from '../models/ncmmgr'
import { ncmData } from '../data/ncm'
import { insertTaxeTable } from '../models/taxmgr'

export async function migrationNcmTable() {
  const databaseExists = await countNcmTable()
  try {
    if (!databaseExists) {
      await createNcmTable()

      const ncmsLines = ncmData.split('\n')
      for (const ncmLine of ncmsLines) {
        const datas = ncmLine.split(';')
        const description = datas[0].trim()
        const ncm = datas[1].trim()
        if (ncm === 'N.C.M.') {
          continue
        }
        if (ncm === '92060000') {
          console.log({ datas })
        }
        const tribData = datas[2].trim()
        const cstPisSaida = datas[6].trim()[0] + datas[6].trim()[1]
        let icmsNature = ''
        let icmsPercentage: string | undefined
        if (tribData.startsWith('I')) {
          icmsNature = 'free'
        } else if (tribData.startsWith('F')) {
          icmsNature = 'substitution'
        } else if (tribData.startsWith('T')) {
          icmsNature = 'taxed'
        }
        if (icmsNature === 'taxed') {
          if (tribData.includes('07')) {
            icmsPercentage = '07'
          } else if (tribData.includes('18')) {
            icmsPercentage = '18'
          } else if (tribData.includes('25')) {
            icmsPercentage = '25'
          } else if (tribData.includes('12')) {
            icmsPercentage = '12'
          } else if (tribData.includes('13')) {
            icmsPercentage = '12'
          }
        }

        await insertNcmTable({
          ncm,
          description,
        })

        await insertTaxeTable({
          ncm,
          icmsNature,
          icmsPercentage,
          ipiCst: '52',
          pisCofinsCst: cstPisSaida,
        })

        // F18 - S.TRIB.
        // I - ISENTO
        // T07 - 07%
        // T18 - 18%
        // T25 - 25%
        // T12 - 12%

        // T13 - É QUANTO MESMO ????
      }
    }
  } catch (e) {
    console.log(e)
  }
}
