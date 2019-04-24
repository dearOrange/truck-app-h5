import { GET, POST } from './index'

export function fetchDetail(stockDemandUkid: number) {
  return GET('ptStockDemand/getById.do', { stockDemandUkid })
}

export function fetchList(params = {}, options = {}) {
  return POST('ptStockDemand/getListByApp.do', params, options)
}
