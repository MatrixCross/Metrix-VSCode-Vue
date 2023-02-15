
import * as vscode from "vscode";

export async function setStorage(context: vscode.ExtensionContext, key: string, value: string) {
    context.globalState.update(key, value); 
}

export async function getStorage(context: vscode.ExtensionContext, key: string) {
    context.globalState.get(key);
}