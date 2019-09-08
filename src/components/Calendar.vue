<template>
  <div class="w-full">
    <div class="flex w-full">
      <div
        class="text-white font-semibold p-1 bg-blue-600 text-center flex-grow"
        v-for="name in daysName"
        :key="name"
      >{{ name }}</div>
    </div>

    <div v-for="(g,k) in daysGrouped" :key="k" class="w-full flex">
      <Day
        @selectReminder="selectRemindertoEdit"
        @selected="showDay"  
        v-for="(d,i) in g"
        :key="i"
        :class="{'bg-blue-100': (i == 0 || i+1 == g.length) && d.isCurrentMonth}"
        class="border border-gray-600 flex-1 h-32"
        :day="d"
      />
    </div>

    <!-- Edit Reminder -->
    <EditReminder v-if="reminderEditing" @close="reminderEditing = null" @reloadSelected="reloadDaySelected" :reminder="reminderEditing" />

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Day from "./Day";
import Modal from "../utils/Modal.vue";
import EditReminder from "../components/EditReminder";

export default {
  data() {
    return {
        daySelected: null,
        reminderEditing: null
      //   days: [],
    };
  },
  components: {
    Day,
    Modal,
    EditReminder
  },
  created() {
    // this.generateMonth();
  },
  computed: {
    ...mapState(["currentMonth", "currentYear", "daysName","reminders"]),
    daysGrouped() {
      return _.chunk(this.days, 7);
    },
    daysInMonth() {
      return 32 - new Date(this.currentYear, this.currentMonth, 32).getDate();
    },
    lastDayPreviousMonth() {
      var lastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
      return lastDay;
    },
    days() {
      //   var date = new Date();
      let days = [];
      let firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      //   this.days.push(firstDay);
      //   console.log(firstDay);
      let currentDay = 1;
      for (let i = 0; i < 5; i++) {
        for (let d = 0; d < 7; d++) {
          if (i == 0 && d < firstDay) {
            // Month Before  
            const day = this.lastDayPreviousMonth - (firstDay - d) + 1;
            const dayDate = { year: this.currentYear, month: this.currentMonth-1, day: day };
            const remindersDay = this.getRemindersDay(dayDate);
            days.push({ year: dayDate.year, month: dayDate.month,day: dayDate.day,isCurrentMonth: false, reminders: remindersDay });
          } else if (currentDay > this.daysInMonth) {
            // Month After
            const dayDate = { year: this.currentYear, month: this.currentMonth+1, day: currentDay - this.daysInMonth };
            const remindersDay = this.getRemindersDay(dayDate);  
            days.push({ year: dayDate.year, month: dayDate.month,day: dayDate.day,isCurrentMonth: false, reminders: remindersDay });
            currentDay++;
          } else {
              // Current Month
            const dayDate = { year: this.currentYear, month: this.currentMonth, day: currentDay };
            const remindersDay = this.getRemindersDay(dayDate);
            days.push({ year: this.currentYear, month: this.currentMonth, day: currentDay,isCurrentMonth: true, reminders: remindersDay });
            currentDay++;
          }
        }
      }

      return days;
    }
  },
  methods: {
    selectRemindertoEdit(reminder) {
        this.reminderEditing = Object.assign({},reminder);
    },
    getRemindersDay(date) {
        return this.reminders.filter(r => {
              const rDate = new Date(r.year,r.month,r.day);
              const dayDate = new Date(date.year,date.month,date.day);
              return rDate.getTime() == dayDate.getTime();
          });  
    },
    showDay(day) {
        this.daySelected = day;
    },
    reloadDaySelected() {
        if(this.daySelected) {
            this.daySelected = this.days.find(d => d.id === this.daySelected.id);
        }
    }
  }
};
</script>
<style>
</style>
