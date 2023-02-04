import * as vscode from "vscode";
import { TodoListWebView } from "./components/sidebar";

export function activate(context: vscode.ExtensionContext) {
  const todolistWebview = new TodoListWebView(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      TodoListWebView.viewId,
      todolistWebview
    )
  );
}

export function deactivate() {}
