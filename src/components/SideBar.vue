<template>
  <div id="sideBar" class="relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-56 md:top-0 shadow-xl">
    <!-- sidebar content -->
    <div class="flex flex-col h-full justify-between">
      <div>
        <p class="uppercase text-xs text-gray-600 mb-4 tracking-wider">Datos Utiles</p>
        <!-- link -->
        <div class="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">             
          <p>Mesa de ayuda</p>
          
          <ul>
            <li>4588-5110 - Interno 5550</li>
            <li>Urgencias: CTI 40333</li>
          </ul>
        </div>
        <!-- end link -->
      </div>

      <div class="flex flex-col items-center">
        <p class="text-xs text-gray-500">COTO C.I.C.S.A.</p>
        <p class="text-xs text-gray-500">CUIT: 30-54808315-6</p>
      </div>
    </div>
    <!-- end sidbar -->
  </div>
</template>

<script>
const {ipcRenderer} = require('electron');

export default {
  name: 'SideBar',
  methods : {
    ShowPath : function () {
      let icon = ipcRenderer.sendSync('getpath');
      alert(icon);
    }
  }
}
</script>