export const IPC = {
  CEP: {
    FIND: 'cep: find',
  },
  FINISHER: {
    CREATE: 'finisher: create',
    DELETE: 'finisher: delete',
    FETCH_ALL: 'finisher: fetch_all',
    FETCH: 'finisher: fetch',
    FETCH_BY_CODE: 'finisher: fetch_by_code',
    UPDATE: 'finisher: update',
  },
  FX: {
    GENERATE: 'fx: generate',
  },
  GROUP: {
    CREATE: 'group: create',
    FETCH_ALL: 'group: fetch all',
    FETCH_ALL_ACTIVE: 'group: fetch all active',
    FETCH: 'group: fetch',
    FETCH_LIST: 'group: fetch list',
    UPDATE: 'group: update',
    DELETE: 'group: delete',
    SELECT: 'group: select',
  },
  IS: {
    DEV: 'is: dev',
  },
  LV: {
    READ_FILES: 'lv: read files',
  },
  MIGRATION: {
    RUN: 'migration: run',
  },
  TAXE: {
    CREATE: 'taxe: create',
    FETCH_ALL: 'taxe: fetch all',
    FETCH: 'taxe: fetch',
    UPDATE: 'taxe: update',
  },
  ORIGIN: {
    FETCH_ALL: 'origin: fetch all',
  },
  PDV: {
    FETCH_ALL: 'pdv: fetch all',
    FETCH: 'pdv: fetch',
    CREATE: 'pdv: create',
    DELETE: 'pdv: delete',
    UPDATE: 'pdv: update',
  },
  PRODUCT: {
    FETCH_ALL: 'product: fetch all',
    CREATE: 'product: create',
    FETCH_ALL_ACTIVE: 'product: fetch all active',
    FETCH_ALL_BY_NAME: 'product: fetch all by name',
    FETCH_LIST: 'product: fetch list',
    FETCH: 'product: fetch',
    DELETE: 'product: delete',
    UPDATE: 'product: update',
  },
  PRODUCT_EAN: {
    CREATE: 'productean: create',
    DELETE: 'productean: delete',
    FETCH_ALL: 'productean: fetch all',
    FETCH_BY_PRD_ID: 'productean: fetch by prd id',
    FETCH_BY_EAN: 'productean: fetch by ean',
    GENERATE: 'productean: generate',
    UPDATE: 'productean: update',
  },
  SELLS_PRODUCT: {
    CREATE: 'sellsProduct: create',
    DELETE: 'sellsProduct: delete',
    UPDATE: 'sellsProduct: update',
  },
  STATES: {
    GET_STATES: 'states: get states',
    GET_CITIES: 'states: get cities',
    SEARCH_CITY: 'states: search city',
  },
  STORES: {
    CREATE: 'stores: create',
    CHECK_EXISTS: 'stores: check exists',
    GET: 'stores: get',
    UPDATE: 'stores: update',
  },
  TEST: {
    RUN: 'test: run',
  },
  USER: {
    CREATE: 'user: create',
    LOGIN: 'user: login',
    DELETE: 'user: delete',
    FETCH: 'user: fetch',
    FETCH_LIST: 'user: fetch list',
    RECOVER: 'user: recover',
    UPDATE: 'user: update',
  },
}
