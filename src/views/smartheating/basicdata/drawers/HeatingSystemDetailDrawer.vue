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
                    <a-descriptions-item label="所属热源">{{ model.heatingsource_dictText }}</a-descriptions-item>
                    <a-descriptions-item label="所属换热站">{{ model.heatingstation_dictText }}</a-descriptions-item>
                    <a-descriptions-item label="是否启用" span="2">{{ model.active_dictText }}</a-descriptions-item>
                    <a-descriptions-item label="备注" span="2">{{ model.remark }}</a-descriptions-item>
                </a-descriptions>
            </a-col>
        </a-row>
    </a-drawer>
</template>

<script>

    export default {
        name: 'HeatingSystemDetailDrawer',
        components: {
        },
        data () {
            return {
                title: '供热系统信息详情',
                drawerWidth: 800,
                visible: false,
                model: {},
                descriptionsize: 'default',
                url: {
                },
            }
        },
        created () {
        },
        methods: {
            show (record) {
                this.model = Object.assign({}, record)
                this.visible = true
            },
            close () {
                this.$emit('close')
                this.visible = false
            },
            handleCancel () {
                this.close()
            },
        }
    }
</script>
<style scoped>

</style>
