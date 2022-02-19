<template>
    <v-container fluid>
        <v-row class="elevation-3 pa-2 my-1" dense justify="center" align="center">
            <v-col cols="12" sm="12">
                <v-card-actions>
                <span class="headTitle primary--text">Movies</span>
                <v-spacer />
                <v-btn
                    @click="openDialog(null)"
                    depressed
                    small
                    rounded
                    color="primary"
                    >Qo'shish</v-btn
                >
                </v-card-actions>
            </v-col>
        </v-row>
  
        <v-container>
           
            <v-row>
                <v-col cols="12">                    
                    <v-tabs
                        background-color="deep-purple accent-4"
                        class="elevation-6 my-1"
                        center-active
                        dark
                        grow
                        justify="center" align="center"
                    >
                        <v-tab >
                            Barchasi
                        </v-tab>
                        <v-tab
                            v-for="(type, item) in activeTypes"
                            :key="item"
                            
                        >
                            {{ type.title }}
                        </v-tab>
                    </v-tabs>                    
                </v-col>
                <v-col cols="12">

                </v-col>
            </v-row>
            <v-row>
                <v-col lg="2" sm="6" md="6" v-for="(movie, index) in movies.data" :key="index">
                   <v-card
                        class="mx-auto"
                        max-width="400"
                    >
                        <a @click="openPlayPage(movie.id)">
                            <v-img
                                class="white--text align-end"
                                height="200px"
                                :src="file_path + movie.image_path"
                                lazy-src=""
                            >
                                <v-card-title>{{movie.title}}</v-card-title>
                            </v-img>
                        </a>
                        <v-card-title class="text-center">{{movie.title}}</v-card-title>
                        <v-card-title class="text-center">{{movie.type.title}}</v-card-title>
                    </v-card>
                </v-col> 
            </v-row>
            <v-footer fixed app inset class="py-5">
                <v-row justify="center" align="center">
                    <v-pagination
                    :length="totalMovie"
                    :total-visible="7"
                    v-model="options.page"
                    />
                </v-row>
            </v-footer>
        </v-container>
        <CreateUpdateDialog ref="create_update_dialog"/>
        <AdminVideoPlayDialog ref="admin_video_play_dialog"/>
    </v-container>
</template>
<script>
import CreateUpdateDialog from "./create-update"
import AdminVideoPlayDialog from "./adminPlayMovie"
import { mapGetters } from "vuex";
export default {
    components: {CreateUpdateDialog, AdminVideoPlayDialog},
    data (){
        return{
            file_path: process.env.VUE_APP_FILE_URL,
            options: {
                page: 1,
            },
        }
    },
    computed: {
        ...mapGetters({
            totalMovie: "movies/getTotalMovie",
            movies: "movies/getMovies",
            movieToPlay: "movies/getMovieToPlay",
            activeTypes: "types/getActiveTypes"
        }),
    },
    watch: {
        "options.page": { handler: "init" },
    },
    async created(){
        await this.init();
    }, 
    methods: {
        async init(){
            this.$overlay(true)
            await this.$store.dispatch("movies/fetchMovies", {
                page: this.options.page,
            });
            await this.$store.dispatch("types/fetchActiveTypes");
            this.$overlay(false)
            
        },
        openDialog(movie){
            this.$refs.create_update_dialog.show(movie);
        },
        async openPlayPage(id){
            try {
                await this.$store.dispatch('movies/show', id)
                this.$refs.admin_video_play_dialog.show(this.movieToPlay);
                // this.$router.push(`/admin/playVideo/`);
            } catch (error) {
                this.$tost.error(error.response.data.message|| 'Xatolik yuz berdi')
            }
           
        }
    }
}
</script>
<style src="../../styles/main-style.css">
</style>