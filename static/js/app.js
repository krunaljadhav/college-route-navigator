// ============================================================
// SVPM Campus Navigator — app.js
// ============================================================

const OSRM   = 'https://router.project-osrm.org/route/v1/foot/';
const CENTER = [18.1385, 74.4985];

// Category mapping for filter
const CAT = {
    academic: ['engineering_college','diploma_engineering','pharmacy_college','electrical_dept','commerce_science'],
    hostel:   ['rajmata_hostel','savitribai_hostel','ahilyadevi_hostel','boys_hostel','hostel_gate'],
    food:     ['canteen','girls_mess','shree_mess'],
    sports:   ['basketball_court','play_ground','ground','main_ground','girls_gym'],
    services: ['xerox_center','parking_area','management_gate','workshop','main_gate'],
};

// ===== STATE =====
let map, streetTile, satTile;
let markersLayer, routeLayer, destMarker;
let buildings     = [];
let userLocation  = null;
let userMarker    = null;
let isSat         = false;
let selectedDest  = null;
let currentPage   = 'map';

// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
    initMap();
    await loadBuildings();
    setupEvents();
    getUserLocation(null, true);
});

// ============================================================
// MAP
// ============================================================
function initMap() {
    map = L.map('map', {
        center: CENTER, zoom: 16,
        minZoom: 13, maxZoom: 21,
        zoomControl: true,
    });

    // CartoDB dark — great India coverage, dark theme built-in
    streetTile = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        subdomains:     'abcd',
        maxZoom:        22,
        maxNativeZoom:  21,       // ← prevents "not available" tiles
    }).addTo(map);

    // Google Satellite - best India coverage, works at all zoom levels!
    satTile = L.tileLayer(
        'https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains:     ['0','1','2','3'],
        attribution:    '© Google Satellite',
        maxZoom:        22,
        maxNativeZoom:  21,
    });

    markersLayer = L.layerGroup().addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map);

    document.getElementById('globalLoading').classList.add('hidden');
}

// ============================================================
// DATA
// ============================================================
async function loadBuildings() {
    const res  = await fetch('/api/buildings');
    const data = await res.json();
    buildings  = data.buildings || [];
    renderMarkers(buildings);
    renderDirectory(buildings);
    renderAllLocList(buildings);
    toast('✅ ' + buildings.length + ' locations loaded', 'ok');
}

// ============================================================
// MARKERS
// ============================================================
function renderMarkers(list) {
    markersLayer.clearLayers();
    list.forEach(b => {
        const icon = L.divIcon({
            html: `<div style="font-size:28px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.8));">${b.icon||'🏢'}</div>`,
            className: 'custom-div-icon',
            iconSize: [36,36], iconAnchor: [18,36], popupAnchor: [0,-38],
        });
        const marker = L.marker([b.coordinates.latitude, b.coordinates.longitude], { icon });
        marker.bindPopup(`
            <div style="min-width:190px;padding:2px 0;">
                <div style="font-size:14px;font-weight:700;color:#F1F5F9;margin-bottom:4px;">${b.icon||''} ${b.name}</div>
                <div style="font-size:11px;color:#06B6D4;font-family:monospace;margin-bottom:10px;">${b.code||''}</div>
                <div style="display:flex;gap:7px;">
                    <button onclick="openSheet('${b.id}')" style="flex:1;padding:7px 4px;background:#1C2338;color:#F1F5F9;border:1px solid rgba(255,255,255,.1);border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;">📋 Info</button>
                    <button onclick="launchNavFromMap('${b.id}')" style="flex:1;padding:7px 4px;background:#3B82F6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;">🧭 Go</button>
                </div>
            </div>`);
        markersLayer.addLayer(marker);
    });
}

function filterMarkers(cat) {
    document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('pill' + capitalize(cat === 'all' ? 'all' : cat.slice(0,4))).classList.add('active');
    if (cat === 'all') { renderMarkers(buildings); return; }
    const ids  = CAT[cat] || [];
    const list = buildings.filter(b => ids.includes(b.id));
    renderMarkers(list.length ? list : buildings);
}

