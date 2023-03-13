import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		dts({
			include: ['./src/lib/package']
		})
	],
	build: {
		lib: {
			entry: ['./src/lib/package/index.ts'],
			formats: ['es']
		},
		target: 'esnext',
		ssr: true,
		minify: false,
		rollupOptions: {
			output: {
				preserveModules: true
			}
		}
	}
});
