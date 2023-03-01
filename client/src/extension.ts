/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	Executable,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	const serverModule = context.asAbsolutePath(
		'/home/thomas/lsp_test/target/debug/lsp_test'
	);
	const server: Executable = 
	{
		command: '/home/thomas/lsp_test/target/debug/lsp_test',
		args: [],
		options: { shell: false, detached: false }
	};
	const serverOptions: ServerOptions = server;
	
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [
              {scheme: 'file', language: 'vb'},
              {scheme: 'file', language: 'xml'},
		],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions
	);
	client.registerProposedFeatures();
	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
