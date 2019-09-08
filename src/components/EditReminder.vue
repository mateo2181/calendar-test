<template>
  <div>
      <modal @close="$emit('close',true)">
        <div slot="body">
            <div class="mb-2 border-b pb-1"> Edit Reminder </div>
            <div class="w-full">
                     <div class="w-full flex mb-2">
                    <input placeholder="Day" class="w-1/4 mr-1 rounded" max="31" min="1" type="number" v-model="reminderForm.day" />
                    
                    <select class="h-8 mr-1" v-model="reminderForm.month">
                        <option v-for="(m,i) in monthsName" :key="i" :value="i">{{ m }}</option>
                    </select>
                    <select class="h-8 mr-1" v-model="reminderForm.year">
                        <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                    </select>
                    <input placeholder="Time" class="w-1/4 rounded" type="text" v-model="reminderForm.time" />
                    </div>
                    <input placeholder="City" class="mb-2 rounded w-full" v-model="reminderForm.city" />
                    <!-- <input placeholder="Color" class="mb-2 px-1 rounded" v-model="form.color" /> -->
                    <Color-picker class="mb-2" v-model="reminderForm.color" />
                    <input placeholder="Write here..." maxlength="30" class="mb-2 w-full rounded" v-model="reminderForm.text" />
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
import ColorPicker from '../utils/ColorPicker';
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            reminderForm: null
        }
    },
    created() {
        this.reminderForm = this.reminder;
    },
    computed: {
        ...mapState(["monthsName", "years"]),
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
            this.reminderForm.color = this.reminderForm.color ? this.reminderForm.color.hex : '';
            this.edit_reminder(this.reminderForm);
            this.$emit('reloadSelected',true);
            this.$emit('close',true);
        }
    }
}
</script>

<style>

</style>