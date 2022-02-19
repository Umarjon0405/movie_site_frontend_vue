<template>
<v-container fluid class="body-container">
    <div class="home">
    <v-container fluid class="header-container">
        <div class="container1 fluid">
          <div class="header">
            <v-row class="nav-row">
              <v-col cols="2">
                <div class="logo-div">
                  <v-img
                    src="../../assets/abstract-cinema-logo-FF3FCB96BB-seeklogo.com.png"
                    max-width="40px"
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
    </v-container>
  
    <div class="container2 fluid">
      <p class="add-title">Recently add</p>
      <div class="slider">
        <v-carousel>
          <v-carousel-item
            max="200px"
            v-for="(item, i) in sliders"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
    <div class="container3">
      <p class="all-title">All cinema</p>
      <div class="cinema-card">
        <v-row>
          <v-col
            lg="3"
            sm="5"
            md="6"
            v-for="(movie, index) in movies.data"
            :key="index"
          >
            <v-card class="mx-auto" max-width="400">
              <a @click="openVideoDialog(movie.id)">
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="file_path + movie.image_path"
                  lazy-src="../../assets/abstract-cinema-logo-FF3FCB96BB-seeklogo.com.png"
                >
                  <v-card-title class="video-card-image-title">{{
                    movie.title
                  }}</v-card-title>
                </v-img>
                
              </a>
              <v-card-text class="video_card_text">
                <v-card-title class="video_card_text_title">{{
                  movie.title
                }}</v-card-title>
                <v-card-title class="video_card_text_type">{{
                  movie.type.title
                }}</v-card-title>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-pagination
              :length="totalMovie"
              :total-visible="7"
              v-model="options.page"
            />
          </v-col>
        </v-row>
      </div>
    </div>
    <footer class="footer fluid">
      <v-row>
        <v-col cols="3">
          <div class="logo-div">
            <v-img
              src="../../assets/abstract-cinema-logo-FF3FCB96BB-seeklogo.com.png"
              max-width="30px"
            ></v-img>
            <div class="pl-4">
              <span class="logo-span-footer">CinemaTV</span>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="footer-btn">
            <v-btn color="blue-grey" class="ma-2 white--text">
              <v-icon left size="20px" color="error"> mdi-youtube </v-icon>
              Upload
            </v-btn>
            <v-btn color="blue-grey" class="ma-2 white--text">
              <v-icon left size="20px" color="success"> mdi-facebook </v-icon>
              Upload
            </v-btn>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="footer-btn">
            <p class="pt-2 ma-0">
              POWERED BY <span class="copyright">MR.BAKIROV</span>
            </p>
          </div>
        </v-col>
      </v-row>
    </footer>
  </div>
</v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components:{},
  data: () => {
    return {
      file_path: process.env.VUE_APP_FILE_URL,
      options: {
        page: 1,
      },
      sliders: [
        {
          src: require("../../assets/abstract-cinema-logo-FF3FCB96BB-seeklogo.com.png"),
        },
        {
          src: require("../../assets/abstract-cinema-logo-FF3FCB96BB-seeklogo.com.png"),
        },
      ],
    };
  },
  watch: {
    "options.page": { handler: "init" },
  },
  async created() {
    await this.init();
  },
  computed: {
    ...mapGetters({
      movies: "movies/getMovies",
      totalMovie: "movies/getTotalMovie",
    }),
  },
  methods: {
    async init() {
      this.$overlay(true);
      await this.$store.dispatch("movies/fetchActiveMovies", {
        page: this.options.page,
      });
    },
    openVideoDialog(id){
      this.$router.push({
        name: 'OpenVideo',
        params: {
          id: id
        }
      })
    }
  },
};
</script>
<style>
.video_card_text {
  background-color: rgba(100, 99, 99, 0.692) !important;
  color: whitesmoke !important;
}
.video-card-image-title {
  background-color: rgba(2, 214, 252, 0.664) !important;
  font-size: 15px !important;
}
.video_card_text_title {
  padding: 0 !important;
  font-size: 15px !important;
}
.video_card_text_type {
  padding: 0 !important;
  font-size: 13px !important;
}
</style>
<style src="../../styles/main-style.css">
</style>
<style>
  .header-container{
    
    padding: 0 !important;
    
    width: 100%;
    z-index: 10000;
  }
  .body-container{
    border-radius: 5px !important;
    background-image: url("../../assets/bg-home.jpg") !important;
    background-attachment: fixed;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat, repeat;
  }
</style>