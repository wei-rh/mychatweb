<template>
  <div>
    <div v-for="(content, index) in chatContent" :key="index">
      <p v-if="content.role === 'user'">{{ content.content }}</p>
      <p v-else>{{ content.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatContent: []
    }
  },
  mounted() {
    const eventSource = new EventSource('http://localhost:8000/api/onechatstream/', {
      headers: {
        'Authorization': localStorage.elementToken ,
        'Content-Type': 'text/event-stream'
      }
    });
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.chatContent.push(data);
    };
  }
}
</script>