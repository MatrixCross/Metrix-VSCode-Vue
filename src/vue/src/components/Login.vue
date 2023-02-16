<template>
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      :rules="rules"
      label-placement="top"
      size="medium"
    >
      <n-form-item label="username" path="user.name">
        <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="password" path="user.password">
        <n-input
          v-model:value="formValue.user.password"
          placeholder="输入密码"
        />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="handleValidateClick">
          验证
        </n-button>
      </n-form-item>
    </n-form>
</template>

<script lang="ts" setup>
import { defineComponent, ref, defineEmits } from "vue";
import { FormInst, NInput, NForm, NFormItem, NButton, useMessage } from "naive-ui";

const emits = defineEmits(['choose'])

const vscodeApi = acquireVsCodeApi();
const message = useMessage();

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
      const message = {
        cmd: "login",
        args: { ...formValue.value.user },
      };
      vscodeApi.postMessage(JSON.stringify(message));
    } else {
      console.log(errors);
    }
  });
}

window.addEventListener('message', event => {
  console.log('加了', event)
    // 处理从主程序接收到的消息
    const msg = event.data;  
    // 获取消息内容
    if (msg.cmd === 'login' && msg.res === 'success') {
        // 登录成功
        message.success('登陆成功')
        setTimeout(() => {
          emits('choose', 'mission')
        }, 3000) 
    } else {
        message.error('登录不成功')
    }
  });
</script>

<script lang="ts">
defineComponent({
  name: 'Login'
})
</script>