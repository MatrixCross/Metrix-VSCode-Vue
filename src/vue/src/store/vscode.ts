import { defineStore } from "pinia";

// 第一个参数是应用程序中 store 的唯一 id
export const useVScodeStore = defineStore("vscode", {
  state: () => {
    return {
      uri: "",
    };
  },
});
