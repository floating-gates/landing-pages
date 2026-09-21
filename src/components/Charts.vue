<script setup>
import { ref, onMounted, defineComponent, h } from 'vue'
import { Chart, registerables } from 'chart.js'
import short_logo from "../data/images/logo_short_black.webp"
import { themeColor, themeColorLille, themeColorOrange, themeColorGold, themeColorWhite } from '../config.js'
Chart.register(...registerables)
import { PlugIcon, FileIcon, RulerIcon, FactoryIcon, AtomIcon, AlertIcon, SlidersIcon, CheckIcon,  WebIcon } from '../helper/icons_generator.js'

// ── Inline icon components (no external dep) ────────────────────────────────
function makeIcon(paths) {
    const pathArray = Array.isArray(paths) ? paths : [paths];
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
                    style: { width: '24px', height: '24px' }
                },
                pathArray.map(p => h('path', { d: p }))
            );
        }
    });
}

const activeNav = ref('endpoints')
const navItems = [
    { id: 'endpoints', label: 'Endpoints', icon: PlugIcon, badge: '3', badgeType: 'ok' },
    { id: 'factory-ui', label: 'Huckster Interface', icon: WebIcon, badge: 'ready', badgeType: 'ok' },
    { id: 'cad', label: 'CAD files', icon: FileIcon, badge: '12', badgeType: 'ok' },
    { id: 'gdt', label: 'Design Playbook', icon: RulerIcon, badge: '1', badgeType: 'ok' },
    { id: 'machines', label: 'Machines', icon: FactoryIcon, badge: '0', badgeType: 'danger' },
    { id: 'materials', label: 'Materials', icon: AtomIcon, badge: '1', badgeType: 'ok' },
]

const activeProject = ref('Bracket_v4')
const metrics = [
    { label: 'Issues found', value: '17', color: '#A32D2D', sub: '↑ 4 since last scan', trend: 'up' },
    { label: 'Advices', value: '9', color: '#854F0B', sub: '3 critical', trend: 'neutral' },
    { label: 'From Supplier', value: '84', color: 'inherit', sub: '↑ 7 recognized', trend: 'ok' },
    { label: 'Compliance', value: '91%', color: '#3B6D11', sub: '+3% vs baseline', trend: 'ok' },
]

const donutLegend = [
    { label: 'Tolerance', color: themeColor },
    { label: 'Geometry', color: themeColorLille },
    { label: 'Material', color: themeColorGold },
    { label: 'Fixture', color: themeColorOrange },
]

const advices = [
    { severity: 'danger', icon: AlertIcon, title: 'Undercut in BlindHole_03 — unmachineable', desc: 'Wall angle exceeds tool reach. Increase draft or split into two operations.', tag: 'Critical' },
    { severity: 'warn', icon: SlidersIcon, title: 'Flatness tolerance ±0.01 mm requires grinding', desc: 'Milling alone cannot achieve this. Consider relaxing to ±0.05 mm or add a grinding step.', tag: 'Warning' },
    { severity: 'ok', icon: CheckIcon, title: 'Boss_01 radius compatible with 6 mm end mill', desc: 'No tooling change required. Standard stock toolpath applies.', tag: 'Info' },
]

const donutCanvas = ref(null)
const lineCanvas  = ref(null)
const barCanvas   = ref(null)

