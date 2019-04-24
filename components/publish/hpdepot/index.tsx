import React, { Component } from 'react'
import { createForm } from 'rc-form'
import { isEmpty, find } from 'lodash'
import TitleItem from '@components/publish/common/title'
import Province from '@components/publish/common/province'
import Radio from '@components/common/radio'
import Range from '@components/publish/common/range'
import RangeRadio from '@components/publish/common/radio'
import Input from '@components/common/input'
import Whitespace from '@components/common/whitespace'
import GroupItem from './group-item'
import Button from '@components/common/button'
import Style from './index.scss'
import { helpDepot } from '@api/common/help'
import { fetchProvince, fetchCity } from '@api/province'
import Dialog from '@components/common/dialog/index'
import { isPhone } from '@utils/is'
interface State {
  temperatureMin: string
  temperatureMax: string
  emptyCapacityMin?: any
  emptyCapacityMax?: any
  stockType: string
  demand: string
  gender: string
  contactMobile: string
  contactContent: string
  provinceCode: string
  cityCode: string
  typeVal: any
  cityVal: any
}

class Publish extends Component<any, State> {
  private get _invalid(): boolean {
    let {
      contactMobile,
      contactContent,
      gender,
      emptyCapacityMin,
      temperatureMin,
      stockType
    } = this.state
    return (
      isEmpty(contactMobile) ||
      isEmpty(contactContent) ||
      isEmpty(gender) ||
      isEmpty(emptyCapacityMin) ||
      isEmpty(temperatureMin) ||
      isEmpty(stockType) ||
      !isPhone(contactMobile)
    )
  }
  private get temperature(): string {
    let { temperatureMin, temperatureMax } = this.state
    return `${temperatureMin}${temperatureMax ? ',' + temperatureMax : ''}`
  }
  private get emptyCapacity(): string {
    let { emptyCapacityMin, emptyCapacityMax } = this.state
    return `${emptyCapacityMin}${
      emptyCapacityMax ? ',' + emptyCapacityMax : ''
    }`
  }
  private get provinceName(): string {
    let { typeVal, provinceCode } = this.state
    let foundItem = find(typeVal, (item: any) => {
      return item.areaId === provinceCode
    })
    return foundItem ? foundItem.areaName : ''
  }
  private get cityName(): string {
    let { cityVal, cityCode } = this.state
    let foundItem = find(cityVal, (item: any) => {
      return item.areaId === cityCode
    })
    return foundItem ? foundItem.areaName : ''
  }
  state = {
    temperatureMin: '',
    temperatureMax: '',
    emptyCapacityMin: '',
    emptyCapacityMax: '',
    stockType: '',
    demand: '',
    gender: '',
    contactMobile: '',
    relatedDataType: 'SL',
    contactType: 'S',
    contactContent: '',
    provinceCode: '',
    cityCode: '',
    typeVal: [],
    cityVal: []
  }

