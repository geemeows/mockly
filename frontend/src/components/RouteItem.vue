<script setup>
import "@ztrehagem/vue-accordion/style.css";
import { ref, defineProps, computed } from "vue";
import { VueAccordion } from "@ztrehagem/vue-accordion";
import JsonEditorVue from "json-editor-vue";

const colorsMap = new Map([
  ["POST", "green"],
  ["GET", "blue"],
  ["DELETE", "red"],
  ["PUT", "orange"],
  ["PATCH", "orange"],
]);

const expanded = ref(false);
const props = defineProps(["mockPath", "url", "method", "delay", "response"]);
const path = props.mockPath.split("/");
const file = ref(path[path.length - 1]);
const modifiedResponse = ref(props.response);
const modifiedURL = ref(props.url);
const modifiedDelay = ref(props.delay);
const modifiedMethod = ref(props.method);

const submitChanges = () => {
  console.log({
    modifiedResponse: modifiedResponse.value,
    modifiedURL: modifiedURL.value,
    modifiedDelay: modifiedDelay.value,
    modifiedMethod: modifiedMethod.value,
  });
};

const routeItemClasses = computed(() => [
  "route-item",
  colorsMap.get(props.method),
]);

const routeContentClasses = computed(() => [
  "route-content",
  colorsMap.get(props.method),
]);
</script>

<template>
  <li>
    <div
      :style="{
        marginBottom: !expanded ? '15px' : '0',
        borderRadius: expanded ? '4px 4px 0 0' : '4px',
      }"
      :class="routeItemClasses"
      @click="expanded = !expanded"
    >
      <div
        :class="[
          'method',
          props.method === 'POST' ? 'post-method' : '',
          props.method === 'GET' ? 'get-method' : '',
          props.method === 'DELETE' ? 'delete-method' : '',
          props.method === 'PUT' || props.method === 'PATCH'
            ? 'put-patch-method'
            : '',
        ]"
      >
        {{ props.method }}
      </div>
      <div class="url">
        <div class="mock-url">{{ props.url }}</div>
        <div class="mock-file">({{ file }})</div>
      </div>
    </div>

    <VueAccordion :expanded="expanded">
      <div :class="routeContentClasses">
        <div class="route">
          <div class="route-config">
            <label for="url">URL</label>
            <input
              id="url"
              class="route-input"
              type="text"
              v-model="modifiedURL"
            />
            <label for="url">Method</label>
            <select id="url" class="route-input" v-model="modifiedMethod">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="DELETE">DELETE</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
            </select>
            <label for="url">Delay(in milliseconds)</label>
            <input
              id="url"
              class="route-input"
              type="number"
              v-model="modifiedDelay"
            />
            <button class="update-btn" @click="submitChanges">
              Update Mock
            </button>
          </div>
          <div class="response-editor">
            <JsonEditorVue
              class="editor"
              v-model="modifiedResponse"
              :main-menu-bar="false"
              :navigation-bar="false"
              :status-bar="false"
              mode="text"
            />
          </div>
        </div>
      </div>
    </VueAccordion>
  </li>
</template>

<style scoped>
.route-item {
  border: 1px solid;
  padding: 10px 15px;
  width: 100%;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.route-content {
  padding: 10px 15px;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 0 0 4px 4px;
  border: 1px solid;
  border-top: 0;
  color: #000;
}

.green {
  background: rgba(73, 203, 144, 0.4);
  border-color: #49cb90;
}

.blue {
  background: rgba(97, 175, 254, 0.4);
  border-color: #61affe;
}

.red {
  background: rgba(249, 62, 61, 0.2);
  border-color: #f93e3d;
}

.orange {
  background: rgba(252, 161, 47, 0.2);
  border-color: #fca12f;
}

.method {
  color: #fff;
  padding: 3px 7px;
  font-weight: bold;
  border-radius: 4px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.post-method {
  background: #49cb90;
}

.get-method {
  background: #61affe;
}

.delete-method {
  background: #f93e3d;
}

.put-patch-method {
  background: #fca12f;
}

.url {
  width: 100%;
  color: #000;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.mock-url {
  font-weight: bold;
}

.mock-file {
  color: #999;
  font-weight: bold;
  text-decoration: underline;
  font-size: 13px;
}
.route {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.route-config {
  width: 40%;
  padding: 15px 10px;
}

.response-editor {
  width: 60%;
}

.route-input {
  width: 100%;
  border: 2px solid #aaa;
  border-radius: 4px;
  margin: 0 0 10px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}

label {
  font-weight: 600;
}

.update-btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 0;
  color: #fff;
  font-weight: bold;
  background: #5ba4fc;
  cursor: pointer;
  border-radius: 4px;
}
.update-btn:hover {
  background: #5896ed;
  transition: all 0.5s ease;
}
</style>
