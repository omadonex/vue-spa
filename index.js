import findIndex from 'array.prototype.findindex';
import Vue from 'vue';
import Vuex from 'vuex';

import CommonMixin from "./mixins/common";

findIndex.shim();
window.EventBus = new Vue();

Vue.use(Vuex);

export default Vue.extend({
  mixins: [CommonMixin],
});
