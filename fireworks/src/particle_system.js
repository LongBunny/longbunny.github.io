import { Vec2 } from "./vector.js";
import { random_range } from "./random.js";
export class ParticleSystem {
    constructor() {
        this.particles = [];
    }
    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let particle = this.particles[i];
            if (particle.update(dt)) {
                this.particles.splice(i, 1);
                continue;
            }
        }
    }
    render(ctx) {
        for (let particle of this.particles) {
            particle.render(ctx);
        }
    }
}
export class Particle {
    constructor(system, position, velocity, size, color, lifetime = 5) {
        this.system = system;
        this.position = position;
        this.velocity = velocity;
        this.size = size;
        this.color = color;
        this.lifetime = lifetime;
    }
    update(dt) {
        this.position = this.position.add(this.velocity.mul(dt));
        if (this.lifetime !== -1) {
            this.lifetime -= dt;
            return this.lifetime <= 0;
        }
        else {
            return false;
        }
    }
    render(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#' + this.color;
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}
export class FireworkBody extends Particle {
    constructor(system, position, velocity) {
        super(system, position, velocity, 2, '634100', -1);
        this.system = system;
        this.position = position;
        this.velocity = velocity;
        this.colors = [
            'FF2A2A',
            'FF7A18',
            'FFD23F',
            'A8FF3E',
            '00E676',
            '2DE2E6',
            '2979FF',
            '8E2DE2',
            'FF4FD8',
        ];
        this.history = [];
    }
    update(dt) {
        this.velocity = this.velocity.add(new Vec2(0, 1000).mul(dt));
        this.history.push(this.position.clone());
        if (this.history.length > 10) {
            this.history.shift();
        }
        super.update(dt);
        if (this.velocity.y > 0) {
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            for (let i = 0; i < 300; i++) {
                this.system.particles.push(new FireworkPayload(this.system, this.position, Vec2.from_angle(Math.random() * Math.PI * 2).set_mag(random_range(10, 150)), color));
            }
            return true;
        }
        return false;
    }
    render(ctx) {
        this.history.forEach((pos, index) => {
            ctx.beginPath();
            ctx.fillStyle = '#' + this.color + (255 / 10 * index).toString(16).padStart(2, '0');
            ctx.arc(pos.x, pos.y, 2, 0, 2 * Math.PI);
            ctx.fill();
        });
        super.render(ctx);
    }
}
export class FireworkPayload extends Particle {
    constructor(system, position, velocity, color) {
        super(system, position, velocity, 3, color, random_range(0.3, 1.5));
        this.system = system;
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.highlights = [
            'FFFFFF',
            'FFF1B8',
            'CFE9FF',
        ];
        this.sparkle = false;
        this.initial_lifetime = this.lifetime;
        this.sparkle_timer = random_range(0.05, 0.15);
        this.sparkle_start = random_range(0.25, 0.75);
    }
    update(dt) {
        this.velocity = this.velocity.add(new Vec2(0, 200).mul(dt));
        this.size -= this.size / this.lifetime * dt;
        if (this.lifetime <= this.initial_lifetime * this.sparkle_start) {
            this.sparkle_timer -= dt;
            if (this.sparkle_timer <= 0) {
                this.sparkle = !this.sparkle;
                this.sparkle_timer = random_range(0.05, 0.15);
            }
        }
        return super.update(dt);
    }
    render(ctx) {
        let alpha1 = 'FF';
        let alpha2 = 'CC';
        if (this.sparkle) {
            alpha1 = '00';
            alpha2 = '00';
        }
        ctx.beginPath();
        ctx.fillStyle = '#' + this.color + alpha1;
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = '#' + this.highlights[Math.floor(Math.random() * this.highlights.length)] + alpha2;
        ctx.arc(this.position.x, this.position.y, this.size * 0.6, 0, 2 * Math.PI);
        ctx.fill();
    }
}
//# sourceMappingURL=particle_system.js.map