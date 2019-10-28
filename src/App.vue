<template>
 <div id="app">
   <router-view></router-view>
 </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,body {
  height: 100%;
  width: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.el-breadcrumb {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }
</style>
