<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn> 
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="isAuthenticated=false" outline color="blue" nuxt to="/login"> Log In </v-btn>
      <v-btn v-else-if="isAuthenticated=true" outline color="green" @click="logout">Log Out</v-btn>

    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>:-) Shern's Nuxt Project</span>
    </v-footer>
  </v-app>
</template>

<script>
import mapGetters from 'vuex'

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'favorite', title: 'Welcome', to: '/' },
        { icon: 'account_circle', title: 'Login', to: '/login' },
        { icon: 'add_to_photos', title: 'Register', to: '/register' },                            
        { icon: 'alarm_on', title: 'Attendance', to: '/Aclassrooms' },
        //{ icon: 'people', title: 'Students', to: '/students' },
        //{ icon: 'alarm_on', title: 'Attendance', to: '/attendance' },
        { icon: 'chrome_reader_mode', title: 'Subjects', to: '/subjects' },
        { icon: 'account_balance', title: 'Classrooms', to: '/classrooms' }          
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Edu Plus',
    }
  },
  // computed: {
  //   ...mapGetters({
  //     isAuthenticated: 'users/isAuthenticated'
  //   })
  // },
  methods: {
    async logout() {
      console.log('logout')
      return this.$store.dispatch('users/LOGOUT')
        .then(res => {
          this.$router.replace('/')
        })
        .catch(err => {
          this.error = err + ''
        })
    }
  }
}
</script>

<style>
</style>
