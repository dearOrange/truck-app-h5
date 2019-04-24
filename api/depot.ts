import { GET, POST } from './index'

export function fetchList(params = {}, options = {}): Promise<any> {
  return POST('baStock/getListByApp.do', params, options)
}

export function fetchDetail(stockPublishUkid: number) {
  return GET('baStock/getByEchoDisplay.do', { stockPublishUkid })
}
