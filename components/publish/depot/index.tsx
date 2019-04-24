import React, { Component } from 'react'
import { createForm } from 'rc-form'
import Router from 'next/router'
import { isEmpty, filter, uniqueId } from 'lodash'
import { ImagePicker } from 'antd-mobile'
import classnames from 'classnames'
import Box from '@components/publish/common/box'
import Input from '@components/common/input'
import Range from '@components/publish/common/range'
import RangeInput from '@components/publish/common/input'
import RangeSelect from '@components/publish/common/select'
import GroupItem from '@components/publish/common/group-item'
import Province from '@components/publish/common/province'
import Radio from '@components/publish/common/radio'
import DepotRadio from '@components/publish/depot/radio'
import Button from '@components/common/button'
import Dialog from '@components/common/dialog/index'
import { fetchProvince, fetchCity, fetchDistrict } from '@api/province'
import { fetchDepot, fetchDepotSave } from '@api/release'
import { upload } from '@api/user'
import { isPhone, isNumber, isTemp } from '@utils/is'
import { sleep } from '@utils/index'
import Style from './index.scss'

interface State {
  publishTitle: string
  stockName: string
  totalArea: string
  emptyArea: string
  emptyCapacity: string
  locatedFloor: string
  floorHeight: string
  temperatureLower: string
  temperatureUpper: string
  suitableCategory: string
  stockQualification: string
  address: string
  supportFacility: string
  supportService: string
  serviceMode: string
  existingSystem: string
  advantage: string
  cooperationCase: string
  splitable: string
  platformType: string
  fireGrade: string
  groundType: string
  minRentMonths: string
  minRentArea: string
  contactName: string
  gender: string
  contactMobile: string
  contactTel: string
  provinceCode: string
  cityCode: string
  districtCode: string
  scenePhoto: string
  expectedPriceType: string
  platType: any
  fireType: any
  ground: any
  typeVal: any
  cityVal: any
  dicVal: any
  files: any[]
  ptStockPriceList: any
  baStockDetailList: any
}
class DepotFrom extends Component<any, State> {
  private get _invalid(): boolean {
    // let { publishTitle } = this.state
    return false
  }
  onPhotoChange: Set<any> = new Set()
  state = {
    publishTitle: '',
    stockName: '',
    totalArea: '',
    emptyArea: '',
    emptyCapacity: '',
    locatedFloor: '',
    floorHeight: '',
    temperatureLower: '',
    temperatureUpper: '',
    suitableCategory: '',
    stockQualification: '',
    address: '',
    supportFacility: '',
    supportService: '',
    serviceMode: '',
    existingSystem: '',
    advantage: '',
    cooperationCase: '',
    splitable: '0',
    platformType: '',
    groundType: '',
    minRentMonths: '',
    minRentArea: '',
    contactName: '',
    gender: '',
    contactMobile: '',
    contactTel: '',
    provinceCode: '',
    cityCode: '',
    districtCode: '',
    scenePhoto: '',
    expectedPriceType: '',
    fireType: null,
    fireGrade: '',
    stockPriceUnit: '',
    price: '',
    platType: null,
    ground: null,
    typeVal: null,
    cityVal: null,
    dicVal: null,
    files: [],
    ptStockPriceList: [
      {
        price: '',
        stockPriceUnit: 'MM',
        isDefault: 1,
        kid: uniqueId('ptprice_')
      }
    ],
    baStockDetailList: [
      {
        stockType: '',
        totalArea: '',
        emptyArea: '',
        emptyCapacity: '',
        kid: uniqueId('ptstock_')
      }
    ]
  }
  onChangeByKey = <K extends keyof State>(key: K) => {
    return (value: State[K]) => {
      this.setState({ [key]: value } as Pick<State, keyof State>)
      if (key == 'provinceCode') {
        this.city(value)
      }
      if (key == 'cityCode') {
        this.district(value)
      }
    }
  }

  onChangeStockPrice = (key, index) => {
    return value => {
      this.setState(prevState => {
        let { ptStockPriceList } = prevState
        let item = ptStockPriceList[index]
        item[key] = value
        return {
          ptStockPriceList: [...ptStockPriceList]
        }
      })
    }
  }
  onChangeStockList = (key, index) => {
    return value => {
      this.setState(prevState => {
        let { baStockDetailList } = prevState
        let item = baStockDetailList[index]
        item[key] = value
        return {
          baStockDetailList: [...baStockDetailList]
        }
      })
    }
  }

