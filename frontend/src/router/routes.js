const ADMIN = import ('./../components/Admin.vue');
const routes = [{
    path: '/',
    name: 'dashboard',
    component: () =>ADMIN,
    meta: {
        isIndex: false,
        requiresAuth: true
    },
    redirect: { name: "dashboard.index" },
    children: [
        {
            path: 'dashboard',
            name: 'dashboard.index',
            component: () =>
                import ('../components/Content/Dashboard/index.vue'),
            meta: {
                requiresAuth: true,
                isAdmin:true
            }
        }
    ]
},
{
    path: '/order',
    name: 'order',
    component: () =>ADMIN,
    meta: {
        requiresAuth: true
    },
    redirect: { name: "order.index" },
    children: [
        {
            path: '',
            name: 'order.index',
            component: () =>
                import ('../components/Content/Order/index.vue'),
            meta: {
                requiresAuth: true,
                isAdmin:true,
                isBuyer:true
            }
        },
        {
            path: 'add',
            name: 'order.add',
            component: () =>
                import ('../components/Content/Order/add.vue'),
            meta: {
                requiresAuth: true,
                isAdmin:false
            }
        },
        {
            path: 'edit/:id',
            name: 'order.edit',
            component: () =>
                import ('../components/Content/Order/edit.vue'),
            meta: {
                requiresAuth: true,
                isAdmin:false
            }
        }
    ]
},

{
    path: '/product',
    name: 'product',
    component: () => ADMIN,
    meta: {
        requiresAuth: true
    },
    redirect: { name: "product.index" },
    children: [
        {
            path: '',
            name: 'product.index',
            component: () =>
                import ('../components/Content/Product/index.vue'),
            meta: {
                requiresAuth: true,
                isAdmin:true
            }
        },
        {
            path: 'add',
            name: 'product.add',
            component: () =>
                import ('../components/Content/Product/add.vue'),
            meta: {
                requiresAuth: true,
                isAdmin:true
            }
        },
        {
            path: 'edit/:id',
            name: 'product.edit',
            component: () =>
                import ('../components/Content/Product/edit.vue'),
            meta: {
                requiresAuth: true,
                isAdmin:true
            }
        }
    ]
},

{
    path: '/login',
    name: 'Login',
    component: () =>
        import ('./../components/Login.vue'),
    meta: {
        requiresAuth: false,
        isAdmin:false

    },
},

{
    path: '/',
    name: 'HelloWorld',
    component: () =>
        import ('./../components/HelloWorld.vue'),
    redirect: { name: "Login" }
},
{
    path: '*',
    name: '404',
    component: () =>
        import ('./../components/Content/404.vue'),
    meta: {
        requiresAuth: false
    }
},

]

export default routes;