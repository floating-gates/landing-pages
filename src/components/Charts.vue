<script setup>
import { ref, onMounted, defineComponent, h } from 'vue'
import { Chart, registerables } from 'chart.js'
import short_logo from '../data/images/logo_short_black.webp'

Chart.register(...registerables)
import { PlugIcon, FileIcon, RulerIcon, FactoryIcon, AtomIcon, AlertIcon, SlidersIcon, CheckIcon, HucksterIcon, Good2ManufactureIcon } from '../helper/icons_generator.js'
import IconMCP from "../data/images/Icon-MCP.svg";

// ── Inline icon components (no external dep) ────────────────────────────────
function makeIcon(paths) {
    const pathArray = Array.isArray(paths) ? paths : [paths]
    return defineComponent({
        name: 'DynamicIcon',
        render() {
            return h(
                'svg',
                {
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    'stroke-width': '1.7',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    style: { width: '24px', height: '24px' },
                },
                pathArray.map(p => h('path', { d: p }))
            )
        },
    })
}

const activeNav = ref('endpoints')
const navItems = [
    { id: 'endpoints',   label: 'Endpoints',          icon: PlugIcon,       badge: '3',     badgeType: 'ok' },
    { id: 'factory-ui',  label: 'Huckster Interface', icon: HucksterIcon,   badge: 'ready', badgeType: 'ok' },
    { id: 'cad',         label: 'CAD files',          icon: FileIcon,       badge: '12',    badgeType: 'ok' },
    { id: 'gdt',         label: 'Design Playbook',    icon: RulerIcon,      badge: '1',     badgeType: 'ok' },
    { id: 'machines',    label: 'Machines',           icon: FactoryIcon,    badge: '0',     badgeType: 'danger' },
    { id: 'materials',   label: 'Materials',          icon: AtomIcon,       badge: '1',     badgeType: 'ok' },
]

const activeProject = ref('Bracket_v4')

// Metrics follow the four promises of the hero: Search, Verify, Accept, Warn
const metrics = [
    { label: 'Issues found',            value: '17',   color: '#A32D2D', sub: '↑ 4 since last scan', trend: 'up' },
    { label: 'Improvement advices',     value: '9',    color: '#854F0B', sub: '3 critical',          trend: 'neutral' },
    { label: 'Customer files accepted', value: '84',   color: 'inherit', sub: '↑ 7 auto-recognized', trend: 'ok' },
    { label: 'GD&T compliance',         value: '91%',  color: '#3B6D11', sub: '+3% vs baseline',     trend: 'ok' },
]

const checkedLaptops = [
    { name: 'Patricia', status: 'Checking Workstation' },
    { name: 'Luka J.',     status: 'Checking Laptop' },
    { name: 'Morgan',   status: 'Checking Laptop' },
]

