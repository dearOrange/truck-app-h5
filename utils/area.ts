import ChinaAreaData from 'china-area-data'
import { map } from 'lodash'

interface AreaType {
  label: string
  value: string
}

interface AreaTypeChildren extends AreaType {
  children?: AreaType[]
}

function _formatter(
  obj: { [key: number]: string },
  limitLevel = 3,
  curLevel = 1
): any {
  return map(obj, (label, value) => {
    let _curLevel = curLevel
    let _data: AreaTypeChildren = {
      label,
      value
    }

    if (ChinaAreaData[value] && limitLevel > _curLevel) {
      _data.children = _formatter(ChinaAreaData[value], limitLevel, ++_curLevel)
    }
    return _data
  })
}

export function getCityDistrict(proviceID) {
  return _formatter(ChinaAreaData[proviceID])
}

export function getProviceCityDistrict() {
  return _formatter(ChinaAreaData['86'])
}

export function getProviceCity() {
  return _formatter(ChinaAreaData['86'], 2)
}
