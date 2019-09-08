<template>
  <div class="w-full max-w-3xl mt-4 mx-auto border p-2 rounded">
    <div v-if="detailDay" class="w-full">
      <div class="flex mb-2 border-b pb-1 justify-between items-center">
        <div
          class="font-semibold text-lg"
        >Day: {{ detailDay.day }} / {{ detailDay.month }} / {{ detailDay.year }}</div>
        <div>
          <button class="btn bg-red-500 mr-2 text-white" title="Delete all reminders" @click="removeAllRemindersDay">
            <font-awesome-icon class="text-white" title="Delete all reminders" icon="trash"></font-awesome-icon>
            Delete All reminders 
          </button>
          <router-link class="btn bg-gray-600 text-white" tag="a" to="/">
            <font-awesome-icon class="text-white" title="Return to Calendar" icon="chevron-left"></font-awesome-icon>
            Return to Calendar
          </router-link>
        </div>
      </div>
      <div class="w-full">
        <div
          :style="{backgroundColor: r.color}"
          class="mb-1 px-1 py-1 border rounded"
          v-for="(r,j) in daySelected.reminders"
          :key="j"
        >
          <div class="flex items-center">
            <div class="w-1/3">
              <div class="flex">
                <div class="font-bold text-gray-700">{{ r.time }}</div>
              </div>
              <span>{{ r.text }}</span>
            </div>
              <div class="w-1/3">
                <div> 
                    <span> City: </span> 
                    <span class="text-gray-700">{{ r.city }} </span>
                </div>
                <div>
                  Weather:
                  <span class="text-gray-700" v-if="r.weather != ''">{{ r.weather }}</span>
                  <span class="text-gray-700" v-else>Can't get weather</span>
                </div>
              </div>
            <div class="pr-4 w-1/3 flex justify-end">
              <div>
              <font-awesome-icon
                @click="selectRemindertoEdit(r)"
                :class="{'text-white': r.color}"
                class="cursor-pointer"
                title="Edit"
                icon="edit"
              ></font-awesome-icon>
              <font-awesome-icon
                @click="selectRemindertoDelete(r)"
                :class="{'text-white': r.color}"
                class="ml-2 cursor-pointer"
                title="Delete"
                icon="trash"
              ></font-awesome-icon>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Reminder -->
    <EditReminder
      v-if="reminderEditing"
      @close="reminderEditing = null"
      :reminder="reminderEditing"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EditReminder from "../components/EditReminder";
import { orderReminders } from "../utils/functions";
export default {
  data() {
    return {
      //   daySelected: null,
      reminderEditing: null
    };
  },
  components: {
    EditReminder
  },
  created() {
    if (!this.detailDay) this.$router.push({ path: "/" });
  },
  computed: {
    ...mapState(["detailDay", "reminders"]),
    remindersDay() {
      return this.reminders.filter(r => {
        const rDate = new Date(r.year, r.month, r.day);
        const dayDate = new Date(
          this.detailDay.year,
          this.detailDay.month,
          this.detailDay.day
        );
        return rDate.getTime() == dayDate.getTime();
      });
    },
    daySelected() {
      // if(!this.detailDay) return null;
      let day = Object.assign(this.detailDay, { reminders: orderReminders(this.remindersDay) });
      return day;
    }
  },
  methods: {
    ...mapActions(['delete_reminder']),
    selectRemindertoEdit(reminder) {
      this.reminderEditing = Object.assign({}, reminder);
    },
    selectRemindertoDelete(reminder) {
        this.delete_reminder(reminder);
    },
    removeAllRemindersDay() {
      this.remindersDay.forEach(r => {
        this.delete_reminder(r);
      });
    }
  }
};
</script>

<style>
</style>