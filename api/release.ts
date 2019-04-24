import { GET, POST } from './index'

export function fetchRent(params) {
  //增加冷库求租（确认发布）
  return POST('ptStockDemand/savePtStockDemand.do', params)
}

export function fetchDepot(params) {
  //增加发布冷库出租
  return POST('baStock/saveStockObject.do', params)
}

export function fetchRentSave(params) {
  //增加冷库求租（保存草稿）
  return POST('ptStockDemand/saveByUnpublished.do', params)
}

export function fetchDepotSave(params) {
  //增加发布冷库出租（保存草稿）
  return POST('baStock/saveByUnpublished.do', params)
}
