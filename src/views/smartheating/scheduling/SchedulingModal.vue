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
        <a-col :span="24">
          <a-form :form="form">
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="站房" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input readOnly v-decorator="[ 'stationname', validatorRules.stationname]"></a-input>
                </a-form-item>
                <a-form-item label="系统" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input readOnly v-decorator="[ 'heatingsystem', validatorRules.heatingsystem]"></a-input>
                </a-form-item>
                <a-form-item label="设定参数" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input readOnly v-decorator="[ 'settingparamname', validatorRules.controlparametername]"></a-input>
                </a-form-item>
                <a-form-item label="参数值" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input-number v-decorator="[ 'settingvalue', validatorRules.controlvalue]" style="width:100%" placeholder="请输入参数值"></a-input-number>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { postAction } from '@/api/manage'

export default {
    name: 'SchedulingModal',
    components: {

    },
    data () {
        return {
            form: this.$form.createForm(this),
            title: '操作',
            width: 800,
            visible: false,
            model: {},
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
            confirmLoading: false,
            heatingSystemId: '',
            validatorRules: {
                stationname: { rules: [] },
                heatingsystem: { rules: [] },
                controlparametername: { rules: [] },
                controlvalue: { rules: [{ required: true, message: '请输入参数值!' }] }
            },
            url: {
                /** 下发设定值 */
                saveSettingValues: '/dataValue/settingData/save'
            }
        }
    },
    methods: {
        edit (record) {
            console.log(record)
            this.form.resetFields()
            this.model = Object.assign({}, record)
            this.visible = true
            this.heatingSystemId = record.heatingSystemId
            this.$nextTick(() => {
                this.form.setFieldsValue(pick(this.model, 'stationname', 'heatingsystem', 'settingparamname', 'settingvalue', 'isAuto'))
            })
        },
        close () {
            this.$emit('close')
            this.visible = false
        },
        handleOk () {
            this.saveSettingValues()
        },
        handleCancel () {
            this.close()
        },
        /** 保存设定值 */
        saveSettingValues () {
            let settingparam = this.model.settingparam
            let settingvalue = this.form.getFieldValue('settingvalue')
            let param
            if (settingparam === 'VOTFW002') {
                param = {
                    settingValues: { VOTFW002: settingvalue },
                    heatingSystemId: this.heatingSystemId
                }
            } else {
                param = {
                    settingValues: { FQTFW004: settingvalue },
                    heatingSystemId: this.heatingSystemId
                }
            }
            postAction(this.url.saveSettingValues, param).then((res) => {
                if (res.success) {
                    this.$message.success(res.message)
                    this.close()
                }
            })
        }

    }
}
</script>

<style scoped>

</style>
