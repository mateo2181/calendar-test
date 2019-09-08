const IndexCalendar = () =>  import('./views/IndexCalendar.vue');
const DayDetail = () => import('./views/DayDetail.vue');

const routes = [
    { path: '/', component: IndexCalendar, name: 'calendar' },
    { path: '/daydetail', component: DayDetail, name: 'daydetail' }
];

export default routes;