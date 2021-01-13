import Vuetify from 'vuetify';

import VueSpa from 'vue-spa';

import BaseStoreMixin from 'vue-spa/mixins/baseStore';

import AclConfig from "/myproject/vue/Config/Acl";

import Components from '/myproject/vue/Components';
import RootServices from '/myproject/vue/App/RootServices';
import store from "/myproject/vue/Store";

import AclMiddleware from "vue-spa/middleware/Acl";
import AuthRedirectMiddleware from "vue-spa/middleware/AuthRedirect";

import MyMixin from '/myproject/vue/Mixins/MyMixin';

import VueRouter from 'vue-router';
import LayoutMain from "/myproject/vue/Components/LayoutMain/LayoutMain.vue";

import RoutesApp from "/myproject/vue/Page/Routes";
import RoutesAuth from "/myproject/vue/Page/Auth/Routes";
import RoutesContent from '/myproject/modules/Content/Resources/assets/vue/Page/Routes';

const Routes = RoutesApp.concat(RoutesAuth, RoutesContent);

const Router = new VueRouter({
    routes: Routes,
    mode: 'history',
});

VueSpa.use(Vuetify);
VueSpa.use(Components);
VueSpa.component(LayoutMain.name, LayoutMain);
VueSpa.use(VueRouter);

const MyVue = VueSpa.extend({
  mixins: [MyMixin],
  data() {
    return {
      DataKeys: window.dataKeys || {},
      DataLang: window.dataLang || {},
      DataLive: window.dataLive || {},
      DataMain: window.dataMain || {},
      DataNoty: window.dataNoty || {},
      DataPage: window.dataPage || {},
      DataShop: window.dataShop || {},
      DataUser: window.dataUser || {},
    };
  },
});

MyVue.use(RootServices);
MyVue.mixin(BaseStoreMixin);

const App = new MyVue({
  router: Router,
  render: h => h(LayoutMain),
  store,
}).$mount('#app');

//App.pageLoader__useStore();
//App.pageLoader__initStoreData(window.dataMain);

App.xSetFromBrowser(window.fromBrowser || true);
App.xSetLoggedIn(window.loggedIn || false);
App.xSetSiteUrl(window.siteUrl || null);

App.acl__useConfig(AclConfig);
App.routerKernel__registerMiddleware(AuthRedirectMiddleware, 'auth');
App.routerKernel__registerMiddleware(AclMiddleware, 'acl');
App.routerKernel__init(true);

// Router.beforeEach((to, from, next) => {
//     const url = `${App.appSiteUrl}${to.path}`;
//     ym(..., 'hit', url);
//     next();
// });

window.App = App;

// window.someFunc = function (param) {
//     App.$root.$router.push({ name: '', params: {}});
// };
