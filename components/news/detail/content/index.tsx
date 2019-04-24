import React, { Component } from 'react'
import Whitespace from '@components/common/whitespace'
import Style from './index.scss'
class News extends Component<any, any> {
  render() {
    return (
      <>
        <div className={Style.content}>
          <h2>中国果品流通协会 | 库尔勒香梨打假在行动</h2>
          <div className={Style.date}>2018-12-12</div>
          <Whitespace size={0.5} />
          <div className={Style.page}>
            闻起来香气浓郁，吃上去入口即化，库尔勒香梨因生长在新疆库尔勒市孔雀河畔而得名，是我国第一件注册保护的地理标识农产品。
          </div>
          <Whitespace size={0.3} />
          <div className={Style.page}>
            “库尔勒香梨知名度高、美誉度广，所以市场上也出现不少‘山寨梨’，冒用库尔勒香梨品牌。”业内人士介绍，2016年调查显示，库尔勒香梨总产量不足70万吨，但当年打着“库尔勒香梨”旗号销售的香梨超过360万吨，超过80%都是假冒伪劣。为此，库尔勒香梨协会连续三年打假，让消费者认知真正的库尔勒香梨，“山寨梨”大幅减少。
          </div>
          <Whitespace size={0.3} />
          <div className={Style.page}>
            市民如何识别正宗的库尔勒香梨？业内人士介绍，从外观上，库尔勒香梨本身就是小型果，一般的大小是在90克-150克左右，个头太大、超过150克甚至长到200克的大果，都不是自然生长成熟的果实。真正的库尔勒香梨皮薄、无渣、香气浓郁；从包装上，一是看地理标志商标，二是认准库尔勒香梨协会授权的编码编号。
          </div>
          <Whitespace size={0.3} />
          <div className={Style.page}>
            目前，新零售推动库尔勒香梨走向全国。优质优价，农民也实现增收。据悉，香梨收入已占库尔勒农民纯收入的36%。有关企业表示，将深入源头基地，深度参与种植端与加工端，与当地政府和协会一起推动库尔勒香梨向标准化生产发展。
            （本文来源：中国果品流通协会） 首页
          </div>
          <Whitespace size={0.5} />
        </div>
        <div className={Style.space} />
      </>
    )
  }
}

export default News
