<template>
  <n-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
    size="medium"
  >
    <n-form-item label="username" path="user.name">
      <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
    </n-form-item>
    <n-form-item label="password" path="user.password">
      <n-input v-model:value="formValue.user.password" placeholder="输入密码" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        验证
      </n-button>
    </n-form-item>
  </n-form>

  <pre
    >{{ JSON.stringify(formValue, null, 2) }}
  </pre>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FormInst } from "naive-ui";
const vscodeApi = acquireVsCodeApi();

const formRef = ref<FormInst | null>(null);
let formValue = ref({
  user: {
    name: "",
    password: "",
  },
});
let rules = {
  user: {
    name: {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
    password: {
      required: true,
      message: "请输入密码",
      trigger: ["input"],
    },
  },
};
function handleValidateClick(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      vscodeApi.postMessage({
        cmd: 'login',
        value: formValue.value
      });
    } else {
      console.log(errors);
    }
  });
}
</script>
