# vscode-keepalivedconf-extension

This is the example for extension for VS code. As my goal is to demonstrate how to write a extension with VS Code, I've kept the model object very simple. 

## Features

- Extension Manifest
- Activation Events
    - onLanguage
    - onCommand
- Contribution Points
    - configuration
    - languages
- VS Code API
    - `registerCommand(command: string, callback: (args: any[]) => any, thisArg?: any): Disposable`
    - `registerHoverProvider(selector: DocumentSelector, provider: HoverProvider): Disposable`
    - `registerCompletionItemProvider(selector: DocumentSelector, provider: CompletionItemProvider, ...triggerCharacters: string[]): Disposable`


**Enjoy It!**
