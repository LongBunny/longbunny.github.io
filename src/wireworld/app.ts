import {Color, Vec2} from "../../../../libs/bunny-common";

const MouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,
} as const;
type MouseButton = typeof MouseButton[keyof typeof MouseButton];

type ButtonState = {
    down: boolean,
    held: boolean,
    up: boolean,
}

type MouseState = {
    pos: Vec2,
    buttons: Record<MouseButton, ButtonState>
};

const create_mouse_button_state = (): ButtonState => ({
    down: false,
    held: false,
    up: false,
});
const mouse: MouseState = {
    pos: Vec2.zero(),
    buttons: {
        [MouseButton.LEFT]: create_mouse_button_state(),
        [MouseButton.MIDDLE]: create_mouse_button_state(),
        [MouseButton.RIGHT]: create_mouse_button_state(),
    }
};

const keys: Record<string, ButtonState> = {};

function get_key(key: string): ButtonState {
    const k = keys[key];
    if (!k) {
        return {
            down: false,
            held: false,
            up: false,
        }
    }
    return k;
}

let canvas: HTMLCanvasElement;

export function run(_canvas: HTMLCanvasElement) {
    canvas = _canvas;
    const context = canvas.getContext("2d");
    if (context === null) {
        throw new Error("Canvas context not found");
    }
    const ctx = context as CanvasRenderingContext2D;

    function resize() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    function get_mouse_pos(event: MouseEvent) {
        const rect = canvas.getBoundingClientRect();

        return new Vec2(
            event.clientX - rect.left,
            event.clientY - rect.top
        );
    }

    function update_mouse_pos(event: MouseEvent) {
        const pos = get_mouse_pos(event);
        mouse.pos.x = pos.x;
        mouse.pos.y = pos.y;
    }

    window.addEventListener("mousemove", update_mouse_pos);

    window.addEventListener("mousedown", (event: MouseEvent) => {
        event.preventDefault();
        update_mouse_pos(event);
        const button = event.button as MouseButton;
        mouse.buttons[button].down = true;
        mouse.buttons[button].held = true;
    });
    window.addEventListener("mouseup", (event: MouseEvent) => {
        event.preventDefault();
        update_mouse_pos(event);
        const button = event.button as MouseButton;
        mouse.buttons[button].held = false;
        mouse.buttons[button].up = true;
    });
    window.addEventListener("mouseleave", (event: MouseEvent) => {
        event.preventDefault();
        update_mouse_pos(event);
        const button = event.button as MouseButton;
        mouse.buttons[button].up = mouse.buttons[button].held;
        mouse.buttons[button].held = false;
    });

    window.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.repeat) return;

        const key = keys[event.key];
        if (!key) {
            keys[event.key] = {
                down: true,
                held: true,
                up: false,
            };
            return;
        }

        key.down = true;
        key.held = true;
    });
    window.addEventListener("keyup", (event: KeyboardEvent) => {
        const key = keys[event.key];
        if (!key) {
            keys[event.key] = {
                down: false,
                held: false,
                up: true,
            };
            return;
        }

        key.held = false;
        key.up = true;
    });


    canvas.oncontextmenu = () => false;

    let lastTime = performance.now();

    start();

    function frame(now: number) {
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        update(dt);
        draw(ctx, canvas);

        for (const button of Object.values(MouseButton)) {
            mouse.buttons[button].down = false;
            mouse.buttons[button].up = false;
        }

        for (const key of Object.values(keys)) {
            key.down = false;
            key.up = false;
        }

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

const CellTypes = {
    EMPTY: 0,
    HEAD: 1,
    TAIL: 2,
    CONDUCTOR: 3,
} as const;
type CellType = typeof CellTypes[keyof typeof CellTypes];

type CellKey = string;

type CellEntry = {
    pos: Vec2,
    type: CellType
}

const CELL_SIZE: number = 10;
class Cells extends Map<string, CellEntry> {}
let cells_current: Cells = new Cells();
let cells_next: Cells = new Cells();

let current_cell_type: CellType = CellTypes.CONDUCTOR;

const cell_colors: Record<CellType, Color> = {
    [CellTypes.EMPTY]: Color.from_hex(0x000000ff),
    [CellTypes.HEAD]: Color.from_hex(0x5050f1ff),
    [CellTypes.TAIL]: Color.from_hex(0xf14a4aff),
    [CellTypes.CONDUCTOR]: Color.from_hex(0xeaea56ff),
};

const SIMS_PER_SECOND = 20;
const SIM_NEXT_GEN = 1000 / 1000 / SIMS_PER_SECOND;
let sim_timer = 0;
let running = false;

function start() {
    load();
}

function update(dt: number) {
    if (get_key("1").down) current_cell_type = CellTypes.CONDUCTOR;
    if (get_key("2").down) current_cell_type = CellTypes.HEAD;
    if (get_key("3").down) current_cell_type = CellTypes.TAIL;

    if (get_key(" ").down) start_stop_sim();
    if (get_key("n").down) generation();
    if (get_key("s").down) save();
    if (get_key("l").down) load();
    if (get_key("c").down) clear();

    if (mouse.buttons[MouseButton.LEFT].held) {
        const pos = screen_to_world(mouse.pos);
        add_cell(cells_current, pos, current_cell_type);
    }

    if (mouse.buttons[MouseButton.RIGHT].held) {
        const pos = screen_to_world(mouse.pos);
        cells_current.delete(cell_key(pos));
    }

    if (running) {
        sim_timer += dt;
        if (sim_timer >= SIM_NEXT_GEN) {
            generation();
            sim_timer = 0;
        }
    }
}

function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate((canvas.width / 2.0) - (CELL_SIZE / 2.0), (canvas.height / 2.0) - (CELL_SIZE / 2.0));

    for (const pair of cells_current.entries()) {
        const cell = pair[1];
        fill_cell(ctx, cell);
    }

    ctx.restore();
}

