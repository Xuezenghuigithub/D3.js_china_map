# D3.js_china_map
Use D3.js to draw a simple Chinese map and add hotspots.
## 说明
### d3-vue
- 在Vue中使用D3.js，对应的组件名即为其功能

- 文件目录下`npm i`➡️`npm run serve`启动项目

- static目录中的`china.json`文件放在这里一是为证明`d3.json()`不可访问本地文件，二也是后台请求的数据，可将其导入MongoDB中以获取数据
### d3_server
- 只是为了实现`d3.json()`而搭建的简易后台，因此只作用于`China_map.vue`组件
- 文件目录下`npm i`➡️`npm run start`启动项目