<template>
  <div class="flex flex-row h-full">
    <div class="flex w-8/12">
      <div class="relative w-full">
        <img src="https://picsum.photos/1920/1080" class="h-screen object-cover brightness-[0.4] contrast-[0.9] absolute top-0 left-0 -z-10">
        <div class="h-screen w-full z-10 flex px-10 flex-col justify-center items-start">
          <h1 class="text-white font-extrabold text-4xl">Vue Admin Template</h1>
          <p class="text-gray-200 text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
    <div class="flex w-4/12 bg-white p-10 items-center shadow-2xl">
      <div class="w-full">
        <div class="mb-3">
          <input-component type="text" label="Adınız & Soyadınız" v-model:value="data.full_name">
            <template #icon>
              <BsPersonVcardFill></BsPersonVcardFill>
            </template>
          </input-component>
        </div>
        <div class="mb-3">
          <input-component type="text" label="Kullanıcı Adınız" v-model:value="data.userName">
            <template #icon>
              <BsPersonFill></BsPersonFill>
            </template>
          </input-component>
        </div>
        <div class="mb-3">
          <input-component type="email" label="E-Mail Adresiniz" v-model:value="data.userEmail">
            <template #icon>
              <BsEnvelopeAtFill></BsEnvelopeAtFill>
            </template>
          </input-component>
        </div>
        <div class="mb-3">
          <input-component type="password" label="Parolanız" v-model:value="data.password">
            <template #icon>
              <BsKeyFill></BsKeyFill>
            </template>
          </input-component>
        </div>
        <div class="mb-3">
          <input-component type="password" label="Parola Tekrarı" v-model:value="data.passwordRepeat">
            <template #icon>
              <BsKeyFill></BsKeyFill>
            </template>
          </input-component>
        </div>

        <div>
          <ButtonComponent class="mt-6 h-8" color="primary" block @click="handleRegistration">Kayıt Ol</ButtonComponent>
          <ModalComponent :modal-title="modalStateTwo.modalTitle"
                          :modal-body="modalStateTwo.modalBody"
                          :modal-open="modalStateTwo.modalOpen"
                          type="success"
                          @update:modal-open="handleModalOpenTwo">
          </ModalComponent>
        </div>

        <div class="mb-3">
          <hr class="mt-3"/>
          <router-link :to="{name:'login'}"><p class="text-center mt-1">Zaten üyeyim</p></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { BsEnvelopeAtFill, BsKeyFill, BsPersonFill, BsPersonVcardFill } from '@kalimahapps/vue-icons';
import InputComponent from '../components/InputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';
import axios from "axios";

const modalStateTwo = reactive({
  modalOpen: ref(false),
  modalTitle: ref('Kayıt İşleminiz Başarılı'),
  modalBody: ref('Anaysafaya yönlendiriliyorsunuz lütfen bekleyiniz.'),
});

const handleModalOpenTwo = () => {
  modalStateTwo.modalOpen.value = !modalStateTwo.modalOpen.value;
};

const data = reactive({
  full_name: ref('Admin Admin'),
  userName: ref('Admins123'),
  userEmail: ref('admin@mail.com'),
  password: ref('password'),
  passwordRepeat: ref('password'),
});

const handleRegistration = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/user/create', {
      full_name: data.full_name,
      username: data.userName,
      email: data.userEmail,
      password: data.password,
      password_confirmation: data.passwordRepeat,
    });

    if (response.data.success) {

      handleModalOpenTwo();
    } else {

      console.error(response.data.message);
    }
  } catch (error) {
    console.error('Bir hata oluştu', error);
  }
};

</script>
