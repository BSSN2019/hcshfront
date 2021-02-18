<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="close"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-row :gutter="24">
      <a-col :span="24">
        <a-descriptions :size="descriptionsize" bordered :column="1">
          <a-descriptions-item label="编码">{{ model.code }}</a-descriptions-item>
          <a-descriptions-item label="名称">{{ model.name }}</a-descriptions-item>
          <a-descriptions-item label="负责人">{{ model.leader_dictText }}</a-descriptions-item>
          <a-descriptions-item label="是否启用" >{{ model.active_dictText }}</a-descriptions-item>
          <a-descriptions-item label="备注" >{{ model.remark }}</a-descriptions-item>
        </a-descriptions>
      </a-col>
    </a-row>
  </a-drawer>
</template>

<script>

export default {
    name: 'DivisionDetailDrawer',
    components: {
    },
    data () {
        return {
            form: this.$form.createForm(this),
            title: '操作',
            drawerWidth: 800,
            descriptionsize: 'default',
            visible: false,
            model: {}
        }
    },
    created () {
    },
    methods: {
        show (record) {
            this.model = Object.assign({}, record)
            console.log(this.model)
            this.title = '事业部详细信息'
            this.visible = true
        },
        close () {
            this.$emit('close')
            this.visible = false
        },
        handleCancel () {
            this.close()
        }
    }
}
</script>
<style scoped>
</style>
