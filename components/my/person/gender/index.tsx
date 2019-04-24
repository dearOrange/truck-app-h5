import { ActionSheet } from 'antd-mobile'
import { entries } from 'lodash'

import createUserArrowButton from '@components/my/person/__utils/create-user-arrow-button'
import GENDER from '@constant/gender'

function textToGender(gender: any, field) {
  return GENDER[gender[field[0]]]
}

const GenderArrowButton = createUserArrowButton({
  label: '性别',
  field: ['sex'],
  formatter: textToGender,
  onTap() {
    let genderList = entries(GENDER)

    function getTextFromItem(item) {
      return item[1]
    }

    return new Promise((resolve, reject) => {
      ActionSheet.showActionSheetWithOptions(
        {
          options: genderList.map(getTextFromItem),
          message: '选择性别',
          maskClosable: true
        },
        (index: number) => {
          if (index !== -1) {
            resolve({
              name: genderList[index][0],
              type: 'sex'
            })
          } else {
            reject('未改变性别')
          }
        }
      )
    })
  }
})

export default GenderArrowButton
