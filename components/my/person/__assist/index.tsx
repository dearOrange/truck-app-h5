import { Component } from 'react'

export abstract class AbsPersonArrowButton extends Component<any, any> {
  textFormatter = (text: any) => {
    text = typeof text === 'number' ? String(text) : text
    return text ? text : '去填写'
  }
}
