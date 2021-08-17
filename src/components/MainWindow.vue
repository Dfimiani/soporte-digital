<template>
  <NavBar :online = "online" :ip="ip"/>
  <Wrapper v-if= "online" :ip="ip"/>
  <NotShown v-else/>
</template>

<script>
const {ipcRenderer} = require('electron');
import NavBar from "./NavBar.vue";
import Wrapper from "./Wrapper.vue";
import NotShown from './NotShown.vue';
export default {
  name: "MainWindow",
  data() {
    return {
      online : true,
      ip : ''
    }
  },
  components: {
    NavBar,
    Wrapper,
    NotShown,
  },
  created() {
    this.interval = setInterval(() => this.CheckConnectivity(), 5000);
  },
  methods: {
    async CheckConnectivity() {
      try {
        let ip = ipcRenderer.sendSync('getIp');
        this.ip = ip;

        const options = {
          mode : 'cors',
          headers : {
            'Access-Control-Allow-Origin' : '*' 
          }
        }
        const res = await fetch("http://host129b/", options);

        this.online = res.status >= 200 && res.status < 300; // either true or false
        
      } catch (e) {
        this.online = false; // definitely offline
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>