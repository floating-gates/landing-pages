<script setup>
import { ref, onMounted, defineComponent, h } from 'vue'
import { Chart, registerables } from 'chart.js'
import short_logo from "../data/images/logo_short_black.webp"
import { themeColor, themeColorLille, themeColorOrange, themeColorGold, themeColorWhite } from '../config.js'
Chart.register(...registerables)

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

const PlugIcon    = makeIcon('M13.25 8.5L16.75 5M16.25 11.5L19.75 8M9.25 15.5L5.25 19.5M7.75 14L9.75 12C8.25 10 8.75 9 9.75 8C10.15 7.6 11.25 6.5 11.25 6.5L18.25 13.5C18.25 13.5 17.3825 14.3675 16.75 15C15.75 16 14.75 16.5 12.75 15L10.75 17L7.75 14Z')
const FileIcon    = makeIcon('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M8 13h8M8 17h5')
const RulerIcon   = makeIcon(['M13.2535 19.4243C12.9606 19.1314 12.4857 19.1314 12.1928 19.4243C11.8999 19.7172 11.8999 20.1921 12.1928 20.485L13.2535 19.4243ZM15.6157 22V21.25V22ZM4.04537 5.49167L4.5757 6.022H4.5757L4.04537 5.49167ZM3.51504 11.8072C3.80794 12.1001 4.28281 12.1001 4.5757 11.8072C4.8686 11.5143 4.8686 11.0394 4.5757 10.7465L3.51504 11.8072ZM11.2769 4.04537L11.8072 4.5757C11.9478 4.43505 12.0269 4.24428 12.0269 4.04537C12.0269 3.84646 11.9478 3.65569 11.8072 3.51504L11.2769 4.04537ZM5.49167 4.04537L4.96134 3.51504L4.96134 3.51504L5.49167 4.04537ZM19.9546 12.7231L20.485 12.1928C20.3443 12.0522 20.1535 11.9731 19.9546 11.9731C19.7557 11.9731 19.565 12.0522 19.4243 12.1928L19.9546 12.7231ZM22 15.6157H22.75H22ZM8.33603 5.92553C8.04314 6.21843 8.04314 6.6933 8.33603 6.98619C8.62892 7.27909 9.1038 7.27909 9.39669 6.98619L8.33603 5.92553ZM17.0138 14.6033C16.7209 14.8962 16.7209 15.3711 17.0138 15.664C17.3067 15.9569 17.7816 15.9569 18.0745 15.664L17.0138 14.6033ZM18.4868 21.0343C18.7819 20.7435 18.7854 20.2687 18.4947 19.9736C18.204 19.6786 17.7291 19.675 17.4341 19.9657L18.4868 21.0343ZM19.9274 17.473C19.6363 17.7677 19.6393 18.2426 19.934 18.5336C20.2287 18.8247 20.7036 18.8217 20.9946 18.527L19.9274 17.473ZM4.96134 3.51504L3.51504 4.96134L4.5757 6.022L6.022 4.5757L4.96134 3.51504ZM12.1928 20.485C12.8596 21.1518 13.4119 21.7063 13.9081 22.0849C14.4217 22.4767 14.9622 22.75 15.6157 22.75V21.25C15.422 21.25 15.1981 21.1824 14.818 20.8924C14.4206 20.5892 13.9503 20.1211 13.2535 19.4243L12.1928 20.485ZM3.51504 4.96134C2.84824 5.62814 2.29367 6.18046 1.91508 6.67666C1.52328 7.19018 1.25 7.73073 1.25 8.38426H2.75C2.75 8.19057 2.81761 7.96662 3.10761 7.58654C3.41081 7.18914 3.87892 6.71878 4.5757 6.022L3.51504 4.96134ZM4.5757 10.7465C3.87892 10.0497 3.41081 9.57937 3.10761 9.18198C2.81761 8.8019 2.75 8.57795 2.75 8.38426H1.25C1.25 9.03779 1.52328 9.57835 1.91508 10.0919C2.29367 10.5881 2.84824 11.1404 3.51504 11.8072L4.5757 10.7465ZM11.8072 3.51504C11.1404 2.84824 10.5881 2.29367 10.0919 1.91508C9.57835 1.52328 9.03779 1.25 8.38426 1.25V2.75C8.57795 2.75 8.8019 2.81761 9.18199 3.10761C9.57938 3.41081 10.0497 3.87892 10.7465 4.5757L11.8072 3.51504ZM6.022 4.5757C6.71878 3.87892 7.18914 3.41081 7.58654 3.10761C7.96662 2.81762 8.19057 2.75 8.38426 2.75V1.25C7.73073 1.25 7.19018 1.52328 6.67666 1.91508C6.18046 2.29367 5.62814 2.84824 4.96134 3.51504L6.022 4.5757ZM19.4243 13.2535C20.1211 13.9503 20.5892 14.4206 20.8924 14.818C21.1824 15.1981 21.25 15.422 21.25 15.6157H22.75C22.75 14.9622 22.4767 14.4217 22.0849 13.9081C21.7063 13.4119 21.1518 12.8596 20.485 12.1928L19.4243 13.2535ZM10.7465 3.51504L8.33603 5.92553L9.39669 6.98619L11.8072 4.5757L10.7465 3.51504ZM19.4243 12.1928L17.0138 14.6033L18.0745 15.664L20.485 13.2535L19.4243 12.1928ZM17.4341 19.9657C16.9239 20.4684 16.5635 20.7975 16.2586 21.0043C15.9715 21.199 15.784 21.25 15.6157 21.25V22.75C16.173 22.75 16.6504 22.551 17.1005 22.2457C17.5329 21.9525 17.982 21.5316 18.4868 21.0343L17.4341 19.9657ZM20.9946 18.527C21.504 18.0112 21.9345 17.5549 22.2339 17.1178C22.5457 16.6628 22.75 16.1805 22.75 15.6157H21.25C21.25 15.7859 21.1978 15.9762 20.9966 16.2699C20.783 16.5815 20.4439 16.9499 19.9274 17.473L20.9946 18.527Z','M14.3601 4.07866L15.2869 3.15178C16.8226 1.61607 19.3125 1.61607 20.8482 3.15178C22.3839 4.68748 22.3839 7.17735 20.8482 8.71306L19.9213 9.63993M14.3601 4.07866C14.3601 4.07866 14.4759 6.04828 16.2138 7.78618C17.9517 9.52407 19.9213 9.63993 19.9213 9.63993M14.3601 4.07866L12 6.43872M19.9213 9.63993L14.6607 14.9006L11.5613 18L11.4001 18.1612C10.8229 18.7383 10.5344 19.0269 10.2162 19.2751C9.84082 19.5679 9.43469 19.8189 9.00498 20.0237C8.6407 20.1973 8.25352 20.3263 7.47918 20.5844L4.19792 21.6782M4.19792 21.6782L3.39584 21.9456C3.01478 22.0726 2.59466 21.9734 2.31063 21.6894C2.0266 21.4053 1.92743 20.9852 2.05445 20.6042L2.32181 19.8021M4.19792 21.6782L2.32181 19.8021M2.32181 19.8021L3.41556 16.5208C3.67368 15.7465 3.80273 15.3593 3.97634 14.995C4.18114 14.5653 4.43213 14.1592 4.7249 13.7838C4.97308 13.4656 5.26166 13.1771 5.83882 12.5999L8.5 9.93872'])
const FactoryIcon     = makeIcon('M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z')
const AtomIcon        = makeIcon('M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z')
const AlertIcon       = makeIcon('M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01')
const SlidersIcon     = makeIcon('M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6')
const CheckIcon       = makeIcon('M20 6 9 17l-5-5')
const WebIcon         = makeIcon('M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418')

const activeNav = ref('endpoints')
const navItems = [
    { id: 'endpoints', label: 'Endpoints', icon: PlugIcon, badge: '3', badgeType: 'ok' },
    { id: 'factory-ui', label: 'Issue Resolution UI', icon: WebIcon, badge: 'ready', badgeType: 'ok' },
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
            <div class="title">Issue Resolution Interface</div>
            <div class="chart-subtitle">Currently handling · 43 customers/suppliers </div>
          </div>
          <div class="chart-visual">
            <img class="screenshot-img" src="../data/images/screenshot.png" >
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-info">
            <div class="title">Issues by Type</div>
            <div class="chart-subtitle">Current scan · 17 issues not tackled yet</div>
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
            <div class="title">Issues over scans</div>
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

.screenshot-img {
    max-width: 250px;   
    height: auto;       
    object-fit: contain;
    border-radius: 6px; 
    flex-shrink: 1;     
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
    margin-bottom: 10px;
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
    max-height: 160px; /* Limits size expansion on wide spans */
    max-width: 420px; /* Limits size expansion on wide spans */
}

.canvas-wrap--bar {
    height: 110px;
}
</style>
