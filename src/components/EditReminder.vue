<template>
  <div>
    <modal @close="$emit('close',true)">
      <div slot="body">
        <div class="mb-2 border-b pb-1">Edit Reminder</div>
        <div class="w-full">
          <div class="w-full flex mb-2">
            <input placeholder="Day" class="w-12 mr-1 rounded" :class="{'border border-red-500': errors.includes('day')}" max="31" min="1" type="number" v-model="form.day"/>

            <select class="h-8 w-32 mr-1" :class="{'border border-red-500': errors.includes('month')}" v-model="form.month">
              <option v-for="(m,i) in monthsName" :key="i" :value="i">{{ m }}</option>
            </select>
            <select class="h-8 w-20 mr-1" :class="{'border border-red-500': errors.includes('year')}" v-model="form.year">
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
            <input placeholder="Time" class="w-16 rounded" :class="{'border border-red-500': errors.includes('time')}" type="text" v-model="form.time" />
          </div>
          <input placeholder="City" :class="{'border border-red-500': errors.includes('city')}" class="mb-2 rounded w-full" v-model="form.city" />
          <!-- <input placeholder="Color" class="mb-2 px-1 rounded" v-model="form.color" /> -->
          <Color-picker class="mb-2" v-model="form.color" />
          <input placeholder="Write here..." maxlength="30" class="mb-2 w-full rounded" :class="{'border border-red-500': errors.includes('text')}" v-model="form.text"/>
          <div class="flex justify-end">
            <button @click="$emit('close',true)" class="px-2 py-1 text-black">Cancel</button>
            <button @click="updateReminder" class="px-2 py-1 bg-green-500 text-white">Update</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from "../utils/Modal.vue";
import ColorPicker from "../utils/ColorPicker";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      form: null,
      errors: [],
      fieldToValidate: ["day", "time", "city", "year", "month", "text"]
    };
  },
  created() {
    this.form = this.reminder;
  },
  computed: {
    ...mapState(["monthsName", "years"])
  },
  components: {
    ColorPicker,
    Modal
  },
  props: {
    reminder: {
      requried: true,
      type: Object
    }
  },
  methods: {
    ...mapActions(["edit_reminder"]),
    updateReminder() {
      if (this.validateFields()) {
        this.form.color = this.form.color ? this.form.color.hex : "";
        this.edit_reminder(this.form);
        this.$emit("reloadSelected", true);
        this.$emit("close", true);
      }
    },
    validateFields() {
      this.errors.length = 0;
      Object.keys(this.form).forEach(field => {
        if (
          this.fieldToValidate.includes(field) &&
          (this.form[field] == "" || !this.form[field])
        ) {
          this.errors.push(field);
        }
      });
      return this.errors.length == 0;
    }
  }
};
</script>

<style>
</style>