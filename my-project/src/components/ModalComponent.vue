<template>
  <div v-if="isOpen" class="fixed inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block  align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
        <div class="p-6  dark:bg-[#202528] ">
          <button @click="closeModal" class="absolute top-4 right-4 button"><GlMergeRequestCloseM class="w-6 h-6" /></button>
          <h2 class="flex justify-center text-xl font-bold mb-4">Sıraya Müzik Ekle</h2>
          <p class="flex justify-center">
            <input
                class="p-1 border-2 rounded-lg w-full border-gray-500 text-center dark:border-white dark:border-4 placeholder:text-black dark:text-black"
                :placeholder="placeholderText"
                v-model="youtubeLink"
                @input="updatePreview"
                @focus="hidePlaceholder"
                @blur="showPlaceholder"
            />
          </p>
          <div v-if="youtubePreview" class="mt-4">
            <iframe
                :src="youtubePreview"
                width="100%"
                height="250px"
                allowfullscreen
            ></iframe>
            <p class="mt-2 flex justify-center font-bold text-xl">{{ channelTitle }} - {{ videoTitle }}</p>
          </div>
          <div v-else class="mt-4 flex justify-center">Önizleme bulunamadı.</div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 dark:bg-[#181A1E] dark:text-[#edeffd]">
          <div class="flex justify-center">
            <button  type="button" class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#6C9BCF] text-base font-medium text-white hover:bg-[#6C9BCFFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C9BCF] sm:max-w-xs sm:w-full sm:text-sm"
                     @click="addToQueue">
              Sıraya Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { MdSharpDashboard, GlMergeRequestCloseM } from "@kalimahapps/vue-icons";

const emit = defineEmits(['addToQueue']);

const { isOpen, closeModal } = defineProps(['isOpen', 'closeModal']);

const youtubeLink = ref('');
const youtubePreview = ref('');
const videoTitle = ref('');
const channelTitle = ref('');
const videoDurationInSeconds = ref(0);
const videoLikes = ref(0);
const videoViews = ref(0);


const addToQueue = () => {
  const musicData = {
    youtubeLink: youtubeLink.value,
    videoTitle: videoTitle.value,
    channelTitle: channelTitle.value,
    videoDurationInSeconds: videoDurationInSeconds.value,
    likes: videoLikes.value,
    views: videoViews.value,
  };

  console.log('addToQueue', musicData);

  emit('addToQueue', musicData);
};

const updatePreview = async () => {
  try {
    const videoId = extractVideoId(youtubeLink.value);
    if (videoId) {
      const apiKey = 'AIzaSyCHObgpSBoyQewc7KwLXkJEttoWWZgTMfo';
      const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`);
      const videoData = await videoResponse.json();

      if (videoData.items && videoData.items.length > 0) {
        const videoSnippet = videoData.items[0].snippet;
        videoTitle.value = videoSnippet.title;


        const contentDetails = videoData.items[0].contentDetails;
        if (contentDetails && contentDetails.duration) {
          videoDurationInSeconds.value = iso8601DurationToSeconds(contentDetails.duration);

          const channelId = videoSnippet.channelId;
          const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`);
          const channelData = await channelResponse.json();
          const channelSnippet = channelData.items[0].snippet;
          channelTitle.value = channelSnippet.title;
          const statistics = videoData.items[0].statistics || {};
          const likes = statistics.likeCount || 0;
          const views = statistics.viewCount || 0;

          youtubePreview.value = `https://www.youtube.com/embed/${videoId}`;
        } else {
          console.error('Youtube API Error: Video duration not available.');
        }
      } else {
        console.error('Youtube API Error: Video not found.');
      }
    }
  } catch (error) {
    console.error('Youtube API Error:', error);
  }
};


const iso8601DurationToSeconds = (iso8601Duration) => {
  const match = iso8601Duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;


  return minutes + ":" +  seconds ;

};

const extractVideoId = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v(?:\/|=)|(?:.*\/)?)([^"&?\/\s]*))/);
  return match ? match[1] : false;
};

const originalPlaceholder = "Sıraya Eklemek İstediğiniz Videonun Linkini Giriniz...";
const placeholderText = ref(originalPlaceholder);

const hidePlaceholder = () => {
  placeholderText.value = '';
};

const showPlaceholder = () => {
  if (!youtubeLink.value) {
    placeholderText.value = originalPlaceholder;
  }
};
</script>
