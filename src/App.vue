<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <div id="app">
            <h3>{{ title }}</h3>
            <message :message='message' v-if="message"/>
            <!-- new note -->
            <div class="new-note">
              <input type="text" v-model="note.title">
              <textarea v-model="note.descr"></textarea>
              <button @click.prevent="addNote()">New note</button>
            </div>
            <!-- note list -->
            <div class="notes">
              <div class="note" v-for="(note, index) in notes" :key="index">
                <div class="note-header">
                  <p>{{ note.title }}</p>
                </div>
                <div class="note-body">
                  <p>{{ note.descr }}</p>
                  <span>{{ note.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<script>
import message from '@/components/Message.vue';

export default {
  data() {
    return {
      title: 'Notes app',
      message: null,
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
    message
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
  },
}
</script>
