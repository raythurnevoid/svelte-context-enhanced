import type { LayoutLoad } from './$types.js';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';

/*
  Code to get the parent pckage.json content

	const fs = require('fs');
	const path = require('path');
	const packageJson = require(path.join(cwd(), 'package.json'));
	console.log(packageJson);
*/

export const load: LayoutLoad = async (event) => {
	let packageJson = JSON.parse(await readFile(resolve(cwd(), 'package.json'), 'utf-8'));

	if (!packageJson.name.includes('svelte-context-enhanced')) {
		packageJson = JSON.parse(await readFile(resolve(cwd(), '..', 'package.json'), 'utf-8'));
		if (!packageJson.name.includes('svelte-context-enhanced')) {
			throw new Error('Could not find root package.json');
		}
	}

	return {
		meta: {
			description: packageJson.description as string,
			keywords: packageJson.keywords as string[]
		}
	};
};
