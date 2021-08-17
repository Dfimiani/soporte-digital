<template>
  <div class="md:w-full md:top-0 md:z-20 flex flex-row flex-wrap items-center justify-between bg-white p-6 border-b border-gray-300">
    
    <!-- logo -->
    <div class="flex-none w-56 flex flex-row items-center">
      <img src="../assets/logo_cotoDigital.jpg" class="w-10 flex-none rounded">
      <strong class="capitalize ml-3 flex-1">Soporte Digital</strong>
    </div>
    <!-- end logo -->   

    <!-- navbar content -->
    <div id="navbar" class="pl-3 flex flex-row flex-wrap justify-between items-center ">

      <!-- right -->
      <div class="flex flex-row items-center"> 

        <!-- user -->
        <div class="relative md:static flex flex-row items-center">
            <img class="w-8 h-8 object-cover" src="../assets/user.svg" >
            <h1 class="ml-3 text-sm text-gray-800 font-semibold m-0 p-0 leading-none">{{ ip }}</h1>
        </div>
        <!-- end user -->

        <!-- notifcation -->
        <div class="dropdown relative ml-5 md:static">

          <button class="text-gray-500 menu-btn p-0 m-0 hover:text-gray-900 focus:text-gray-900 focus:outline-none transition-all ease-in-out duration-300">
            <i class="fa fa-bell"></i>               
          </button>

          <button class="hidden fixed top-0 left-0 z-10 w-full h-full menu-overflow"></button>

          <div class="menu hidden rounded bg-white md:right-0 md:w-full shadow-md absolute z-20 right-0 w-84 mt-5 py-2 animated faster">
            <!-- bottom -->
            <hr>
            <div class="px-4 py-2 mt-2">
              <a href="#" class="border border-gray-300 block text-center text-xs uppercase rounded p-1 hover:text-teal-500 transition-all ease-in-out duration-500">
                view all
              </a>
            </div>
            <!-- end bottom -->            
          </div>
        </div>

        <Connectivity class="ml-5" :online= "online"/>

        <button type="button" class="rounded p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none ml-3" @click="Hide" >
          <span class="sr-only">Close menu</span>
          <!-- Heroicon name: outline/x -->
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- end notifcation -->            
      </div>
      <!-- end right -->
    </div>
    <!-- end navbar content -->
  </div>
</template>
<script>
const { ipcRenderer } = window.require('electron'); 
import Connectivity from './Connectivity.vue';
export default {
    name:'NavBar',
    methods : {
      Hide : () => {
        ipcRenderer.send('hide');
      },
    },
    components : {
      Connectivity
    },
    props:{
      online : Boolean,
      ip : String
    }
}
</script>