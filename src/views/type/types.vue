<template>
    <v-container fluid>
        <v-row class="elevation-1 pa-2 my-1" dense justify="center" align="center">
            <v-col cols="12" sm="12">
                <v-card-actions>
                    <span class="headTitle primary--text">Type</span>
                    <v-spacer/>
                    <v-btn dense small depressed color="primary" @click="openDialog"><v-icon>mdi-plus</v-icon>qo'shish</v-btn>
                </v-card-actions>
                
            </v-col>
        </v-row>
        <v-row class="elevation-1 pa-2 my-1" dense justify="center" align="center">
            <v-col cols="12" sm="12">
                <v-data-table
                    dense
                    hide-default-footer
                    disable-pagination
                    :loading="loading"
                    loading-text="Ma'lumotlar yuklanmoqda"
                    disable-filtering
                    :options.sync="options"
                    :headers="headers"
                    :items="getTypes"
                    no-data-text="Ma'lumotlar mavjud emas !!!"
                >
                <template #item.actions="{ item }">
                     <div class="d-flex aligin-center justify-start">
                         <v-switch
                            style="margin: 10px 0px !important"
                            class="mx-5px"
                            fluid
                            small
                            @click="updateActive(item.id)"
                            v-model="item.active"
                            color="success"
                        />
                        <v-btn
                            @click="openDialog(item)"
                            rounded
                            small
                            depressed
                            class="btn-action-update"
                        >
                            <v-icon color="warning" class="update-action-icon"
                            >mdi-pencil</v-icon
                            >
                        </v-btn>
                        <v-btn
                            @click="deleteDialog(item.id)"
                            rounded
                            small
                            depressed
                            class="btn-action-delete"
                        >
                            <v-icon color="warning" class="delete-action-icon"
                            >mdi-delete</v-icon
                            >
                        </v-btn>
                     </div>
                    
                </template>
                </v-data-table>
            </v-col>
        </v-row>
        <CreateDeleteUpdate ref="create_delete_update"/>
    </v-container>
</template>
<script>
import CreateDeleteUpdate from "./create-delete-update";
import { mapGetters } from "vuex";
export default {
    components: {CreateDeleteUpdate},
    data() {
        return{
            loading: false, 
            search: '',
            options: {
                page: 1
            },
            headers: [
                {
                   text: 'ID',
                   value: 'id',
                   class: 'green lighten-3',
                   divider: true 
                },
                {
                    text: 'Nomi',
                    value: 'title',
                    class: 'green lighten-3',
                    divider: true
                },
                {
                    text: "Amallar",
                    value: 'actions',
                    class: 'green lighten-3',
                    divider: true
                }
            ]
        }
    },
    async created(){
        await this.init()
    },
    computed: {
      ...mapGetters({
          getTypes: 'types/getTypes' || []
      })
    },
    watch: {
        
    },
    methods: {
        openDialog(item){
           this.$refs.create_delete_update.show(item);
        },
        deleteDialog(id){
           this.$refs.create_delete_update.deleteType(id);
        },
        async init(){
            this.loading = true
            await this.$store.dispatch('types/fetchTypes');
            this.loading = false
        },
        async updateActive(id){
            try {
                const response = await this.$store.dispatch('types/updateActive', id)
                this.$toast.success(response.data.message || "Amaliyot bajarildi!")    
            } catch (error) {
                this.$toast.error(error.response.data.message || "Xatolik yuz berdi. Qaytadan urinib ko'ring!")    
            }
            
        }

    }
}
</script>
<style src="../../styles/main-style.css">
</style>