<template>
  <div id="chat-app">
    <b-container fluid class="px-0">
      <b-row no-gutters class="flex-column h-100">
        <b-col class="chat">
          <div
            class="d-flex flex-column align-items-start mx-4 my-4"
            v-for="msg in messages"
            :key="msg.id"
            :class="{ 'align-items-end': msg.self }">
            <div class="d-flex"
              :class="{ 'flex-row-reverse': msg.self }">
              <b-avatar :src="msg.icon" rounded="circle" class="align-self-end" />
              <div class="message-body mx-2">
                <div class="message-content p-2">
                  {{ msg.text }}
                </div>
              </div>
              <div class="message-time text-muted">
                  {{ msg.time }}
                </div>
            </div>
          </div>
        </b-col>
        <b-col cols="12">
          <div class="message-box d-flex p-3">
            <b-form-input
              :value="newMessage"
              @input="handleInput"
              @compositionstart="onCompositionStart"
              @compositionend="onCompositionEnd"
              placeholder="メッセージを入力してください..."
              class="mr-2"
            />
            <b-button variant="primary" @click="sendMessage">送信</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { BContainer, BRow, BCol, BFormInput, BButton, BAvatar } from 'bootstrap-vue-next';
import io from 'socket.io-client';

export default {
  components: {
    BContainer,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BAvatar
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      socket: null,
      composing: false // このフラグはIME入力の状態を追跡します
    };
  },
  mounted() {
    this.socket = io('http://localhost:3000');
    
    this.socket.on('chat message', (message) => {
      if (message.id !== this.messages[this.messages.length - 1]?.id) {
        this.addMessage({ ...message, self: false });
      }
    });
  },
  methods: {
    onCompositionStart() {
      this.composing = true;
    },
    onCompositionEnd(event) {
      this.composing = false;
      // IME入力が終わったら、強制的にメッセージを更新
      this.updateMessage(event);
    },
    updateMessage(event) {
      // IME入力が確定していないときは、newMessageを更新しない
      if (!this.composing) {
        this.newMessage = event.target.value;
      }
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const message = {
          id: Date.now(),
          text: this.newMessage,
          owner: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          icon: 'path_to_your_icon',
          self: true,
        };
        
        this.socket.emit('chat message', message);
        this.addMessage(message);
        // メッセージ送信後、入力フィールドをクリア
        this.newMessage = '';
      }
    },
    addMessage(message) {
      this.messages.push(message);
    }
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
};
</script>

<style scoped>
#chat-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat {
  flex-grow: 1;
  overflow-y: auto;
}

.message-body {
  max-width: 75%;
  background-color: #f7f7f7;
  border-radius: 10px;
}

.message-time {
  align-self: flex-end;
  font-size: 0.75em;
  text-align: right;
}

.message-box input {
  flex-grow: 1;
  border-radius: 15px;
  margin-right: 5vh;
}

.message-box button {
  border-radius: 15px;
  width: 10vw;
}

.align-items-start {
  align-items: flex-start !important;
}

.align-items-end {
  align-items: flex-end !important;
}

.flex-row-reverse {
  flex-direction: row-reverse;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  /* Add responsive styles if necessary */
}
</style>
