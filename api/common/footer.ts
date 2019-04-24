import { POST } from '@api/index'

// 添加足迹
export function addFooter(params) {
  return POST('ptUserView/savePtUserView.do', params)
}
