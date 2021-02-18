const sourceDetailComps = {}
let requireComponent = require.context(
    './', // 在当前目录下查找
    false, // 不遍历子文件夹
    /\.vue$/ // 正则匹配 以 .vue结尾的文件
)
requireComponent.keys().forEach(fileName => {
    let comp = requireComponent(fileName)
    sourceDetailComps[fileName.replace(/^\.\/(.*)\.\w+$/, '$1')] = comp.default
})
export default sourceDetailComps
