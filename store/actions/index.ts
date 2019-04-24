import { Action } from 'redux'

export * from './user'
export * from './my'
export * from './depot'
export * from './auth'

export default interface ActionType extends Action {
  payload?: any
}