  private onTempChange = (temperature: string) => {
    let [temperatureMin, temperatureMax = ''] = temperature.split(',')
    this.setState({ temperatureMin, temperatureMax })
  }
  private onEmptyCapacityChange = (emptyCapacity: string) => {
    let [emptyCapacityMin, emptyCapacityMax = ''] = emptyCapacity.split(',')
    this.setState({ emptyCapacityMin, emptyCapacityMax })
  }
  private onTempRangeChange = ([
    emptyCapacityMin,
    emptyCapacityMax
  ]: string[]) => {
    this.setState({ emptyCapacityMin, emptyCapacityMax })
    this.statusItem()
  }
  private onPriceRangeChange = ([temperatureMin, temperatureMax]: string[]) => {
    this.setState({ temperatureMin, temperatureMax })
    this.statusItem()
  }
  onChangeByKey = <K extends keyof State>(key: K) => {
    return (value: State[K]) => {
      this.setState({ [key]: value } as Pick<State, keyof State>)
      if (key == 'provinceCode') {
        this.city(value)
      }
      this.statusItem()
    }
  }
  statusItem = () => {
    this.setState(prevState => {
      let {
        contactContent,
        stockType,
        temperatureMin,
        temperatureMax,
        emptyCapacityMin,
        emptyCapacityMax,
        demand
      } = prevState
      let item = contactContent
      temperatureMax = temperatureMax ? '-' + temperatureMax + '元' : ''
      emptyCapacityMax = emptyCapacityMax ? '-' + emptyCapacityMax + '㎡' : ''
      item =
        this.provinceName +
        this.cityName +
        ';' +
        stockType +
        ';' +
        temperatureMin +
        temperatureMax +
        ';' +
        emptyCapacityMin +
        emptyCapacityMax +
        ';' +
        demand
      return { contactContent: item }
    })
  }
  dicts = async () => {
    let { success, data } = await fetchProvince()
    if (success) {
      this.setState({
        typeVal: data
      })
    }
  }
  city = async code => {
    let { success, data } = await fetchCity(code)
    if (success) {
      this.setState({
        cityVal: data
      })
    }
  }
  submit = async () => {
    let { success } = await helpDepot(this.state)
    if (success) {
      Dialog({
        message: '发布成功',
        isConfirm: false
      })
    }
  }
  componentDidMount() {
    this.dicts()
  }
  render() {
    let { getFieldProps, getFieldError } = this.props.form
    let errors
    return (
      <>
        <TitleItem title={'您要出租的冷库地区在？'}>
          <div className={Style.positionBox}>
            <div className={Style.position}>
              <svg aria-hidden="true">
                <use xlinkHref="#icon-techreport-" />
              </svg>
              <span>
                {this.provinceName}
                {this.cityName}
              </span>
            </div>
            <div className={Style.selPovince}>
              <span>更改</span>
              <div>
                <Province
                  data={this.state.typeVal}
                  {...getFieldProps('provinceCode', {
                    onChange: this.onChangeByKey('provinceCode'),
                    rules: [{ required: true, message: '省份不能为空' }]
                  })}
                />
                {(errors = getFieldError('provinceCode')) ? (
                  <div className={Style.formError}>{errors.join(',')}</div>
                ) : null}
              </div>
              <div>
                <Province
                  data={this.state.cityVal}
                  {...getFieldProps('cityCode', {
                    onChange: this.onChangeByKey('cityCode'),
                    rules: [{ required: true, message: '城市不能为空' }]
                  })}
                />
                {(errors = getFieldError('cityCode')) ? (
                  <div className={Style.formError}>{errors.join(',')}</div>
                ) : null}
              </div>
            </div>
          </div>
        </TitleItem>
        <TitleItem title={'您要出租的冷库类型是?'} remark={'（可多选）'}>
          <GroupItem
            type={'StockType'}
            {...getFieldProps('stockType', {
              onChange: this.onChangeByKey('stockType'),
              rules: [{ required: true, message: '类型不能为空' }]
            })}
          />
          {(errors = getFieldError('stockType')) ? (
            <div className={Style.formError}>{errors.join(',')}</div>
          ) : null}
        </TitleItem>
        <TitleItem title={'您的理想价格是?'} remark={'（单位：㎡/月）'}>
          <Radio
            label=""
            range
            rangeLable="价格"
            rangeInitial={['', '']}
            onRangeChange={this.onPriceRangeChange}
          >
            <Radio.Option
              label="80元以下"
              value="80元以下"
              checked={this.temperature === '80元以下'}
              onChange={this.onTempChange}
            />
            <Radio.Option
              label="80-90元"
              value="80-90元"
              checked={this.temperature === '80-90元'}
              onChange={this.onTempChange}
            />
            <Radio.Option
              label="90-100元"
              value="90-100元"
              checked={this.temperature === '90-100元'}
              onChange={this.onTempChange}
            />
            <Radio.Option
              label="100-101元"
              value="100-101元"
              checked={this.temperature === '100-101元'}
              onChange={this.onTempChange}
            />
            <Radio.Option
              label="120元以上"
              value="120元以上"
              checked={this.temperature === '120元以上'}
              onChange={this.onTempChange}
            />
            <Radio.Option
              label="其他"
              value="其他"
              checked={this.temperature === '其他'}
              onChange={this.onTempChange}
            />
          </Radio>
        </TitleItem>
        <TitleItem title={'您的需求面积是?'}>
          <Radio
            label=""
            range
            rangeLable="面积"
            rangeInitial={['', '']}
            onRangeChange={this.onTempRangeChange}
          >
            <Radio.Option
              label="100㎡以下"
              value="100㎡以下"
              checked={this.emptyCapacity === '100㎡以下'}
              onChange={this.onEmptyCapacityChange}
            />
            <Radio.Option
              label="100-300㎡"
              value="100-300㎡"
              checked={this.emptyCapacity === '100-300㎡'}
              onChange={this.onEmptyCapacityChange}
            />
            <Radio.Option
              label="300-600㎡"
              value="300-600㎡"
              checked={this.emptyCapacity === '300-600㎡'}
              onChange={this.onEmptyCapacityChange}
            />
            <Radio.Option
              label="600-1000㎡以上"
              value="600-1000㎡以上"
              checked={this.emptyCapacity === '600-1000㎡以上'}
              onChange={this.onEmptyCapacityChange}
            />
            <Radio.Option
              label="1000㎡以上"
              value="1000㎡以上"
              checked={this.emptyCapacity === '1000㎡以上'}
              onChange={this.onEmptyCapacityChange}
            />
            <Radio.Option
              label="其他"
              value="其他"
              checked={this.emptyCapacity === '其他'}
              onChange={this.onEmptyCapacityChange}
            />
          </Radio>
        </TitleItem>
        <TitleItem title={'您是否有其他要求?'} remark={'（选填）'}>
          <Input
            label=""
            multiable
            placeholder="多行输入文本框"
            {...getFieldProps('demand', {
              onChange: this.onChangeByKey('demand')
            })}
          />
        </TitleItem>
        <TitleItem title={'您的联系方式是?'}>
          <Range label="性别">
            <RangeRadio
              type={'Gender'}
              checked={this.state.gender}
              {...getFieldProps('gender', {
                onChange: this.onChangeByKey('gender'),
                rules: [{ required: true, message: '性别不能为空' }]
              })}
            />
            {(errors = getFieldError('gender')) ? (
              <div className={Style.formError} style={{ position: 'relative' }}>
                {errors.join(',')}
              </div>
            ) : null}
          </Range>
          <Whitespace size={0.4} />
          <Input
            label="联系手机"
            placeholder="请输入联系人手机号"
            {...getFieldProps('contactMobile', {
              onChange: this.onChangeByKey('contactMobile'),
              rules: [{ required: true, message: '手机号不能为空' }]
            })}
          />
          {(errors = getFieldError('contactMobile')) ? (
            <div className={Style.formError}>{errors.join(',')}</div>
          ) : null}
        </TitleItem>
        <div className={Style.buttonBox}>
          <Button disabled={this._invalid} label="提交" onClick={this.submit} />
        </div>
      </>
    )
  }
}

export default createForm()(Publish)
