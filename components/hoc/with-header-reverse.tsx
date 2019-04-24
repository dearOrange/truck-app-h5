import React, { Component } from 'react'

interface Options {
  offsetTop: number
  onReverse: (reversion: boolean) => any
}

export default function reverse(options: Options) {
  return function(Comp) {
    return class WithReverseComponent extends Component<any, any> {
      state = {
        reversion: false
      }

      private scrollEventHandle = (event: any) => {
        let scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop
        if (scrollTop > options.offsetTop) {
          this.setState({
            reversion: true
          })
        } else {
          this.setState({
            reversion: false
          })
        }
      }

      constructor(props) {
        super(props)
      }

      componentDidMount = () => {
        window.addEventListener('scroll', this.scrollEventHandle, false)
      }

      componentWillUnmount = () => {
        window.removeEventListener('scroll', this.scrollEventHandle)
      }

      render() {
        let { reversion } = this.state
        return <Comp {...this.props} {...options.onReverse(reversion)} />
      }
    }
  }
}
