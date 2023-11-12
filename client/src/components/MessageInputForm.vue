<template>
  <div class="message-box d-flex p-4">
    <input
      v-bind:value="newMessage"
      v-on:input="newMessage = $event.target.value"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
      placeholder="メッセージを入力してください..."
      class="mr-2"
    />
    <b-button variant="primary" @click="sendMessage">送信</b-button>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue-next';

export default {
  components: {
    BButton
  },
  data() {
    return {
      newMessage: '',
      composing: false
    };
  },
  methods: {
    onCompositionStart() {
      this.composing = true;
    },
    onCompositionEnd() {
      this.composing = false;
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.$emit('send', this.newMessage);
        this.newMessage = '';
      }
    }
  }
};
</script>

<style scoped>
  .message-box {
    display: flex;
    align-items: center;
  }

  .message-box input {
    padding: 7px 14px;
    flex-grow: 1;
    margin-right: 2vw;
    border-radius: 15px;
  }

  .message-box button {
    padding: 7px 14px;
    border-radius: 15px;
    flex-basis: 15%;
    background-color: #FFFF66;
    border-color: #FFFF66;
    color: #111111;
  }

  .message-box button:hover {
    background-color: #FFAD90;
    border-color: #FFAD90;
  }
</style>