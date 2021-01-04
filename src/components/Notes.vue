<template>
  <div class="notes">
    <div class="note" :class="{
      full: !grid,
      green: note.importance !== 1 && note.importance !== 2,
      orange: note.importance === 1,
      red: note.importance === 2,
      }" v-for="(note, index) in notes" :key="index"
      :id="index" >
      <div class="note-header" :class="{ full: !grid}"
        @dblclick.prevent="editNote(index)">
        <p v-if="!grid"></p>
        <p>{{ note.title }}</p>
        <p style="cursor: pointer;" @click.prevent="removeNote(index)">X</p>
      </div>
      <div v-show="inputEdit === index">
        <input v-model="editTitle"
        type="text"
        placeholder="Title edit"
        @keyup.enter="save(index)"
        @keyup.esc="cancel">
      </div>
      <div class="note-body" >
        <p>{{ note.descr }}</p>
        <input v-show="inputEdit === index"
        v-model="editDescr"
        type="text"

        placeholder="Description edit"
        @keyup.enter="save(index)"
        @keyup.esc="cancel">
        <span>{{ note.date }}</span>
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
    document.addEventListener('click', this.onClick);
  },
  methods: {
    onClick(event) {
      if (event.target.id === this.inputEdit + '' ||
      event.target.parentElement.id === this.inputEdit + '' ||
      event.target.parentElement.parentElement.id === this.inputEdit + '') {
        return;
      }
      else this.cancel();
    },
    removeNote(index) {
      this.$emit('remove', index);
    },
    editNote(index) {
      this.editTitle = '',
      this.editDescr = '',
      this.inputEdit = index;
    },
    save(index) {
      if (!this.editTitle) return;
      this.$emit('edit', index, this.editTitle, this.editDescr);
      this.editNote(-1);
    },
    cancel() {
      this.editNote(-1);
    },
    console() {
      console.log('e');
      console.log('t');
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
}
</style>
