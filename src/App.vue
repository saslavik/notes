<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <header>
        <div class="logo">
          <img src="https://3lhowb48prep40031529g5yj-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/logo-vuejs-min.png" alt="Vue">
        </div>
        <div class="auth">
          <span class="login" @click="login = true">
            Login
          </span>
          <modalLogin v-show="login" @close="login = false" @change="changeModal()"/>
          <!-- registration modal -->
          <span class="login" @click="registration = true">
            SignUp
          </span>
          <modalRegistration v-show="registration"
          @close="registration = false"
          @change="changeModal()" />
        </div>
      </header>
      <section>
        <div class="container">
            <message :message='message' v-if="message"/>
            <!-- new note -->
            <newNote @message='message = $event' />

            <div class="note-header" style="margin: 36px 0">

              <!-- title -->
              <h3>{{ title }}</h3>

              <!-- search -->
              <search
                :value="search"
                placeholder="Find your Note"
                @search="search = $event" />

              <!-- icons view controls -->
              <div class="icons">
                <svg :class="{ active: grid }" @click="grid = true" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                <svg :class="{ active: !grid }" @click="grid = false" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
              </div>
            </div>
            <!-- note list -->
            <notes :notes="notesFilter" :grid="grid" />
          </div>
      </section>
    </div>
  </div>

</template>

<script>
import message from '@/components/Message.vue';
import newNote from '@/components/NewNote.vue';
import search from '@/components/Search.vue';
import notes from '@/components/Notes.vue';
import modalLogin from '@/components/ModalLogin.vue';
import modalRegistration from '@/components/ModalRegistration.vue';

export default {
  data() {
    return {
      noteList: null,
      title: 'Notes app',
      search: '',
      message: null,
      grid: true,
      login: false,
      registration: false,
    };
  },
  components: {
    message,
    notes,
    newNote,
    modalLogin,
    modalRegistration,
    search,
  },
  created() {
    this.noteList = this.$store.getters.noteList;
  },
  computed: {
    notesFilter () {
      let array = this.noteList,
      search = this.search;
      if (!search) return array;
      search = search.trim().toLowerCase();
      array = array.filter(function(item) {
        if (item.title.toLowerCase().indexOf(search) !== -1 || item.descr.toLowerCase().indexOf(search) !== -1) {
          return item;
        };

      } )
      return array;
    },
  },
  methods: {
    changeModal() {
      this.login = !this.login;
      this.registration = !this.registration;
    },
  },
}
</script>
<style>

.wrapper {
  align-items: center;
}

.wrapper-content {
  width: 960px;
}

header {
  display: flex;
  padding: 10px 0 !important;
  justify-content: space-between;
}

.logo {
  width: 120px;
}
.auth {
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login {
  display: block;
  line-height: 100%;
  align-items: center;
  cursor: pointer;
}
p.changeModal {
  font-size: 12px !important;
  margin: 20px 0 !important;
}
</style>
