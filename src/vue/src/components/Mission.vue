<template>
    <div v-for="item in list" :key="item.name" @click="onClick(item.name)">
     {{ item.name }}
    </div>
</template>

<script lang="ts" setup>
// Get the vscode object
const vscodeApi = acquireVsCodeApi();

const list = [
    {name: '任务1'},
    {name: '任务2'}
]

function onClick(data: string) {
    vscodeApi.postMessage(data)
}

window.addEventListener('message', event => {
    console.log('vue中收到的信息', event)
});
</script>