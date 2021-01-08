<template>
  <!-- new note -->
  <div class="new-note">
    <div class="half">
      <label>Title</label>
      <input type="text" v-model="note.title">
    </div>
    <div class="half">
      <p>Важность:</p>
      <div v-for="item in importance" :key="item.id" class="importance" >
        <input v-model="note.importance" type="radio" :id="item.id"
        name="importance" :value="item.id" :checked="item.id === 0" >
        <label for="item.id">{{item.title}}</label>
      </div>
    </div>
    <div>
      <label>Description</label>
      <textarea v-model="note.descr"></textarea>
    </div>
    <button class="btn btnPrimary" @click.prevent="addNote()">New note</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      note: {
        title: '',
        importance: 0,
        descr: '',
      },
      importance: [
        {id: 0, title: 'Обычное', checked: true},
        {id: 1, title: 'Важное', checked: false},
        {id: 2, title: 'Безотлагательное', checked: false}
      ]
    };
  },
  methods: {
    addNote() {
      let {title, descr, importance} = this.note;
      if (!title || !descr) {
        this.$emit('message', 'Title or importance can not be empty');
        return;
      };

      this.$store.dispatch('addNote', {title: title, descr: descr, importance: importance});

      this.note.title = '';
      this.note.importance = 0;
      this.note.descr = '';
      this.$emit('message', null);
    },
  },
};
</script>

<style lang="scss">
.new-note {
  text-align: center;
  .btn {
    margin: 10px;
  }
  .half {
    width: 50%;
    display: inline-table;
  }
  .importance {
    input, label {
      display: inline;
      width: auto;
      margin-right: 5px;
      margin-bottom: 0;
    }
  }
}

</style>