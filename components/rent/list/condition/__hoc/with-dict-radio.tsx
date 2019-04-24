import React, { Component } from 'react'

import Radio, { Props as RadioProps } from '@components/common/radio'
import { getDicts } from '@api/common/dictionary'

interface Props extends RadioProps {
  optionRender: (data: any) => any
}

interface State {
  dicts: any
}

export default function withDictRadio(dict: string) {
  return class WithDictRadio extends Component<Props, State> {
    state: State = {
      dicts: null
    }

    loadDict = async () => {
      let { success, data: dicts } = await getDicts(dict)
      if (success) {
        this.setState({
          dicts
        })
      }
    }

    renderOption: () => React.ReactNode = () => {
      let { dicts } = this.state

      if (dicts) {
        return dicts.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {this.props.optionRender(item)}
            </React.Fragment>
          )
        })
      }

      return null
    }

    componentDidMount() {
      this.loadDict()
    }

    render() {
      return this.state.dicts ? (
        <Radio {...this.props}>{this.renderOption()}</Radio>
      ) : null
    }
  }
}
