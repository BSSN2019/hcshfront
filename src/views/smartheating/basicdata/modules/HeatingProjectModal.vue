<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-row :gutter="24">
        <a-col :span="10">
          <a-form :form="form">
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="项目编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input v-decorator="[ 'code', validatorRules.code]" placeholder="请输入项目编码"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入项目名称"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="负责人" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <b-dict-select-tag type="list" v-decorator="['leader', validatorRules.leader]" :trigger-change="true" dictCode="sys_user,realname,id" placeholder="请选择负责人"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="供热面积" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input-number v-decorator="[ 'heatingarea', validatorRules.heatingarea]" placeholder="请输入供热面积" style="width: 100%"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="经度" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input-number v-decorator="[ 'longitude', validatorRules.longitude]" placeholder="请输入经度" style="width: 100%"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="纬度" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input-number v-decorator="[ 'latitude', validatorRules.latitude]" placeholder="请输入纬度" style="width: 100%"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="数据源ProjectId" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input v-decorator="[ 'dsprojectid', validatorRules.name]" placeholder="请输入数据源ProjectId"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否启用" hasFeedback>
                  <a-switch checkedChildren="启用" unCheckedChildren="禁用" @change="onChose" v-model="visibleCheck"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-textarea v-decorator="['remark', validatorRules.remark]" rows="4" placeholder="请输入备注"/>
                </a-form-item>
              </a-col></a-row></a-form>
        </a-col>
        <a-col :span="14">
          <a-row :gutter="24">
            <div v-if="this.model.id">
              <a @click="restorePos">点击恢复初始坐标</a>
            </div>
            <div v-else>
              <span >请点击地图，选择项目所在位置</span>
            </div>
          </a-row>
          <a-row style="height:20px"></a-row>
          <a-row :gutter="0">
            <a-col spa="24">
              <baidu-map
                :center="center"
                :zoom="zoom"
                @ready="initMap"
                ak="RvbM40ylTtCpDBlUufGnnHPxKnphkLHb"
                :scroll-wheel-zoom="true"
                @click="clickMap"
                :style="{width:map.width,height:map.height}"
              >
                <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
                <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>
                <bm-control :offset="{width: '10px', height: '10px'}">
                  <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
                    <input type="text" placeholder="请输入搜索关键字" class="serachinput">
                  </bm-auto-complete>
                </bm-control>
                <bm-local-search :keyword="keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
                <div v-if="this.showMark">
                  <bm-marker :position="{lng: selectedlng, lat: selectedlat}">
                  </bm-marker>
                </div>
              </baidu-map>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>

import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash.pick'
import BDictSelectTag from '@/components/dict/BDictSelectTag'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmView from 'vue-baidu-map/components/map/MapView.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmLabel from 'vue-baidu-map/components/overlays/Label'
import BmScale from 'vue-baidu-map/components/controls/Scale'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
import BmPointCollection from 'vue-baidu-map/components/overlays/PointCollection'
import BmControl from 'vue-baidu-map/components/controls/Control'
import BmAutoComplete from 'vue-baidu-map/components/others/AutoComplete'

