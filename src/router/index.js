import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/users/Login";
import Register from "../components/users/Register";
import Main from "../components/users/Main"
import Schedule from "../components/users/Schedule"
import Trainer from "../components/trainer/Trainer"
import TrainerDetail from "../components/trainer/TrainerDetail"
import ClassRequest from "../components/training/ClassRequest"
import AllClassRequest from "../components/training/AllClassRequest"
import HistoryTraining from "../components/training/HistoryTraining"
import TodayTraining from "../components/training/TodayTraining"
import Diet from "../components/diet/Diet"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/main',
      name:'Main',
      component :Main,
      children:[
        {
          path:"/",
          component:Schedule
        },
        {
          path:"/myTrainer/trainerInfo",
          component:Trainer
        },
        {
          path:"/myTrainer/trainerDetail/:trainerId",
          component:TrainerDetail
        },
        {
          path:"/myTrainer/classRequest",
          component:ClassRequest
        },
        {
          path:"/myTrainer/allClassRequest",
          component:AllClassRequest
        },
        {
          path:"/myTraining/historyTraining",
          component:HistoryTraining
        },
        {
          path:"/myTraining/todayTraining",
          component:TodayTraining
        },
        {
          path:"/myTraining/myDiet",
          component:Diet
        }
      ]
    },
    {
      path: '/home',
      name:'Main',
      component :Main
    }
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    debugger;
    let token = sessionStorage.getItem('token');

    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;
