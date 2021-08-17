<template>
<div class="bg-blue-100 flex items-center p-5 overflow-hidden relative h-full" id="container">
    <div class="min-w-full rounded-3xl bg-white shadow-xl p-10 text-gray-800 flex items-center text-left">
        <div class="w-full flex items-center">
            <div class="mb-10 md:mb-20 text-gray-600 font-light">
                <h1 class="font-black uppercase text-3xl lg:text-5xl text-indigo-700 mb-10">404<br>Ups!😅</h1>
                <p>Parece que no podemos acceder al sitio.</p>
                <p>Por favor verifique e intente de nuevo más tarde.</p>
            </div>
        </div>
        <div class="w-full md:w-1/2 text-center">
           <img src="../assets/logo_cotoDigital.jpg" class="w-64 h-64">
        </div>
    </div>
    <div class="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
    <div class="w-96 h-full bg-indigo-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
</div>
</template>

<script>
export default {
  name : 'NotShown'
}
</script>

<style scoped>
#container {
    height: 32rem;
}
</style>