<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <div id="app">
            <message :message='message' v-if="message"/>
            <!-- new note -->
            <newNote :note="note" @addNote="addNote()" />

            <div class="note-header">

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
            <notes :notes="notes" :grid="grid" @remove="removeNote"/>
          </div>
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

export default {
  data() {
    return {
      title: 'Notes app',
      search: '',
      message: null,
      grid: true,
      note: {
        title: '',
        descr: '',
      },
      notes: [
        {
          title: 'First Note',
          descr: 'Description for first note',
          date: new Date(Date.now()).toLocaleString(),
        },
        {
          title: 'Second Note',
          descr: 'Description for Second note',
          date: new Date(Date.now()).toLocaleString(),
        },
        {
          title: 'Third Note',
          descr: 'Description for Third note',
          date: new Date(Date.now()).toLocaleString(),
        },
      ],
    };
  },
  components: {
    message,
    notes,
    newNote,
    search,
  },
  methods: {
    addNote() {
      let {title, descr} = this.note;
      if (!title || !descr) {
        this.message = 'Title or descr can not be empty';
        return;
      };
      this.notes.push({
        title,
        descr,
        date: new Date(Date.now()).toLocaleString(),
      });
      this.note.title = '';
      this.note.descr = '';
      this.message = null;
    },
    removeNote(index) {
      this.notes.splice(index, 1);
    }
  },
}
</script>
