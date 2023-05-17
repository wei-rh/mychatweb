<template>
  <div class="all-container">
    <div class="left-container">
      <div class="chat-list">
        <div class="newchat" id="newchat">+ New Chat</div>
        <div v-for="(session) in sessions" :key="session.id" class="session">
          <div class="session-title">{{ session.title }}</div>
          <div class="session-actions"><i class="fa fa-trash"></i></div>
        </div>
      </div>
    </div>
    <div class="right-container">
      <div class="content" ref="content">
        <button :disabled="this.loading" class="loading" @click="loadMore"><span>{{ this.loadtext }}</span></button>
        <pre v-html="parseMarkdown(currentMessage)"></pre>
      </div>
      <div class="input-area">
        <textarea></textarea>
        <div class="button-area">
          <button @click="sendMessage">发 送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="../assets/index.css"></style>

<!-- 在头部引入 Font Awesome 样式文件 -->
<style>
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    background-color: #f6f8fa;
    border-radius: 3px;
    padding: 16px;
    margin: 16px 0;
  }

  pre code {
    font-size: 14px;
  }
</style>

<script>
  import {marked} from 'marked';
  import hljs from 'highlight.js';

  export default {
    data() {
      return {
        currentMessage: "要实现聊天内容的Markdown识别和代码高亮，可以使用第三方库marked和highlight.js。\n\n首先，在项目中安装marked和highlight.js：\n\n```\nnpm install marked highlight.js\n```\n\n然后，在组件中引入这两个库：\n\n```javascript\nimport marked from 'marked';\nimport hljs from 'highlight.js';\n```\n\n接着，在组件的methods中定义一个方法，用于将Markdown格式的文本转换为HTML格式，并对其中的代码块进行高亮处理：\n\n```javascript\nparseMarkdown(text) {\n  const renderer = new marked.Renderer();\n  renderer.code = (code, language) => {\n    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';\n    return `<pre><code class=\"hljs ${validLanguage}\">${hljs.highlight(validLanguage, code).value}</code></pre>`;\n  };\n  marked.setOptions({\n    renderer,\n    highlight: (code) => hljs.highlightAuto(code).value,\n  });\n  return marked(text);\n}\n```\n\n最后，在模板中使用v-html指令将转换后的HTML代码渲染到页面上：\n\n```html\n<div v-for=\"(message, index) in historyMessage\" :key=\"index\" :class=\"message.role + '-message'\" v-html=\"parseMarkdown(message.content)\"></div>\n```", // 用于存储当前消息

      };
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
    },
  };
</script>