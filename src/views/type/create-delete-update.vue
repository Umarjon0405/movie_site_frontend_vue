<template>
    <v-container>
        <v-dialog v-model="dialog" width="600">
            <v-card>
                <v-card-title>
                    <h3>{{title}}</h3>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        outlined
                        dense
                        prepend-inner-icon="mdi-rename-box"
                        v-model="editing_type.title"
                    />
                    
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="save" text color="success" small>Tasdiqlash</v-btn>
                    <v-btn @click="clear" text color="error" small>Bekor qilish</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="delete_dialog" width="600">
            <v-card>
                <v-card-title>
                    <h3>Turni o'chirish</h3>
                </v-card-title>
                <v-card-text>
                    <h4>Siz ushbu turni o'chirmoqchimisiz?</h4>
                    
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="deleteType" text color="success" small>Tasdiqlash</v-btn>
                    <v-btn @click="clear" text color="error" small>Bekor qilish</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

const defaultType = {
    id: null,
    type:'',
    active:''
}

export default {
    data() {
        return {
            dialog: false,
            delete_dialog: false,
            editing_type: { ...defaultType },
        }
    },
    computed:{
        title(){
            if(this.editing_type.id)return "Turni tahrirlash"
            return "Yangi tur yaratish"
        }
    },
    methods:{
        clear(){
            this.editing_user = {}
            this.dialog = false,
            this.user_id = '',
            this.delete_dialog = false
        },
        show( type = null ) {
            this.editing_type = { ...type }
            this.dialog = true
        },
        async save(){
            try {
                if (!this.editing_type.id) {
                    const response = await this.$store.dispatch(`types/createType`, this.editing_type)
                    this.$toast.success(response.data.message || 'Amaliyot bajarildi');
                }else{
                    const response = await this.$store.dispatch(`types/updateType`, this.editing_type)
                    this.$toast.success(response.data.message || 'Amaliyot bajarildi');
                }
                this.clear();
            } catch (error) {
                return this.toast.error(error.response.data.message || 'Xatolik yuz berdi');
                
            }
        },
        async deleteType(id){
            try {
                const response = await this.$store.dispatch(`types/deleteType`, id)
                this.$toast.success(response.data.message || 'Amaliyot bajarildi');
            } catch (error) {
                this.$toast.success(error.response.data.message || 'Xatolik yuz berdi!');
                
            }
        }
    }
}
</script>