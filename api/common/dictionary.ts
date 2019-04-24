import { GET } from '@api/index'
import { memoize } from 'lodash'

function _getDicts(type) {
  return GET('syDefinedCode/getListByType.do', { type })
}

export const getDicts = memoize(_getDicts)