// ============================================================
// BOTTOM SHEET (building detail)
// ============================================================
function openSheet(id) {
    const b = buildings.find(x => x.id === id);
    if (!b) return;
    map.closePopup();
    const depts = (b.departments||[]).map(d => `<span class="tag">${d}</span>`).join('');
    const facs  = (b.facilities||[]).map(f => `<span class="tag">${f}</span>`).join('');
    document.getElementById('sheetBody').innerHTML = `
        ${b.image ? `<img src="${b.image}" class="sheet-img" alt="${b.name}">` : ''}
        <h2 class="sheet-title">${b.icon||''} ${b.name}</h2>
        ${b.code ? `<span class="sheet-code">${b.code}</span>` : ''}
        <p class="sheet-desc">${b.description||''}</p>
        ${depts ? `<div class="sheet-section"><div class="sheet-section-title">Departments</div><div class="tags">${depts}</div></div>` : ''}
        ${facs  ? `<div class="sheet-section"><div class="sheet-section-title">Facilities</div><div class="tags">${facs}</div></div>`   : ''}
        ${b.floor_count ? `<div class="sheet-section"><div class="sheet-section-title">Building Info</div><div class="tags"><span class="tag">🏢 ${b.floor_count} Floors</span></div></div>` : ''}
        <div class="sheet-section">
            <div class="sheet-section-title">GPS Coordinates</div>
            <div class="sheet-coords">📍 ${b.coordinates.latitude}, ${b.coordinates.longitude}</div>
        </div>
        <button class="sheet-nav-btn" onclick="closeSheet();launchNavFromMap('${b.id}')">🧭 Get Walking Directions</button>`;
    document.getElementById('buildingSheet').classList.add('active');
    document.getElementById('sheetOverlay').classList.add('active');
    map.flyTo([b.coordinates.latitude, b.coordinates.longitude], 18, { duration: 1.2 });
}

function closeSheet() {
    document.getElementById('buildingSheet').classList.remove('active');
    document.getElementById('sheetOverlay').classList.remove('active');
}

// ============================================================
// NAVIGATE FROM MAP (launches directions drawer)
// ============================================================
function launchNavFromMap(id) {
    const b = buildings.find(x => x.id === id);
    if (!b) return;
    if (!userLocation) {
        toast('📍 Getting your location...', 'inf');
        getUserLocation(() => launchNavFromMap(id));
        return;
    }
    // Switch to map page first
    goPage('map', document.getElementById('navMap'));
    openDrawer(b);
    drawRoute(userLocation, b.coordinates, b);
}

// ============================================================
// DIRECTIONS DRAWER
// ============================================================
function openDrawer(b) {
    document.getElementById('drawerDest').textContent = 'To: ' + b.name;
    document.getElementById('drawerSummary').style.display  = 'none';
    document.getElementById('drawerLoading').style.display  = 'flex';
    document.getElementById('drawerError').style.display    = 'none';
    document.getElementById('drawerSteps').innerHTML         = '';
    document.getElementById('drawerFooter').style.display   = 'none';
    document.getElementById('dirDrawer').classList.add('active');
}

function closeDrawer() {
    document.getElementById('dirDrawer').classList.remove('active');
    clearRoute();
}

