<script setup>
import {useRoute, useRouter} from 'vue-router';
import InputComponent from '../components/InputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import {BsEnvelopeAtFill, BsKeyFill} from '@kalimahapps/vue-icons';

import {ref} from 'vue';

const username = ref('emnyormaz@gmail.com');
const password = ref('22hy9144');

const login = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.data.token);
      await router.push({name: 'Home'});
    } else {
      console.error('Giriş yaparken bir hata oluştu: ', data);
    }
  } catch (error) {
    console.error('Giriş yaparken bir hata oluştu: ', error);
  }
}


const router = useRouter();
</script>
<template>
  <div class="flex flex-row h-full">
    <div class="flex w-8/12">
      <div class="relative w-full">
        <img src="https://picsum.photos/1920/1080" class="h-screen object-cover brightness-[0.6] contrast-[0.9] absolute top-0 left-0 -z-10 w-full">
        <div class="h-screen w-full z-10 flex px-10 flex-col justify-center items-start">
          <img src="/images/tevkil-app.png" alt="Tevkillapp.Com Logo" class="mb-7 w-[250px]"/>
          <h1 class="text-white font-extrabold text-4xl">Yönetici Paneli</h1>
          <p class="text-gray-200 text-xl">Tevkilapp Platformu yönetici paneline hoş geldiniz.</p>
        </div>
      </div>
    </div>
    <div class="flex w-4/12 bg-white dark:bg-gray-700 p-10 items-center shadow-2xl">
      <div class="w-full">
        <form>
          <div class="mb-3">
            <input-component type="text" label="Kullanıcı Adınız" v-model:value="username">
              <template #icon><BsEnvelopeAtFill></BsEnvelopeAtFill></template>
            </input-component>
          </div>
          <div class="mb-3">
            <input-component type="password" label="Parolanız" v-model:value="password">
              <template #icon><BsKeyFill></BsKeyFill></template>
            </input-component>
          </div>
          <div class="mb-3">
            <label class="flex items-center gap-2">
              <input type="checkbox"/>
              Oturumu açık tut
            </label>
          </div>
          <ButtonComponent color="primary" block class="h-8" @click="login">Giriş Yap</ButtonComponent>
          <div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
