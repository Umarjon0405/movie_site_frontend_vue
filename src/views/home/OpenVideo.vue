<template>
   <v-container class="video-play-div" fullscreen fluid>
    <div width="100%" class="main-card py-5" :style="bgImage">
        <div class="container1 fluid">
          <div class="header">
            <v-row class="nav-row">
              <v-col cols="2">
                <div class="logo-div">
                  <v-img
                    src="../../assets/abstract-cinema-logo-FF3FCB96BB-seeklogo.com.png"
                    max-width="50px"
                  ></v-img>
                  <div class="pl-4">
                    <span class="logo-span">CinemaTV</span>
                  </div>
                </div>
              </v-col>
              <v-col cols="7 d-flex" justify-space-between>
                <div class="nav-bar">
                  <a>
                    <span>Home</span>
                  </a>
                  <a>
                    <span>Serials</span>
                  </a>
                  <a>
                    <span>Anime</span>
                  </a>
                </div>
              </v-col>
              <v-col cols="3 d-flex" justify-space-between>
                <v-text-field
                  outlined
                  append-icon="mdi-movie-search-outline"
                  dense
                  label="search"
                  placeholder="search"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </div>
        </div>
      <v-container class="main-container">
        <v-btn icon @click="closeDialog()">
          <v-icon left large size="20px" color="error">
            mdi-keyboard-backspace
          </v-icon>
        </v-btn>
        <v-row>
          <v-col cols="4">
            <v-card
              class="mx-auto pa-3 mb-5 movie-image-card"
              max-width="100%"
              max-height="600"
            >
              <v-card-title>
                <h3>{{ movie.title }}</h3></v-card-title
              >
              <v-img
                style="border: 2px solid rgb(252, 206, 2)"
                class="white--text align-end"
                max-height="300px"
                :src="img_url + movie.image_path"
              >
                <v-card-title>
                  <h4>{{ movie.title }}</h4></v-card-title
                >
              </v-img>

              <v-card-subtitle class="py-2 white--text">
                Title: {{ movie.title }}
              </v-card-subtitle>

              <v-card-text class="white--text">
                <div>Description: {{ movie.description.split(".")[0] }}</div>
              </v-card-text>

              <v-row align="center" class="mr-3 my-2" justify="end">
                <v-btn icon
                  ><v-icon class="mr-1" color="warning">
                    mdi-heart
                  </v-icon></v-btn
                >
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-btn icon
                  ><v-icon class="mr-1" color="primary" size="xx-large">
                    mdi-share-variant
                  </v-icon></v-btn
                >

                <span class="subheading">45</span>
              </v-row>
              <v-card-actions>
                <v-btn color="primary" width="100%"
                  ><v-icon
                    class="mx-2"
                    size="xx-large"
                 
                    >mdi-send</v-icon
                  >
                  Telegram kanalimiz
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card
              max-width="100%"
              max-height="550"
              width="100%"
              class="mx-auto pa-3 mb-5 movie-descrption-title"
            >
              <v-card-text>
                <h3 class="mb-3 white--text">
                  <span class="for-gold-title">Title: </span>{{ movie.title }}
                </h3>
                <p class="mb-4 white--text">
                  <span class="for-gold-title">Description: </span
                  >{{ movie.description}}
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="rgb(252, 206, 2)">
                  <v-icon color="rgb(100, 99, 99)"
                    >mdi-comment-processing-outline</v-icon
                  >
                  Comment
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <video
          v-if="movie.movie_path && movie.movie_path.id"
          class="videoPlay"
          id="myVideo"
          controls
          muted="muted"
        >
          <source :src="base_url + '/' + movie.movie_path.id" />
        </video>

        <div width="100%" class="bg-dark pa-2 ">
            <div align="center"
          justify="end">
                <h3 class="tx-gold">Comments</h3> 
            </div>
            
            <div class="chat-div" aligin="center">
                <div class="message d-flex mb-3 pa-2" v-for="(item, index) in messages" :key="index" aligin="center" justify="center">
                    <div class="avatar">
                        <v-img max-width="50" src="../../assets/avatar.png"></v-img>
                    </div>
                    <div class="ml-3">
                        <div class="username tx-gold">
                            {{item.username}}
                        </div>
                        <div class="description white--text">
                            {{item.message}}
                        </div>
                    </div>
                    

                </div>
            </div>
        </div>  
      
      </v-container>
    </div>
  </v-container>

 
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props:{
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      img_url: process.env.VUE_APP_FILE_URL,
      base_url: process.env.VUE_APP_FILE_URL + "api/movies/play_video",
      messages:[
            {
                username: "farxod",
                message:"Salim"
            },
            {
                username: "farxod",
                message:"Salim"
            },
            {
                username: "farxod",
                message:"Salim"
            }
        ]
    };
  },
  methods: {},
  computed: {
    bgImage() {
      let style = `
          background-image: url('${this.img_url + this.movie.image_path}');
          background-size: cover;
          background-position: center;
        `
        console.log(style);
      return style;
      
    },
    ...mapGetters({
      movie: "movies/getMovieToPlay",
    }),
  },
  async created() {
    await this.init();
  },
  methods: {
    async init(){
      this.$overlay(true)
      await this.$store.dispatch("movies/show", this.id)
      this.$overlay(false)
      
    },

  },
};
</script>
<style src="../../styles/main-style.css">
</style>
<style>
.main-container {
  padding: 20px 40px !important;
  margin: 0px auto !important;
  
    max-width: 1400px;
  background-color: rgb(252, 206, 2) !important;
}
.divider {
  height: 10vh !important;
}
.video-play-div {
  margin: 0 auto !important;
  padding: 0;
  max-width: 100%;
}
.videoPlay {
  width: 100%;
  height: 70vh;
  background-color: black;
}
.movie-image-card {
  background-color: rgb(100, 99, 99) !important;
  color: whitesmoke !important;
  float: left;
  
}
.movie-descrption-title {
  background-color: rgb(100, 99, 99) !important;
  color: whitesmoke !important;
  float: left;
  
}
#container {
  width: 70%;
}
.bg-gold{
    background-color: rgb(252, 206, 2) !important;
}
.bg-dark{
    background-color: rgb(100, 99, 99) !important;
}
.tx-gold{
    color: rgb(252, 206, 2) !important;
}
.tx-dark{
    color: rgb(100, 99, 99) !important;
}
.for-gold-title {
  color: rgb(252, 206, 2);
}
.username{
    font-size: 20px !important;
}
.message{
    border: 2px solid rgb(252, 206, 2);
    border-top-left-radius: 20px;
    border-bottom-right-radius: 20px;
    max-width: 400px;
}
</style>