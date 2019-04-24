import withAuth from '@hoc/with-auth'

import simplteEditorFactory from '@components/my/person/editor/factory'

const Phone = simplteEditorFactory({
  label: '手机号',
  field: 'mobileNumber'
})

export default withAuth(true)(Phone)
