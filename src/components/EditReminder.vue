<template>
  <div>
    <modal @close="$emit('close',true)">
      <div slot="body">
        <div class="mb-2 border-b pb-1">Edit Reminder</div>
        <form @submit.prevent="updateReminder">
        <div class="w-full">
          <div class="w-full flex mb-2">
            <input placeholder="Day" class="w-12 mr-1 rounded" :class="{'border border-red-500': $v.form.day.$error}" max="31" min="1" type="number" v-model="form.day"/>

            <select class="h-8 w-32 mr-1" :class="{'border border-red-500': $v.form.month.$error}" v-model="form.month">
              <option v-for="(m,i) in monthsName" :key="i" :value="i">{{ m }}</option>
            </select>
            <select class="h-8 w-20 mr-1" :class="{'border border-red-500': $v.form.year.$error}" v-model="form.year">
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
            <input placeholder="Time" class="w-16 rounded" :class="{'border border-red-500': $v.form.time.$error}" type="text" v-model="form.time" />
          </div>
          <input placeholder="City" :class="{'border border-red-500': $v.form.city.$error}" class="mb-2 rounded w-full" v-model="form.city" />
          <!-- <input placeholder="Color" class="mb-2 px-1 rounded" v-model="form.color" /> -->
          <Color-picker class="mb-2" v-model="form.color" />
          <input placeholder="Write here..." maxlength="30" class="mb-2 w-full rounded" :class="{'border border-red-500': $v.form.text.$error}" v-model="form.text"/>
          <div class="flex justify-end">
            <button @click="$emit('close',true)" class="px-2 py-1 text-black">Cancel</button>
            <button type="submit" class="px-2 py-1 bg-green-500 text-white">Update</button>
          </div>
        </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from "../utils/Modal.vue";
import ColorPicker from "../utils/ColorPicker";
import { mapState, mapActions } from "vuex";
import { required, minLength, between, maxLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      form: null
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
  methods: {
    ...mapActions(["edit_reminder"]),
    updateReminder() {
      this.$v.form.$touch()
      if (!this.$v.$invalid) {
        this.form.color = this.form.color ? this.form.color.hex : "";
        this.edit_reminder(this.form);
        this.$emit("reloadSelected", true);
        this.$emit("close", true);
      }
    }
  }
};
</script>

<style>
</style>