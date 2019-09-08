<template>
  <div id="app">
      <div class="h-10 fixed top-0 bg-blue-600 font-semibold text-white p-2 w-full text-center">
        <h5> APP CALENDAR </h5>
      </div>
      <div class="mt-16">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>

export default {
  name: 'app' 
}
</script>

<style lang="scss">

</style>
