export class Vec2 {
    constructor(public x: number, public y: number) {
    }

    add(v: Vec2) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }
    sub(v: Vec2) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }
    mul(s: number) {
        return new Vec2(this.x * s, this.y * s);
    }
    div(s: number) {
        return new Vec2(this.x / s, this.y / s);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    length_sq() {
        return this.x * this.x + this.y * this.y;
    }
    normalize() {
        return this.div(this.length());
    }
    dot(v: Vec2) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v: Vec2) {
        return this.x * v.y - this.y * v.x;
    }
    set_mag(mag: number) {
        return this.normalize().mul(mag);
    }
    clone() {
        return new Vec2(this.x, this.y);
    }

    static from_angle(angle: number) {
        return new Vec2(Math.cos(angle), Math.sin(angle));
    }
}
