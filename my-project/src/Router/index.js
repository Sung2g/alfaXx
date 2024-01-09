import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/home",
        name: "Home",
        component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    },
    {
        path: "/",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    },
    {
        path: "/alfamusic",
        name: "AlfaMusic",
        component: () => import(/* webpackChunkName: "register" */ "../views/Home.vue"),
    },
    {
        path: "/alfapoll",
        name: "AlfaPoll",
        component: () => import(/* webpackChunkName: "register" */ "../views/AlfaPoll.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
