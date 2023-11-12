<template>
  <div id="chat-app">
    <app-header />
    <div class="container-fluid h-100">
      <div class="row h-100">
        <chat-layout-sidebar />
        <div class="col-9 d-flex flex-column h-100 main-chat-area">
          <message-list :messages="messages" class="flex-grow-1 overflow-auto" />
          <message-input-form @send="sendMessage" />
        </div>
      </div>
    </div>
  </div>
</template>



<script>
  import MessageList from './components/MessageList.vue';
  import MessageInputForm from './components/MessageInputForm.vue';
  import AppHeader from './components/AppHeader.vue';
  import io from 'socket.io-client';
  import ChatLayoutSidebar from './components/ChatLayoutSidebar.vue';

  export default {
    components: {
      AppHeader,
      ChatLayoutSidebar,
      MessageList,
      MessageInputForm,
    },
    data() {
      return {
        messages: [],
        socket: null
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
      sendMessage(newMessage) {
        const message = {
          id: Date.now(),
          text: newMessage,
          owner: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          icon: 'path_to_your_icon',
          self: true
        };

        this.socket.emit('chat message', message);
        this.addMessage(message);
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

<style>
  #chat-app {
    height: 89vh;
  }

  .main-chat-area{
    background-color: #ffffff	;
  }

  .sidebar {
    width: 200px;
    height: 100%;
  }
</style>