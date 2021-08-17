<template>
    <button @click = "ToggleModal" >            
        <img :src = "src" alt="CAPTURA" class="rounded h-20" id="thumbnail" v-if="src">
    </button>
    
    <!-- Modal1 -->
    <div id="modal" v-if="toggleModal" class="p-6 shadow-xl bg-gray-500 bg-opacity-75" @click = "ToggleModal">
        <button type="button" class="rounded p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none absolute mt-6 mr-6 top-0 right-0" @click="Hide">
            <span class="sr-only">Close menu</span>
            <!-- Heroicon name: outline/x -->
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>   
        <img :src="src" alt="CAPTURA" class="rounded">
    </div>
</template>
<script>
export default {
    name : 'ModalImg',
    data() {
        return {
            toggleModal : false
        }
    },
    props : {
        src : String,
    },
    methods: {
        ToggleModal : function (e) {
            e.preventDefault();
            this.toggleModal = !this.toggleModal;
        }
    }
}
</script>
<style scoped>
    #thumbnail{
        width: 150px;
    }
    #modal {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
</style>