async function drawRoute(from, to, building) {
    clearRoute();
    
    // ✨ UPGRADED: Beautiful gradient destination pin with drop animation
    const dicon = L.divIcon({
        html: `
            <div class="dest-marker-container">
                <div class="dest-pin"></div>
                <div class="dest-emoji">${building.icon||'🏢'}</div>
                <div class="dest-shadow"></div>
            </div>
            <style>
                .dest-marker-container {
                    width: 50px;
                    height: 60px;
                    position: relative;
                    animation: markerDrop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                @keyframes markerDrop {
                    0% { transform: translateY(-100px) scale(0); opacity: 0; }
                    60% { transform: translateY(5px) scale(1.1); }
                    100% { transform: translateY(0) scale(1); opacity: 1; }
                }
                .dest-pin {
                    position: absolute;
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, #0066FF 0%, #00D9FF 100%);
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    left: 7px;
                    top: 2px;
                    border: 3px solid white;
                    box-shadow: 0 4px 20px rgba(0, 102, 255, 0.6),
                                0 0 0 4px rgba(0, 102, 255, 0.2);
                }
                .dest-emoji {
                    position: absolute;
                    font-size: 18px;
                    left: 16px;
                    top: 10px;
                    z-index: 10;
                    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
                }
                .dest-shadow {
                    position: absolute;
                    width: 20px;
                    height: 8px;
                    background: radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%);
                    bottom: -5px;
                    left: 15px;
                    border-radius: 50%;
                }
            </style>`,
        className:'', 
        iconSize: [50, 60], 
        iconAnchor: [25, 55],
    });
    
    destMarker = L.marker([to.latitude, to.longitude], { icon: dicon, zIndexOffset: 900 }).addTo(map);

    const url = `${OSRM}${from.longitude},${from.latitude};${to.longitude},${to.latitude}?overview=full&geometries=geojson&steps=true`;
    try {
        const res  = await fetch(url);
        const data = await res.json();
        if (data.code !== 'Ok' || !data.routes?.length) { showDrawerError(); return; }

        const route = data.routes[0];
        const legs  = route.legs[0];
        const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);

        // ✨ UPGRADED: Thicker route line with smooth caps
        const line  = L.polyline(coords, { 
            color: '#0066FF', 
            weight: 6, 
            opacity: 0.9,
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
        
        // ✨ UPGRADED: Animated dashed overlay that moves!
        const dash  = L.polyline(coords, { 
            color: '#00D9FF', 
            weight: 3, 
            opacity: 0.8, 
            dashArray: '10, 15',
            dashOffset: '0',
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
        
        // Animate the dashes to create movement effect
        let dashOffset = 0;
        const animateDash = setInterval(() => {
            dashOffset -= 1;
            dash.setStyle({ dashOffset: dashOffset });
        }, 50);
        
        routeLayer = { line, dash, animation: animateDash };
        
        // ✨ UPGRADED: Smooth auto-zoom with perfect padding (wait for pin to drop first)
        setTimeout(() => {
            map.fitBounds(line.getBounds(), { 
                padding: [80, 80],
                maxZoom: 17,
                animate: true,
                duration: 1.2
            });
        }, 300);

        // Summary
        const dist = route.distance >= 1000 ? (route.distance/1000).toFixed(1)+' km' : Math.round(route.distance)+'m';
        const mins = Math.ceil(route.duration / 60);
        const time = mins < 60 ? mins+' min' : Math.floor(mins/60)+'h '+(mins%60)+'m';
        document.getElementById('dDist').textContent  = dist;
        document.getElementById('dTime').textContent  = time;
        document.getElementById('dTurns').textContent = legs.steps.length;
        document.getElementById('drawerSummary').style.display = 'flex';
        document.getElementById('drawerLoading').style.display = 'none';
        document.getElementById('drawerFooter').style.display  = 'block';

        buildDrawerSteps(legs.steps, building);

    } catch (e) { console.error(e); showDrawerError(); }
}

const STEP_ICONS = {
    depart:'🟢', arrive:'📍', continue:'⬆️', 'new name':'➡️',
    merge:'↗️', fork:'⑂', roundabout:'🔄', rotary:'🔄',
    'exit roundabout':'↗️', 'end of road':'⬆️',
    turn: { left:'⬅️', right:'➡️', 'slight left':'↖️', 'slight right':'↗️', 'sharp left':'↩️', 'sharp right':'↪️', straight:'⬆️', uturn:'🔃' }
};
function stepIcon(type, mod) {
    if (type === 'turn') return STEP_ICONS.turn[mod] || '➡️';
    return STEP_ICONS[type] || (STEP_ICONS.turn[mod] || '➡️');
}
function buildDrawerSteps(steps, building) {
    document.getElementById('drawerSteps').innerHTML = steps.map((s, i) => {
        const type  = s.maneuver?.type || '';
        const mod   = s.maneuver?.modifier || '';
        const icon  = stepIcon(type, mod);
        const dist  = s.distance > 0 ? (s.distance >= 1000 ? (s.distance/1000).toFixed(1)+' km' : Math.round(s.distance)+'m') : '';
        const start = type === 'depart';
        const end   = type === 'arrive';
        let text = s.name
            ? (type === 'turn' ? 'Turn ' + mod : capitalize(type)) + ' on <b>' + s.name + '</b>'
            : capitalize(type || 'Continue');
        if (start) text = '<b>🟢 Start walking from your location</b>';
        if (end)   text = '<b>📍 You have arrived at ' + building.name + '!</b>';
        
        // ✨ UPGRADED: Interactive steps with hover effects
        return `<div class="step-row ${start?'s-start':''} ${end?'s-end':''}" 
                     style="cursor:pointer;transition:all 0.2s;"
                     onmouseover="this.style.background='rgba(0,102,255,0.12)'"
                     onmouseout="this.style.background='transparent'">
            <div class="step-n">${start?'▶': end?'🏁': i}</div>
            <div class="step-ic">${icon}</div>
            <div class="step-tx">
                <div class="step-main">${text}</div>
                ${dist ? `<div class="step-d">${dist}</div>` : ''}
            </div></div>`;
    }).join('');
}
function clearRoute() {
    if (routeLayer) { 
        map.removeLayer(routeLayer.line); 
        map.removeLayer(routeLayer.dash);
        if (routeLayer.animation) clearInterval(routeLayer.animation); // Stop animation
        routeLayer = null; 
    }
    if (destMarker) { map.removeLayer(destMarker); destMarker = null; }
}
function showDrawerError() {
    document.getElementById('drawerLoading').style.display = 'none';
    document.getElementById('drawerError').style.display   = 'block';
}

// ============================================================
// PAGE 3 — NAVIGATE (standalone directions page)
// ============================================================
let navDestTimer;
document.getElementById('navDestInput').addEventListener('input', e => {
    clearTimeout(navDestTimer);
    const q = e.target.value.trim();
    if (q.length < 2) { document.getElementById('destResults').innerHTML=''; return; }
    navDestTimer = setTimeout(async () => {
        const r = await fetch('/api/search?q=' + encodeURIComponent(q));
        const d = await r.json();
        document.getElementById('destResults').innerHTML = d.results.slice(0, 6).map(b =>
            `<div class="dest-result-item" onclick="selectDest('${b.id}')">
                <span style="font-size:20px;">${b.icon||'🏢'}</span>
                <div><div style="font-size:13px;font-weight:600;">${b.name}</div>
                <div style="font-size:11px;color:#06B6D4;font-family:monospace;">${b.code||''}</div></div>
            </div>`).join('');
    }, 280);
});

function selectDest(id) {
    const b = buildings.find(x => x.id === id);
    if (!b) return;
    selectedDest = b;
    document.getElementById('destResults').innerHTML = '';
    document.getElementById('navDestInput').value    = '';
    document.getElementById('destChosen').style.display = 'flex';
    document.getElementById('destChosen').innerHTML = `
        <span class="dest-chosen-icon">${b.icon||'🏢'}</span>
        <div><div class="dest-chosen-name">${b.name}</div>
        <div class="dest-chosen-code">${b.code||''}</div></div>
        <button class="dest-chosen-clear" onclick="clearDest()">✕</button>`;
}
function clearDest() {
    selectedDest = null;
    document.getElementById('destChosen').style.display = 'none';
    document.getElementById('destChosen').innerHTML = '';
    document.getElementById('dirResult').style.display = 'none';
}

async function startDirections() {
    if (!selectedDest) { toast('Please choose a destination first', 'err'); return; }
    if (!userLocation) {
        toast('📍 Getting your location...', 'inf');
        getUserLocation(startDirections);
        return;
    }
    document.getElementById('dirResult').style.display = 'flex';
    document.getElementById('dirResult').style.flexDirection = 'column';
    document.getElementById('navStepsList').innerHTML = '<div style="padding:16px;text-align:center;color:#94A3B8;">⏳ Calculating route...</div>';
    document.getElementById('navDist').textContent = '...';
    document.getElementById('navTime').textContent = '...';
    document.getElementById('navSteps').textContent = '...';

    const b = selectedDest;
    const url = `${OSRM}${userLocation.longitude},${userLocation.latitude};${b.coordinates.longitude},${b.coordinates.latitude}?overview=full&geometries=geojson&steps=true`;
    try {
        const res  = await fetch(url);
        const data = await res.json();
        if (data.code !== 'Ok' || !data.routes?.length) { toast('Could not find route', 'err'); return; }
        const route = data.routes[0];
        const legs  = route.legs[0];
        const dist  = route.distance >= 1000 ? (route.distance/1000).toFixed(1)+' km' : Math.round(route.distance)+'m';
        const mins  = Math.ceil(route.duration / 60);
        const time  = mins < 60 ? mins+' min' : Math.floor(mins/60)+'h '+(mins%60)+'m';
        document.getElementById('navDist').textContent  = dist;
        document.getElementById('navTime').textContent  = time;
        document.getElementById('navSteps').textContent = legs.steps.length;
        document.getElementById('navStepsList').innerHTML = legs.steps.map((s, i) => {
            const type  = s.maneuver?.type || '';
            const mod   = s.maneuver?.modifier || '';
            const icon  = stepIcon(type, mod);
            const d     = s.distance > 0 ? (s.distance >= 1000 ? (s.distance/1000).toFixed(1)+' km' : Math.round(s.distance)+'m') : '';
            const start = type === 'depart';
            const end   = type === 'arrive';
            let text = s.name ? (type==='turn'?'Turn '+mod:capitalize(type))+' on <b>'+s.name+'</b>' : capitalize(type||'Continue');
            if (start) text = '🟢 Start from your location';
            if (end)   text = '📍 Arrived at <b>'+b.name+'</b>';
            return `<div class="nav-step ${start?'st-start':''} ${end?'st-end':''}">
                <div class="nav-step-num">${start?'▶':end?'🏁':i}</div>
                <div class="nav-step-icon">${icon}</div>
                <div style="flex:1;">
                    <div class="nav-step-text">${text}</div>
                    ${d ? `<div class="nav-step-dist">${d}</div>` : ''}
                </div></div>`;
        }).join('');

        // Store route for "show on map" button
        document._lastRoute = { buildings: b, legs };
    } catch(e) { toast('Routing error', 'err'); }
}

document.getElementById('showOnMapBtn').addEventListener('click', () => {
    if (!selectedDest) return;
    goPage('map', document.getElementById('navMap'));
    setTimeout(() => launchNavFromMap(selectedDest.id), 300);
});

// ============================================================
// DIRECTORY PAGE
// ============================================================
function renderDirectory(list) {
    document.getElementById('dirCount').textContent = list.length + ' locations';
    document.getElementById('dirList').innerHTML = list.map(b => `
        <div class="dir-card" id="dc-${b.id}">
            <div class="dir-card-icon">${b.icon||'🏢'}</div>
            <div class="dir-card-body">
                <div class="dir-card-name">${b.name}</div>
                <div class="dir-card-code">${b.code||''}</div>
                <div class="dir-card-desc">${(b.description||'').slice(0,60)}...</div>
            </div>
            <div class="dir-card-actions">
                <button class="dca-btn dca-info" onclick="openSheet('${b.id}')">📋 Info</button>
                <button class="dca-btn dca-nav"  onclick="launchNavFromMap('${b.id}')">🧭 Go</button>
            </div>
        </div>`).join('');
}

let dirSearchTimer;
document.getElementById('dirSearchInput').addEventListener('input', e => {
    clearTimeout(dirSearchTimer);
    dirSearchTimer = setTimeout(async () => {
        const q = e.target.value.trim();
        if (!q) { renderDirectory(buildings); return; }
        const r = await fetch('/api/search?q=' + encodeURIComponent(q));
        const d = await r.json();
        renderDirectory(d.results);
    }, 280);
});

function dirFilter(cat, btn) {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    if (cat === 'all') { renderDirectory(buildings); return; }
    const ids  = CAT[cat] || [];
    const list = buildings.filter(b => ids.includes(b.id));
    renderDirectory(list.length ? list : buildings);
}

// ============================================================
// INFO PAGE — all locations list
// ============================================================
function renderAllLocList(list) {
    document.getElementById('allLocList').innerHTML = list.map(b => `
        <div class="all-loc-item" onclick="goPage('map',document.getElementById('navMap'));setTimeout(()=>{ map.flyTo([${b.coordinates.latitude},${b.coordinates.longitude}],18);openSheet('${b.id}'); },300)">
            <div class="all-loc-icon">${b.icon||'🏢'}</div>
            <div class="all-loc-name">${b.name}</div>
            <div class="all-loc-code">${b.code||''}</div>
        </div>`).join('');
}

// ============================================================
// USER LOCATION
// ============================================================
function getUserLocation(cb, silent) {
    if (!navigator.geolocation) { toast('Geolocation not supported', 'err'); return; }
    navigator.geolocation.getCurrentPosition(pos => {
        userLocation = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        
        // ✨ UPGRADED: Much larger, more visible user marker with double pulse
        const pIcon = L.divIcon({
            html: `
                <div class="user-location-marker">
                    <div class="user-pulse"></div>
                    <div class="user-pulse pulse-2"></div>
                    <div class="user-dot"></div>
                </div>
                <style>
                    .user-location-marker {
                        width: 50px;
                        height: 50px;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .user-pulse {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: rgba(0, 217, 255, 0.4);
                        animation: userPulse 2s ease-out infinite;
                    }
                    .pulse-2 {
                        animation-delay: 1s;
                    }
                    .user-dot {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #00D9FF;
                        border: 4px solid white;
                        box-shadow: 0 0 0 2px rgba(0, 217, 255, 0.3),
                                    0 4px 12px rgba(0, 0, 0, 0.4);
                        z-index: 10;
                        position: relative;
                    }
                    @keyframes userPulse {
                        0% {
                            transform: scale(0.3);
                            opacity: 1;
                        }
                        70% {
                            transform: scale(1.2);
                            opacity: 0;
                        }
                        100% {
                            transform: scale(1.5);
                            opacity: 0;
                        }
                    }
                </style>`,
            className:'', 
            iconSize: [50, 50], 
            iconAnchor: [25, 25],
        });
        
        if (userMarker) {
            userMarker.setLatLng([userLocation.latitude, userLocation.longitude]);
        } else {
            userMarker = L.marker([userLocation.latitude, userLocation.longitude], { 
                icon: pIcon, 
                zIndexOffset: 1000 
            })
            .bindPopup('<div style="font-size:15px;font-weight:600;color:#0B0F1A;padding:4px;">📍 You are here!</div>')
            .addTo(map);
        }

        document.getElementById('locStatus').textContent = '✅ Found';
        if (!silent) toast('📍 Location found!', 'ok');
        if (cb) cb();
    }, () => {
        document.getElementById('locStatus').textContent = '❌ Denied';
        if (!silent) toast('Location access denied', 'err');
    }, { enableHighAccuracy: true, timeout: 10000 });
}

// ============================================================
// MAP SEARCH (on map page)
// ============================================================
let mapSearchTimer;
document.getElementById('mapSearchInput').addEventListener('input', e => {
    clearTimeout(mapSearchTimer);
    const q   = e.target.value.trim();
    const box = document.getElementById('mapSearchResults');
    if (q.length < 2) { box.innerHTML=''; return; }
    mapSearchTimer = setTimeout(async () => {
        const r = await fetch('/api/search?q=' + encodeURIComponent(q));
        const d = await r.json();
        box.innerHTML = d.results.slice(0,6).map(b =>
            `<div class="srd-item" onclick="mapSearchPick('${b.id}')">
                <span class="srd-icon">${b.icon||'🏢'}</span>
                <div><div class="srd-name">${b.name}</div><div class="srd-code">${b.code||''}</div></div>
            </div>`).join('');
    }, 280);
});
function mapSearchPick(id) {
    const b = buildings.find(x => x.id === id);
    if (!b) return;
    document.getElementById('mapSearchResults').innerHTML = '';
    document.getElementById('mapSearchInput').value = '';
    map.flyTo([b.coordinates.latitude, b.coordinates.longitude], 18, { duration: 1.2 });
    setTimeout(() => openSheet(id), 1400);
}
// Close dropdown on outside click
document.addEventListener('click', e => {
    if (!e.target.closest('.map-search-inner')) {
        document.getElementById('mapSearchResults').innerHTML = '';
    }
});

// ============================================================
// PAGE NAVIGATION
// ============================================================
function goPage(name, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    btn.classList.add('active');
    currentPage = name;
    // Resize map when returning to map tab
    if (name === 'map') setTimeout(() => map.invalidateSize(), 50);
}

// ============================================================
// EVENTS
// ============================================================
function setupEvents() {
    document.getElementById('headerLocBtn').addEventListener('click', () => getUserLocation(null, false));
    document.getElementById('fabCenter').addEventListener('click', () => map.flyTo(CENTER, 16, { duration: 1.2 }));
    document.getElementById('fabSat').addEventListener('click', () => {
        isSat = !isSat;
        document.getElementById('fabSat').classList.toggle('active', isSat);
        if (isSat) { map.removeLayer(streetTile); satTile.addTo(map); toast('🛰️ Satellite view', 'inf'); }
        else        { map.removeLayer(satTile); streetTile.addTo(map); toast('🗺️ Street view', 'inf'); }
    });
}

// ============================================================
// UTILS
// ============================================================
function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
function toast(msg, type) {
    const w = document.getElementById('toastWrap');
    const t = document.createElement('div');
    t.className = 'toast ' + (type||'inf');
    t.textContent = msg;
    w.appendChild(t);
    setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(() => t.remove(), 300); }, 3000);
}

// Global access
window.openSheet       = openSheet;
window.closeSheet      = closeSheet;
window.launchNavFromMap = launchNavFromMap;
window.filterMarkers   = filterMarkers;
window.goPage          = goPage;
window.selectDest      = selectDest;
window.clearDest       = clearDest;
window.startDirections = startDirections;
window.mapSearchPick   = mapSearchPick;
window.dirFilter       = dirFilter;
window.closeDrawer     = closeDrawer;
