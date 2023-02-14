/// <reference types="vite/client" />
interface vscode {
    postMessage(message: any): void;
}

declare function acquireVsCodeApi(): vscode;

declare const vscode: vscode;