<script>
import axios from "axios";

export default {
  data() {
    return {
      userMessage: "",
      messages: [],
      isWaitingForAI: false,
    };
  },
  methods: {
    async sendMessage() {
      if (this.userMessage.trim() === "" || this.isWaitingForAI) return;

      // Add user message
      this.messages.push({
        type: "user",
        text: this.userMessage,
      });

      const userInput = this.userMessage;
      this.userMessage = "";
      this.isWaitingForAI = true;

      try {
        // Update base URL if backend is on a different server
        const response = await axios.post("http://localhost:3000/api/chat", {
          message: userInput,
        });

        // Add AI response
        this.messages.push({
          type: "ai",
          text: response.data.message,
        });
      } catch (error) {
        console.error("Error:", error);
        this.messages.push({
          type: "ai",
          text: "Sorry, something went wrong.",
        });
      } finally {
        this.isWaitingForAI = false;
      }
    },
  },
};
</script>

<template>
  <div
    class="h-auto flex p-4 flex-col sm-responsive mb-responsive lg-responsive min-w-80"
  >
    <!-- Chat messages -->
    <div class="overflow-y-auto pt-4">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="{
          'justify-end': message.type === 'user',
          'justify-start': message.type === 'ai',
        }"
        class="flex items-start mb-4"
      >
        <div v-if="message.type === 'ai'" class="flex-shrink-0 px-2">
          <img
            src="https://i.pinimg.com/736x/23/45/07/23450780678577f79b81c293a1a2442a.jpg"
            alt="AI Avatar"
            class="w-10 h-10 rounded-full shadow-lg"
          />
        </div>

        <div v-if="message.type === 'user'" class="flex-shrink-0 order-2 px-2">
          <img
            src="https://i.pinimg.com/736x/e5/ca/f0/e5caf03c05a7556df7431fb635fc93b2.jpg"
            alt="User Avatar"
            class="w-10 h-10 rounded-full shadow-lg"
          />
        </div>

        <div
          :class="{
            'chat chat-start chat-bubble-secondary break-words':
              message.type === 'ai',
            'chat chat-end chat-bubble-primary break-words':
              message.type === 'user',
          }"
          class="p-3 rounded-xl shadow-md inline-block max-w-xs md:max-w-md lg:max-w-lg whitespace-pre-line"
        >
          <p
            v-if="message.type === 'user'"
            class="text-sm font-semibold chat-bubble-primary text-end"
          >
            You:
          </p>
          <p
            v-if="message.type === 'ai'"
            class="text-sm font-semibold chat-bubble-secondary"
          >
            AI:
          </p>
          <p class="break-words">{{ message.text }}</p>
        </div>
      </div>

      <!-- AI Typing Indicator -->
      <div v-if="isWaitingForAI" class="flex items-start mb-4 justify-start">
        <div class="flex-shrink-0 p-2">
          <img
            src="https://i.pinimg.com/736x/23/45/07/23450780678577f79b81c293a1a2442a.jpg"
            alt="AI Avatar"
            class="w-10 h-10 rounded-full shadow-lg"
          />
        </div>
        <div
          class="chat chat-start chat-bubble-secondary p-3 rounded-xl shadow-md inline-block"
        >
          <p class="text-sm font-semibold">
            <span class="typing-animation">...</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Chat input -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-between min-w-99 sm-responsive mb-responsive lg-responsive"
    >
      <input
        v-model="userMessage"
        @keypress.enter="sendMessage"
        type="text"
        placeholder="Type a message..."
        class="w-full mr-2 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-200 max-w-auto"
      />
      <button
        @click="sendMessage"
        :disabled="isWaitingForAI"
        class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
        :class="{ 'opacity-50 cursor-not-allowed': isWaitingForAI }"
      >
        {{ "Send" }}
      </button>
    </div>
  </div>
</template>

<style scoped>

@media (min-width: 0px) {
  .sm-responsive {
    margin-bottom: 60px;
  }
}
@media (min-width: 812px) {
  .mb-responsive {
    margin-bottom: 0px;
  }
}

@media (min-width: 1080px) {
  .lg-responsive {
    margin-bottom: 0px;
  }
}

.typing-animation {
  display: inline-block;
  overflow: hidden;
  animation: ellipsis 1.5s infinite;
}

@keyframes ellipsis {
  0% {
    width: 0;
  }
  25% {
    width: 0.25em;
  }
  50% {
    width: 0.5em;
  }
  75% {
    width: 1em;
  }
  100% {
    width: 0;
  }
}
</style>
