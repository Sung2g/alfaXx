<template>
  <div class="sidebar dark:bg-[#181A1E]">
    <aside class="fixed z-90 md:w-[200px]  w-[60px] dark:border-r-gray-600/10 transition-all  min-h-screen flex flex-col md:animate-open-sidebar max-md:animate-close-sidebar">
      <div class=" mt-2 h-[65px] flex items-center justify-center sidebar-logo-area ">
        <div class="ml-6">
          <div class="flex flex-row">
            <img class="w-8 h-8" src="../assets/logo.png" alt="logo" />
            <h2 class="text-2xl font-semibold dark:text-white font-popins">Alfa<span class="text-orange-600 font-popins">Tek</span> </h2>
          </div>
        </div>
      </div>

      <div class="flex flex-col h-screen ml-8 mt-1 ">
        <div class="bg-white shadow-2xl hover:shadow-md transition duration-500 rounded-xl  flex-grow mb-28 dark:bg-[#202528]">
          <ul class="flex flex-col ">
            <li class="mt-1">
              <router-link to="/home" class="flex flex-row text-[#7d8da1] items-center gap-3 py-3 px-7 rounded-md hover:text-[#6C9BCFFF] hover:translate-x-2 transition-all duration-500">
                <div class="button"><MdSharpDashboard class="w-6 h-6" /></div>
                <button class="font-popins text-[14px]">Anasayfa</button>
              </router-link>
            </li>
            <li class="mt-2">
              <router-link to="/user" class="flex flex-row text-[#7d8da1] items-center gap-3 py-3  px-7 rounded-md hover:text-[#6C9BCFFF] hover:translate-x-2 transition-all duration-500">
                <div class="button"><ClUsers class="w-6 h-6" /></div>
                <button class="font-popins text-[14px]" >Üyeler</button>
              </router-link>
            </li>
            <li class="mt-2 border-s-8 border-[#6C9BCF] ]">
              <router-link to="/alfamusic" class="flex flex-row text-[#7d8da1] px-7 bg-[#F6F6F9] dark:bg-[#181A1E] h-10  w-full">
               <div class=" hover:text-[#6C9BCFFF] flex flex-row items-center gap-3 py-3  hover:translate-x-2 transition-all duration-500">
                 <div class="button dark:text-[#6C9BCF]"><MdInsights  class="w-6 h-6" /></div>
                 <button class="font-popins text-[14px] dark:text-[#6C9BCF]">AlfaMusic</button>
               </div>
              </router-link>
            </li>
            <li class="mt-2">
              <router-link to="/task-log" class="flex flex-row text-[#7d8da1] items-center gap-3 py-3  px-7 rounded-md hover:text-[#6C9BCFFF] hover:translate-x-2 transition-all duration-500">
                <div class="button"><ReQuestionAnswerFill class="w-6 h-6" /></div>
                <button class="font-popins text-[14px]" >AlfaChat</button>
              </router-link>
            </li>
            <li class="mt-2">
              <router-link to="/alfapoll" class="flex flex-row text-[#7d8da1] items-center gap-3 py-3  px-7 rounded-md hover:text-[#6C9BCFFF] hover:translate-x-2 transition-all duration-500">
                <div class="button"><BxRestaurant  class="w-6 h-6"  /></div>
                <button class="font-popins text-[14px]" >AlfaDelizia</button>
              </router-link>
            </li>
            <li class="mt-2">
              <router-link to="/task-log" class="flex flex-row text-[#7d8da1] items-center gap-3 py-3  px-7 rounded-md hover:text-[#6C9BCFFF] hover:translate-x-2 transition-all duration-500">
                <div class="button"><FeSettings  class="w-6 h-6" /></div>
                <button class="font-popins text-[14px]">Ayarlar</button>
              </router-link>
            </li>
            <li class="mt-2">
              <router-link to="/task-log" class="flex flex-row items-center gap-3 text-[#7d8da1] py-3  px-7 rounded-md hover:text-[#6C9BCFFF] hover:translate-x-2 transition-all duration-500">
                <div class="button"><FlFilledAdd class="w-6 h-6" /></div>
                <button class="font-popins text-[14px]">Öneriler</button>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="absolute bottom-32 left-2 w-full text-center">
          <router-link to="/task-log" class="flex flex-row items-center justify-center gap-3 text-[#7d8da1] py-3 rounded-md hover:text-[#6C9BCFFF] hover:translate-x-2 transition-all duration-500">
            <div class="button"><McExitFill class="w-6 h-6" /></div>
            <button>Çıkış Yap</button>
          </router-link>
        </div>

      </div>
    </aside>
  </div>
</template>
<script setup>
import {
  MdSharpDashboard,
  ClUsers,
  MdInsights,
  ReQuestionAnswerFill,
  BxRestaurant,
  FeSettings,
  FlFilledAdd,
  McExitFill

} from '@kalimahapps/vue-icons';

</script>

<style>
*.font-popins {
  font-family: 'Poppins', sans-serif;
}

</style>

