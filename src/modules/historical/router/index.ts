import HistoricalModule from '../HistoricalModule.vue';
import HomeView from '../views/HomeView.vue';
import TableView from '../views/TableView.vue';

const HistoricalRoutes = [
  {
    path: '/historical',
    name: 'historicalModule',
    component: HistoricalModule,
    children: [
      {
        path: 'home',
        name: 'historicalHomeView',
        component: HomeView,
      },
      {
        path: ':cardId',
        name: 'historical',
        component: TableView,
      },
    ],
  },
];

export default HistoricalRoutes;
