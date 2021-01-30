<template>
  <div class="notes" @click.prevent="cancel()">
    <div class="note" :class="{
      full: !grid,
      green: note.importance !== 1 && note.importance !== 2,
      orange: note.importance === 1,
      red: note.importance === 2,
      }" v-for="(note, index) in notes" :key="note.id"
      :id="note.id"
      @click.stop="">
      <div class="note-header" :class="{ full: !grid}"
        @dblclick.prevent="editNote(note.id)">
        <p v-if="!grid"></p>
        <p>{{ note.title }}</p>
        <p style="cursor: pointer;" @click.prevent="removeNote(note.id, index)">X</p>
      </div>
      <div v-show="inputEdit === note.id">
        <input v-model="editTitle"
        type="text"
        placeholder="Title edit"
        @keyup.enter="save(note.id, index)"
        @keyup.esc="cancel">
      </div>
      <div class="note-body" >
        <p>{{ note.descr }}</p>
        <input v-show="inputEdit === note.id"
        v-model="editDescr"
        type="text"

        placeholder="Description edit"
        @keyup.enter="save(note.id, index)"
        @keyup.esc="cancel">
        <div class="time">
          <span>{{ when(note.date) }}</span>
          <span>{{ fromNow(note.date) }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  props: {
    notes: {
      type: Array,
      required: true,
    },
    grid: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      inputEdit: -1,
      editTitle: '',
      editDescr: '',
    };
  },
  mounted() {
    document.body.addEventListener('keyup', e => {
      if (e.key === 'Escape') this.cancel();
    });
    document.body.addEventListener('click', e => {
      if (e.target.class !== 'note') this.cancel();
    });
    document.body.addEventListener('keyup', e => {
      if (e.key === 'Enter' && this.inputEdit >= 0) this.save(this.inputEdit);
    });
  },
  methods: {
    removeNote(id, index) {
      const note = {id, index}
      this.$store.dispatch('removeNote', note);
    },
    editNote(id) {
      this.editTitle = '',
      this.editDescr = '',
      this.inputEdit = id;
    },
    save(id, index) {
      if (!this.editTitle) return;
      const note = {};
      note.title = this.editTitle,
      note.descr = this.editDescr;

      this.$store.dispatch('editNote', {note, id, index});
      this.editNote(null);
    },
    cancel() {
      this.editNote(null);
    },
    when(date) {
      return this.$moment(date).lang('ru').format('LLL')
    },
    fromNow(date) {
      return this.$moment(date).fromNow();
    }
  },
};
</script>

<style lang="scss">
.notes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0;
}
.note {
  width: 48%;
  padding: 18px 20px;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 14px;
  transition: all .25s cubic-bezier(0.02, 0.01, 0.47, 1);
  box-shadow: 0 30px 30px rgba(0,0,0,.02);
  &:hover {
    box-shadow: 0 30px 30px rgba(0,0,0,.04);
    transform: translate(0,-6px);
    transition-delay: 0s !important;
  }
  &.full {
    width: 100%;
    text-align: center;
  }
  &.green {
    background-color: rgba($color: green, $alpha: 0.18);
  }
  &.orange {
    background-color: rgba($color: orange, $alpha: 0.18);
  }
  &.red {
    background-color: rgba($color: red, $alpha: 0.18);
  }
}
.note-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  h1 {
    font-size: 32px;
  }
  p {

    color: #402caf;
    font-size: 22px;
  }
  svg {
    margin-right: 12px;
    color: #999;
    &.active {
      color: #402caf;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &.full {
    // justify-content: center;
    p {
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.note-body {
  p {
    margin: 20px 0;
  }
  span {
    font-size: 14px;
    color: #999;
  }
  .time {
    display: flex;
    justify-content: space-between;
  }
}
</style>
