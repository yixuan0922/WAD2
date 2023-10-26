<template>
    <div>
      <h1>{{ videoTitle }}</h1>
    <div id="youtube-player"></div>
    <div>
      <input v-model="videoUrl" type="text" placeholder="Enter YouTube video URL" />
      <button @click="loadVideo" class="btn btn-primary">Load Video</button>
      <button @click="playVideo" class="btn btn-success">Play</button>
      <button @click="pauseVideo" class="btn btn-warning">Pause</button>
      <button @click="stopVideo" class="btn btn-danger">Stop</button>
    </div>
  </div>
</template>
  
<script>

export default {
  data() {
    return {
      player: null,
      videoUrl: '', // Added video URL data property
      videoTitle: '', // Added video title data property
      apiKey: process.env.VUE_APP_YOUTUBE_API_KEY,
    };
  },
  methods: {
    playVideo() {
      if (this.player) {
        this.player.playVideo();
      }
    },

    pauseVideo() {
      if (this.player) {
        this.player.pauseVideo();
      }
    },

    stopVideo() {
      if (this.player) {
        this.player.stopVideo();
      }
    },

    loadVideo() {
      // Validate the YouTube URL
      const videoId = this.extractVideoId(this.videoUrl);

      if (videoId) {
        if (this.player) {
          this.player.loadVideoById(videoId);
        } else {
          this.createYouTubePlayer(videoId);
        }
      } else {
        alert('Invalid YouTube video URL.');
      }
    },

    extractVideoId(url) {
      // Extract the video ID from the YouTube URL
      const videoIdMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
      if (videoIdMatch) {
        return videoIdMatch[1];
      }
      return null;
    },
    // Fetch video title using YouTube Data API

    fetchVideoTitle(videoId) {
      // const apiKey = this.apiKey; // Replace with your own API key
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?key=${this.apiKey}&id=${videoId}&part=snippet`;
      
      fetch(apiUrl)
          .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
          })
          .then(data => {
          if (data.items && data.items.length > 0) {
              const video = data.items[0];
              this.videoTitle = video.snippet.title;
          } else {
              console.error('Video not found or data unavailable.');
          }
          })
          .catch(error => {
          console.error('Error fetching video title:', error);
          });
      },

    createYouTubePlayer(videoId) {
      // eslint-disable-next-line
      this.player = new YT.Player('youtube-player', {
          videoId: videoId,
          playerVars: {
          controls: 0,
          showinfo: 0,
          rel: 0,
          },
          events: {
          onReady: (event) => {
              this.player = event.target;
              // Fetch video title and set it
              this.videoTitle = this.fetchVideoTitle(videoId);
          },
          },
      });
      },
    onYouTubeIframeAPIReady() {
      // Load YouTube Iframe Player API script
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Expose onYouTubeIframeAPIReady to the window
      window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
    },
  },
  mounted() {
    this.onYouTubeIframeAPIReady();
  },
};
</script>
