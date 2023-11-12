<template>
  <div class="chat mt-2">
    <div
      class="d-flex flex-column align-items-start mb-2 mx-4 my-4"
      v-for="msg in messages"
      :key="msg.id"
      :class="{ 'align-items-end': msg.self }">
      <div class="d-flex" :class="{ 'flex-row-reverse': msg.self }">
        <b-avatar :src="msg.icon" rounded="circle" />
        <div class="message-body mx-2">
          <div class="message-content p-2">{{ msg.text }}</div>
          <div class="message-time text-muted">{{ msg.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { BAvatar } from 'bootstrap-vue-next';
  export default {
    components: {
      BAvatar
    },
    props: ['messages']
  };
</script>

<style scoped>
  .chat {
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .chat::-webkit-scrollbar {
      display: none;
  }

  .message-body {
    max-width: 75%;
    background-color: #F5F5DC;
    border-radius: 10px;
  }

  .message-time {
    align-self: flex-end;
    font-size: 0.75em;
    text-align: right;
  }
</style>