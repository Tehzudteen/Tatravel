<template>
  <DefaultLayout>
    <router-view></router-view>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from './layouts/default.vue'

export default {
  name: 'App',
  components: {
    DefaultLayout
  }
}
</script>
