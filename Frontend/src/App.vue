<template>
  <DefaultLayout>
    <router-view></router-view>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "./layouts/default.vue";

export default {
  name: "App",
  components: {
    DefaultLayout,
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'IBM Plex Sans Thai', sans-serif;
}
</style>
