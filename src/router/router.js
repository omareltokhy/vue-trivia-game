import VueRouter from "vue-router";
import Vue from "vue";
import Start from "@/components/Start/Start";
import Questions from "@/components/Questions/Questions";
import Result from "@/components/Result/Result";

Vue.use(VueRouter)

const routes = [
    {
        path: '/start',
        alias: '/',
        name: 'Start',
        component: Start
    },
    {
        path: '/questions',
        name: 'Questions',
        component: Questions
    },
    {
        path: '/result',
        name: 'Result',
        component: Result
    }
]

export default new VueRouter({
    routes
})