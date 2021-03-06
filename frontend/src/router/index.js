import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store';
import routes from './routes';
Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    linkActiveClass: "active-link"
})




// Auth
function isLoggedIn() {
    return store.getters['auth/isAuthenticated'];
}

function isNotPermitted() {
    return store.getters['auth/isNotPermitted'];
}

function isRoutePermitted(route_name) {
    var result = false;
    const permissionList = store.getters['auth/getPermissions'];
    
    if (permissionList.length == 0) {
        return true;
    }else{
        let l = router.resolve({ name: route_name });
        if (permissionList.length > 0 && permissionList.includes(route_name) && l.resolved.matched.length > 0) {
            result = true;
        }
    }
   

    return result;
}

router.beforeEach((to, from, next) => {
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        var isPermitted = isRoutePermitted(to.name);
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({ name: 'Login' })
        } else {
            if (isPermitted) {
                next();
            } else if (!isPermitted && to.name == '404') {
                next();
            } else {
                next({ name: '404' })
            }
        }
    } else  {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({ name: store.getters['auth/getDefaultRoute'] })
        } else {
            next()
        }
    } 


})

export default router