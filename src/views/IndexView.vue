<template>
  <div class="all-container">
    <div class="left-container">
      <div class="chat-list">
        <div class="newchat" id="newchat" @click="handleClick">+ New Chat</div>
        <div v-for="(session) in sessions" :key="session.id" class="session">
          <div class="session-title">
            {{ session.title }}
          </div>
          <div class="session-actions">
            <i class="fa fa-trash" @click="deleteSession(session)"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="right-container">


      <div class="content" ref="content">
        <button :disabled="this.loading" class="loading" @click="loadMore"><span>{{ this.loadtext }}</span></button>
        <div v-for="(message, index) in historyMessage" :key="index" :class="message.role + '-message'">
          <!-- {{ message.content }} -->
          <pre v-html="parseMarkdown(message.content)"></pre>
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
<style src="../assets/index.css"></style>
<!-- 在头部引入 Font Awesome 样式文件 -->

<script>
  import {marked} from 'marked';
  import hljs from 'highlight.js';
export default {
  data() {
    return {
      historyMessage: [], // 存储历史数据
      currentMessage: "", // 用于存储当前消息
      page: 0, // 记录当前页码
      loading: false,
      loadtext: '显示之前的消息',
      is_stream: false,
      is_history: true,
      sessions: [
        {
          id: 'session-1',
          title: 'Session 1',
          history: [],
        },
        {
          id: 'session-2',
          title: 'Session 2',
          history: [],
        },
      ],
    };
  },
  mounted() {
    this.getChatHistory();
  },
  methods: {
    parseMarkdown(text) {
        const renderer = new marked.Renderer();
        renderer.code = (code, language) => {
          const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
          return `<pre><code class="hljs ${validLanguage}">${hljs.highlight(validLanguage, code).value}</code></pre>`;
        };
        marked.setOptions({
          renderer,
          highlight: (code) => hljs.highlightAuto(code).value,
        });
        return marked(text);
      },
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
      }).catch(error => {
        this.$message.error(error.response.data[0])
      })
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
    },
    handleClick() {
      const session = {
        id: `session-${this.sessions.length + 1}`,
        title: `Session ${this.sessions.length + 1}`,
        history: [],
      };
      this.sessions.push(session);
    },
    deleteSession(session) {
      const index = this.sessions.indexOf(session);
      console.log(session)
      this.sessions.splice(index, 1);
    },
    

  },

};
</script>