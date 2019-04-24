import withAuth from '@hoc/with-auth'

import simplteEditorFactory from '@components/my/person/editor/factory'

const User = simplteEditorFactory({
  label: '用户名',
  field: 'userName'
})

export default withAuth(true)(User)
