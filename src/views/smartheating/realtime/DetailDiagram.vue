<template>
    <a-modal
            :title="title"
            :width="1900"
            :height="900"
            :visible="visible"
            :maskClosable="false"
            :confirmLoading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            cancelText="关闭">
        <div style="overflow: auto">
            <img :src="getImgView(filename)" :class="detailDiagram" @click="handleOpenDetail(item)" />
        </div>
    </a-modal>
</template>

<script>
    import { getAction, getFileAccessHttpUrl } from '@/api/manage'

    export default {
        name: "DetailDiagram.vue",
        data () {
            return {
                title: '详情',
                confirmLoading: false,
                visible: false,
                filename: 'detail.png'
            }
        },
        methods: {
            show () {
                this.visible = true
            },
            handleOk() {
                this.visible = false
            },
            handleCancel() {
                this.visible = false
            },
            getImgView (text) {
                if (text && text.indexOf(',') > 0) {
                    text = text.substring(0, text.indexOf(','))
                }
                return getFileAccessHttpUrl(text)
            }

        }
    }
</script>

<style scoped>
    .detailDiagram{
        width: 100%;
        height: 700px;
    }

</style>
