import { createRouter, createWebHistory } from "vue-router";
import Video from "../views/Video.vue";
import Table from "../views/Table.vue";

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
        path: '/table/:card',
        name: 'table',
        component: Table,
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