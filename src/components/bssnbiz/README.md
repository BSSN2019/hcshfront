# BSelectDepart 部门选择组件
选择部门组件,存储部门ID,显示部门名称

## 参数配置
| 参数           | 类型   | 必填 |说明|
|--------------|---------|----|---------|
| modalWidth      |Number   | | 弹框宽度 默认500 |
| multi      |Boolean   | | 是否多选 默认false |
| rootOpened      |Boolean   | | 是否展开根节点 默认true |
| disabled      |Boolean   | | 是否禁用 默认false|

使用示例
----
```vue
<template>
  <a-form :form="form">
    <a-form-item label="部门选择v-decorator" style="width: 300px">
      <b-select-depart v-decorator="['bumen']"/>
      {{ getFormFieldValue('bumen') }}
    </a-form-item>

    <a-form-item label="部门选择v-model" style="width: 300px">
      <b-select-depart v-model="bumen"/>
      {{ bumen }}
    </a-form-item>

    <a-form-item label="部门多选v-model" style="width: 300px">
      <b-select-depart v-model="bumens" :multi="true"/>
      {{ bumens }}
    </a-form-item>

  </a-form >
</template>

<script>
  import BSelectDepart from '@/components/bssnbiz/BSelectDepart'
  export default {
    components: {BSelectDepart},
    data() {
      return {
        form: this.$form.createForm(this),
        bumen:"",
        bumens:""
      }
    },
    methods:{
      getFormFieldValue(field){
        return this.form.getFieldValue(field)
      }
    }
  }
</script>
```
# BSelectMultiUser 用户多选组件

使用示例
----
```vue
<template>
  <a-form :form="form">
    <a-form-item label="用户选择v-decorator" style="width: 500px">
      <b-select-multi-user v-decorator="['users']"/>
      {{ getFormFieldValue('users') }}
    </a-form-item>

    <a-form-item label="用户选择v-model" style="width: 500px">
      <b-select-multi-user v-model="users" ></b-select-multi-user>
      {{ users }}
    </a-form-item>

  </a-form >
</template>

<script>
  import BSelectMultiUser from '@/components/bssnbiz/BSelectMultiUser'
  export default {
    components: {BSelectMultiUser},
    data() {
      return {
        form: this.$form.createForm(this),
        users:"",
      }
    },
    methods:{
      getFormFieldValue(field){
        return this.form.getFieldValue(field)
      }
    }
  }
</script>
```

# BSelectUserByDep 根据部门选择用户

## 参数配置
| 参数           | 类型   | 必填 |说明|
|--------------|---------|----|---------|
| modalWidth      |Number   | | 弹框宽度 默认1250 |
| disabled      |Boolean   | | 是否禁用 |

使用示例
----
```vue
<template>
  <a-form :form="form">
    <a-form-item label="用户选择v-decorator" style="width: 500px">
      <b-select-user-by-dep v-decorator="['users']"/>
      {{ getFormFieldValue('users') }}
    </a-form-item>

    <a-form-item label="用户选择v-model" style="width: 500px">
      <b-select-user-by-dep v-model="users" ></b-select-user-by-dep>
      {{ users }}
    </a-form-item>

  </a-form >
</template>

<script>
  import BSelectUserByDep from '@/components/bssnbiz/BSelectUserByDep'
  export default {
    components: {BSelectUserByDep},
    data() {
      return {
        form: this.$form.createForm(this),
        users:"",
      }
    },
    methods:{
      getFormFieldValue(field){
        return this.form.getFieldValue(field)
      }
    }
  }
</script>
```

