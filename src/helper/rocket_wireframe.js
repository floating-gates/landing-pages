const TAU = Math.PI * 2;
const SEGMENTS = 24;          // points per ring
const BODY_R = 0.16;          // airframe radius
const GROUP_COUNT = 7;        // nozzle, fin can, 4 body sections, nose cone
const EXPLODE_GAP = 0.05;     // axial offset per section at full explosion
const GRID_Y = -0.05;
const CENTER_Y = 1.0;

const ringKind = { normal: 0, accent: 1, guide: 2, axis: 3 };

function smoothstep(t) {
    const c = Math.max(0, Math.min(1, t));
    return c * c * (3 - 2 * c);
}

function rotateAboutY(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return (p) => [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
}

function createMesh() {
    const vertices = []; // { p: [x, y, z], g: group index (-1 = fixed) }
    const edges = [];    // [a, b, kind]
    const tops = [];     // top ring ids per group (for alignment guides)
    const bottoms = [];  // bottom flange ring ids per group
    let group = 0;

    function pushVertex(p) {
        vertices.push({ p, g: group });
        return vertices.length - 1;
    }

    function pushEdge(a, b, kind = ringKind.normal) {
        edges.push([a, b, kind]);
    }

    function addRing(y, r, kind = ringKind.normal, n = SEGMENTS) {
        const ids = [];
        for (let i = 0; i < n; i += 1) {
            const a = (i / n) * TAU;
            ids.push(pushVertex([Math.cos(a) * r, y, Math.sin(a) * r]));
        }
        for (let i = 0; i < n; i += 1) pushEdge(ids[i], ids[(i + 1) % n], kind);
        return ids;
    }

    function stitch(lower, upper, every = 2, kind = ringKind.normal) {
        for (let i = 0; i < lower.length; i += every) pushEdge(lower[i], upper[i], kind);
    }

    function addBox(center, size, rotate = (p) => p, kind = ringKind.normal) {
        const [w, h, d] = size;
        const start = vertices.length;
        [
            [-w, -h, -d], [w, -h, -d], [w, h, -d], [-w, h, -d],
            [-w, -h,  d], [w, -h,  d], [w, h,  d], [-w, h,  d],
        ].forEach((corner) => {
            const r = rotate(corner);
            pushVertex([center[0] + r[0], center[1] + r[1], center[2] + r[2]]);
        });
        [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
        ].forEach(([a, b]) => pushEdge(start + a, start + b, kind));
    }

    // Bolted ring flange: thick outer ring, inner lip, radial spokes, bolt heads.
    function addFlange(y, r) {
        const thickness = 0.016;
        const low = addRing(y, r, ringKind.accent);
        const high = addRing(y + thickness, r, ringKind.accent);
        const lip = addRing(y + thickness, r * 0.78, ringKind.accent);
        stitch(low, high, 3, ringKind.accent);
        stitch(high, lip, 2, ringKind.accent);
        for (let i = 0; i < 12; i += 1) {
            const a = (i / 12) * TAU;
            addBox(
                [Math.cos(a) * r * 0.89, y + thickness + 0.006, Math.sin(a) * r * 0.89],
                [0.007, 0.006, 0.007],
                rotateAboutY(-a),
                ringKind.accent,
            );
        }
        return low;
    }

    // Cylindrical airframe section with a flange at the bottom.
    function addSection(g, y0, y1, r, rings) {
        group = g;
        bottoms[g] = addFlange(y0, r);
        const startY = y0 + 0.018;
        let previous = null;
        for (let k = 0; k < rings; k += 1) {
            const y = startY + ((y1 - startY) * k) / (rings - 1);
            const ids = addRing(y, r);
            if (previous) stitch(previous, ids, 2);
            previous = ids;
        }
        tops[g] = previous;
    }

    function finPoint(angle, d, y, t) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return [c * d - s * t, y, s * d + c * t];
    }

    // ---- Group 0: engine nozzle (mount ring + bell) ----
    group = 0;
    {
        const profile = [
            [0.32, BODY_R],
            [0.30, 0.07],
            [0.26, 0.085],
            [0.21, 0.105],
            [0.16, 0.125],
            [0.12, 0.14],
        ];
        let previous = null;
        profile.forEach(([y, r], index) => {
            const ids = addRing(y, r, index === profile.length - 1 ? ringKind.accent : ringKind.normal);
            if (previous) stitch(previous, ids, 2);
            if (index === 0) tops[0] = ids;
            previous = ids;
        });
    }

    // ---- Group 1: fin can ----
    addSection(1, 0.34, 0.62, BODY_R, 3);
    for (let i = 0; i < 4; i += 1) {
        const a = (i / 4) * TAU + Math.PI / 4;
        const outline = [
            [BODY_R, 0.60],
            [BODY_R + 0.12, 0.42],
            [BODY_R + 0.12, 0.30],
            [BODY_R, 0.36],
        ];
        const front = outline.map(([d, y]) => pushVertex(finPoint(a, d, y, 0.005)));
        const back = outline.map(([d, y]) => pushVertex(finPoint(a, d, y, -0.005)));
        for (let k = 0; k < outline.length; k += 1) {
            pushEdge(front[k], front[(k + 1) % outline.length]);
            pushEdge(back[k], back[(k + 1) % outline.length]);
            pushEdge(front[k], back[k]);
        }
    }

    // ---- Groups 2-5: body ring sections ----
    addSection(2, 0.64, 0.98, BODY_R, 5);   // lower tank
    addSection(3, 1.00, 1.10, BODY_R, 2);   // interstage
    addSection(4, 1.12, 1.40, BODY_R, 4);   // upper tank
    addSection(5, 1.42, 1.58, BODY_R, 3);   // payload bay
    addBox([0, 1.50, 0], [0.055, 0.045, 0.055], (p) => p, ringKind.accent); // payload

    // ---- Group 6: nose cone ----
    {
        group = 6;
        const y0 = 1.60;
        const height = 0.32;
        bottoms[6] = addFlange(y0, BODY_R);
        const baseY = y0 + 0.018;
        let previous = null;
        [0, 0.18, 0.36, 0.54, 0.70, 0.84, 0.94].forEach((s) => {
            const r = BODY_R * Math.pow(1 - s * s, 0.6);
            const ids = addRing(baseY + height * s, r);
            if (previous) stitch(previous, ids, 3);
            previous = ids;
        });
        const apex = pushVertex([0, baseY + height, 0]);
        for (let i = 0; i < previous.length; i += 3) pushEdge(previous[i], apex);
    }

    // ---- Alignment guides between sections (visible when exploded) ----
    for (let g = 0; g < GROUP_COUNT - 1; g += 1) {
        for (let i = 0; i < SEGMENTS; i += 6) {
            pushEdge(tops[g][i], bottoms[g + 1][i], ringKind.guide);
        }
    }

    // ---- Assembly axis (dashed, fixed in space) ----
    group = -1;
    for (let y = GRID_Y; y < 2.1; y += 0.07) {
        const a = pushVertex([0, y, 0]);
        const b = pushVertex([0, y + 0.035, 0]);
        pushEdge(a, b, ringKind.axis);
    }

    return { vertices, edges };
}

