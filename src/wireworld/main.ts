import {run} from "./app.ts";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
if (!canvas) {
    throw new Error('Canvas not found');
}

run(canvas);