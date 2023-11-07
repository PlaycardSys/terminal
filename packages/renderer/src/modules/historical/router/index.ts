const HistoricalRoutes = [
  {
    path: '/historical',
    name: 'historicalModule',
    component: () => import('../HistoricalModule.vue'),
    children: [
      {
        path: 'home',
        name: 'historicalHomeView',
        component: () =>
          import(
            /* webpackChunkName: "historicalHomeView" */ '/@/modules/historical/views/HomeView.vue'
          ),
        meta: {
          transition: 'fade',
        },
      },
      {
        path: ':cardId',
        name: 'historicalTableView',
        component: () =>
          import(
            /* webpackChunkName: "historicalTableView" */ '/@/modules/historical/views/TableView.vue'
          ),
        meta: {
          transition: 'fade',
        },
      },
    ],
  },
];

export default HistoricalRoutes;
