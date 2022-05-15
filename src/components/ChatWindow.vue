<template>
  <div class="chat-window">
    <div :ref="(el) => (messages = el)" v-if="documents" class="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id">
        <span class="name">{{ doc.name }}</span>
        <span class="message">{{ doc.message }}</span>
        <span class="created-at">{{ doc.createdAt }}</span>
      </div>
    </div>
    <div v-else>Some problem</div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { computed, onUpdated } from "@vue/runtime-core";
import getCollection from "../composables/getCollection";

const { documents } = getCollection("messages");
const messages = ref(null);

onUpdated(() => {
  messages.value.scrollTop = messages.value.scrollHeight;
});

const formattedDocuments = computed(() => {
  if (documents.value) {
    return documents.value.map((doc) => {
      const time = formatDistanceToNow(doc.createdAt.toDate(), { locale: ru });
      return { ...doc, createdAt: time };
    });
  }
});
</script>

<style scoped>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>