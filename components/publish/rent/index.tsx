import React, { Component } from 'react'
import { DatePicker, List, ImagePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import Router from 'next/router'
// import { isEmpty } from 'lodash'
import { format } from 'date-fns'
import classnames from 'classnames'
import Box from '@components/publish/common/box'
import Input from '@components/common/input'
import Range from '@components/publish/common/range'
import RangeInput from '@components/publish/common/input'
import RangeSelect from '@components/publish/common/select'
import Province from '@components/publish/common/province'
import GroupItem from '@components/publish/common/group-item'
import Radio from '@components/publish/common/radio'
import Button from '@components/common/button'
import Dialog from '@components/common/dialog/index'
import { fetchProvince, fetchCity } from '@api/province'
import { fetchRent, fetchRentSave } from '@api/release'
import { upload } from '@api/user'
import { isPhone, isNumber, isTemp } from '@utils/is'
import { sleep } from '@utils/index'

import Style from './index.scss'
// import WhiteSpace from '@components/common/whitespace'

interface State {
  demandTitle: string
  floorHeight: string
  temperatureLower: string
  temperatureUpper: string
  supportFacility: string
  supportService: string
  serviceMode: string
  otherDesc: string
  planRentPeriod: string
  contactName: string
  gender: string
  contactMobile: string
  contactTel: string
  demandArea: string
  stockType: string
  productCategoryName: string
  expectedPriceType: string
  planEnterDate: any
  expectedPriceEnd: string
  expectedPriceBegin: string
  stockPriceUnit: string
  provinceCode: string
  cityCode: string
  productPhoto: string
  typeVal: any
  cityVal: any
  files: any[]
}

class DepotFrom extends Component<any, State> {
  private get _invalid(): boolean {
    // let { demandTitle } = this.state
    return false
  }
  onPhotoChange: Set<any> = new Set()
  state = {
    demandTitle: '',
    floorHeight: '',
    temperatureLower: '',
    temperatureUpper: '',
    supportFacility: '',
    supportService: '',
    serviceMode: '',
    otherDesc: '',
    planRentPeriod: '',
    contactName: '',
    gender: '',
    contactMobile: '',
    contactTel: '',
    demandArea: '',
    stockType: '',
    productCategoryName: '',
    expectedPriceType: '',
    planEnterDate: '',
    expectedPriceEnd: '',
    expectedPriceBegin: '',
    stockPriceUnit: '',
    provinceCode: '',
    cityCode: '',
    productPhoto: '',
    files: [],
    typeVal: null,
    cityVal: null
  }
  onChangeByKey = <K extends keyof State>(key: K) => {
    return (value: State[K]) => {
      this.setState({ [key]: value } as Pick<State, keyof State>)
      if (key == 'provinceCode') {
        this.city(value)
      }
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
      productPhoto: ukid.join(',')
    })
  }
  submit = () => {
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        values.planEnterDate = format(values.planEnterDate, 'YYYY-MM-DD')
        let { success, data } = await fetchRent(values)
        if (success) {
          Dialog({
            message: '发布成功',
            isConfirm: false
          })
          sleep(3000).then(() => {
            Router.push('/rent/detail?id=' + data)
          })
        }
      }
    })
    // this.props.onSubmit({
    //   ...this.state
    // })
  }
  save = async () => {
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        values.planEnterDate = format(values.planEnterDate, 'YYYY-MM-DD')
        let { success } = await fetchRentSave(values)
        if (success) {
          Dialog({
            message: '保存成功',
            isConfirm: false
          })
        }
      }
    })
    // this.props.onSubmit({
    //   ...this.state
    // })
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
        <Box title={'基本资料'}>
          <div className={Style.form}>
            <div className={Style.formInput}>
              <Input
                label="* 标题"
                placeholder="请输入发布标题"
                {...getFieldProps('demandTitle', {
                  onChange: this.onChangeByKey('demandTitle'),
                  rules: [{ required: true, message: '标题不能为空' }]
                })}
              />
              {(errors = getFieldError('demandTitle')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
            <div className={Style.formInput}>
              <Range label="* 面积需求">
                <div className={Style.marginspace}>
                  <RangeSelect
                    type={'StockType'}
                    {...getFieldProps('stockType', {
                      onChange: this.onChangeByKey('stockType'),
                      rules: [{ required: true, message: '请选择仓库类型' }]
                    })}
                  />
                  {(errors = getFieldError('stockType')) ? (
                    <div className={Style.formError}>{errors.join(',')}</div>
                  ) : null}
                </div>
                <div>
                  <RangeInput
                    {...getFieldProps('demandArea', {
                      onChange: this.onChangeByKey('demandArea'),
                      rules: [{ validator: this.validateNum }]
                    })}
                  />
                  {(errors = getFieldError('demandArea')) ? (
                    <div className={Style.formError}>{errors.join(',')}</div>
                  ) : null}
                </div>
                <span className={Style.unit}>㎡</span>
              </Range>
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
              <Input
                label="仓库层高"
                placeholder="请输入仓库层高"
                {...getFieldProps('floorHeight', {
                  onChange: this.onChangeByKey('floorHeight'),
                  rules: [{ validator: this.validateNumEmpty }]
                })}
              />
              {(errors = getFieldError('floorHeight')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
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
              </Range>
            </div>
          </div>
        </Box>
        <Box title={'货品描述'}>
          <div className={Style.form}>
            <div className={Style.formInput}>
              <Input
                label="* 商品类型"
                placeholder="请输入商品类型"
                {...getFieldProps('productCategoryName', {
                  onChange: this.onChangeByKey('productCategoryName'),
                  rules: [{ required: true, message: '类型不能为空' }]
                })}
              />
              {(errors = getFieldError('productCategoryName')) ? (
                <div className={Style.formError}>{errors.join(',')}</div>
              ) : null}
            </div>
            <div className={Style.formInput}>
              <Range label="* 配套设施">
                <GroupItem
                  type={'SupportFacility'}
                  {...getFieldProps('supportFacility', {
                    onChange: this.onChangeByKey('supportFacility'),
                    rules: [{ required: true, message: '配套设施不能为空' }]
                  })}
                />
                {(errors = getFieldError('supportFacility')) ? (
                  <div className={classnames(Style.formError, Style.topspace)}>
                    {errors.join(',')}
                  </div>
                ) : null}
              </Range>
            </div>
            <div className={classnames(Style.formInput)}>
              <Range label="* 配套服务">
                <GroupItem
                  type={'SupportService'}
                  checked={this.state.supportService}
                  {...getFieldProps('supportService', {
                    onChange: this.onChangeByKey('supportService'),
                    rules: [{ required: true, message: '配套服务不能为空' }]
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
                    rules: [{ required: true, message: '服务模式不能为空' }]
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
                label="其他说明"
                multiable
                placeholder="多行输入文本框"
                {...getFieldProps('otherDesc', {
                  onChange: this.onChangeByKey('otherDesc')
                })}
              />
            </div>
          </div>
        </Box>
        <Box title={'入驻信息'}>
          <div className={Style.form}>
            <div className={Style.formInput}>
              <List>
                <DatePicker
                  mode="date"
                  {...getFieldProps('planEnterDate', {
                    initialValue: this.state.planEnterDate,
                    onChange: this.onChangeByKey('planEnterDate'),
                    rules: [{ required: true, message: '入驻时间不能为空' }]
                  })}
                >
                  <List.Item>* 计划入驻</List.Item>
                </DatePicker>
                {(errors = getFieldError('planEnterDate')) ? (
                  <div className={Style.formError}>{errors.join(',')}</div>
                ) : null}
              </List>
            </div>
            <div className={Style.formInput}>
              <Range label="* 计划租期">
                <Radio
                  type={'PlanRentPeriod'}
                  checked={this.state.planRentPeriod}
                  {...getFieldProps('planRentPeriod', {
                    // initialValue: this.state.planRentPeriod,
                    onChange: this.onChangeByKey('planRentPeriod'),
                    rules: [{ required: true, message: '租期不能为空' }]
                  })}
                />
                {(errors = getFieldError('planRentPeriod')) ? (
                  <div className={classnames(Style.formError, Style.topspace)}>
                    {errors.join(',')}
                  </div>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Range label="* 期望价格">
                <div>
                  <Radio
                    type={'ExpectedPriceType'}
                    checked={this.state.expectedPriceType}
                    {...getFieldProps('expectedPriceType', {
                      // initialValue: this.state.expectedPriceType,
                      onChange: this.onChangeByKey('expectedPriceType'),
                      rules: [{ required: true, message: '期望价格不能为空' }]
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
                  <div className={Style.selprices}>
                    <div>
                      <RangeInput
                        {...getFieldProps('expectedPriceBegin', {
                          onChange: this.onChangeByKey('expectedPriceBegin'),
                          rules: [{ validator: this.validateNum }]
                        })}
                      />
                      {(errors = getFieldError('expectedPriceBegin')) ? (
                        <div className={Style.formError}>
                          {errors.join(',')}
                        </div>
                      ) : null}
                    </div>
                    <div className={Style.rangeLine} />
                    <div className={Style.marginspace}>
                      <RangeInput
                        {...getFieldProps('expectedPriceEnd', {
                          onChange: this.onChangeByKey('expectedPriceEnd'),
                          rules: [{ validator: this.validateNum }]
                        })}
                      />
                      {(errors = getFieldError('expectedPriceEnd')) ? (
                        <div className={Style.formError}>
                          {errors.join(',')}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <RangeSelect
                        type={'StockType'}
                        {...getFieldProps('stockPriceUnit', {
                          onChange: this.onChangeByKey('stockPriceUnit'),
                          rules: [{ required: true, message: '单位不能为空' }]
                        })}
                      />
                      {(errors = getFieldError('stockPriceUnit')) ? (
                        <div className={Style.formError}>
                          {errors.join(',')}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
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
                {(errors = getFieldError('gender')) ? (
                  <div className={Style.formError}>{errors.join(',')}</div>
                ) : null}
              </Range>
            </div>
            <div className={Style.formInput}>
              <Input
                label="* 联系手机"
                placeholder="请输入联系人手机号"
                {...getFieldProps('contactMobile', {
                  onChange: this.onChangeByKey('contactMobile'),
                  rules: [
                    {
                      validator: this.validatePhone
                    }
                  ]
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
                  rules: [
                    {
                      validator: this.validateFixPhone
                    }
                  ]
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
