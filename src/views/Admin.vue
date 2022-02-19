<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <!-- <v-list-item v-for="item in items" :key="item.title" link> -->
        <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content> -->

        <v-list-item
          class="list_item"
          v-for="item in items"
          :key="item.title"
          v-if="!item.items"
          :to="item.to"
          :prepend-icon="item.icon"
          no-action
        >
          <template>
            <v-list-item-icon size="8" tile>
              <v-icon class="" color="dark">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="selectedMenu = item.title">
              <v-list-item-title class="text-wrap title_list">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-list-group
          class="list_item groupMenu"
          v-for="item in items"
          :key="item.title"
          no-action
          v-if="item.items"
        >
          <template v-slot:activator>
            <v-list-item-icon size="18" tile>
              <v-icon
                class=""
                style="background-color: unset !important"
                color="dark"
                >{{ item.icon }}</v-icon
              >
            </v-list-item-icon>
            <v-list-item-content
              class="text-wrap navTitle color--text"
              @click="selectedMenu = item.title"
            >
              <v-list-item-title class="text-wrap navTitlenavTitle title_list">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            class=""
            v-for="child in item.items"
            :to="child.to"
            :key="child.title"
          >
            <template>
              <v-list-item-icon size="8" tile>
                <v-icon
                  class=""
                  color="dark"
                  style="background-color: unset !important"
                  >{{ child.icon }}</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content @click="selectedMenu = child.title">
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-group>
        <!-- </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app class="app_bar">
      <v-app-bar-nav-icon
        class="dark--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="navTitle">{{ selectedMenu }}</v-toolbar-title>
      <v-spacer/>
      <v-btn 
      style="color:whitesmoke"
        @click="logOut"
        color="#1E88E5"
        class="ma-2 log-out-btn"
      ><v-icon id="log-out-icon">mdi-logout</v-icon>Log Out</v-btn>
    </v-app-bar>
    <v-main>
      <v-overlay v-model="$store.state.overlay">
        <v-progress-circular
          :size="100"
          color="amber"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "Admin",
  data() {
    return {
      drawer: false,
      selectedMenu: "Wellcome",
      items: [
        { title: "User", icon: "mdi-account", to: "/admin" },
        {
          title: "Settings",
          icon: "mdi-cog",
          items: [
            {
              title: "Type Setting",
              icon: "mdi-file",
              to: "/admin/type",
            },
            {
              title: "Category Setting",
              icon: "mdi-file",
              to: "/admin/category",
            },
          ],
        },
        { title: "Movies", icon: "mdi-movie", to: "/admin/movies" },
      ],
    };
  },
  methods: {
    async logOut(){
      localStorage.clear();
      this.$router.push("/login");
    }
  },
};
</script>