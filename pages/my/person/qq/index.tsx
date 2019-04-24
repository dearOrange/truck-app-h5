import withAuth from '@hoc/with-auth'

import simplteEditorFactory from '@components/my/person/editor/factory'

const QQ = simplteEditorFactory({
  label: 'QQ',
  field: 'qq'
})

export default withAuth(true)(QQ)
