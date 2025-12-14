export class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }
    mul(s) {
        return new Vec2(this.x * s, this.y * s);
    }
    div(s) {
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
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    set_mag(mag) {
        return this.normalize().mul(mag);
    }
    clone() {
        return new Vec2(this.x, this.y);
    }
    static from_angle(angle) {
        return new Vec2(Math.cos(angle), Math.sin(angle));
    }
}
//# sourceMappingURL=vector.js.map