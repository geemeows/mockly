<script setup>
import { ref, onMounted } from "vue";
import RouteItem from "./RouteItem.vue";
import { getMocks } from "../core/mocks.services";

const groups = ref([]);

onMounted(async () => {
  try {
    const { mocks } = await getMocks();
    groups.value = mocks;
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <ul>
    <div class="mock-group" v-for="mock in groups" :key="mock.group">
      <h3>{{ mock.group }}</h3>
      <RouteItem
        v-for="route in mock.mocks"
        :key="route.url"
        :mockPath="route.mockPath"
        :url="route.url"
        :method="route.method"
        :delay="route.delay"
        :response="route.response"
      />
    </div>
  </ul>
</template>

<style scoped>
.mock-group {
  background: #efefef;
  color: #000;
  padding: 5px 10px;
  margin-bottom: 15px;
  border-radius: 4px;
}

h3 {
  font-weight: bold;
  margin-bottom: 8px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
}
</style>