function themeVar(name, fallback) {
    if (typeof document === 'undefined') return fallback
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

const themeColor       = themeVar('--theme-color', '#223843')
const themeColorOrange = themeVar('--theme-color-orange', '#D77A61')
const themeColorLille  = themeVar('--theme-color-lille', '#D8D3D8')
const themeColorGold   = themeVar('--theme-color-gold', '#D8B4A0')

const donutLegend = [
    { label: 'Tolerance', color: 'var(--theme-color)' },
    { label: 'Geometry',  color: 'var(--theme-color-lille)' },
    { label: 'Material',  color: 'var(--theme-color-gold)' },
    { label: 'Fixture',   color: 'var(--theme-color-orange)' },
]

const barLegend = [
    { label: 'Critical', color: 'var(--theme-color-orange)' },
    { label: 'Warning',  color: 'var(--theme-color-gold)' },
    { label: 'Info',     color: 'var(--theme-color)' },
]

const advices = [
    { severity: 'danger', icon: AlertIcon,   title: 'Undercut in BlindHole_03 — unmachineable', desc: 'Wall angle exceeds tool reach. Increase draft or split into two operations.', tag: 'Critical' },
    { severity: 'warn',   icon: SlidersIcon, title: 'Flatness tolerance ±0.01 mm requires grinding', desc: 'Milling alone cannot achieve this. Consider relaxing to ±0.05 mm or add a grinding step.', tag: 'Warning' },
    { severity: 'ok',     icon: CheckIcon,   title: 'Boss_01 radius compatible with 6 mm end mill', desc: 'No tooling change required. Standard stock toolpath applies.', tag: 'Info' },
]

// ── Chart data (kept consistent across cards) ───────────────────────────────
const donutData  = [7, 4, 3, 3]                       // = 17 issues
const lineLabels = ['April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct']
const issuesData = [24, 21, 19, 22, 18, 15, 17]       // last point = current metric
const advicesData = [11, 10, 10, 9, 9, 10, 9]
const barLabels  = ['Through hole', 'Blind hole', 'Pocket', 'Slot', 'Boss']
const barData = {
    critical: [1, 3, 1, 1, 0],
    warning:  [2, 1, 2, 0, 1],
    info:     [3, 1, 0, 2, 1],
} // each column sums with the donut categories to 17

const donutCanvas = ref(null)
const lineCanvas  = ref(null)
const barCanvas   = ref(null)

// Draws the issue total in the middle of the donut
const centerTextPlugin = {
    id: 'centerText',
    afterDraw(chart) {
        const { ctx } = chart
        const meta = chart.getDatasetMeta(0)
        if (!meta.data.length) return
        const { x, y } = meta.data[0]
        ctx.save()
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = themeColor
        ctx.font = '600 20px sans-serif'
        ctx.fillText('17', x, y - 7)
        ctx.fillStyle = '#9ca3af'
        ctx.font = '400 10px sans-serif'
        ctx.fillText('issues', x, y + 10)
        ctx.restore()
    },
}

onMounted(() => {
    // ── Donut: issues by category ───────────────────────────────────────────
    new Chart(donutCanvas.value, {
        type: 'doughnut',
        data: {
            labels: donutLegend.map(l => l.label),
            datasets: [{
                data: donutData,
                backgroundColor: [themeColor, themeColorLille, themeColorGold, themeColorOrange],
                borderWidth: 2,
                borderColor: 'transparent',
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0)
                            const pct = Math.round((ctx.parsed / total) * 100)
                            return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`
                        },
                    },
                },
            },
        },
        plugins: [centerTextPlugin],
    })

    // ── Line: issues & advices per scan ─────────────────────────────────────
    new Chart(lineCanvas.value, {
        type: 'line',
        data: {
            labels: lineLabels,
            datasets: [
                {
                    label: 'Open issues',
                    data: issuesData,
                    borderColor: themeColor,
                    backgroundColor: 'transparent',
                    tension: 0.4,
                    pointRadius: 3,
                    fill: false,
                    borderWidth: 2,
                },
                {
                    label: 'Advices',
                    data: advicesData,
                    borderColor: themeColorGold,
                    borderDash: [4, 3],
                    backgroundColor: 'transparent',
                    tension: 0.4,
                    pointRadius: 3,
                    fill: false,
                    borderWidth: 1.5,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: 'rgba(128,128,128,0.1)' }, ticks: { font: { size: 11 }, color: '#888780' } },
                y: { min: 0, grid: { color: 'rgba(128,128,128,0.1)' }, ticks: { font: { size: 11 }, color: '#888780', stepSize: 5 } },
            },
        },
    })
})
</script>

<template>
<div class="gates-hero">
  <aside class="sidebar">
    <div class="sidebar-logo">
      <img :src="short_logo" alt="Floating Gates" class="logo-img" />
    </div>

    <nav class="sidebar-nav">
      <button
        v-for="item in navItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: activeNav === item.id }"
        @click="activeNav = item.id"
        >
        <component :is="item.icon" class="nav-icon" aria-hidden="true" />
        <span>{{ item.label }}</span>
        <span v-if="item.badge" class="nav-badge" :class="item.badgeType">
          {{ item.badge }}
        </span>
      </button>
    </nav>
  </aside>

  <div class="main">
    <header class="topbar">
      <span class="title">Analysis dashboard</span>
      <span class="topbar-pill live"><span class="live-dot" aria-hidden="true" />Live scan</span>
      <span class="topbar-pill">Cycle: 6 h</span>
      <span class="topbar-pill">{{ activeProject }}</span>
    </header>

    <div class="content">
      <div class="metrics-row">
        <div v-for="m in metrics" :key="m.label" class="metric-card">
          <div class="metric-header">
            <div class="title">{{ m.label }}</div>
            <component :is="m.icon" v-if="m.icon" class="metric-icon" aria-hidden="true" />
          </div>
          <div class="metric-val" :style="{ color: m.color }">{{ m.value }}</div>
          <div class="metric-sub" :class="m.trend">{{ m.sub }}</div>
        </div>
      </div>

      <div class="charts-grid">
        <!-- 1. Customer Files -> Huckster Interface -->
        <div class="chart-card">
          <div class="chart-info">
            <div class="chart-heading-stack">
              <span class="instrument-pill">
                <component :is="HucksterIcon" class="instrument-pill-icon" aria-hidden="true" />
                <span>Huckster Interface</span>
              </span>
              <span class="title">Customer/Supplier File Drop</span>
            </div>
            <div class="chart-subtitle">Files received straight from your customers</div>
            <div class="chart-subtitle">· 43 customers and suppliers connected</div>
          </div>
          <div class="chart-visual">
            <div class="canvas-wrap">
              <img class="rounded-lg" src="../data/images/screenshot.png" alt="Huckster interface handling incoming customer files" />
            </div>
          </div>
        </div>

        <!-- 2. Issue Discovery -> Good2Manufacture -->
        <div class="chart-card">
          <div class="chart-info">
            <div class="chart-heading-stack">
              <span class="instrument-pill">
                <component :is="Good2ManufactureIcon" class="instrument-pill-icon" aria-hidden="true" />
                <span>Good2Manufacture</span>
              </span>
              <span class="title">Issue Discovery</span>
            </div>
            <div class="chart-subtitle">· 17 issues not yet tackled</div>
            <div class="legend-row">
              <span v-for="l in donutLegend" :key="l.label" class="legend-item">
                <span class="legend-dot" :style="{ background: l.color }" />
                {{ l.label }}
              </span>
            </div>
          </div>

          <div class="chart-visual">
            <div class="canvas-wrap donut-wrap">
              <canvas
                ref="donutCanvas"
                role="img"
                aria-label="Donut chart of issues by category: Tolerance 7, Geometry 4, Material 3, Fixture 3"
              />
            </div>

            <!-- Vertical divider + Laptop check list -->
            <div class="chart-side-panel">
              <div class="side-panel-header">Checking endpoints</div>
              <ul class="endpoint-list">
                <li v-for="laptop in checkedLaptops" :key="laptop.name" class="endpoint-item">
                  <span class="live-dot" aria-hidden="true" />
                  <span class="endpoint-name">{{ laptop.name }}</span>
                  <span class="endpoint-status">{{ laptop.status }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 3. Issue Resolution -> AI (IconMCP) -->
        <div class="chart-card">
          <div class="chart-info">
            <div class="chart-heading-stack">
              <span class="instrument-pill">
                <img :src="IconMCP" class="instrument-pill-icon" alt="" aria-hidden="true" />
                <span>MCP Server</span>
              </span>
              <span class="title">Issue Resolution</span>
            </div>
            <div class="chart-subtitle">Last 7 scan cycles · 6 h each</div>
            <div class="legend-row">
              <span class="legend-item"><span class="legend-dot" :style="{ background: 'var(--theme-color)' }" />Open issues</span>
              <span class="legend-item"><span class="legend-dot legend-dashed" />Advices</span>
            </div>
          </div>
          <div class="chart-visual">
            <div class="canvas-wrap">
              <canvas
                ref="lineCanvas"
                role="img"
                aria-label="Line chart of open issues and advices over the last 7 scans, issues trending down"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
@reference "../main.css";

/* ── Shell ────────────────────────────────────────────────────────────────── */
.gates-hero {
    display: flex;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    height: 600px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    font-size: 13px;
    background: #f5f5f4;
    box-sizing: border-box;
}

/* ── Sidebar ──────────────────────────────────────────────────────────────── */
.sidebar {
    background: #fff;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 0 1 11.5rem;
}

.sidebar-logo {
    padding: 15px;
    display: flex;
    align-items: center;
}

.sidebar-nav {
    padding: 14px 8px 4px;
    display: flex;
    flex-direction: column;
    gap: 1px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 7px 10px;
    border-radius: 8px;
    cursor: pointer;
    color: #6b7280;
    background: none;
    border: none;
    width: 100%;
    min-width: 0;
    text-align: left;
    font-size: 13px;
    transition: background 0.12s;
}

.nav-item > span:not(.nav-badge) {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.nav-item:hover {
    background: var(--theme-color-white);
}

.nav-item.active {
    background: var(--theme-color);
    color: var(--theme-color-white);
    font-weight: 500;
}

.nav-item.active .nav-icon {
    color: var(--theme-color-white);
}

.nav-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: #9ca3af;
}

.nav-badge {
    margin-left: auto;
    font-size: 10px;
    border-radius: 20px;
    padding: 1px 6px;
    font-weight: 500;
    line-height: 1.4;
}

.nav-badge.danger { background: #fee2e2; color: #991b1b; }
.nav-badge.ok     { background: #dcfce7; color: #166534; }

/* ── Main ─────────────────────────────────────────────────────────────────── */
.main {
    flex: 1;
    overflow-y: auto;
    background: #f5f5f4;
    min-width: 0;
}

.topbar {
    background: #fff;
    border-bottom: 1px solid #e5e7eb;
    padding: 9px 18px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    min-width: 0;
}

.title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--theme-color);
    margin-bottom: 4px;
}

.topbar-pill {
    font-size: 11px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    padding: 3px 9px;
    color: #6b7280;
}

.topbar-pill.live {
    background: #dcfce7;
    color: #166534;
    border-color: #bbf7d0;
    display: flex;
    align-items: center;
    gap: 5px;
}

.live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #16a34a;
    flex-shrink: 0;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
}

.content {
    padding: 14px 18px;
}

/* ── Metrics ──────────────────────────────────────────────────────────────── */
.metrics-row {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 14px;
}

.metric-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 11px 13px;
}

.metric-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 6px;
}

.metric-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: #9ca3af;
}

.metric-val {
    font-size: 21px;
    font-weight: 600;
    color: #111;
    line-height: 1;
}

.metric-sub {
    font-size: 11px;
    margin-top: 3px;
    color: #9ca3af;
}

.metric-sub.up { color: #991b1b; }
.metric-sub.ok { color: #166534; }

/* ── Charts Grid ──────────────────────────────────────────────────────────── */
.charts-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 12px;
}

.chart-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 18px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-width: 0;
}

.chart-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
}

.chart-heading-stack {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    margin-bottom: 4px;
}

.chart-heading-stack .title {
    margin-bottom: 0;
}

.instrument-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.2;
    color: var(--theme-color);
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 9999px;
    padding: 3px 9px 3px 7px;
}

.instrument-pill-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    object-fit: contain;
}

.chart-visual {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    min-width: 0;
}

.chart-subtitle {
    font-size: 11px;
    color: #9ca3af;
    margin-bottom: 2px;
}

.legend-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 6px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #6b7280;
}

.legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    flex-shrink: 0;
}

.legend-dashed {
    background: var(--theme-color-gold);
    outline: 1px dashed var(--theme-color-gold);
    outline-offset: 1px;
    opacity: 0.85;
}

.canvas-wrap {
    position: relative;
    width: 100%;
    height: 140px;
}

.donut-wrap {
    width: 140px;
    flex-shrink: 0;
}

.canvas-wrap img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: contain;
}

/* ── Vertical Line & Laptop Check List ────────────────────────────────────── */
.chart-side-panel {
    border-left: 1px solid #e5e7eb;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    min-width: 175px;
    flex-shrink: 0;
}

.side-panel-header {
    font-size: 11px;
    font-weight: 600;
    color: var(--theme-color);
}

.endpoint-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.endpoint-item {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    color: #4b5563;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 5px 9px;
}

.endpoint-name {
    font-weight: 500;
    color: var(--theme-color);
    white-space: nowrap;
}

.endpoint-status {
    margin-left: auto;
    font-size: 10px;
    color: #166534;
    background: #dcfce7;
    border-radius: 20px;
    padding: 1px 6px;
    font-weight: 500;
}

@media (max-width: 720px) {
    .metrics-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .chart-visual {
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .chart-side-panel {
        border-left: none;
        border-top: 1px solid #e5e7eb;
        padding-left: 0;
        padding-top: 12px;
        width: 100%;
    }
}
</style>
