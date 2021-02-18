import { getAction, postAction, getFileAccessHttpUrl } from '@/api/manage'
import moment from 'moment'

export const RealTimeMixin = {
    data () {
        return {
            type: '',
            timeFormat: 'YYYY-MM-DD HH:mm:ss',
            /** 标题 */
            title: '',
            /** 是否可见 */
            visible: false,
            /** 背景图片 */
            panelImgSource: 'heatingsystem.png',
            /** 供热系统Id */
            heatingSystemId: '',
            /** 供热系统名称 */
            heatingSystemName: '',
            /** 供热系统全称 */
            heatingFullName: '',
            /** 供热系统代码 */
            heatingSystemCode: '',
            /** 左侧刷新时间 */
            leftTime: '',
            /** 右侧刷新时间 */
            rightTime: '',
            /** 控制参数 */
            controlParameter: '',
            /** 用户部门 */
            userDivision: '',
            /** 供热系统所属供热项目 */
            heatingProject: '',
            /** 用户是否有权限 */
            hasRight: false
        }
    },
    methods: {
        getImgView (text) {
            if (text && text.indexOf(',') > 0) {
                text = text.substring(0, text.indexOf(','))
            }
            let url = getFileAccessHttpUrl(text)
            return url
        },
        show (heatingSystemId) {
            this.heatingSystemId = heatingSystemId
            this.visible = true
            this.rightTime = moment(new Date()).format(this.timeFormat)
            this.leftTime = moment(new Date()).format(this.timeFormat)
            this.getUserDivision()

            this.loadHeatingSystemConfig()
            // 刷新监测数据
            this.refreshMonitoringValues()
            // 刷新状态数据
            this.refreshStatusValues()
            // 刷新设定数据
            this.refreshSettingValues()
            // 刷新控制数据
            this.refreshControlValues()

            this.timerMonitoring = setInterval(() => {
                this.rightTime = moment(new Date()).format(this.timeFormat)
                // 刷新监测数据
                this.refreshMonitoringValues()
                // 刷新状态数据
                this.refreshStatusValues()
            }, 10 * 1000)
            this.timerStatus = setInterval(() => {
                this.leftTime = moment(new Date()).format(this.timeFormat)
                // 刷新设定数据
                this.refreshSettingValues()
                // 刷新控制数据
                this.refreshControlValues()
            }, 30 * 1000)
        },
        /** 获取用户部门 */
        getUserDivision () {
            getAction('/sys/user/getUserDivision', null).then((res) => {
                if (res.success) {
                    if (res.message !== '0') {
                        /** 获取供热系统所属供热项目 */
                        getAction('/basicdata/heatingsystem/getHeatingProject', { heatingSystemId: this.heatingSystemId }).then((res) => {
                            if (res.success) {
                                this.heatingProject = res.result
                                /** 非总部人员 */
                                getAction('/sys/user/getUserProjects', null).then((res) => {
                                    if (res.success) {
                                        this.hasRight = false
                                        for (let i = 0; i < res.result.length; i++) {
                                            if (res.result[i].toString() === this.heatingProject) {
                                                this.hasRight = true
                                            }
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            })
        },
        /** 获取供热系统的配置 */
        loadHeatingSystemConfig () {
            getAction(this.url.heatingSystem, { id: this.heatingSystemId }).then((res) => {
                if (res.success) {
                    this.panelImgSource = res.result[0].realtimeimg + '.png'
                    this.heatingSystemCode = res.result[0].code
                    this.controlParameter = res.result[0].controlparameter
                }
            })
            getAction(this.url.heatingSystemName, { heatingSystemId: this.heatingSystemId }).then((res) => {
                if (res.success) {
                    this.title = res.result
                }
            })
        },
        /** 刷新控制数据 */
        refreshControlValues () {
            getAction(this.url.controlValues, { heatingsystem: this.heatingSystemId }).then((res) => {
                if (res.success) {
                    for (let key in this.controlValue) {
                        this.controlValue[key] = ''
                    }
                    for (let i = 0; i < res.result.length; i++) {
                        let parameter = res.result[i].parameter
                        let value = res.result[i].value === null ? '' : res.result[i].value.toString()
                        this.controlValue[parameter] = value
                    }
                    // this.controlValue.EQCBW007 = '1'
                }
            })
        },
        /** 刷新设定数据 */
        refreshSettingValues () {
            getAction(this.url.settingValues, { heatingsystem: this.heatingSystemId }).then((res) => {
                if (res.success) {
                    for (let key in this.settingValue) {
                        this.settingValue[key] = ''
                    }
                    for (let i = 0; i < res.result.length; i++) {
                        this.settingValue[res.result[i].parameter] = res.result[i].value
                    }
                }
            })
        },
        /** 刷新监测值 */
        refreshMonitoringValues () {
            if (!this.url.monitoringValues) {
                console.log('请设置监测值的取值URL')
            } else {
                let param = {
                    heatingSystemId: this.heatingSystemId
                }
                for (let key in this.monitoringValue) {
                    this.monitoringValue[key] = ''
                }
                getAction(this.url.monitoringValues, param).then((res) => {
                    if (res.success) {
                        for (let i = 0; i < res.result.length; i++) {
                            if (res.result[i].name !== 'heatingsystem' && res.result[i].value !== null) {
                                this.monitoringValue[res.result[i].name] = this.getMontoringValue(res.result[i].name, res.result[i].value)
                            }
                        }
                    }
                })
            }
        },
        /** 根据名称对监测值进行四舍五入，并判断是否为空 */
        getMontoringValue (name, value) {
            if (value === null || value === undefined) {
                return null
            } else {
                let retValue = '0.00'
                let parameterType = name.substr(0, 2)
                switch (parameterType) {
                case 'TE': retValue = value.toFixed(1); break
                case 'TD': retValue = value.toFixed(1); break
                case 'PR': retValue = value.toFixed(2); break
                case 'PD': retValue = value.toFixed(2); break
                case 'FW': retValue = value.toFixed(0); break
                case 'HT': retValue = value.toFixed(0); break
                case 'FQ': retValue = value.toFixed(1); break
                case 'WL': retValue = value.toFixed(1); break
                case 'CR': retValue = value.toFixed(1); break
                case 'VO': retValue = value.toFixed(1); break
                case 'PO': retValue = value.toFixed(1); break
                case 'ED': retValue = value.toFixed(0); break
                case 'WQ': retValue = value.toFixed(0); break
                case 'FD': retValue = value.toFixed(0); break
                case 'VE': retValue = value.toFixed(0); break
                case 'SP': retValue = value.toFixed(1); break
                case 'CL': retValue = value.toFixed(0); break
                case 'CA': retValue = value.toFixed(0); break
                case 'GQ': retValue = value.toFixed(0); break
                }
                return retValue
            }
        },
        /** 刷新状态值 */
        refreshStatusValues () {
            if (!this.url.statusValues) {
                console.log('请设置状态值的取值URL')
            } else {
                getAction(this.url.statusValues, { heatingSystemId: this.heatingSystemId }).then((res) => {
                    if (res.success) {
                        /** 清空StatusData */
                        for (let key in this.statusValue) {
                            this.statusValue[key] = ''
                        }
                        /** 设置StatusData的值 */
                        for (let i = 0; i < res.result.length; i++) {
                            this.statusValue[res.result[i].statusparam] = res.result[i].statusvalue
                        }
                        /** 刷新状态报警关联的参数 */
                        getAction(this.url.statusAlarmValues, { heatingSystemId: this.heatingSystemId }).then((res) => {
                            if (res.success) {
                                for (let i = 0; i < res.result.length; i++) {
                                    if (res.result[i].alarmvalue === 1) {
                                        this.statusValue[res.result[i].statusparam] = 99
                                    } else {
                                        this.statusValue[res.result[i].statusparam] = res.result[i].statusvalue
                                    }
                                }
                                //if (this.type === 'StationPump') {
                                //    this.setupStatusButtons()
                                //}
                                //if (this.type === 'StationValve') {
                                //    this.setupStatusButtons()
                                //}
                            }
                        })
                    }
                })
            }
            if (this.controlParameter !== '') {
                this.displayControlButtons()
            }
        },
        /** 点击参数下发的响应函数 */
        handleControl () {
            this.$confirm({
                title: '确认下发控制和设定值',
                content: '是否确定下发控制和设定值？',
                onOk: () => {
                    this.saveSettingValues()
                    this.saveControlValues()
                }
            })
        },
        /** 保存设定值 */
        saveSettingValues () {
            let param = {
                settingValues: JSON.stringify(this.settingValue),
                heatingSystemId: this.heatingSystemId
            }
            postAction(this.url.saveSettingValues, param).then((res) => {
                if (res.success) {
                    this.$message.success(res.message)
                }
            })
        },
        /** 保存控制值 */
        saveControlValues () {
            let param = {
                controlValues: JSON.stringify(this.controlValue),
                heatingSystemId: this.heatingSystemId
            }
            postAction(this.url.saveControlValues, param).then((res) => {
                if (res.success) {
                    this.$message.success(res.message)
                }
            })
        },
        /** 点击关闭按钮 */
        handleOk () {
            this.handleClose()
        },
        handleCancel () {
            this.handleClose()
        },
        handleClose () {
            if (this.timerMonitoring !== null) { clearInterval(this.timerMonitoring) }
            if (this.timerStatus !== null) { clearInterval(this.timerStatus) }
            this.timer = null
            this.visible = false
        },
        setupStatusButtons () {
        },
        displayControlButtons () {
        }
    }
}