  onChange = async (files, type, index) => {
    if (type === 'add') {
      let fd = new FormData()
      let file = files[files.length - 1].file
      fd.append('file', file)
      let { success, data } = await upload(fd)
      if (success) {
        this.onPhotoChange.add(data)
      }
    } else if (type === 'remove') {
      let remveTarget: any = this.state.files[index]
      this.onPhotoChange.delete(remveTarget)
    }
    let ukid: any = [...this.onPhotoChange].map(item => {
      return item.ukid
    })
    this.setState({
      files: [...this.onPhotoChange],
      scenePhoto: ukid.join(',')
    })
  }
  submit = () => {
    this.props.form.validateFields(async error => {
      if (!error) {
        let { success, data } = await fetchDepot(this.state)
        if (success) {
          Dialog({
            message: '发布成功',
            isConfirm: false
          })
          sleep(3000).then(() => {
            Router.push('/depot/detail?id=' + data)
          })
        }
      }
    })
  }
  save = () => {
    this.props.form.validateFields(async error => {
      if (!error) {
        let { success } = await fetchDepotSave(this.state)
        if (success) {
          Dialog({
            message: '发布成功',
            isConfirm: false
          })
        }
      }
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
  district = async code => {
    let { success, data } = await fetchDistrict(code)
    if (success) {
      this.setState({
        dicVal: data
      })
    }
  }
  addPrice = () => {
    this.setState({
      ptStockPriceList: this.state.ptStockPriceList.concat({
        price: '',
        stockPriceUnit: '',
        isDefault: 0,
        kid: uniqueId('ptprice_')
      })
    })
  }

  reducePrice = index => {
    this.setState(prevState => {
      let { ptStockPriceList: prevPtStockPriceList } = prevState
      let ptStockPriceList = prevPtStockPriceList.filter(
        (item, i) => i !== index
      )
      return {
        ptStockPriceList
      }
    })
  }
  addList = () => {
    this.setState({
      baStockDetailList: this.state.baStockDetailList.concat({
        stockType: '',
        totalArea: '',
        emptyArea: '',
        emptyCapacity: '',
        kid: uniqueId('ptstock_')
      })
    })
  }
  reduceList = index => {
    this.setState(prevState => {
      let { baStockDetailList: prevbaStockDetailList } = prevState
      let baStockDetailList = prevbaStockDetailList.filter(
        (item, i) => i !== index
      )
      return {
        baStockDetailList
      }
    })
  }
  validateNum = (rule, values, callback) => {
    if (values && isNumber(values)) {
      callback()
    } else {
      callback(new Error('请填写大于0的数字'))
    }
  }

  validateNumEmpty = (rule, values, callback) => {
    if (!values) {
      callback()
    } else {
      if (isNumber(values)) {
        callback()
      } else {
        callback(new Error('请填写大于0的数字'))
      }
    }
  }
  validatePhone = (rule, values, callback) => {
    if (values && isPhone(values)) {
      callback()
    } else {
      callback(new Error('请填写正确的手机号'))
    }
  }
  validateTempOne = (rule, values, callback) => {
    if (values && isTemp(values)) {
      if (!this.state.temperatureUpper) {
        callback()
      } else {
        if (parseInt(values) <= parseInt(this.state.temperatureUpper)) {
          callback()
        } else {
          callback(new Error('温度不能大于最大温度'))
        }
      }
    } else {
      callback(new Error('请填写温度'))
    }
  }
  validateTempTwo = (rule, values, callback) => {
    if (values && isTemp(values)) {
      if (!this.state.temperatureLower) {
        callback()
      } else {
        if (parseInt(values) >= parseInt(this.state.temperatureLower)) {
          callback()
        } else {
          callback(new Error('温度不能小于最小温度'))
        }
      }
    } else {
      callback(new Error('请填写温度'))
    }
  }
  validateFixPhone = (rule, values, callback) => {
    if (!values) {
      callback()
    } else {
      if (isPhone(values)) {
        callback()
      } else {
        callback(new Error('请填写正确的手机号'))
      }
    }
  }

  componentDidMount() {
    this.dicts()
  }
  render() {
    let { getFieldProps, getFieldError } = this.props.form
    let errors
    const { files, expectedPriceType } = this.state
    return (
      <>
        <Box title={'基础信息'}>
          <div className={Style.form}>
            <div className={Style.formInput}>
              <Input
                label="* 标题"
                placeholder="请输入发布标题"
                {...getFieldProps('publishTitle', {
                  onChange: this.onChangeByKey('publishTitle'),
                  rules: [{ required: true, message: '标题不能为空' }]
                })}
              />
              {(errors = getFieldError('publishTitle')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
            <div className={Style.formInput}>
              <Input
                label="* 仓库名称"
                placeholder="请输入仓库名称"
                {...getFieldProps('stockName', {
                  onChange: this.onChangeByKey('stockName'),
                  rules: [{ required: true, message: '仓库名称不能为空' }]
                })}
              />
              {(errors = getFieldError('stockName')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
            <div className={Style.formInput}>
              <Range label="* 计价方式">
                <div>
                  <Radio
                    type={'ExpectedPriceType'}
                    checked={this.state.expectedPriceType}
                    {...getFieldProps('expectedPriceType', {
                      onChange: this.onChangeByKey('expectedPriceType'),
                      rules: [{ required: true, message: '请选择计价方式' }]
                    })}
                  />
                  {(errors = getFieldError('expectedPriceType')) ? (
                    <div
                      className={classnames(Style.formError, Style.topspace)}
                    >
                      {errors.join(',')}
                    </div>
                  ) : null}
                </div>
                {expectedPriceType === 'S' ? (
                  <>
                    {this.state.ptStockPriceList.map((item, index) => {
                      return (
                        <>
                          <div className={Style.ptStock} key={item.kid}>
                            <div>
                              <RangeInput
                                initValue={item.price}
                                {...getFieldProps(`price-${index}`, {
                                  onChange: this.onChangeStockPrice(
                                    'price',
                                    index
                                  ),
                                  rules: [{ validator: this.validateNum }]
                                })}
                              />
                              {(errors = getFieldError(`price-${index}`)) ? (
                                <div className={Style.formError}>
                                  {errors.join(',')}
                                </div>
                              ) : null}
                            </div>
                            <div className={Style.selectPrice}>
                              <RangeSelect
                                checked={item.stockPriceUnit}
                                disabled={item.isDefault == 1 ? true : false}
                                type={'StockPriceUnit'}
                                {...getFieldProps(`stockPriceUnit-${index}`, {
                                  onChange: this.onChangeStockPrice(
                                    'stockPriceUnit',
                                    index
                                  ),
                                  rules: [
                                    {
                                      required: true,
                                      message: '请选择价格单位'
                                    }
                                  ]
                                })}
                              />
                              {(errors = getFieldError(
                                `stockPriceUnit-${index}`
                              )) ? (
                                <div className={Style.formError}>
                                  {errors.join(',')}
                                </div>
                              ) : null}
                            </div>
                            {item.isDefault === 0 ? (
                              <svg
                                className={Style.svgicon}
                                aria-hidden="true"
                                onClick={this.reducePrice.bind(this, index)}
                              >
                                <use xlinkHref="#icon-jianshaoanniu" />
                              </svg>
                            ) : null}
                          </div>
                        </>
                      )
                    })}
                    <div className={Style.add} onClick={this.addPrice}>
                      <svg className={Style.svgicon} aria-hidden="true">
                        <use xlinkHref="#icon-tianjiaadd73" />
                      </svg>
                      <p>添加价格</p>
                    </div>
                  </>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="* 温层分级">
                <table>
                  <thead>
                    <tr>
                      <th>温层名称</th>
                      <th>面积(㎡）</th>
                      <th>可用(㎡）</th>
                      <th>容量(吨)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.baStockDetailList.map((item, index) => {
                      return (
                        <>
                          <tr key={item.kid}>
                            <td>
                              <RangeSelect
                                checked={item.stockType}
                                type={'StockType'}
                                {...getFieldProps(`stockType-${index}`, {
                                  onChange: this.onChangeStockList(
                                    'stockType',
                                    index
                                  ),
                                  rules: [
                                    {
                                      required: true,
                                      message: '请选择温层名称'
                                    }
                                  ]
                                })}
                              />
                              {(errors = getFieldError(
                                `stockType-${index}`
                              )) ? (
                                <div className={Style.formError}>
                                  {errors.join(',')}
                                </div>
                              ) : null}
                            </td>
                            <td>
                              <RangeInput
                                classStyle
                                {...getFieldProps(`totalArea-${index}`, {
                                  onChange: this.onChangeStockList(
                                    'totalArea',
                                    index
                                  ),
                                  rules: [
                                    {
                                      validator: this.validateNum
                                    }
                                  ]
                                })}
                              />
                              {(errors = getFieldError(
                                `totalArea-${index}`
                              )) ? (
                                <div className={Style.formError}>
                                  {errors.join(',')}
                                </div>
                              ) : null}
                            </td>
                            <td>
                              <RangeInput
                                classStyle
                                {...getFieldProps(`emptyArea-${index}`, {
                                  onChange: this.onChangeStockList(
                                    'emptyArea',
                                    index
                                  ),

                                  rules: [
                                    {
                                      validator: this.validateNum
                                    }
                                  ]
                                })}
                              />
                              {(errors = getFieldError(
                                `emptyArea-${index}`
                              )) ? (
                                <div className={Style.formError}>
                                  {errors.join(',')}
                                </div>
                              ) : null}
                            </td>
                            <td>
                              <RangeInput
                                classStyle
                                {...getFieldProps(`emptyCapacity-${index}`, {
                                  onChange: this.onChangeStockList(
                                    'emptyCapacity',
                                    index
                                  ),

                                  rules: [
                                    {
                                      validator: this.validateNum
                                    }
                                  ]
                                })}
                              />
                              {(errors = getFieldError(
                                `emptyCapacity-${index}`
                              )) ? (
                                <div className={Style.formError}>
                                  {errors.join(',')}
                                </div>
                              ) : null}
                            </td>
                            {index !== 0 ? (
                              <td>
                                <svg
                                  className={Style.svgicon}
                                  aria-hidden="true"
                                  onClick={this.reduceList.bind(this, index)}
                                >
                                  <use xlinkHref="#icon-jianshaoanniu" />
                                </svg>
                              </td>
                            ) : null}
                          </tr>
                        </>
                      )
                    })}
                  </tbody>
                </table>
                <div className={Style.add} onClick={this.addList}>
                  <svg className={Style.svgicon} aria-hidden="true">
                    <use xlinkHref="#icon-tianjiaadd73" />
                  </svg>
                  <p>添加温层</p>
                </div>
              </Range>
            </div>
            <div className={Style.formInput}>
              <Input
                label="总面积(㎡)"
                placeholder="请输入面积"
                initValue={`${this.state.totalArea}`}
                {...getFieldProps('totalArea', {
                  onChange: this.onChangeByKey('totalArea')
                })}
              />
            </div>
            <div className={Style.formInput}>
              <Input
                label="总可租面积(㎡)"
                placeholder="请输入面积"
                {...getFieldProps('emptyArea', {
                  onChange: this.onChangeByKey('emptyArea')
                })}
              />
            </div>
            <div className={Style.formInput}>
              <Input
                label="总可用容量(吨)"
                placeholder="请输入容量"
                {...getFieldProps('emptyCapacity', {
                  onChange: this.onChangeByKey('emptyCapacity')
                })}
              />
            </div>
            <div className={Style.formInput}>
              <Range label="* 温度">
                <div>
                  <RangeInput
                    {...getFieldProps('temperatureLower', {
                      onChange: this.onChangeByKey('temperatureLower'),
                      rules: [{ validator: this.validateTempOne }]
                    })}
                  />
                  {(errors = getFieldError('temperatureLower')) ? (
                    <div className={Style.formError}>{errors.join(',')}</div>
                  ) : null}
                </div>
                <div className={Style.rangeLine} />
                <div>
                  <RangeInput
                    {...getFieldProps('temperatureUpper', {
                      onChange: this.onChangeByKey('temperatureUpper'),
                      rules: [{ validator: this.validateTempTwo }]
                    })}
                  />
                  {(errors = getFieldError('temperatureUpper')) ? (
                    <div className={Style.formError}>{errors.join(',')}</div>
                  ) : null}
                </div>
                <span className={Style.unit}>℃</span>
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="适合品类">
                <GroupItem
                  type={'SuitableCategory'}
                  {...getFieldProps('suitableCategory', {
                    onChange: this.onChangeByKey('suitableCategory')
                  })}
                />
              </Range>
            </div>
            <div className={Style.formInput}>
              <Input
                label="所属楼层"
                placeholder="请输入仓库所属楼层"
                {...getFieldProps('locatedFloor', {
                  onChange: this.onChangeByKey('locatedFloor'),
                  rules: [{ validator: this.validateNum }]
                })}
              />
              {(errors = getFieldError('locatedFloor')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
            <div className={Style.formInput}>
              <Input
                label="仓库层高"
                placeholder="请输入仓库层高"
                {...getFieldProps('floorHeight', {
                  onChange: this.onChangeByKey('floorHeight'),
                  rules: [{ validator: this.validateNum }]
                })}
              />
              {(errors = getFieldError('floorHeight')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
            <div className={Style.formInput}>
              <Range label="* 消防等级">
                <Radio
                  type={'FireGrade'}
                  checked={this.state.fireGrade}
                  {...getFieldProps('fireGrade', {
                    onChange: this.onChangeByKey('fireGrade'),
                    rules: [{ required: true, message: '请选择消防等级' }]
                  })}
                />
                {(errors = getFieldError('fireGrade')) ? (
                  <div className={classnames(Style.formError, Style.topspace)}>
                    {errors.join(',')}
                  </div>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="地坪类型">
                <Radio
                  type={'GroundType'}
                  checked={this.state.groundType}
                  onChange={this.onChangeByKey('groundType')}
                />
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="* 运营资质">
                <GroupItem
                  type={'StockQualification'}
                  {...getFieldProps('stockQualification', {
                    onChange: this.onChangeByKey('stockQualification'),
                    rules: [{ required: true, message: '适合品类不能为空' }]
                  })}
                />
                {(errors = getFieldError('stockQualification')) ? (
                  <div className={classnames(Style.formError, Style.topspace)}>
                    {errors.join(',')}
                  </div>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="* 需求地址">
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
                <div>
                  <Province
                    data={this.state.dicVal}
                    {...getFieldProps('districtCode', {
                      onChange: this.onChangeByKey('districtCode'),
                      rules: [{ required: true, message: '区域不能为空' }]
                    })}
                  />
                  {(errors = getFieldError('districtCode')) ? (
                    <div className={Style.formError}>{errors.join(',')}</div>
                  ) : null}
                </div>
              </Range>
            </div>
            <div className={Style.formInput}>
              <Input
                label="* 具体地址"
                placeholder="请输入具体地址"
                {...getFieldProps('address', {
                  onChange: this.onChangeByKey('address'),
                  rules: [{ required: true, message: '具体地址不能为空' }]
                })}
              />
              {(errors = getFieldError('address')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
          </div>
        </Box>
        <Box title={'设施及服务'}>
          <div className={Style.form}>
            <div className={Style.formInput}>
              <Range label="* 可分割">
                <DepotRadio
                  label="是"
                  value="1"
                  checked={this.state.splitable === '1'}
                  onChange={this.onChangeByKey('splitable')}
                />
                <DepotRadio
                  label="否"
                  value="0"
                  checked={this.state.splitable === '0'}
                  onChange={this.onChangeByKey('splitable')}
                />

                {(errors = getFieldError('splitable')) ? (
                  <div className={Style.formError}>{errors.join(',')}</div>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="* 月台类型">
                <Radio
                  type={'PlatformType'}
                  checked={this.state.platformType}
                  {...getFieldProps('platformType', {
                    onChange: this.onChangeByKey('platformType'),
                    rules: [{ required: true, message: '请选择月台类型' }]
                  })}
                />
                {(errors = getFieldError('platformType')) ? (
                  <div className={classnames(Style.formError, Style.topspace)}>
                    {errors.join(',')}
                  </div>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="* 配套设施">
                <GroupItem
                  type={'SupportFacility'}
                  {...getFieldProps('supportFacility', {
                    onChange: this.onChangeByKey('supportFacility'),
                    rules: [{ required: true, message: '请选择配套设施' }]
                  })}
                />
                {(errors = getFieldError('supportFacility')) ? (
                  <div className={classnames(Style.formError, Style.topspace)}>
                    {errors.join(',')}
                  </div>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="* 配套服务">
                <GroupItem
                  type={'SupportService'}
                  {...getFieldProps('supportService', {
                    onChange: this.onChangeByKey('supportService'),
                    rules: [{ required: true, message: '请选择配套服务' }]
                  })}
                />
                {(errors = getFieldError('supportService')) ? (
                  <div className={classnames(Style.formError, Style.topspace)}>
                    {errors.join(',')}
                  </div>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="* 服务模式">
                <GroupItem
                  type={'ServiceMode'}
                  {...getFieldProps('serviceMode', {
                    onChange: this.onChangeByKey('serviceMode'),
                    rules: [{ required: true, message: '请选择服务模式' }]
                  })}
                />
                {(errors = getFieldError('serviceMode')) ? (
                  <div className={classnames(Style.formError, Style.topspace)}>
                    {errors.join(',')}
                  </div>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="* 软件系统">
                <GroupItem
                  type={'ExistingSystem'}
                  {...getFieldProps('existingSystem', {
                    onChange: this.onChangeByKey('existingSystem'),
                    rules: [{ required: true, message: '请选择软件系统' }]
                  })}
                />
                {(errors = getFieldError('existingSystem')) ? (
                  <div className={classnames(Style.formError, Style.topspace)}>
                    {errors.join(',')}
                  </div>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="上传照片" inherit={'inherit'}>
                <ImagePicker
                  files={files}
                  onChange={this.onChange}
                  selectable={files.length < 5}
                  accept="image/jpeg,image/jpg,image/png"
                />
              </Range>
            </div>
            <div className={Style.formInput}>
              <Input
                label="仓库优势"
                multiable
                placeholder="多行输入文本框"
                {...getFieldProps('advantage', {
                  onChange: this.onChangeByKey('advantage')
                })}
              />
            </div>
            <div className={Style.formInput}>
              <Input
                label="合作案例"
                multiable
                placeholder="多行输入文本框"
                {...getFieldProps('cooperationCase', {
                  onChange: this.onChangeByKey('cooperationCase')
                })}
              />
            </div>
          </div>
        </Box>
        <Box title={'出租相关'}>
          <div className={Style.form}>
            <div className={Style.formInput}>
              <Range label="* 起租期">
                <RangeInput
                  {...getFieldProps('minRentMonths', {
                    onChange: this.onChangeByKey('minRentMonths'),
                    rules: [{ validator: this.validateNum }]
                  })}
                />
                <span className={Style.unit}>月</span>
                {(errors = getFieldError('minRentMonths')) ? (
                  <div className={classnames(Style.formError, Style.topspace)}>
                    {errors.join(',')}
                  </div>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="起租面积">
                <RangeInput
                  {...getFieldProps('minRentArea', {
                    onChange: this.onChangeByKey('minRentArea'),
                    rules: [{ validator: this.validateNumEmpty }]
                  })}
                />
                {(errors = getFieldError('minRentArea')) ? (
                  <div className={Style.formError}>{errors.join(',')}</div>
                ) : null}
                <span className={Style.unit}>㎡</span>
              </Range>
            </div>
          </div>
        </Box>
        <Box title={'联系信息'}>
          <div className={Style.form}>
            <div className={Style.formInput}>
              <Input
                label="* 联系人"
                placeholder="请输入联系人姓名"
                {...getFieldProps('contactName', {
                  onChange: this.onChangeByKey('contactName'),
                  rules: [{ required: true, message: '联系人不能为空' }]
                })}
              />
              {(errors = getFieldError('contactName')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
            <div className={Style.formInput}>
              <Range label="性别">
                <Radio
                  type={'Gender'}
                  checked={this.state.gender}
                  onChange={this.onChangeByKey('gender')}
                />
              </Range>
            </div>
            <div className={Style.formInput}>
              <Input
                label="* 联系手机"
                placeholder="请输入联系人手机号"
                {...getFieldProps('contactMobile', {
                  onChange: this.onChangeByKey('contactMobile'),
                  rules: [{ validator: this.validatePhone }]
                })}
              />
              {(errors = getFieldError('contactMobile')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
            <div className={Style.formInput}>
              <Input
                label="固定电话"
                placeholder="请输入联系人固定电话"
                {...getFieldProps('contactTel', {
                  onChange: this.onChangeByKey('contactTel'),
                  rules: [{ validator: this.validateFixPhone }]
                })}
              />
              {(errors = getFieldError('contactTel')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
          </div>
        </Box>
        <div className={Style.buttonBox}>
          <Button
            theme={'save'}
            label="保存草稿"
            disabled={this._invalid}
            onClick={this.save}
          />
          <div className={Style.space} />
          <Button disabled={this._invalid} label="提交" onClick={this.submit} />
        </div>
      </>
    )
  }
}

export default createForm()(DepotFrom)
