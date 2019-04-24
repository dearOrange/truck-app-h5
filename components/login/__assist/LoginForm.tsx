import React, { Component } from 'react'

import { assginIn } from '@utils/index'

export interface FormProps {
  form: any
  onSubmit: (bool: boolean) => void
}

interface State {
  [key: string]: any
}

export abstract class LoginFormComponent<S extends State> extends Component<
  FormProps,
  S
> {
  constructor(props: FormProps) {
    super(props)
  }

  onChangeByKey = <K extends keyof S>(key: K) => {
    return (value: S[K]) => {
      this.setState({ [key]: value } as Pick<S, keyof S>)
    }
  }
}
