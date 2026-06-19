import { loadEnv } from 'vite';
console.log(loadEnv('development', process.cwd()));
export default {
  root: 'src',
  publicDir: '../public',
  envDir: "../",
  build: {
    outDir: '../dist',
  },
};
