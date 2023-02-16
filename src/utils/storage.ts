
import * as vscode from "vscode";

export async function setStorage(context: vscode.ExtensionContext, key: string, value: string) {
    const res = await context.globalState.update(key, value); 
    return res;
}

export async function getStorage(context: vscode.ExtensionContext, key: string) {
    const res = await context.globalState.get(key);
    return res;
}