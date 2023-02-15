import * as vscode from "vscode";
import * as fs from "fs";
import path = require("path");
import { Login } from "../api/user";
import { setStorage } from "../utils/storage";

export class TodoListWebView implements vscode.WebviewViewProvider {
  public static viewId: string = "todolist-view";

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
    const curContext = this.context;

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
      
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    async function LoginHandle(username: string, password: string) {
      const res = await Login(username, password);
      setStorage(curContext, 'token', res.data.token);
    }
    
    // 处理插件api交互
    webviewView.webview.onDidReceiveMessage(async data => {
			// 策略模式
      const apiMap : {
        [apiName: string]: (...args: any[]) => Promise<any>
      } = {
        '任务1': MissionAddHandle,
        '任务2': MissionAddHandle,
        'login': LoginHandle,
      };
      console.log('vscode收到', data);
      apiMap[data.cmd](...data.args);
		});
  }
}
