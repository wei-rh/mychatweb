<template>
  <div class="all-container">
    <div class="left-container">
      <div class="chat-list">
        <div class="newchat" id="newchat">+ New Chat</div>
      </div>
    </div>
    <div class="right-container">
      <div class="content" ref="content">
        <button :disabled="this.loading" class="loading" @click="loadMore"><span>{{ this.loadtext }}</span></button>
        <div v-for="(message, index) in historyMessage" :key="index" :class="message.role + '-message'">
          {{ message.content }}
        </div>
      </div>
      <div class="input-area">
        <textarea v-model="currentMessage"></textarea>
        <div class="button-area">
          <button @click="sendMessage">发 送</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="../components/index.css"></style>

<script>
export default {
  data() {
    return {
      historyMessage: [], // 存储历史数据
      currentMessage: "", // 用于存储当前消息
      page: 0, // 记录当前页码
      loading: false,
      loadtext: '显示之前的消息',
      is_stream: false,
      is_history: true
    };
  },
  mounted() {
    this.getChatHistory();
  },
  methods: {
    addMessage(text, sender) {
      this.historyMessage.push({ role: sender, content: text });
    },
    updateMessage(newContent) {
      const lastMessage = this.historyMessage[this.historyMessage.length - 1];
      lastMessage.content += newContent;
    },
    sendMessage() {
      const message = this.currentMessage.trim();
      this.addMessage(message, 'user');
      this.currentMessage = ''
      this.$axios.post("/api/onechat/", { "sid": 0, "input_text": message, 'is_history': this.is_history }).then(res => {
        this.addMessage(res.data.answer, 'bot')
      })
    },
    async sendStreamMessage() {
      const message = this.currentMessage.trim();
      this.addMessage(message, 'user');
      this.currentMessage = '';
      const self = this;
      this.$axios.post('/api/onechatstream/', {"sid":"0", "input_text": message, 'is_history': this.is_history}, { responseType: 'stream' }).then(async function(res){ // 添加 async 关键字
        self.addMessage('', 'bot')
        for await (let chunk of res.data) { // 添加 for await 循环
          self.updateMessage(chunk)
          console.log(self.historyMessage[self.historyMessage.length-1]['content'])
        }
      });
    },
    getChatHistory() {
      // 请求聊天记录
      this.$axios.get("/api/recentrecords", { params: { page: this.page } }).then(res => {
        if (!res.data.chat_history.length) {
          this.loading = true
          this.loadtext = "没有更多了"
        }
        res.data.chat_history.forEach(element => {
          this.historyMessage.unshift({ role: 'bot', content: element.fields.bot_output });
          this.historyMessage.unshift({ role: 'user', content: element.fields.user_input });
        });
      });
    },
    loadMore() {
      console.log(111)
      this.page++; // 页码加1
      this.getChatHistory(); // 获取下一页聊天记录
    }
  },
};
</script>