import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
		nodeResolve() // tells Rollup how to find date-fns in node_modules
	]
};
