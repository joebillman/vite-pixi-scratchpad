import {defineConfig} from 'vite'

const fileName = `app`;
const releaseBuild = false;

let fileOutput = `js/${fileName}.js`;

if(releaseBuild)
{
    fileOutput = `js/${fileName}.min.js`;
}

export default defineConfig({
    base: `/rhd-student-client/`,
    build: {
        minify: releaseBuild,
        rollupOptions: {
            output: {
                dir: `dist`,
                assetFileNames: `js/[name].[ext]`,
                chunkFileNames: fileOutput,
                entryFileNames: fileOutput,
            }
        },
        sourcemap: !releaseBuild,
    },
    server: {
        open: true,
    }
})