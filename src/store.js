import Vue from 'vue'
import Vuex from 'vuex'
import { getYears } from './utils/functions.js'
import serviceWeather from './services/apiWeather';
Vue.use(Vuex)

let years = getYears(1950,2050);
export default new Vuex.Store({
  state: {
    years: years,
    monthsName: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    reminders: [],
    detailDay: null
  },
  mutations: {
    ADD_REMINDER(state, payload) {
      state.reminders.push(Object.assign({ id: state.reminders.length }, payload));
      // let array = state.reminders;
      // array.push(payload);
    },
    EDIT_REMINDER(state, payload) {
      const idReminder = state.reminders.findIndex(r => r.id == payload.id);
      state.reminders.splice(idReminder, 1, payload);
    },
    DELETE_REMINDER(state, payload) {
      const idReminder = state.reminders.findIndex(r => r.id == payload.id);
      state.reminders.splice(idReminder, 1);
    },
    SET_MONTH(state, payload) {
      state.currentMonth = payload;
    },
    SET_YEAR(state, payload) {
      state.currentYear = payload;
    },
    SET_DETAIL_DAY(state, payload) {
      state.detailDay = payload;
    },
  },
  actions: {
    async add_reminder({dispatch, commit }, reminder) {
      reminder.weather = await dispatch('get_weather_city',reminder.city),
      // reminder.weather = await serviceWeather.getWeatherByCity(reminder.city);
      commit('ADD_REMINDER', reminder);
    },
    async edit_reminder({ commit }, reminder) {
      reminder.weather = await serviceWeather.getWeatherByCity(reminder.city);
      commit('EDIT_REMINDER', reminder);
    },
    set_month({ commit }, payload) {
      commit('SET_MONTH', payload)
    },
    set_year({ commit }, payload) {
      commit('SET_YEAR', payload)
    },
    set_detail_day({ commit }, payload) {
      commit('SET_DETAIL_DAY', payload)
    },
    delete_reminder({ commit }, reminder) {
      commit('DELETE_REMINDER', reminder);
    },
    async get_weather_city(context, city) {
      try {
        let weather = await serviceWeather.getWeatherByCity(city);
        return weather;
      } catch (error) {
        return error;
      }
    }
  }
})
