import {
  countCityTable,
  createCityTable,
  insertCityTable,
} from '../models/citmgr'
import { ufAC } from '../data/states/AC/ufAc'
import { ufAL } from '../data/states/AL/ufAl'
import { ufAM } from '../data/states/AM/ufAm'
import { ufAP } from '../data/states/AP/ufAp'
import { ufBA } from '../data/states/BA/ufBa'
import { ufCE } from '../data/states/CE/ufCe'
import { ufDF } from '../data/states/DF/ufDf'
import { ufES } from '../data/states/ES/ufEs'
import { ufGO } from '../data/states/GO/ufGo'
import { ufMA } from '../data/states/MA/ufMa'
import { ufMG } from '../data/states/MG/ufMg'
import { ufMS } from '../data/states/MS/ufMs'
import { ufMT } from '../data/states/MT/ufMt'
import { ufPA } from '../data/states/PA/ufPa'
import { ufPB } from '../data/states/PB/ufPb'
import { ufPE } from '../data/states/PE/ufPe'
import { ufPI } from '../data/states/PI/ufPi'
import { ufPR } from '../data/states/PR/ufPr'
import { ufRJ } from '../data/states/RJ/ufRj'
import { ufRN } from '../data/states/RN/ufRn'
import { ufRO } from '../data/states/RO/ufRo'
import { ufRR } from '../data/states/RR/ufRr'
import { ufRS } from '../data/states/RS/ufRs'
import { ufSC } from '../data/states/SC/ufSc'
import { ufSE } from '../data/states/SE/ufSe'
import { ufSP } from '../data/states/SP/ufSp'
import { ufTO } from '../data/states/TO/ufTo'

const states = [
  {
    uf: 'AC',
    data: ufAC,
  },
  {
    uf: 'AL',
    data: ufAL,
  },
  {
    uf: 'AM',
    data: ufAM,
  },
  {
    uf: 'AP',
    data: ufAP,
  },
  {
    uf: 'BA',
    data: ufBA,
  },
  {
    uf: 'CE',
    data: ufCE,
  },
  {
    uf: 'DF',
    data: ufDF,
  },
  {
    uf: 'ES',
    data: ufES,
  },
  {
    uf: 'GO',
    data: ufGO,
  },
  {
    uf: 'MA',
    data: ufMA,
  },
  {
    uf: 'MG',
    data: ufMG,
  },
  {
    uf: 'MS',
    data: ufMS,
  },
  {
    uf: 'MT',
    data: ufMT,
  },
  {
    uf: 'PA',
    data: ufPA,
  },
  {
    uf: 'PB',
    data: ufPB,
  },
  {
    uf: 'PE',
    data: ufPE,
  },
  {
    uf: 'PI',
    data: ufPI,
  },
  {
    uf: 'PR',
    data: ufPR,
  },
  {
    uf: 'RJ',
    data: ufRJ,
  },
  {
    uf: 'RN',
    data: ufRN,
  },
  {
    uf: 'RO',
    data: ufRO,
  },
  {
    uf: 'RR',
    data: ufRR,
  },
  {
    uf: 'RS',
    data: ufRS,
  },
  {
    uf: 'SC',
    data: ufSC,
  },
  {
    uf: 'SE',
    data: ufSE,
  },
  {
    uf: 'SP',
    data: ufSP,
  },
  {
    uf: 'TO',
    data: ufTO,
  },
]

export async function migrationCityTable() {
  const databaseExists = await countCityTable()
  if (!databaseExists) {
    await createCityTable()

    states.forEach((state) => {
      state.data.forEach(async (city) => {
        await insertCityTable({
          cit_codeMun: city.codeMun,
          cit_codeUf: city.codeUf,
          cit_nameMun: city.nameMun.replace("'", ''),
          cit_nameUf: city.nameUf,
        })
      })
    })
  }
}
