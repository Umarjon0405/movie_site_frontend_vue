<template>
    <v-container fluid>
        <v-dialog v-model="dialog" width="700" >
            <v-card>
                <v-card-title>{{cardTitle}}</v-card-title>
                <v-card-text>
                    <v-text-field outlined dense prepend-icon="mdi-format-title" label="Nomi" v-model="editingMovie.title"/>
                    <v-file-input
                        label="Videoni yulkash"
                        filled
                        v-model="editingMovie.movie"
                        required
                        accept="video/*"
                        prepend-icon="mdi-movie"
                    />
                    <v-file-input
                        v-model="editingMovie.movie_img"
                        label="Video uchun sarlavha rasmi yulkash"
                        filled
                        required
                        accept="image/*"
                        prepend-icon="mdi-camera"
                    />
                    <v-autocomplete
                        prepend-icon="mdi-directions-fork"
                        v-model="editingMovie.type_id"
                        :items="items"
                        required
                        item-text="title"
                        item-value="id"
                        clearable
                        outlined dense
                        label="Turini tanlang"
                    ></v-autocomplete>

                    <v-textarea outlined dense prepend-icon="mdi-card-text-outline" label="Vide haqida izoh" v-model="editingMovie.description"/>
                
                </v-card-text>
               
                {{editingMovie}}
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="save()" text color="success" small>Tasdiqlash</v-btn>
                    <v-btn @click="clearDialog()" text color="error" small>Bekor qilish</v-btn>
                </v-card-actions>
                
                
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>

const defaultMovie = {
    id: '',
    type_id: '',
    title:"",
    movie:"",
    movie_img:"",
    description:"",
}
export default {
    data(){
        return {
            dialog: false,
            type:'',
            editingMovie: {...defaultMovie},
            items: [
                {
                    title: "bir",
                    id:1
                },
                {
                    title: "ikiki",
                    id:2
                }
            ]
        }
    },
    computed:{
        cardTitle(){
            if (this.editingMovie.id) return "Filmni Tahrirlash"
            return "Filmni yuklash"
        },
        
    },
    methods:{
        show(movie){
            this.editingMovie= {...movie}
            this.dialog = true
        },
        clearDialog(){
            this.editing_user = {}
            this.dialog = false
            // this.delete_dialog = false
        },
        async save() {
            let formData = new FormData();
            try {
                this.$overlay(true)
                formData.append("title", this.editingMovie.title);
                formData.append("description", this.editingMovie.description);
                formData.append("movie", this.editingMovie.movie);
                formData.append("movie_img", this.editingMovie.movie_img);
                formData.append("type_id", this.editingMovie.type_id);
                const response = await this.$store.dispatch('movies/createMovie', formData);
                console.log(response);
                this.$toast.success(response.data.message || "Malumot saqland")
                this.clearDialog();
                this.$overlay(false)
            } catch (error) {
                this.clearDialog(); 
                // console.log(error.data);
               return this.$toast.error(error.response.data.message || 'Xatolik yuz berdi');
            }
        },
        picFile(event){
        //    this.editingMovie.movie = event.target.files[0];
           console.log(this.editingMovie.movie);
        }
        
    }
}
</script>