function project(point, rotY, rotX, width, height) {
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x1 = point[0] * cosY - point[2] * sinY;
    const z1 = point[0] * sinY + point[2] * cosY;
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const y1 = (point[1] - CENTER_Y) * cosX - z1 * sinX;
    const z2 = (point[1] - CENTER_Y) * sinX + z1 * cosX;
    const depth = 3.6;
    const focus = depth / (depth - z2);
    const size = Math.min(width, height) * 0.40;
    return {
        x: width * 0.5 + x1 * focus * size,
        y: height * 0.5 - y1 * focus * size,
        z: z2,
        focus,
    };
}

function drawGrid(ctx, rotY, rotX, width, height, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.7;
    const span = 0.5;
    const step = 0.1;
    for (let i = -span; i <= span + 0.001; i += step) {
        const a = [];
        const b = [];
        for (let j = -span; j <= span + 0.001; j += step) {
            a.push(project([i, GRID_Y, j], rotY, rotX, width, height));
            b.push(project([j, GRID_Y, i], rotY, rotX, width, height));
        }
        ctx.beginPath();
        a.forEach((point, index) => (index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y)));
        ctx.stroke();
        ctx.beginPath();
        b.forEach((point, index) => (index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y)));
        ctx.stroke();
    }
    ctx.restore();
}

