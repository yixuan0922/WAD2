<template>
  <div>
    <div id="youtube-player"
    style="width: 0; height: 0"></div>
    <button @click="playVideo">Play</button>
    <button @click="pauseVideo">Pause</button>
    <button @click="stopVideo">Stop</button>
    <div>
        <input type="text" :value="src" size=50>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      player: null,
      src: "https://www.youtube.com/watch?v=ULQhvIGG27Q",
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
    onYouTubeIframeAPIReady() {
        // eslint-disable-next-line
      this.player = new YT.Player('youtube-player', {
        videoId: 'ULQhvIGG27Q', // Replace with your YouTube video ID
        playerVars: {
          controls: 0,
          showinfo: 0,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            this.player = event.target;
          },
        },
      });
    },
  },
  mounted() {
    // Load YouTube Iframe Player API script
    console.log(this.src.substring(this.src.indexOf("=")+1));
    const tag = document.createElement('script');
    tag.src = "ULQhvIGG27Q"
    
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Ensure the script is loaded before calling onYouTubeIframeAPIReady
    tag.onload = () => {
      window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
    };
  },
};
</script>

