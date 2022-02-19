<template>
    <v-container>
        <v-dialog v-model="dialog" width="600">
            <v-card>
                <v-card-title>{{ title }}</v-card-title>
                <v-card-text>
                    <v-text-field
                        outlined
                        dense
                        prepend-inner-icon="mdi-rename-box"
                        v-model="editing_user.full_name"
                    />
                    <v-text-field
                        outlined
                        dense
                        prepend-inner-icon="mdi-account"
                        v-model="editing_user.username"
                    />
                    <v-text-field
                        outlined
                        dense
                        type="password"
                        prepend-inner-icon=""
                        v-model="editing_user.password"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="save" text color="success" small>Saqlash</v-btn>
                    <v-btn @click="clear()" color="error" text small>Bekor qilish</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="delete_dialog" width="600">
            <v-card>
                <v-card-title>Siz ushbu foydalanuvchi o'chirilishini hohlaysizmi?</v-card-title>
                
                <v-card-actions>
                <v-spacer/>
                    <v-btn @click="deleteUser()" text color="success" small>Tasdiqlash</v-btn>
                    <v-btn @click="clear()" color="error" text small>Bekor qilish</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

const defaultUser = {
    id: null,
    full_name: '',
    username: '',
    password: ''
}

export default {
    data() {
        return {
            editing_user: { ...defaultUser },
            dialog: false,
            user_id: '',
            delete_dialog: false
        }
    },
    computed: {
        title(){
            if(this.editing_user.id)return "Foydalanuvchini tahrirlash"
            return "Yangi foydalanuvchi yaratish"
        }
    },
    methods: {
        show( user = null ) {
            this.editing_user = { ...user }
            this.dialog = true
        },
        showDeleteDialog( id = null ) {
            this.user_id = id
            this.delete_dialog = true
        },
        clear(){
            this.editing_user = {}
            this.dialog = false,
            this.user_id = '',
            this.delete_dialog = false
        },
        async save(){
            if(this.editing_user.id){
                try {
                    const response = await this.$store.dispatch("users/updateUser", this.editing_user)
                    this.dialog = false
                    this.$toast.success(
                        response.data.message || "Foydalanuvchi muvaffaqiyatli uzgartirildi"
                    )
                } catch (error) {
                     this.$toast.error(
                        error.response&&error.response.data.message || "Xatolik yuz berdi. Qaytadan urinib ko'ring"
                    )
                }
            } else {
                try {
                    const response = await this.$store.dispatch("users/createUser", this.editing_user)
                    this.dialog = false
                    await this.$store.dispatch("users/fetchUsers")
                    this.$toast.success(
                        response.data.message || "Foydalanuvchi muvaffaqiyatli yaratildi!"
                    )
                } catch (error) {
                    this.$toast.error(
                        error.response&&error.response.data.message || "Xatolik yuz berdi. Qaytadan urinib ko'ring"
                    )
                }
            }
        },
        async deleteUser(){
            try {
                const response = await this.$store.dispatch('users/deleteUser', this.user_id);
                this.delete_dialog = false
                this.$toast.success(response.data.message || "Foydalanuvchi muvaffaqiyatli o'chirildi!")
            } catch (error) {
                this.$toast.error(
                        error.response&&error.response.data.message || "Xatolik yuz berdi. Qaytadan urinib ko'ring"
                )
            }
        }
    }
}
</script>