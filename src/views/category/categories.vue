<template>
    <v-container fluid>
          <v-row class="elevation-1 pa-2 my-1" dense justify="center" align="center">
            <v-col cols="12" sm="12">
                <v-card-actions>
                    <span class="headTitle primary--text">Category</span>
                    <v-spacer/>
                </v-card-actions>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters } from "vuex"
export default {
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
    computed: {
        ...mapGetters({
           
        })
    },
    watch: {
        
    },
    async created(){
        await this.init()
    },
    methods: {
        
    }
}
</script>