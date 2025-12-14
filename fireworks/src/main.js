import { FireworkBody, ParticleSystem } from "./particle_system.js";
import { Vec2 } from "./vector.js";
import { random_range } from "./random.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width = ctx.canvas.width;
let height = ctx.canvas.height;
let last_time = 0;
let acc_time = 0;
let firework_timer = 1;
let firework_max_timer = random_range(0.5, 1.5);
let particleSystem;
let stop = false;
function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    width = ctx.canvas.width;
    height = ctx.canvas.height;
}
addEventListener("resize", (_evt) => {
    resize();
    draw();
});
addEventListener('load', () => {
    resize();
    particleSystem = new ParticleSystem();
    loop();
});
addEventListener('keydown', (evt) => {
    if (evt.key === ' ') {
        stop = !stop;
    }
});
function loop() {
    draw();
    requestAnimationFrame(loop);
}
function draw() {
    let dt = (performance.now() - last_time) / 1000;
    if (stop) {
        dt = 0;
    }
    acc_time += dt;
    last_time = performance.now();
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0.0, "#040919");
    gradient.addColorStop(0.75, "#060d27");
    gradient.addColorStop(0.90, "#091337");
    gradient.addColorStop(1.0, "#131c45");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    firework_timer += dt;
    if (firework_timer > firework_max_timer) {
        firework_max_timer = random_range(0.5, 2.5);
        firework_timer = 0;
        let count = random_range(1, 8);
        for (let i = 0; i < count; i++) {
            particleSystem.particles.push(new FireworkBody(particleSystem, new Vec2(random_range(-200, 200) + width / 2, height), new Vec2(random_range(-250, 250), random_range(-1000, -1300))));
        }
    }
    particleSystem.update(dt);
    particleSystem.render(ctx);
}
//# sourceMappingURL=main.js.map