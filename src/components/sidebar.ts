import * as vscode from "vscode";
import * as fs from "fs";
import path = require("path");
import MissionVue from "../vue/src/components/Mission.vue";

export class TodoListWebView implements vscode.WebviewViewProvider {
  public static viewId: string = "todolist-view";

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(this.context.extensionPath),
        vscode.Uri.joinPath(this.context.extensionUri, 'src', 'vue', 'dist')
      ],
    };

    const distPath = path.join(
      this.context.extensionPath,
      "src",
      "vue",
      "dist"
    );
    const distUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "src", "vue", "dist")
    );
    const indexPath = path.join(distPath, "index.html");
    let indexhtml = fs.readFileSync(indexPath, "utf8");
    indexhtml = indexhtml.replace(/=\"\//g, '="' + distUri.toString() + "/");
    webviewView.webview.html = indexhtml;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    async function MissionAddHandle() {
      const message = {
        command: 'hello, webview'
      };
      webviewView.webview.postMessage(message);
    }
    
    // 处理插件api交互
    webviewView.webview.onDidReceiveMessage(async data => {
			// 策略模式
      const apiMap : {
        [apiName: string]: (...args: any[]) => Promise<any>
      } = {
        '任务1': MissionAddHandle,
        '任务2': MissionAddHandle
      };
      console.log('vscode收到', data);
      apiMap[data]();
		});
  }
}
