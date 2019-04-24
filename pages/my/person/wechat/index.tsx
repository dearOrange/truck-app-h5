import withAuth from '@hoc/with-auth'

import simplteEditorFactory from '@components/my/person/editor/factory'

const Wechat = simplteEditorFactory({
  label: '微信号',
  field: 'wechat'
})

export default withAuth(true)(Wechat)
