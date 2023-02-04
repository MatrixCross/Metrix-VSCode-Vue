import * as vscode from "vscode";
import * as fs from "fs";
import path = require("path");

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

    console.log("indexhtml源", indexhtml);

    indexhtml = indexhtml.replace(/=\"\//g, '="' + distUri.toString() + "/");

    console.log("indexhtml滤", indexhtml);

    webviewView.webview.html = indexhtml;
  }
}