function generation() {
    cells_next.clear();
    for (const pair of cells_current.entries()) {
        const current = pair[1];
        const next: CellEntry = {
            pos: current.pos.clone(),
            type: current.type
        };

        switch (current.type) {
        case CellTypes.EMPTY:
            break;
        case CellTypes.HEAD:
            next.type = CellTypes.TAIL;
            break;
        case CellTypes.TAIL:
            next.type = CellTypes.CONDUCTOR;
            break;
        case CellTypes.CONDUCTOR: {
            const head_count = get_neighbour_head_count(current.pos);
            if (head_count === 1 || head_count === 2)
                next.type = CellTypes.HEAD;
        }
            break;
        }

        add_cell(cells_next, next.pos, next.type);
    }
    const t = cells_next;
    cells_next = cells_current;
    cells_current = t;
}

function start_stop_sim() {
    running = !running;

    if (!running) {
        for (const pair of cells_current.entries()) {
            const cell = pair[1];
            if (cell.type === CellTypes.HEAD || cell.type === CellTypes.TAIL) {
                add_cell(cells_current, cell.pos, CellTypes.CONDUCTOR);
            }
        }
    }
}


function screen_to_world(pos: Vec2): Vec2 {
    const x = Math.floor(((pos.x - canvas.width / 2.0) - (CELL_SIZE / 2.0)) / CELL_SIZE) + 1;
    const y = Math.floor(((pos.y - canvas.height / 2.0) - (CELL_SIZE / 2.0)) / CELL_SIZE) + 1;
    return new Vec2(x, y);
}

function fill_cell(ctx: CanvasRenderingContext2D, cell: CellEntry) {
    if (cell.type === CellTypes.EMPTY) return;

    ctx.fillStyle = cell_colors[cell.type].to_rgb();
    const pos = cell.pos.mul(CELL_SIZE);
    ctx.fillRect(pos.x, pos.y, CELL_SIZE, CELL_SIZE);
}

function cell_key(pos: Vec2): CellKey {
    return `${pos.x},${pos.y}`;
}

function add_cell(cells:  Map<string, CellEntry>, pos: Vec2, type: CellType) {
    const key = cell_key(pos);
    const cell = cells.get(key);
    if (cell) {
        cell.type = type;
        return;
    }

    cells.set(key, {pos, type});
}

function get_cell_type(pos: Vec2): CellType {
    const key = cell_key(pos);
    const cell = cells_current.get(key);
    return cell ? cell.type : CellTypes.EMPTY;
}

function get_neighbour_head_count(pos: Vec2): number {
    let heads = 0;
    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            if (y === 0 && x === 0)
                continue;
            const type = get_cell_type(pos.add(new Vec2(x, y)));
            if (type === CellTypes.HEAD)
                heads++;
        }
    }
    return heads;
}


const local_storage_key = "BUNNY_WIREWORLD_SAVE"
function save() {
    const json = JSON.stringify([...cells_current]);
    localStorage.setItem(local_storage_key, json);
}

function load() {
    const json = localStorage.getItem(local_storage_key);
    if (json === null) return;

    try {
        const entries = JSON.parse(json) as [string, { pos: { x: number, y: number }, type: CellType }][];

        cells_current = new Cells();

        for (const [key, cell] of entries) {
            cells_current.set(key, {
                pos: new Vec2(cell.pos.x, cell.pos.y),
                type: cell.type,
            });
        }

        cells_next = new Cells();
    } catch (e) {
        console.error("Failed to parse saved data", e);

        cells_current = new Cells();
        cells_next = new Cells();
    }
}

function clear() {
    cells_current = new Cells();
    cells_next = new Cells();
}
