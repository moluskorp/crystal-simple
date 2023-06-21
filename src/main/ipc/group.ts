import { ipcMain } from 'electron'
import { IPC } from '@shared/constants/ipc'
import * as grp from '../models/grpmgr'
import * as dto from '../../shared/types/group'
import {
  CreateGroupResponse,
  FetchAllGroupsResponse,
  FetchGroupResponse,
} from '@shared/types/group'

ipcMain.handle(
  IPC.GROUP.CREATE,
  async (_, data: dto.insertGroupTableDTO): Promise<CreateGroupResponse> => {
    const groupExists = await grp.getGroupTableByName(data)

    if (groupExists) {
      return { type: 'error', message: 'Grupo já cadastrado' }
    }

    try {
      await grp.insertGroupTable(data)
    } catch (e: any) {
      return { type: 'error', message: e }
    }

    return { type: 'success' }
  },
)

ipcMain.handle(
  IPC.GROUP.DELETE,
  async (_, data: dto.deleteGroupTableDTO): Promise<void> => {
    await grp.deleteGroupTable(data)
  },
)

ipcMain.handle(
  IPC.GROUP.FETCH,
  async (_, data: dto.GetGroupTableDTO): Promise<FetchGroupResponse> => {
    const result = await grp.getGroupTable(data)
    return {
      data: result,
    }
  },
)

ipcMain.handle(
  IPC.GROUP.FETCH_ALL,
  async (): Promise<FetchAllGroupsResponse> => {
    const result = await grp.getAllGroupTable()
    return { data: result }
  },
)

ipcMain.handle(
  IPC.GROUP.FETCH_LIST,
  async (
    _,
    data: dto.getListGroupTableDTO,
  ): Promise<FetchAllGroupsResponse> => {
    const result = await grp.getListGroupTable(data)
    return { data: result }
  },
)

ipcMain.handle(
  IPC.GROUP.UPDATE,
  async (_, data: dto.updateGroupTableDTO): Promise<void> => {
    await grp.updateGroupTable(data)
  },
)

ipcMain.handle(
  IPC.GROUP.SELECT,
  async (
    _,
    data: dto.selectGroupByIdTableDTO,
  ): Promise<dto.SelectGroupResponse> => {
    const result = await grp.selectGroupByIdTable(data)
    return { data: result }
  },
)
