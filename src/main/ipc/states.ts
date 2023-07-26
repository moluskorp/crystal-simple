import { IPC } from '@shared/constants/ipc'
import { ipcMain } from 'electron'
import * as stt from '@shared/types/state'
import { getAllStateTable } from '../models/sttmgr'
import { getCityTable } from '../models/citmgr'

ipcMain.handle(
  IPC.STATES.GET_STATES,
  async (): Promise<stt.GetStatesTableResponse> => {
    try {
      const states = await getAllStateTable();
      return { type: 'success', data: states }
    } catch (e: any) {
      return {
        type: 'error',
        message: 'Não foi possível carregar a lista de estados',
      }
    }
  },
)

ipcMain.handle(
  IPC.STATES.GET_CITIES,
  async (_, {uf}: stt.GetCitiesRequest): Promise<stt.GetCitiesResponse> => {
    try {
      const result = await getCityTable({uf})

      return { type: 'success', data: result }
    } catch (e: any) {
      return {
        type: 'error',
        message: 'Não foi possível carregar a lista de cidades',
      }
    }
  },
)