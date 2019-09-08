import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import AddReminder from '@/components/AddReminder.vue'
Vue.use(Vuex)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);

describe('AddReminder.vue', () => {

  let store
  let state
  let actions
  beforeEach(() => {
    state = { 
      reminders: [] 
    };
    actions = {
      add_reminder: jest.fn()
    };
  
    store = new Vuex.Store({
      state,
      actions
    })
  })

  it('add reminder with day, time and city', () => {
    
    // let reminders = [];
    const time = '12';
    const day = 1;
    const month = 2;
    const year = 2019;
    const city = 'London';
    const text = 'Pay Bills!!';

    const options = {
      methods: {
        validateFields() {
          return true;
        }
      },
      store
    };

    const wrapper = shallowMount(AddReminder, options);

    wrapper.find('.btn-show-form').trigger('click');
    wrapper.find('input[name="day"]').setValue(day);
    wrapper.find('select[name="month"]').setValue(month);
    wrapper.find('select[name="year"]').setValue(year);
    wrapper.find('input[name="time"]').setValue(time);
    wrapper.find('input[name="city"]').setValue(city);
    wrapper.find('input[name="text"]').setValue(text);
    wrapper.find('.btn-create-reminder').trigger('click');
    expect(actions.add_reminder.mock.calls).toHaveLength(1);
  })
})
