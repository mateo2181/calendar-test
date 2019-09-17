import Vue from 'vue'
import Vuex from 'vuex'
import { createLocalVue,shallowMount } from '@vue/test-utils'
import AddReminder from '@/components/AddReminder.vue'
Vue.use(Vuex)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
  add_reminder: jest.fn()
};

const store = new Vuex.Store({ actions })

describe('AddReminder.vue', () => {

  it('add reminder with day, time and city', () => {
    
    // let reminders = [];
    const time = '12';
    const day = 3;
    const month = 2;
    const year = 2018;
    const city = 'London';
    const text = 'Pay Bills!!';

    const options = {
      store, 
      localVue
    };

    const wrapper = shallowMount(AddReminder, options);

    wrapper.find('.btn-show-form').trigger('click');

    wrapper.vm.form.day = day;
    wrapper.vm.form.month = month;
    wrapper.vm.form.year = year;
    wrapper.vm.form.time = time;
    wrapper.vm.form.city = city;
    wrapper.vm.form.text = text;

    const form = wrapper.find("form");
    form.trigger("submit");
    expect(actions.add_reminder.mock.calls).toHaveLength(1);
  })
})
