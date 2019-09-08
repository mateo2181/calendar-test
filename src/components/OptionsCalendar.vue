<template>
  <div>
    <div class="w-auto flex">
      <div class="pr-2 w-auto">
        <select class="h-8 px-4" name @change="setMonth" :value="month">
          <option v-for="(m,i) in monthsName" :key="i" :value="i">{{ m }}</option>
        </select>
      </div>
      <div class="w-auto">
        <select class="h-8 px-4" @change="setYear" :value="year">
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["currentMonth", "currentYear", "monthsName", "years"]),
    year() {
      return this.currentYear;
    },
    month() {
      return this.currentMonth;
    }
  },
  methods: {
    ...mapActions(["set_month", "set_year"]),
    setMonth(e) {
      this.set_month(+e.target.value);
    },
    setYear(e) {
      this.set_year(+e.target.value);
    }
  }
};
</script>

<style>
</style>