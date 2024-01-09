<script setup>
import {BsMoonFill, BxSolidSun} from "@kalimahapps/vue-icons";
import {computed, onMounted, reactive, ref, watch, watchEffect} from "vue";
import ModalComponent from "./ModalComponent.vue";
import axios from "axios";

const theme = ref(localStorage.getItem('theme ') || 'light');

const isOpen = ref(false);
const listMusic = ref([]);
const displayLimit = ref(4);
const showAllFlag = ref(false);
const currentVideo = ref(null);
const currentVideoId = ref(null);
const currentVideoTitle = ref(null);
const currentVideoTime = ref(null);
const currentVideoLikes = ref(0);
const currentVideoViews = ref(0);
const currentVideoDuration = ref(0);
const previousVideoId = ref(null);

const player = ref(null);

// Load YouTube IFrame Player API code asynchronously

onMounted(() => {
  const tag = document.createElement('script');
  tag.src = 'http://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

});


let videoPlayer;
const sliderValue = ref(0);

const seekToPosition = () => {
  console.log(videoPlayer)
  const duration = videoPlayer.getDuration();
  const seekToTime = (sliderValue.value / 100) * duration;
  videoPlayer.seekTo(seekToTime);
};


const onYouTubeIframeAPIReady =  (videoId) => {
 videoPlayer = new  YT.Player(player.value, {
    height: '0',
    width: '0',
    videoId: videoId, // Replace with your video ID
    startSeconds: 0,
    playerVars: {
      playsinline: 1,
      showinfo: 0,
      rel: 0,
      enablejsapi:1 ,
      modestbranding: 1,
      origin: 'http://localhost:5173/home',
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });


};

const playNextSong = async () => {

  // Eğer şu an çalan şarkı listede varsa ve listenin sonu değilse
  if (listMusic.value.length > 0) {
    // Bir sonraki şarkıyı al
    const nextSong = listMusic.value[0];
    console.log("Bir sonraki müzik", nextSong)

    // Yeni müziği ayarla
    currentVideo.value = nextSong;
    currentVideoId.value = currentVideo.value.song_id;
    currentVideoTitle.value = currentVideo.value.song_name;
    currentVideoTime.value = currentVideo.value.play_date;
    currentVideoLikes.value = currentVideo.value.likes || 0;
    currentVideoViews.value = currentVideo.value.views || 0;
    currentVideoDuration.value = 0;

    // removeFromQueue(currentVideoId.value);

    // Yeni müziği oynat
    videoPlayer.cueVideoById(currentVideoId.value, 0);
  } else {
    // Eğer şu an çalan şarkı listenin son şarkısıysa videoyu durdur
    videoPlayer.stopVideo();
    console.log("Oynatma sırasında başka müzik kalmadı.");
  }
};

const onPlayerStateChange = (event) => {
  console.log("Müzik durumu değişti.", event.target.getPlayerState());
  if(event.target.getPlayerState() === 5) {
    console.log(event.target)
    videoPlayer = event.target;
    event.target.playVideo();
    currentVideoDuration.value = event.target.getDuration();
    console.log(currentVideoDuration.value)

  }


  if (event.target.getPlayerState() === 1) {
    console.log("Müzik başladı.");
    setSliderInterval();
    formatTime(event.target.getCurrentTime());
     if(currentVideoId.value !== previousVideoId.value) {
      console.log("Müzik değişti.");
      previousVideoId.value = currentVideoId.value;
    }
  } else if (event.target.getPlayerState() === 2) {
    console.log("Müzik durdu.");
    clearInterval(sliderInterval);
  } else if (event.target.getPlayerState() === YT.PlayerState.ENDED) {
    console.log("Müzik bitti.");
    if(currentVideoId.value === previousVideoId.value) {
      console.log("Müzik aynı.");
      listMusic.value = listMusic.value.filter(item => item.song_id !== previousVideoId.value);
      removeFromQueue(previousVideoId.value);

    }
    playNextSong();


  }
};

const onPlayerReady = (event) => {
  console.log("Müzik başlatıldı.");
  event.target.playVideo();
  console.log(event.target.getPlayerState());
  videoPlayer = event.target;
  setSliderInterval();
  currentVideoDuration.value = event.target.getDuration();
};
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  currentVideoTime.value = `${String(minutes).padStart(2, "0")}:${String(
      seconds
  ).padStart(2, "0")}`;
};


let sliderInterval;

const setSliderInterval = () => {
  sliderInterval = setInterval(() => {
    if (videoPlayer && typeof videoPlayer.getDuration === 'function') {
      const duration = videoPlayer.getDuration();
      const currentTime = videoPlayer.getCurrentTime();
      sliderValue.value = (currentTime / duration) * 100;
      formatTime(currentTime); // Süreyi güncelle
    }
  }, 1000);
};


