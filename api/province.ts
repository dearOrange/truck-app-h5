import { GET } from './index'

export function fetchProvince() {
  return GET('baArea/getListByProvince.do')
}
export function fetchCity(areaId) {
  return GET('baArea/getListByCity.do', { areaId })
}
export function fetchDistrict(areaId) {
  return GET('baArea/getListByDistrict.do', { areaId })
}