export default {
    name: 'HeatingProjectModal',
    components: {
        BDictSelectTag,
        BaiduMap,
        BmView,
        BmLocalSearch,
        BmScale,
        BmNavigation,
        BmMarker,
        BmInfoWindow,
        BmPointCollection,
        BmLabel,
        BmAutoComplete,
        BmControl
    },
    data () {
        return {
            form: this.$form.createForm(this),
            title: '操作',
            width: 1200,
            visible: false,
            model: {},
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
            labelCol2: { span: 6 },
            wrapperCol2: { span: 12 },
            confirmLoading: false,
            validatorRules: {
                code: { rules: [ { required: true, message: '请输入项目编码!' } ] },
                name: { rules: [ { required: true, message: '请输入项目名称!' } ] },
                leader: { rules: [ { required: true, message: '请输入负责人!' } ] },
                dsprojectid: { },
                heatingarea: { rules: [] },
                longitude: { rules: [] },
                latitude: { rules: [] },
                active: { rules: [] },
                remark: { rules: [] }
            },
            visibleCheck: true,
            status: 1,
            url: {
                add: '/basicdata/heatingproject/add',
                edit: '/basicdata/heatingproject/edit',
                config: '/sys/config/query',
                heatingOrg: '/basicdata/heatingorg/childList'
            },
            // 地图相关属性
            center: { lng: 0, lat: 0 },
            zoom: 12,
            map: {
                width: '100%',
                height: '550px'
            },
            showMark: false,
            selectedlng: 0,
            selectedlat: 0,
            selectedcenter: 0,
            keyword: '',
            orglng: 0,
            orglat: 0,
            // division id
            divisionId: ''
        }
    },
    created () {
    },
    methods: {
        add (divisionId) {
            this.divisionId = divisionId
            this.showMark = false
            this.edit({})
        },
        edit (record) {
            this.form.resetFields()
            this.model = Object.assign({}, record)
            this.visible = true
            this.$nextTick(() => {
                this.form.setFieldsValue(pick(this.model, 'code', 'name', 'division', 'leader', 'heatingarea', 'longitude', 'latitude', 'active', 'remark', 'dsprojectid'))
            })
            if (this.model.id) {
                this.divisionId = record.itemid
                this.title = '编辑项目信息'
                this.visibleCheck = (record.active === 1)
            } else {
                this.title = '新建项目信息'
                this.visibleCheck = true
            }
            setTimeout(() => {
                let lng = this.form.getFieldValue('longitude')
                let lat = this.form.getFieldValue('latitude')
                if (lng != null && lat != null) {
                    this.selectedlng = lng
                    this.selectedlat = lat
                    this.center.lng = lng
                    this.center.lat = lat
                    this.showMark = true
                    this.orglng = lng
                    this.orglat = lat
                }
            }, 100)
        },
        close () {
            this.$emit('close')
            this.visible = false
        },
        handleOk () {
            const that = this
            // 触发表单验证
            this.form.validateFields((err, values) => {
                if (!err) {
                    that.confirmLoading = true
                    let httpurl = ''
                    let method = ''
                    if (!this.model.id) {
                        httpurl += this.url.add
                        method = 'post'
                    } else {
                        httpurl += this.url.edit
                        method = 'put'
                    }
                    let formData = Object.assign(this.model, values)
                    formData.active = this.status
                    formData.division = this.divisionId
                    httpAction(httpurl, formData, method).then((res) => {
                        if (res.success) {
                            that.$message.success(res.result.message)
                            that.submitSuccess(formData, res.result.heatingOrgId)
                        } else {
                            that.$message.warning(res.message)
                        }
                    }).finally(() => {
                        that.confirmLoading = false
                        that.close()
                    })
                }
            })
        },
        submitSuccess (formData, heatingOrgId) {
            // 此处的formData是HeatingProject的信息，需要根据这个信息获取到HeatingOrg的信息，同时将父节点展开
            getAction(this.url.heatingOrg, { id: heatingOrgId }).then((res) => {
                if (res.success) {
                    let returnInfo = Object.assign({}, res.result.records[0])
                    if (!formData.id) {
                        // 如果是新建
                        returnInfo.id = null
                        this.$emit('ok', returnInfo, res.result.records[0].pid)
                    } else {
                        this.$emit('ok', returnInfo, true)
                    }
                }
            })
        },
        onChose (checked) {
            if (checked) {
                this.status = 1
                this.visibleCheck = true
            } else {
                this.status = 0
                this.visibleCheck = false
            }
        },
        handleCancel () {
            this.close()
        },
        popupCallback (row) {
            this.form.setFieldsValue(pick(row, 'code', 'name', 'division', 'leader', 'heatingarea', 'longitude', 'latitude', 'active', 'remark', 'dsprojectid'))
        },

        initMap ({ BMap, map }) {
            getAction(this.url.config, { name: 'mapcenterlng' }).then((res) => {
                if (res.success) {
                    this.center.lng = res.result[0].value
                } else {
                    this.center.lng = 117.054211
                }
            })
            getAction(this.url.config, { name: 'mapcenterlat' }).then((res) => {
                if (res.success) {
                    this.center.lat = res.result[0].value
                } else {
                    this.center.lat = 39.123662
                }
            })
            getAction(this.url.config, { name: 'mapzoom' }).then((res) => {
                if (res.success) {
                    this.center.zoom = res.result[0].value
                } else {
                    this.center.zoom = 12
                }
            })
        },
        clickMap (e) {
            this.selectedlng = e.point.lng
            this.selectedlat = e.point.lat
            this.showMark = true
            this.form.setFieldsValue({ longitude: this.selectedlng, latitude: this.selectedlat })
        },
        restorePos () {
            this.selectedlng = this.orglng
            this.selectedlat = this.orglat
            this.center.lng = this.orglng
            this.center.lat = this.orglat
            this.form.setFieldsValue({ longitude: this.selectedlng, latitude: this.selectedlat })
        }

    }
}
</script>
<style scoped>
  .serachinput{
    width: 300px;
    box-sizing: border-box;
    padding: 9px;
    border: 1px solid #dddee1;
    line-height: 20px;
    font-size: 16px;
    height: 38px;
    color: #333;
    position: relative;
    border-radius: 4px;
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
  }
</style>
