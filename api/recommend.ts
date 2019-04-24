import { GET, POST } from './index'

// 冷库需求推荐
export function fetchRentRecommend(total: number, cityCode: number) {
  return POST('ptStockDemand/getListByRecommendAndApp.do', {
    total,
    cityCode
  })
}

// 冷库求租精选
export function fetchRentSelected(total: number, cityCode: number) {
  return POST('ptStockDemand/getListBySelectedAndApp.do', {
    total,
    cityCode
  })
}

// 冷库求出租精选
export function fetchDepotSelected(total: number) {
  return GET('baStock/getListByStockSelectedAndApp.do', {
    total
  })
}

// 周边冷库
export function fetchDepotPeriphery(
  total: number,
  cityCode: number,
  districtCode: number
) {
  return POST('baStock/getListByPeripheryAndApp.do', {
    total,
    cityCode,
    districtCode
  })
}
