import { createRouter, createWebHistory } from "vue-router";
import Video from "../views/Video.vue";
import Table from "../views/Table.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
    {
        path: '/',
        name: 'video',
        component: Video,
        meta: {
            transition: 'fade'
        }
    },
    {
        path: '/table/:cardId',
        name: 'table',
        component: Table,
        meta: {
            transition: 'fade'
        }
    },
    {
        path: '/not-found',
        name: 'not-found',
        component: NotFound,
        meta: {
            transition: 'fade'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router