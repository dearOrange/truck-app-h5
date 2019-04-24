import createUserArrowButton from '@components/my/person/__utils/create-user-arrow-button'

import { format } from 'date-fns'

const toDate = (data, filed) => {
  return format(data[filed[0]], 'YYYY年MM月DD日')
}

const RegistTimeArrowButton = createUserArrowButton({
  label: '注册时间',
  field: ['registrationTime'],
  formatter: toDate
})

export default RegistTimeArrowButton
