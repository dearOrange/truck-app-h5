import { GET } from '@api/index'

import { memoize } from 'lodash'

// 省
export function getProvinces(params = {}) {
  return GET('baArea/getListByProvince.do', params)
}

// 市
export function getCitys(provinceId) {
  return GET('baArea/getListByCity.do', { areaId: provinceId })
}

// 区
export function getDistricts(cityId) {
  return GET('baArea/getListByDistrict.do', { areaId: cityId })
}

// 获取所有城市
function _getAllCitys() {
  return GET('ptOpeningCity/getListByExt.do')
}

export const getAllCitys = memoize(_getAllCitys)