onMounted(() => {
    new Chart(donutCanvas.value, {
        type: 'doughnut',
        data: {
            labels: ['Tolerance', 'Geometry', 'Material', 'Fixture'],
            datasets: [{
                data: [7, 4, 3, 3],
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
                tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}` } },
            },
        },
    })
    
    new Chart(lineCanvas.value, {
        type: 'line',
        data: {
            labels: ['April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct'],
            datasets: [
                {
                    label: 'Issues',
                    data: [24, 21, 19, 22, 18, 15, 17],
                    borderColor: themeColor,
                    backgroundColor: 'rgba(226,75,74,0.08)',
                    tension: 0.4,
                    pointRadius: 3,
                    fill: true,
                    borderWidth: 2,
                },
                {
                    label: 'Advices',
                    data: [11, 10, 10, 9, 9, 10, 9],
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
    
    new Chart(barCanvas.value, {
        type: 'bar',
        data: {
            labels: ['ThroughHole', 'BlindHole', 'RectPocket', 'Slot', 'Boss'],
            datasets: [
                { label: 'Critical', data: [1, 3, 1, 1, 0], backgroundColor: themeColorOrange, borderRadius: 3 },
                { label: 'Warning',  data: [2, 1, 2, 0, 1], backgroundColor: themeColorGold, borderRadius: 3 },
                { label: 'Info',     data: [3, 1, 0, 2, 1], backgroundColor: themeColor, borderRadius: 3 },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { stacked: true, grid: { display: false }, ticks: { font: { size: 11 }, color: '#888780', autoSkip: false } },
                y: { stacked: true, min: 0, grid: { color: 'rgba(128,128,128,0.1)' }, ticks: { font: { size: 11 }, color: '#888780', stepSize: 2 } },
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
          <div class="title">{{ m.label }}</div>
          <div class="metric-val" :style="{ color: m.color }">{{ m.value }}</div>
          <div class="metric-sub" :class="m.trend">{{ m.sub }}</div>
        </div>
      </div>
      
      <div class="charts-grid">
        <div class="chart-card">
          <div class="chart-info">
            <div class="title">Huckster Interface</div>
            <div class="chart-subtitle">Currently handling:</div>
            <div class="chart-subtitle">· 43 customers/suppliers </div>

          </div>
          <div class="chart-visual">
            <div class="canvas-wrap">
              <img class="rounded-lg" src="../data/images/screenshot.png" >
            </div>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-info">
            <div class="title">Manufacturing Problems</div>
            <div class="chart-subtitle">Current scan</div>
            <div class="chart-subtitle">· 17 issues not tackled yet</div>
          </div>
          <div class="chart-visual">
            <div class="canvas-wrap">
              <canvas ref="donutCanvas" role="img" aria-label="Donut chart of issues by category">
                Tolerance 7, Geometry 4, Material 3, Fixture 3.
              </canvas>
            </div>
          </div>
          <div class="legend-row">
              <span v-for="l in donutLegend" :key="l.label" class="legend-item">
                <span class="legend-dot" :style="{ background: l.color }" />
                {{ l.label }}
              </span>
            </div>
        </div>
        
        <div class="chart-card">
          <div class="chart-info">
            <div class="title">Resolutions over time</div>
            <div class="chart-subtitle">Last 7 scan cycles</div>
            <div class="legend-row">
              <span class="legend-item"><span class="legend-dot" :style="{background: themeColor}"  />Issues</span>
              <span class="legend-item"><span class="legend-dot" style="outline: 1px dashed #378ADD; outline-offset: 1px;" :style="{background: themeColorGold}" />Advices</span>
            </div>
          </div>
          <div class="chart-visual">
            <div class="canvas-wrap">
              <canvas ref="lineCanvas" role="img" aria-label="Line chart of issues and advices over 7 scans">
                Issues trending down, advices stable.
              </canvas>
            </div>
          </div>
        </div>
        
        <div class="chart-card" style="margin-bottom: 12px;">
          <div class="chart-info">
            <div class="title">Severity per feature type</div>
            <div class="chart-subtitle">AAG feature recognition · current file</div>
            <div class="legend-row">
              <span class="legend-item"><span class="legend-dot" :style="{background: themeColorOrange}" />Critical</span>
              <span class="legend-item"><span class="legend-dot" :style="{background: themeColorGold}" />Warning</span>
              <span class="legend-item"><span class="legend-dot" :style="{background: themeColor}" />Info</span>
            </div>
          </div>
          <div class="chart-visual">
            <div class="canvas-wrap canvas-wrap--bar">
              <canvas ref="barCanvas" role="img" aria-label="Stacked bar chart of severity per feature type">
                Critical, warning and info issues per feature.
              </canvas>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>
</template>

<style scoped>
/* ── Shell ────────────────────────────────────────────────────────────────── */
.gates-hero {
    display: flex;
    height: 600px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    font-size: 13px;
    background: #f5f5f4;
}

/* ── Sidebar ──────────────────────────────────────────────────────────────── */
.sidebar {
    background: #fff;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
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
    text-align: left;
    font-size: 13px;
    transition: background 0.12s;
}

.nav-item:hover {
    background: v-bind(themeColorWhite);
}

.nav-item.active {
    background: v-bind(themeColor);
    color: v-bind(themeColorWhite);
    font-weight: 500;
}

.nav-item.active .nav-icon {
    color: v-bind(themeColorWhite);
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
    gap: 10px;
}

.title {
    font-size: 0.95rem;
    font-weight: 600;
    color: v-bind(themeColor);
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
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 14px;
}

.metric-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 11px 13px;
}

.metric-label {
    font-size: 11px;
    color: #9ca3af;
    margin-bottom: 3px;
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

.metric-sub.up      { color: #991b1b; }
.metric-sub.ok      { color: #166534; }

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
    align-items: center;    /* Keeps everything beautifully centered vertically */
    justify-content: space-between;
    gap: 20px;
   min-width: 0; 
}

/* Vertical layout container for the legend info side */
.chart-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0; /* Only takes up its minimum content width */
    /* flex: 1; */
}

/* Right-aligned flex container for graph assets */
.chart-visual {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
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

.canvas-wrap {
    position: relative;
    width: 100%; 
    height: 140px;
}

.canvas-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Prevents stretching; scales down proportionally */
}

.canvas-wrap--bar {
    height: 110px;
}
</style>
