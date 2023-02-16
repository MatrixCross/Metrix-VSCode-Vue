<template>
  <component :is="activeModule.component" @choose="handChange"></component>
</template>

<style scoped></style>

<script lang="ts" setup>
import Mission from "./components/Mission.vue";
import Login from "./components/Login.vue";
import { Component, computed, ref } from "vue";

interface Module {
    key: string;
    component: Component;
}

const modules: Module[] = [
    {
        key: 'login',
        component: Login,
    },
    {
        key: 'mission',
        component: Mission,
    },
];

const activeModule = computed(() => {
    const active: Module = { ...modules[0] };
    const findItem = modules.find((item) => item.key === isChoose.value);
    if (findItem) {
        Object.assign(active, findItem);
    }
    return active;
});

let isChoose = ref("Login");

function handChange(id: string) {
  isChoose.value = id;
}
</script>
