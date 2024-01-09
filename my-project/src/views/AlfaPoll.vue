<script setup>
import { ref } from 'vue';
import Main from "../components/SideBar.vue";

const anketSorusu = ref('');
const secenekler = ref('');
const anketler = ref([]);


const submitAnket = () => {
  const yeniAnket = {
    soru: anketSorusu.value,
    secenekler: secenekler.value.split(',').map(option => option.trim()),
    oySayisi: Array(secenekler.value.split(',').length).fill(0),
    isActive: Array(secenekler.value.split(',').length).fill(false),
  };

  anketler.value.push(yeniAnket);

  anketSorusu.value = '';
  secenekler.value = '';
};

const oyVer = (index, secenekIndex) => {
  if (anketler.value[index].isActive[secenekIndex]) {
    // Eğer zaten işaretliyse, işareti kaldırarak oy geri al
    anketler.value[index].oySayisi[secenekIndex]--;
  } else {
    // Aksi takdirde oy ver
    anketler.value[index].oySayisi[secenekIndex]++;
  }
  anketler.value[index].isActive[secenekIndex] = !anketler.value[index].isActive[secenekIndex];
};

const oyGeriAl = (index) => {
  // Oy geri al, tüm seçenekleri sıfırla
  anketler.value[index].oySayisi = Array(anketler.value[index].oySayisi.length).fill(0);
  anketler.value[index].isActive = Array(anketler.value[index].isActive.length).fill(false);
};

const anketSil = (index) => {
  anketler.value.splice(index, 1);
};
</script>

<template>

    <SideBar/>
    <Main/>
  <div class=" bg-[#F6F6F9] dark:bg-[#181A1E]">
    <div class="ml-[230px] mr-10 transition-all min-h-screen">

      <div class="container mx-auto p-8">
        <h1 class="text-3xl font-bold mb-8">Anket Sayfası</h1>

        <form @submit.prevent="submitAnket" class="mb-8">
          <div class="mb-4">
            <label for="anketSorusu" class="block text-sm font-semibold mb-2">Anket Sorusu:</label>
            <input v-model="anketSorusu" type="text" id="anketSorusu" class="w-full p-2 border border-gray-300 rounded" required>
          </div>

          <div class="mb-4">
            <label for="secenekler" class="block text-sm font-semibold mb-2">Anket Seçenekleri (Virgülle Ayırın):</label>
            <input v-model="secenekler" type="text" id="secenekler" class="w-full p-2 border border-gray-300 rounded" required>
          </div>

          <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Anketi Oluştur</button>
        </form>

        <div  v-if="anketler.length > 0">
          <h2 class="text-xl font-semibold  mb-4">Anketler</h2>
          <ul >
            <li v-for="(anket, index) in anketler" :key="index" class="mb-4">
              <div class="flex flex-col items-start gap-4 ">
                <div v-for="(anket, index) in anketler" :key="index" class="mb-4 w-1/2">
                  <div v-for="(secenek, secenekIndex) in anket.secenekler.slice(0, Math.ceil(anket.secenekler.length / 2))" :key="secenekIndex" class="flex bg-gray-200 py-2 px-4 rounded ">
                    <div class="flex items-center w-3/4 text-black">
                      {{ secenek }}
                    </div>
                    <div class="flex items-center w-1/4 justify-end">
                      <input
                          type="checkbox"
                          :checked="anket.isActive[secenekIndex]"
                          class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full bg-white transition-all before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-blue-500 checked:before:bg-gray-900 hover:before:opacity-10"
                          @click="oyVer(index, secenekIndex)"
                      />
                    </div>
                  </div>
                  <div class="flex flex-row justify-between">
                    <button v-if="anket.isActive.some(isActive => isActive)" @click="oyGeriAl(index)" class=" bg-yellow-500 text-white py-2 px-4 rounded mt-4 hover:bg-yellow-600">
                      Oy Geri Al
                    </button>
                    <button  @click="anketSil(index)" class=" bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600">Anketi Sil</button>
                  </div>
                  <div class="flex justify-between w-full mt-4">
                    <span>Oy Sayısı: {{ anket.oySayisi.slice(0, Math.ceil(anket.oySayisi.length / 2)).reduce((acc, curr) => acc + curr, 0) }}</span>

                  </div>
                </div>
              </div>

            </li>
          </ul>
        </div>
      </div>

    </div>
</div>



</template>