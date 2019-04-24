// export * from './dictionary'
// export * from './location'
// export * from './follow'
// export * from './footer'

import * as dictionaryApi from './dictionary'
import * as locationApi from './location'
import * as followApi from './follow'
import * as footerApi from './footer'

export default {
  ...dictionaryApi,
  ...locationApi,
  ...followApi,
  ...footerApi
}
