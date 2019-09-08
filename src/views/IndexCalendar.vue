<template>
  <div class="my-2 max-w-5xl mt-4 mx-auto">
    <div class="pb-4 w-full flex justify-between items-center">
      <Options-calendar />
      <Add-reminder/>
    </div>
    <div class="w-full">
      <Calendar />
    </div>
  </div>
</template>

<script>
import Calendar from "../components/Calendar.vue";
import OptionsCalendar from "../components/OptionsCalendar.vue";
import AddReminder from "../components/AddReminder.vue";
export default {
  components: {
    Calendar,
    OptionsCalendar,
    AddReminder
  }
};
</script>

<style>
</style>