watch(listMusic, (newValue, oldValue) => {
  console.log("listMusic değişti");
  if (newValue.length > 0) {
    currentVideo.value = newValue[0];
    currentVideoId.value = currentVideo.value.song_id;
    currentVideoTitle.value = currentVideo.value.song_name;
    currentVideoTime.value = currentVideo.value.play_date;
    currentVideoLikes.value = currentVideo.value.likes;
    currentVideoViews.value = currentVideo.value.views;
    console.log("Müzik başlatılması isteği gönderildi.");
    onYouTubeIframeAPIReady(currentVideoId.value);
  }
});



const fetchMusicList = async () => {
  try {
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    };

    const response = await axios.get('http://localhost:8000/api/user/getMusicList', config);
    if (response.data) {
      listMusic.value = response.data.data;
    }
  } catch (error) {
    console.error('Bir hata oluştu', error);
  }

};

const showAll = () => {
  displayLimit.value = listMusic.value.length;
  showAllFlag.value = true;
};

const hideAll = () => {
  displayLimit.value = 4;
  showAllFlag.value = false;
};
const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const addToQueueHandler = async (musicData) => {
  try {
    const youtubeLink = musicData.youtubeLink;
    const videoID = extractVideoId(youtubeLink);


    const response = await axios.post('http://localhost:8000/api/user/addMusic', {
      song_name: musicData.videoTitle,
      singer: musicData.channelTitle,
      play_date: musicData.videoDurationInSeconds,
      song_id: videoID,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data) {
      listMusic.value = [...listMusic.value, response.data.data];

    } else {
      console.error(response.data.message);

    }
  } catch (error) {
    console.error('Bir hata oluştu', error);

  }

  closeModal();
};

const removeFromQueue = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/user/deleteMusic/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data) {
      const updatedList = listMusic.value.filter(item => item.song_id !== id);
      listMusic.value = updatedList;

      if (id === currentVideoId.value) {
        playNextSong();
      }
    }
  } catch (error) {
    console.error('Bir hata oluştu', error);
  }
};

const extractVideoId = (url) => {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
};

const toggleDarkMode = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme ', theme.value);
  document.body.classList.toggle('dark', theme.value === 'dark');
};

