//引入路由依赖
import {createRouter, createWebHashHistory} from 'vue-router'
// import Home from '../components/Home.vue'
import Blog from '../components/Blog.vue'
// import Login from '../pages/common/login.vue'
import App from '../App.vue'
// import Admin_Home from '../pages/admin/Admin-Home.vue'
import NotFound from '../pages/common/404.vue'
import Login from '../pages/common/login.vue'
import Admin_User from '../pages/admin/Admin-User.vue'
import Second from '../pages/admin/Second.vue'
import HomePage from '../pages/common/homepage.vue'
import RegisterUser from '../pages/user/register_user.vue'
import RegisterNurse from '../pages/nurse/register_nurse.vue'

import Admin from '../pages/admin/admin.vue'
import FogetUserPassword from '../pages/user/forgetpassword_user.vue'

import Test from '../Test/Ulist1.vue'
import Digo from '../Test/digo.vue'
import AdminVipUser from "../pages/admin/Admin-VipUser.vue"
import AdminType from '../pages/admin/Admin-Type.vue'
import AdminRoom from '../pages/admin/Admin-Room.vue'
import AdminPayment from '../pages/admin/Admin_Payment.vue'
import AdminBook from '../pages/admin/Admin-Book.vue'
import TestUpdata from '../Test/TestUpdata.vue'
import AdminComment from '../pages/admin/Admin-Comment.vue'
import Test_Front from '../pages/common/Test_Front.vue'
import Select_Test from '../Test/Select_Test.vue'
import EchartTest from '../Test/Echat_Test.vue'
import echart from '../Test/EChart.vue'
import Ok_Test from '../Test/Ok.vue'
import Input from '../Test/Input.vue'


import User from "../pages/user/homepage_user.vue"
import Information from "../pages/user/jump/information.vue"
import Reservehotel from "../pages/user/jump/reservehotel.vue"
import Bookhotel from "../pages/user/jump/bookhotel.vue"
import Orderper from "../pages/user/jump/orderper.vue"
import Paid from "../pages/user/jump/paid.vue"
import Unpaid from "../pages/user/jump/unpaid.vue"
import Everytype from '../pages/user/jump/everytype.vue'
import Index from '../pages/user/jump/index.vue'

//引入相关组件

//路由配置
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path:'/input',
            component:Input
        },
        {
            path:'/ok',
            component:Ok_Test
        },
        {
            path:'/ecahrt_test',
            component:EchartTest
        },
        {
            path:'/echart',
            component:echart
        },
        {
            path:'/selectTest',
            component:Select_Test
        },
        {
            path:'/update',
            component:TestUpdata
        },
        {
            path:'/front',
            component:Test_Front
        },
        {
            //默认路径
            path: '/',
            //对应的组件
            component:HomePage
        },   
        {
            //默认路径
            path: '/digo',
            //对应的组件
            component:Digo
        },
           {
            //默认路径
            path: '/test',
            //对应的组件
            component:Test
        },
        {
            //默认路径
            path: '/forget_password',
            //对应的组件
            component:FogetUserPassword
        },
     
        {
            path:'/admin',
            component:Admin,
            meta: {requiresAuth: true}, // 需要登录才能访问的路由
            children:[
                {
                    path:'/admin/Admin-User',
                    component:Admin_User,
                    meta:{
                        title:'首页'
                    },
                   
                },
                {
                    path:'/admin/Admin-VipUser',
           
                    component:AdminVipUser,
                    meta:{
                        title:'Vip'
                    }
                },
                {
                    path:'/admin/Admin-Type',
                    component:AdminType,
                    meta:{
                        title:'房间类别管理'
                    },
                   
                },
                {
                    path:'/admin/Admin-Room',
                    component:AdminRoom,
                    meta:{
                        title:'房间后端管理'
                    },
                   
                },
                {
                    path:'/admin/Admin-Payment',
                    component:AdminPayment,
                    meta:{
                        title:'订单后端管理'
                    },
                   
                },
                  {
                    path:'/admin/Admin-Book',
                    component:AdminBook,
                    meta:{
                        title:'预定后端管理'
                    },
                   
                },
                {
                    path:'/admin/Admin-Comment',
                    component:AdminComment,
                    meta:{
                        title:'评论管理管理'
                    },
                   
                },
                {
                    path:'/admin/Admin-Comment',
                    component:AdminComment,
                    meta:{
                        title:'评论管理管理'
                    },
                   
                },
                {
                    path:'/admin/Data-analysis',
                    component:Ok_Test,
                    meta:{
                        title:'评论'
                    },
                   
                },
                
            ]

        },
        {
            path:'/register_user',
            component:RegisterUser
        },
        {
            path:'/blog',
            component:Blog
        },
        {
            path:'/register_nurse',
            component:RegisterNurse
        },

        {
            path:'/login',
            component:Login,
            name:'login'
        },
        {
            //默认路径
            path: '/app',
            //对应的组件
            component:App
        },
        ,          
                {path: '/:pathMatch(.*)*',component: NotFound },  
                {
                    name:'user',
                    path:'/user',
                    component:User,
                    redirect:'/user/index',
                    meta: {requireAuth: true}, // 需要登录才能访问的路由
                        children:[
                            {
                                path:'information',
                                component:Information
        
                            },
                            {
                                path:'reserve',
                                component:Reservehotel
        
                            },
                            {
                                path: 'test',
                                component: Blog
                            },
                            {
                                path: 'bookhotel',
                                component: Bookhotel
                            },
                            {
                                path:'order',
                                component: Orderper,
                                children:[
                                    {
                                        path:'unpaid',
                                        component:Unpaid,
                                    },
                                    {
                                        path:'paid',
                                        component:Paid,
                                    }
                                ]
        
                            },
                            {
                                path:'everytype',
                                component: Everytype,
                            },
                            {
                                path: 'index',
                                component: Index,
                            }
        
        
        
                        ]
                },

    ]
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('admin');

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 路由需要登录但用户未认证，重定向到登录页面
    next({name: 'login'});
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
    const Authenticated = !!localStorage.getItem('user');

    if (to.meta.requireAuth && !Authenticated) {
        // 路由需要登录但用户未认证，重定向到登录页面
        next({name: 'login'});
    } else {
        next();
    }
});









export default router;