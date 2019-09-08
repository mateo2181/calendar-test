<template>
  <div :class="{'bg-gray-200': !day.isCurrentMonth}">
    <span class="pl-1 pt-2">{{ day.day }}</span>
    <div v-if="day.reminders.length > 0" class="w-full p-1">
      <div
        @click="$emit('selectReminder',r)"
        class="mb-1 rounded px-1 border border-gray-800 cursor-pointer"
        :style="{backgroundColor: r.color}"
        v-for="(r,k) in orderReminders(day.reminders).slice(0,2)"
        :key="k"
      >
        <div>
          <span class="text-xs text-gray-700">{{ r.time }}</span>
          <!-- <span class="pl-2 text-xs"> City: {{ r.city }}</span> -->
          <span class="pl-2 text-xs">{{ r.text }}</span>
        </div>
      </div>
    </div>
    <div v-if="day.reminders.length > 0" class="w-full px-1">
      <button
        @click.prevent="selectDay"
        class="text-center text-xs hover:underline"
      >See All Reminders</button>
    </div>

  </div>
</template>

<script>
import { orderReminders } from "../utils/functions";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    day: {
      required: true
    }
  },
  methods: {
      ...mapActions(["set_detail_day"]),
    orderReminders(reminders) {
      return orderReminders(reminders);
    },
    selectDay() {
        this.set_detail_day(this.day);
        this.$router.push({ path: '/daydetail' })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>