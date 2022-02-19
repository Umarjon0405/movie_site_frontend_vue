<template>
    <v-dialog fullscreen v-model="dialog">
        <v-card>
            <v-container id="container">
                <v-card-text>
                    <v-btn
                    icon
                    @click="closeDialog()"
                    >
                    <v-icon
                        left
                        large
                        size="20px"
                        color="error"
                        >
                    mdi-keyboard-backspace
                        </v-icon>
                    </v-btn>
                    <h3>{{newFilm.title}}</h3>
                    <p>
                        {{newFilm.description}}
                    </p>
                    <video v-if="newFilm.movie_path.id" class="videoPlay" id="myVideo" controls muted="muted">
                        <source :src="base_url +'/'+ newFilm.movie_path.id">
                    </video>
                    <pre>

                    {{newFilm}}
                    </pre>
                </v-card-text>
            </v-container>
        </v-card>
            
        
    </v-dialog>
</template>

<script>
const defaultMovie = {
    id: null,
    title: null,
    description: null,
    type_id: 2,
    image_path: null,
    movie_path: {
        id: null,
        path: null,
        movie_id: null
    },
    type: {
        id: null,
        title: null
    }
}
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            dialog: false,
            newFilm: {...defaultMovie},
            base_url: process.env.VUE_APP_FILE_URL +'api/movies/play_video',
        }
    },
    computed: {

    },
    methods:{
        show(movie){
            this.newFilm= {...movie}
            this.dialog = true
        },
        closeDialog(){
            this.dialog = false
            this.newFilm = {...defaultMovie}
        }
    }
}
</script>
<style>
.videoPlay{
    width: 100%;
    height: 70vh;
    background-color: black;
}
#container{
    width: 70%;
}
</style>