function drawMesh(ctx, mesh, rotY, rotX, width, height, colors, explode) {
    const projected = mesh.vertices.map((vertex) => {
        const offset = vertex.g >= 0
            ? (vertex.g - (GROUP_COUNT - 1) / 2) * EXPLODE_GAP * explode
            : 0;
        return project(
            [vertex.p[0], vertex.p[1] + offset, vertex.p[2]],
            rotY, rotX, width, height,
        );
    });

    const lines = mesh.edges.map(([a, b, kind]) => ({
        start: projected[a],
        end: projected[b],
        kind,
        depth: (projected[a].z + projected[b].z) / 2,
    })).sort((left, right) => left.depth - right.depth);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const line of lines) {
        if (line.kind === ringKind.guide && explode < 0.03) continue;
        const shade = 0.28 + Math.max(0, Math.min(1, (line.depth + 0.9) / 1.8)) * 0.72;
        const accent = line.kind !== ringKind.normal;
        ctx.strokeStyle = accent ? colors.accent : colors.ink;
        if (line.kind === ringKind.guide) {
            ctx.globalAlpha = shade * 0.55 * explode;
            ctx.lineWidth = 0.8;
        } else if (line.kind === ringKind.axis) {
            ctx.globalAlpha = 0.35;
            ctx.lineWidth = 0.8;
        } else {
            ctx.globalAlpha = shade;
            ctx.lineWidth = accent ? 1.35 : 1.05;
        }
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

export function startRocketCad(canvas, colors) {
    const ctx = canvas.getContext("2d");
    const mesh = createMesh();
    let frameId = 0;
    let running = true;
    let rotY = 0.85;
    let rotX = 0.38;
    let explode = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const PERIOD_MS = 7000;

    function cssSize() {
        const rect = canvas.getBoundingClientRect();
        return {
            width: Math.max(1, rect.width),
            height: Math.max(1, rect.height),
        };
    }

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const { width, height } = cssSize();
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function paint() {
        const { width, height } = cssSize();
        ctx.clearRect(0, 0, width, height);
        drawGrid(ctx, rotY, rotX, width, height, colors.grid);
        drawMesh(ctx, mesh, rotY, rotX, width, height, colors, explode);
    }

    function tick(now) {
        if (!running) return;
        // Assembled -> exploded -> assembled, with short holds at both ends.
        const phase = ((now || 0) % PERIOD_MS) / PERIOD_MS;
        const triangle = phase < 0.5 ? phase * 2 : 2 - phase * 2;
        explode = smoothstep((triangle - 0.15) / 0.7);
        if (!dragging) rotY += 0.008;
        paint();
        frameId = requestAnimationFrame(tick);
    }

    function onPointerDown(event) {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        canvas.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event) {
        if (!dragging) return;
        rotY += (event.clientX - lastX) * 0.01;
        rotX = Math.max(-0.15, Math.min(1.05, rotX + (event.clientY - lastY) * 0.008));
        lastX = event.clientX;
        lastY = event.clientY;
    }

    function onPointerUp() {
        dragging = false;
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);
    frameId = requestAnimationFrame(tick);

    return () => {
        running = false;
        cancelAnimationFrame(frameId);
        observer.disconnect();
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointerleave", onPointerUp);
    };
}

// Backwards-compatible export so existing imports keep working.
export const startBushmanCad = startRocketCad;
