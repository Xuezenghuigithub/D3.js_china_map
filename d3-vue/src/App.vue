<template>
  <div id="app">
    <!-- <d3></d3> -->
    <!-- <force></force> -->
    <ChinaMap></ChinaMap>
  </div>
</template>

<script>
import D3 from './components/D3.vue'
import Force from './components/Force.vue'
import ChinaMap from './components/ChinaMap.vue'

export default {
  name: 'app',
  components: {
    D3,
    Force,
    ChinaMap
  }
}
</script>

<style>

</style>
