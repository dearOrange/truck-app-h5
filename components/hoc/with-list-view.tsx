import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { ListView } from 'antd-mobile'
import { uniqueId, gt, lt, isUndefined, isFunction } from 'lodash'

interface Params {
  [key: string]: any
  pageSize: number
}

interface WithListViewOptionsType {
  sectionId?: string
  renderSectionHeader?: (data: any, sectionID: any) => React.ReactNode
  renderSectionWrapper?: (sectionID: any) => any
  renderSectionBodyWrapper?: (sectionID: any) => any
  renderBodyComponent?: () => React.ReactNode
  renderSeparator?: (
    sectionID: string | number,
    rowID: string | number,
    adjacentRowHighlighted?: boolean
  ) => any
}

interface State {
  dataSource: any
  isLoading: boolean
  hasMore: boolean
  height: number
}

export default function withListView(
  Row: any,
  fetchOptions: {
    api: (params: Params, options?: any) => Promise<any>
    params: Params
  },
  options: WithListViewOptionsType = {}
) {
  let pageIndex = 0
  const dataBlobs = {}
  let rowIDs: Set<any> = new Set()
  let isSection = !(typeof options.sectionId === 'undefined')
  let sectionIDs: Set<any> = new Set()

  async function genData(pageNum: number = 0) {
    let hasMore = true
    let { success, data: list } = await fetchOptions.api({
      ...fetchOptions.params,
      pageNum: pageNum + 1
    })

    if (success) {
      if (list && gt(list.length, 0)) {
        list.forEach((item, index) => {
          const rowName = uniqueId(`__listview_row_${pageNum}_${index}`)

          if (!isUndefined(options.sectionId)) {
            let sectionName = item[options.sectionId]

            if (!dataBlobs[sectionName]) {
              dataBlobs[sectionName] = []
            }

            dataBlobs[sectionName].push(item)

            // sectionIDs.add(sectionName)
            // let sectionData = (dataBlobs[sectionName] =
            //   dataBlobs[sectionName] || {})
            // sectionData[rowName] = item
            // rowIDs.add(rowName)
          } else {
            dataBlobs[rowName] = item
            rowIDs.add(rowName)
          }
        })
        if (lt(list.length, fetchOptions.params.pageSize)) {
          hasMore = false
        }
      } else {
        hasMore = false
      }
    }

    return {
      success,
      dataBlobs,
      rowIDs,
      hasMore,
      sectionIDs
    }
  }

  return class InnerWithListView extends Component<any, State> {
    lv: any = null

    private timeoutId: any = null

    state: State = {
      dataSource: new ListView.DataSource({
        getRowData: (dataBlob, sectionID, rowID) => {
          return dataBlob[sectionID][rowID]
        },
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        getSectionHeaderData: (data, sectionID) => {
          return data[sectionID][0]
        }
      }),
      isLoading: true,
      hasMore: true,
      height: 0
    }

    componentDidMount() {
      const height =
        document.documentElement.clientHeight -
        ReactDOM.findDOMNode(this.lv).parentNode.offsetTop

      this.setState({
        height
      })
      this.timeoutId = setTimeout(() => {
        this.loadData()
        this.timeoutId = null
      }, 300)
    }

    componentWillUnmount() {
      this.timeoutId && clearTimeout(this.timeoutId)
    }
    loadData = async (pageNum: number = 0) => {
      let { success, dataBlobs, rowIDs, hasMore, sectionIDs } = await genData(
        pageNum
      )
      this.setState({
        dataSource: isSection
          ? this.state.dataSource.cloneWithRowsAndSections(dataBlobs)
          : this.state.dataSource.cloneWithRows(dataBlobs, [...rowIDs]),
        isLoading: false,
        hasMore: success ? hasMore : false
      })
    }

    onEndReached = () => {
      if (this.state.isLoading || !this.state.hasMore) {
        return
      }

      this.setState({ isLoading: true })
      this.loadData(++pageIndex)
    }

    renderRow = (rowData, sectionID, rowID) => {
      return (
        <React.Fragment key={rowID}>
          <Row data={rowData} />
        </React.Fragment>
      )
    }

    render() {
      let extraProps: any = {}
      if (isFunction(options.renderSectionHeader)) {
        extraProps.renderSectionHeader = options.renderSectionHeader
      }

      if (isFunction(options.renderSectionWrapper)) {
        extraProps.renderSectionWrapper = options.renderSectionWrapper
      }
      if (isFunction(options.renderSeparator)) {
        extraProps.renderSeparator = options.renderSeparator
      }
      if (isFunction(options.renderSectionBodyWrapper)) {
        extraProps.renderSectionBodyWrapper = options.renderSectionBodyWrapper
      }
      if (isFunction(options.renderBodyComponent)) {
        extraProps.renderBodyComponent = options.renderBodyComponent
      }

      return (
        <ListView
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{ padding: 10, textAlign: 'center' }}>
              {this.state.hasMore ? '疯狂加载中...' : '暂无数据'}
            </div>
          )}
          // renderSeparator={this.renderSeparator}
          renderRow={this.renderRow}
          pageSize={fetchOptions.params.pageSize}
          style={{
            height: this.state.height,
            overflow: 'auto'
          }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
          {...extraProps}
        />
      )
    }
  }
}