watchEffect(() => {
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

// ...

window.addEventListener('load', async () => {
  // localStorage'dan bilgileri al
  const savedVideoId = localStorage.getItem('currentVideoId');
  const savedVideoTime = localStorage.getItem('currentVideoTime');
  const savedSliderValue = localStorage.getItem('sliderValue');

  // Eğer kaydedilmiş bilgiler varsa, çalan müziği geri yükle
  if (savedVideoId && savedVideoTime && savedSliderValue) {
    currentVideoId.value = savedVideoId;
    currentVideoTime.value = savedVideoTime;
    sliderValue.value = savedSliderValue;

    // Fetch the music list if not fetched yet
    if (listMusic.value.length === 0) {
      await fetchMusicList();
    }


    ////// SOFT DELETE /////

    // Find the index of the saved video in the list
    const savedVideoIndex = listMusic.value.findIndex(item => item.song_id === savedVideoId);

    // If the saved video is in the list, set the current video and play it
    if (savedVideoIndex !== -1) {
      currentVideo.value = listMusic.value[savedVideoIndex];
      currentVideoTitle.value = currentVideo.value.song_name;
      currentVideoLikes.value = currentVideo.value.likes;
      currentVideoViews.value = currentVideo.value.views;
      // Initialize the YouTube player
      onYouTubeIframeAPIReady(currentVideoId.value);
    } else {
      // If the saved video is not in the list, fetch the list and set the first video
      await fetchMusicList();
      if (listMusic.value.length > 0) {
        currentVideo.value = listMusic.value[0];
        currentVideoId.value = currentVideo.value.song_id;
        currentVideoTitle.value = currentVideo.value.song_name;
        currentVideoTime.value = currentVideo.value.play_date;
        currentVideoLikes.value = currentVideo.value.likes;
        currentVideoViews.value = currentVideo.value.views;
        console.log("Müzik başlatılması isteği gönderildi.");
        onYouTubeIframeAPIReady(currentVideoId.value);
      }
    }
  }
});
fetchMusicList();


</script>

<template>
  <div class=" bg-[#F6F6F9] dark:bg-[#181A1E]">
    <div class="ml-[230px] mr-10 transition-all min-h-screen">
      <!-- AlfaMusic Section -->
      <div class="mb-6 flex flex-col justify-between">

        <div class="flex flex-row items-center justify-between">
          <h2 class="text-[26px] pt-6 font-extrabold mb-4 dark:text-[#edeffd] font-popins">AlfaMusic</h2>

          <div class="flex items-center justify-center">
            <div class="flex items-center mb-3 mr-5">
              <button @click="toggleDarkMode"
                      :class="{ 'bg-[#6C9BCF]': theme === 'light', 'bg-black': theme === 'dark' }"
                      class="cursor-pointer h-[22px] w-8 flex rounded-l-md justify-center items-center">
                <BxSolidSun
                    :class="{ 'text-white': theme === 'light', 'text-sm': theme === 'light', 'text-gray-50': theme === 'dark' }"/>
              </button>

              <button @click="toggleDarkMode"
                      :class="{ 'bg-[#6C9BCF]': theme === 'dark', 'bg-gray-200': theme === 'light' }"
                      class="cursor-pointer h-[22px] w-8 flex rounded-r-md justify-center items-center">
                <BsMoonFill :class="{ 'text-white': theme === 'dark', 'text-sm': theme === 'dark' }"/>
              </button>
            </div>

            <div class="text-[14px] mr-5">
              <p class="text-[#7D8DA1FF]">Merhaba, <b class="text-gray-950 dark:text-white">Alihan</b></p>
              <small class="flex flex-col justify-end items-end text-[12px] text-[#7D8DA1FF]">Beta</small>
            </div>

            <div class="profile-photo ml-2">
              <img src="../assets/profile-1.jpg" class="w-10 h-10 rounded-full" alt="Profil Fotoğrafı">
            </div>
          </div>
        </div>


        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 dark:text-white"
             style="grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 0.5fr);">
          <!-- 4 Equal Cards -->
          <div
              class="relative bg-white p-8 rounded-3xl min-h-36 w-full flex items-start justify-start mb-4 md:mb-0 cursor-pointer shadow-2xl hover:shadow-md transitionfont-popins duration-500 dark:bg-[#202528] ">
            <div class="text-left ">
              <p class="font-medium font-popins mb-2">Haftanın En İyisi</p>
              <p class="font-extrabold font-popins text-[25px] ">Lil Zey - DEFOL (Music Video)</p>
            </div>
            <div class="ml-auto">
              <svg class="right-4 top-4" height="80" width="80">
                <path
                    d="M40 5 A 35 35 0 1 1 5 40"
                    fill="transparent"
                    :stroke="theme === 'dark' ? '#a3bdcc' : '#1B9C85'"
                    stroke-width="10">
                </path>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="16"
                      :fill="theme === 'dark' ? '#a3bdcc' : 'black'">
                  1
                </text>
              </svg>
            </div>
          </div>

          <div
              class="relative bg-white p-8 rounded-3xl min-h-36 w-full flex items-start justify-start mb-4 md:mb-0 cursor-pointer shadow-2xl hover:shadow-md transition duration-500 dark:bg-[#202528]">
            <div class="text-left">
              <p class="font-medium font-popins mb-2">Haftanın En Kötüsü</p>
              <p class="font-extrabold font-popins text-[25px]">Lil Zey - DEFOL (Music Video) {{currentVideoDuration.value}}</p>
            </div>
            <div class="ml-auto">
              <svg class="flex flex-col items-end justify-end" height="80" width="80">
                <path
                    d="M40 5 A 35 35 0 1 1 5 40"
                    fill="transparent"
                    stroke="#FF0060"
                    stroke-width="10"
                ></path>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="16"
                      :fill="theme === 'dark' ? '#a3bdcc' : 'black'">
                  -54
                </text>
              </svg>
            </div>
          </div>

          <div
              class="relative bg-white p-8 rounded-3xl min-h-36 w-full flex items-start justify-start mb-4 md:mb-0 cursor-pointer shadow-2xl hover:shadow-md transition duration-500 dark:bg-[#202528]">
            <div class="text-left">
              <p class="font-medium font-popins  mb-2">En Çok Dinlenen</p>
              <p class="font-extrabold font-popins text-[25px] ">Lil Zey - DEFOL (Music Video)</p>
            </div>

            <div class="ml-auto">
              <svg class="right-4 top-4 " height="80" width="80">
                <path
                    d="M40 5 A 35 35 0 1 1 5 40"
                    fill="transparent"
                    stroke="#6C9BCF"
                    stroke-width="10"
                ></path>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="16"
                      :fill="theme === 'dark' ? '#a3bdcc' : 'black'">
                  546
                </text>

              </svg>
            </div>
          </div>
          <div
              class="flex flex-col items-center justify-center bg-white p- rounded-3xl h-auto w-full cursor-pointer shadow-2xl hover:shadow-md transition duration-500 dark:bg-[#202528]">
            <img class="h-14 w-14 mb-2" src="../assets/logo.png" alt="Logo">
            <p class="font-extrabold font-popins text-xl">AlfaTek</p>
            <p class="text-sm dark:text-[#a3bdcc] font-popins ">FullStack Web Developer</p>
          </div>
        </div>
      </div>


      <!-- Çalan Müzik Section -->
      <div class="mb-8 dark:text-white">
        <h3 class="text-xl font-semibold font-popins mb-4">Çalan Müzik</h3>
        <div
            class="bg-white h-56 shadow-2xl hover:shadow-md transition duration-500 cursor-pointer rounded-3xl dark:bg-[#202528]">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-24 p-6">
            <div class="card-item flex flex-col justify-center items-center">
              <img src="../assets/alihan.jpg" class="w-32 h-32 rounded-3xl" alt="Alihan">
              <h2 class="font-semibold text-xl font-popins mt-2">Alihan Duman</h2>
              <p class="text-[14px] text-gray-700 dark:text-[#a3bdcc] font-popins">Çalan Kişi</p>
            </div>

            <div class="card-item flex flex-col justify-center items-center">
              <img src="../assets/plak.jpg" class="w-32 h-32 rounded-3xl" alt="Çalan Şarkı">
              <h2 class="font-semibold text-xl font-popins mt-2">Çalan Şarkı</h2>
              <p class="text-[14px] text-gray-700 font-popins dark:text-[#a3bdcc] ">Oynatma Listene Ekle</p>
            </div>

            <div class="card-item flex flex-col justify-center items-center">
              <h2 class="font-semibold text-xl font-popins mt-2">{{ currentVideoTitle }}</h2>
              <div class="youtubeFrame">
                <div ref="player"></div>
                <div id="player" class="flex flex-row gap-3 items-center justify-center">
                  <input class="slider "  type="range" min="0" max="100" v-model="sliderValue" id="fader" @input="seekToPosition">
                  <label for="fader">
                    {{ currentVideoTime }}
                  </label>
                  <output id="ytplayer" for="fader" class="duration"></output>
                  <div id="playerss"></div>
                </div>
              </div>
            </div>
            <div class="card-item flex flex-col justify-center items-center">
              <div class="flex flex-col items-center ml-4">
                <img @click="openModal" id="music-img" src="../assets/plus-icon-black-2.png"
                     class="w-32 h-32 rounded-3xl dark:text-[#a3bdcc]" alt="Çalan Şarkı">
                <h2 class="font-semibold text-xl mt-2 font-popins">Çalan Şarkı</h2>
                <p class="text-[14px] text-gray-700 dark:text-[#a3bdcc] font-popins">Oynatma Listene Ekle</p>
              </div>
              <ModalComponent :isOpen="isOpen" :closeModal="closeModal" @addToQueue="addToQueueHandler"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Oynatma Sırası Section -->
      <div class="dark:text-white">
        <h2 class="text-xl font-semibold font-popins mb-4">Oynatma Sırası</h2>
        <div
            class="bg-white rounded-3xl shadow-2xl hover:shadow-md transition duration-500 p-4 h-full dark:bg-[#202528]">
          <div class="recent-orders">
            <table class="w-full table-auto">
              <thead>
              <tr class="border-b-2 border-gray-300 font-popins">
                <th class="py-2 block text-center">Dj</th>
                <th class="py-2 text-center">Sanatçı</th>
                <th class="py-2 text-center">Şarkı İsmi</th>
                <th class="py-2 text-center">Süresi</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in listMusic" :key="index" v-show="index < displayLimit">
                <td class="py-2 max-w-[42px] text-center">{{ item.user.username }}</td>
                <td class="py-2 max-w-[40px] text-center">{{ item.singer }}</td>
                <td class="py-2 max-w-[68px] text-center">{{ item.song_name }}</td>
                <td class="py-2 max-w-[24px] text-center">{{ item.play_date }}</td>
              </tr>

              </tbody>
            </table>
            <a href="#" v-if="listMusic.length > displayLimit" @click="showAll"
               class="flex items-center justify-center text-gray-400 dark:text-[#6C9BCF]  hover:underline mt-4 text-sm">
              Tüm Sırayı Göster
            </a>
            <a v-if="showAllFlag" @click="hideAll"
               class="flex items-center cursor-pointer justify-center text-gray-400 dark:text-[#6C9BCF]  hover:underline mt-4 text-sm">
              Tüm Sırayı Gizle
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style>
@media (prefers-color-scheme: dark) {
  #music-img {
    filter: invert(1);
  }
}

h2.font-popins {
  font-family: 'Poppins', sans-serif;
}

p.font-popins {
  font-family: 'Poppins', sans-serif;
}

h3.font-popins {
  font-family: 'Poppins', sans-serif;
}

tr.font-popins {
  font-family: 'Poppins', sans-serif;
}
</style>




