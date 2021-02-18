# BDictSelectTag 组件用法
----
- 从字典表获取数据,dictCode格式说明: 字典code
```html
<b-dict-select_tag  v-model="queryParam.sex" placeholder="请输入用户性别"
                  dictCode="sex"/>
```

v-decorator用法：
```html
<b-dict-select_tag  v-decorator="['sex', {}]" :triggerChange="true" placeholder="请输入用户性别"
                  dictCode="sex"/>
```

- 从数据库表获取字典数据，dictCode格式说明: 表名,文本字段,取值字段
```html
<b-dict-select_tag v-model="queryParam.username" placeholder="请选择用户名称" 
                   dictCode="sys_user,realname,id"/>
```



# BDictSelectUtil.js 列表字典函数用法
----

- 第一步: 引入依赖方法
```html
       import {initDictOptions, filterDictText} from '@/components/dict/BDictSelectUtil'
```

- 第二步: 在created()初始化方法执行字典配置方法
```html
      //初始化字典配置
      this.initDictConfig();
```
      
- 第三步: 实现initDictConfig方法，加载列表所需要的字典(列表上有多个字典项，就执行多次initDictOptions方法)
      
```html
      initDictConfig() {
        //初始化字典 - 性别
        initDictOptions('sex').then((res) => {
          if (res.success) {
            this.sexDictOptions = res.result;
          }
        });
      },
```
      
- 第四步: 实现字段的customRender方法
```html
     customRender: (text, record, index) => {
       //字典值替换通用方法
       return filterDictText(this.sexDictOptions, text);
     }
```


# BMultiSelectTag 多选组件
下拉/checkbox

## 参数配置
| 参数           | 类型   | 必填 |说明|
|--------------|---------|----|---------|
| placeholder      |string   | | placeholder |
| disabled      |Boolean   | | 是否禁用 |
| type      |string   | | 多选类型 select/checkbox 默认是select |
| dictCode      |string   | | 数据字典编码或者表名,显示字段名,存储字段名拼接而成的字符串,如果提供了options参数 则此参数可不填|
| options      |Array   | | 多选项,如果dictCode参数未提供,可以设置此参数加载多选项 |

使用示例
----
```vue
<template>
  <a-form>
    <a-form-item label="下拉多选" style="width: 300px">
      <b-multi-select-tag
        v-model="selectValue"
        :options="dictOptions"
        placeholder="请做出你的选择">
      </b-multi-select-tag>
      {{ selectValue }}
    </a-form-item>

    <a-form-item label="checkbox">
      <b-multi-select-tag
        v-model="checkboxValue"
        :options="dictOptions"
        type="checkbox">
      </b-multi-select-tag>
      {{ checkboxValue }}
    </a-form-item>
  </a-form >
</template>

<script>
  import BMultiSelectTag from '@/components/dict/BMultiSelectTag'
  export default {
    components: {BMultiSelectTag},
    data() {
      return {
        selectValue:"",
        checkboxValue:"",
        dictOptions:[{
          label:"选项一",
          value:"1"
        },{
          label:"选项二",
          value:"2"
        },{
          label:"选项三",
          value:"3"
        }]
      }
    }
  }
</script>
```

# BSearchSelectTag 字典表的搜索组件
下拉搜索组件,支持异步加载,异步加载用于大数据量的字典表

## 参数配置
| 参数           | 类型   | 必填 |说明|
|--------------|---------|----|---------|
| placeholder      |string   | | placeholder |
| disabled      |Boolean   | | 是否禁用 |
| dict      |string   | | 表名,显示字段名,存储字段名拼接而成的字符串,如果提供了dictOptions参数 则此参数可不填|
| dictOptions      |Array   | | 多选项,如果dict参数未提供,可以设置此参数加载多选项 |
| async      |Boolean   | | 是否支持异步加载,设置成true,则通过输入的内容加载远程数据,否则在本地过滤数据,默认false|

使用示例
----
```vue
<template>
  <a-form>
    <a-form-item label="下拉搜索" style="width: 300px">
      <b-search-select-tag
        placeholder="请做出你的选择"
        v-model="selectValue"
        :dictOptions="dictOptions">
      </b-search-select-tag>
      {{ selectValue }}
    </a-form-item>

    <a-form-item label="异步加载" style="width: 300px">
      <b-search-select-tag
        placeholder="请做出你的选择"
        v-model="asyncSelectValue"
        dict="sys_depart,depart_name,id"
        :async="true">
      </b-search-select-tag>
      {{ asyncSelectValue }}
    </a-form-item>
  </a-form >
</template>

<script>
  import BSearchSelectTag from '@/components/dict/BSearchSelectTag'
  export default {
    components: {BSearchSelectTag},
    data() {
      return {
        selectValue:"",
        asyncSelectValue:"",
        dictOptions:[{
          text:"选项一",
          value:"1"
        },{
          text:"选项二",
          value:"2"
        },{
          text:"选项三",
          value:"3"
        }]
      }
    }
  }
</script>
```

