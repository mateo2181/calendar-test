<template>
  <div class="relative">
    <button v-if="!showForm" @click="showForm = true" class="btn btn-show-form cursor-pointer bg-blue-500 text-white">
        <font-awesome-icon class="text-white" title="Delete all reminders" icon="plus"></font-awesome-icon>
        Add Reminder
      </button>
    <button v-else @click="showForm = false" class="w-32 btn cursor-pointer bg-blue-500 text-white">X</button>
    <div v-if="showForm" class="bg-gray-300 p-2 shadow absolute right-0">
      <div class="w-full">
        <div class="w-full flex mb-2">
          <input placeholder="Day" name="day" class="w-2/5 mr-2 px-1 rounded" max="31" min="1" type="number" v-model="form.day" />
          <input placeholder="Time" name="time" class="w-2/5 px-2 rounded" type="text" v-model="form.time" />
        </div>
        <input placeholder="City" name="city" class="mb-2 px-1 rounded" v-model="form.city" />
        <!-- <input placeholder="Color" class="mb-2 px-1 rounded" v-model="form.color" /> -->
        <Color-picker class="mb-2" v-model="form.color" />
        <input placeholder="Write here..." name="text" maxlength="30" class="mb-2 px-1 rounded" v-model="form.text" />
        <button @click="addReminder" class="btn-create-reminder px-2 py-1 bg-green-500 text-white">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ColorPicker from '../utils/ColorPicker';
export default {
  data() {
    return {
      showForm: false,
      form: {
        day: 1,
        time: null,
        city: null,
        color: null,
        year: null,
        month: null,
        text: ""
      }
    };
  },
  components: {
      ColorPicker
  },
  computed: {
      ...mapState(['currentMonth','currentYear'])
  },
  methods: {
    ...mapActions(["add_reminder"]),
    addReminder() {
        this.form.color = this.form.color ? this.form.color.hex : '';
        this.form.time = this.form.time.includes(':') ? this.form.time : `${this.form.time}:00`;  
        this.form.year = this.currentYear;
        this.form.month = this.currentMonth; 
        const reminder = Object.assign({},this.form);
        this.add_reminder(reminder);
        this.form.time = this.form.city = this.form.color = null;
        this.form.day = 1;
        this.form.text = "";
        this.showForm = false;
    }
  }
};
</script>

<style>
</style>