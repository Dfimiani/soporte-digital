<template>
    <div class="flex flex-row flex-wrap">
        <!-- SideBar -->
        <SideBar/>
        <!-- Wrapper -->
        <MainContent :ip = "ip"/>
    </div>
</template>
<script>

import SideBar from './SideBar.vue';
import MainContent from './MainContent.vue';

export default {
    name: 'Wrapper',
    components: {
        SideBar,
        MainContent
    },
    props : {
     online: Boolean,
     ip : String   
    }
}
</script>