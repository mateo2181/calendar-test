<template>
  <div class="relative">
    <button v-if="!showForm" @click="showForm = true" class="btn btn-show-form cursor-pointer bg-blue-500 text-white">
        <font-awesome-icon class="text-white" title="Delete all reminders" icon="plus"></font-awesome-icon>
        Add Reminder
      </button>
    <button v-else @click="showForm = false" class="w-32 btn cursor-pointer bg-blue-500 text-white">X</button>
    <div v-if="showForm" class="bg-gray-300 p-2 shadow absolute right-0">
      <form @submit.prevent="addReminder">
        <div class="w-full">
          <div class="w-full flex mb-2">
              <input placeholder="Day" name="day" :class="{'border border-red-500': $v.form.day.$error }" class="w-12 mr-1 px-1 rounded" max="31" min="1" type="number" v-model="form.day" />
              <select class="w-32 h-8 mr-1" name="month" :class="{'border border-red-500': $v.form.month.$error}" v-model="form.month">
                  <option v-for="(m,i) in monthsName" :key="i" :value="i">{{ m }}</option>
              </select>
              <select class="w-20 h-8 mr-1" name="year" :class="{'border border-red-500': $v.form.year.$error}" v-model="form.year">
                  <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
              <input placeholder="Time" name="time" :class="{'border border-red-500': $v.form.time.$error}" class="w-16 px-2 rounded" type="text" v-model="form.time" />
          </div>
          <input placeholder="City" :class="{'border border-red-500': $v.form.city.$error}" name="city" class="mb-2 w-full rounded" v-model="form.city" />
          <!-- <input placeholder="Color" class="mb-2 px-1 rounded" v-model="form.color" /> -->
          <Color-picker class="mb-2" v-model="form.color" />
          <input placeholder="Write here..." :class="{'border border-red-500': $v.form.text.$error}" name="text" maxlength="30" class="mb-2 w-full rounded" v-model="form.text" />
          <div class="flex justify-end">
              <button type="submit" class="btn-create-reminder px-2 py-1 bg-green-500 text-white">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ColorPicker from '../utils/ColorPicker';
import { required, minLength, between, maxLength } from 'vuelidate/lib/validators'

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
  mounted() {
      this.form.year = this.currentYear;
      this.form.month = this.currentMonth;
  },
  validations: {
    form: {
      day: {
        required,
        between: between(1, 31)
      },
      time: {
        required
      },
      city: {
        required
      },
      year: {
        required,
        between: between(1950, new Date().getFullYear())
      },
      month: {
        required
      },
      text: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(30)
      }
    }
  },
  computed: {
      ...mapState(['monthsName', 'years','currentMonth','currentYear'])
  },
  methods: {
    ...mapActions(["add_reminder"]),
    addReminder() {
        // if(this.validateFields()) {
        this.$v.form.$touch()
        if (!this.$v.$invalid) {
            this.form.color = this.form.color ? this.form.color.hex : '';
            this.form.time = this.form.time.includes(':') ? this.form.time : `${this.form.time}:00`; 
            const reminder = Object.assign({},this.form);
            this.add_reminder(reminder);
            this.form.time = this.form.city = this.form.color = null;
            this.form.day = 1;
            this.form.text = "";
            this.showForm = false;
            this.$v.form.$reset();
        }
    }
  }
};
</script>

<style>
</style>