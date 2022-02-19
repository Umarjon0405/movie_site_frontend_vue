<template>
  <v-container fluid>
    <v-row class="elevation-1 pa-2 my-1" dense justify="center" align="center">
      <v-col cols="12" sm="12">
        <v-card-actions>
          <span class="headTitle primary--text">Users</span>
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
          :server-items-length="totalUsers"
          :headers="headers"
          :items="users.data"
          class="elevation-1"
          no-data-text="Ma'lumotlar mavjud emas !!!"
        >
          <template #item.actions="{ item }">
            <div class="d-flex aligin-center justify-start">
              <v-switch
                style="margin: 10px 0px !important"
                class="mx-5px"
                fluid
                small
                @click="updateAdmin(item.id)"
                v-model="item.admin"
                color="success"
              >
              </v-switch>
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
                @click="openDeleteDialog(item.id)"
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
    <CreateOrUpdate ref="create_or_update" />
    <v-footer fixed v-if="!loading" app inset class="py-5">
      <v-row justify="center" align="center">
        <v-pagination
          :length="totalUsers"
          :total-visible="7"
          v-model="options.page"
        />
      </v-row>
    </v-footer>
  </v-container>
</template>
<script>
import CreateOrUpdate from "./create-or-update";
import { mapGetters } from "vuex";
export default {
  components: { CreateOrUpdate },
  data() {
    return {
      loading: false,
      search: "",
      options: {
        page: 1,
      },
      headers: [
        {
          text: "ID",
          value: "id",
          class: "green lighten-3",
          divider: true,
        },
        {
          text: "FISh",
          value: "full_name",
          class: "green lighten-3",
          divider: true,
        },
        {
          text: "Username",
          value: "username",
          class: "green lighten-3",
          divider: true,
        },
        {
          text: "Amallar",
          value: "actions",
          class: "green lighten-3",
          divider: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      totalUsers: "users/getTotalUsers",
      users: "users/getUsers",
    }),
  },
  watch: {
    "options.page": { handler: "init" },
  },
  async created() {
    await this.init();
  },
  methods: {
    openDialog(user = null) {
      this.$refs.create_or_update.show(user);
    },
    openDeleteDialog(id = null) {
      this.$refs.create_or_update.showDeleteDialog(id);
    },
    async init() {
      this.loading = true;
      await this.$store.dispatch("users/fetchUsers", {
        page: this.options.page,
        search: this.search,
      });
      this.loading = false;
    },
    async updateAdmin(id) {
      try {
        this.loading = true;
        const response = await this.$store.dispatch("users/updateAdmin", id);
        this.loading = false;
        this.$toast.success(response.data.message || "Amaliyot bajarildi");
      } catch (error) {
        this.$toast.error(
          (error.response && error.response.data.message) ||
            "Xatolik yuz berdi. Qaytadan urinib ko'ring"
        );
      }
    },
  },
};
</script>
<style src="../../styles/main-style.css">
</style>