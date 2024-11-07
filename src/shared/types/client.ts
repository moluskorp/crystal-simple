export type Client = {
  id: number
  name: string
  nickname: string
  cpf: string
  rg: string
  postalcode: string
  street: string
  number: string
  complement: string
  district: string
  city: string
  state: string
  limit: number
  type: string
  email: string
  phone: string
  cellPhone: string
  whatsapp: string
}

export type InsertClientTableRequest = Omit<Client, 'id'>