// ── State ──
let selectedLeague = "premier";
let selectedDifficulty = "easy";
let currentRound = 0;
let totalScore = 0;
let roundStadiums = [];
let guessMarker = null;
let guessLatLng = null;
let map = null;
let resultLine = null;
let resultMarkers = [];
const TOTAL_ROUNDS = 10;
const MAX_POINTS_PER_ROUND = 5000;

// ── DOM refs ──
const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const finalOverlay = document.getElementById("final-overlay");
const resultPanel = document.getElementById("result-panel");

const clueStadium = document.getElementById("clue-stadium");
const clueClub = document.getElementById("clue-club");
const roundNum = document.getElementById("round-num");
const totalScoreEl = document.getElementById("total-score");
const hintText = document.getElementById("hint-text");
const lockBtn = document.getElementById("lock-btn");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const introOverlay = document.getElementById("intro-overlay");
const introGoBtn = document.getElementById("intro-go-btn");

// ── Menu button selection ──
document.querySelectorAll(".btn-group").forEach(group => {
    group.addEventListener("click", e => {
        const btn = e.target.closest(".option-btn");
        if (!btn) return;
        group.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        if (btn.dataset.league) selectedLeague = btn.dataset.league;
        if (btn.dataset.difficulty) selectedDifficulty = btn.dataset.difficulty;
    });
});

// ── Start game ──
startBtn.addEventListener("click", startGame);
document.getElementById("back-btn").addEventListener("click", () => {
    gameScreen.classList.remove("active");
    menuScreen.classList.add("active");
    if (map) { map.remove(); map = null; }
});
playAgainBtn.addEventListener("click", () => {
    finalOverlay.classList.add("hidden");
    gameScreen.classList.remove("active");
    menuScreen.classList.add("active");
    // Reset leaderboard submit form
    document.getElementById("leaderboard-submit").style.display = "";
    document.getElementById("leaderboard-section").classList.add("hidden");
    const nameInput = document.getElementById("player-name");
    nameInput.value = "";
    nameInput.disabled = false;
    const submitBtn = document.getElementById("submit-score-btn");
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Score";
});

function startGame() {
    // Filter stadiums
    let pool;
    if (selectedLeague === "both") {
        pool = [...STADIUMS];
    } else {
        pool = STADIUMS.filter(s => s.league === selectedLeague);
    }

    // Deduplicate by name (in case of duplicates in data)
    const seen = new Set();
    pool = pool.filter(s => {
        if (seen.has(s.name + s.club)) return false;
        seen.add(s.name + s.club);
        return true;
    });

    // Shuffle and pick rounds
    shuffle(pool);
    roundStadiums = pool.slice(0, TOTAL_ROUNDS);

    currentRound = 0;
    totalScore = 0;
    document.getElementById("round-total").textContent = TOTAL_ROUNDS;

    menuScreen.classList.remove("active");
    gameScreen.classList.add("active");

    initMap();
    loadRound();
}

function initMap() {
    if (map) {
        map.remove();
    }
    map = L.map("map", {
        center: [53.0, -1.5],
        zoom: 6,
        minZoom: 5,
        maxZoom: 15
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 15
    }).addTo(map);

    map.on("click", onMapClick);
}

function onMapClick(e) {
    if (lockBtn.dataset.locked === "true") return;

    guessLatLng = e.latlng;

    if (guessMarker) {
        guessMarker.setLatLng(e.latlng);
    } else {
        guessMarker = L.marker(e.latlng, {
            icon: L.divIcon({ className: "guess-icon", iconSize: [14, 14], iconAnchor: [7, 7] })
        }).addTo(map);
    }

    lockBtn.disabled = false;
    hintText.textContent = "Happy with your guess? Lock it in!";
}

function loadRound() {
    const stadium = roundStadiums[currentRound];

    // Show intro overlay
    document.getElementById("intro-round").textContent = `Round ${currentRound + 1} of ${TOTAL_ROUNDS}`;
    document.getElementById("intro-stadium-name").textContent = selectedDifficulty === "hard" ? "Where is this stadium?" : stadium.name;
    document.getElementById("intro-club-name").textContent = selectedDifficulty === "easy" ? stadium.club : "";

    const introImg = document.getElementById("intro-image");
    introImg.src = stadium.image;
    introImg.alt = stadium.name;
    introImg.onerror = () => { introImg.style.display = "none"; };
    introImg.onload = () => { introImg.style.display = "block"; };

    introOverlay.classList.remove("hidden");

    // Reset map state in background
    roundNum.textContent = currentRound + 1;
    totalScoreEl.textContent = totalScore.toLocaleString();

    if (guessMarker) {
        map.removeLayer(guessMarker);
        guessMarker = null;
    }
    if (resultLine) {
        map.removeLayer(resultLine);
        resultLine = null;
    }
    resultMarkers.forEach(m => map.removeLayer(m));
    resultMarkers = [];
    guessLatLng = null;
    lockBtn.disabled = true;
    lockBtn.dataset.locked = "false";
    lockBtn.textContent = "Lock In Guess";
    hintText.textContent = "Click on the map to place your guess";

    map.setView([53.0, -1.5], 6);
}

// ── Intro "Let's Go" ──
introGoBtn.addEventListener("click", () => {
    const stadium = roundStadiums[currentRound];
    clueStadium.textContent = selectedDifficulty === "hard" ? "???" : stadium.name;
    clueClub.textContent = selectedDifficulty === "easy" ? stadium.club : "";
    introOverlay.classList.add("hidden");
});

// ── Lock in ──
lockBtn.addEventListener("click", () => {
    if (lockBtn.dataset.locked === "true") return;
    lockBtn.dataset.locked = "true";
    lockBtn.disabled = true;
    document.getElementById("map-overlay-top").classList.add("locked");

    const stadium = roundStadiums[currentRound];
    const actual = L.latLng(stadium.lat, stadium.lng);
    const rawDistMeters = guessLatLng.distanceTo(actual);
    const distMeters = Math.max(0, rawDistMeters - 120);
    const distKm = distMeters / 1000;
    const points = calcPoints(distKm);
    totalScore += points;

    // Show actual marker
    const actualMarker = L.marker(actual, {
        icon: L.divIcon({ className: "actual-icon", iconSize: [14, 14], iconAnchor: [7, 7] })
    }).addTo(map);
    resultMarkers.push(actualMarker);

    // Draw line
    resultLine = L.polyline([guessLatLng, actual], {
        color: "#38b6ff",
        weight: 2,
        dashArray: "6 4"
    }).addTo(map);

    // Fit bounds to show both
    const bounds = L.latLngBounds([guessLatLng, actual]);
    map.fitBounds(bounds, { padding: [60, 60] });

    // Fill result overlay
    document.getElementById("result-stadium-name").textContent = stadium.name;
    document.getElementById("result-club-name").textContent = stadium.club;
    document.getElementById("result-distance").textContent = distKm < 1
        ? `${Math.round(distMeters)} m`
        : `${distKm.toFixed(1)} km`;
    document.getElementById("result-points").textContent = points.toLocaleString();

    const img = document.getElementById("result-image");
    img.src = stadium.image;
    img.alt = stadium.name;
    img.onerror = () => {
        img.src = "";
        img.alt = "Image not available";
        img.style.display = "none";
    };
    img.onload = () => {
        img.style.display = "block";
    };

    const factsList = document.getElementById("facts-list");
    factsList.innerHTML = "";

    // Meta info line
    const leagueName = stadium.league === "premier" ? "Premier League" : "Championship";
    const metaLi = document.createElement("li");
    metaLi.className = "facts-meta";
    metaLi.innerHTML = `<span>\u{1F3D7}\uFE0F ${stadium.built}</span><span>\u{1F3DF}\uFE0F ${stadium.capacity.toLocaleString()}</span><span class="league-text">${leagueName}</span>`;
    factsList.appendChild(metaLi);

    stadium.facts.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f;
        factsList.appendChild(li);
    });

    nextBtn.textContent = currentRound < TOTAL_ROUNDS - 1 ? "Next Stadium" : "See Results";

    // Store round data for breakdown
    if (!roundStadiums[currentRound]._result) {
        roundStadiums[currentRound]._result = { distKm, points };
    }

    // Show result panel, hide bottom overlay, resize map
    setTimeout(() => {
        document.getElementById("map-overlay-bottom").style.display = "none";
        resultPanel.classList.remove("hidden");
        map.invalidateSize();
        // Refit bounds with the narrower map
        const bounds = L.latLngBounds([guessLatLng, actual]);
        map.fitBounds(bounds, { padding: [60, 60] });
    }, 400);
});

// ── Next round ──
nextBtn.addEventListener("click", () => {
    resultPanel.classList.add("hidden");
    document.getElementById("map-overlay-bottom").style.display = "";
    document.getElementById("map-overlay-top").classList.remove("locked");
    map.invalidateSize();
    currentRound++;

    if (currentRound >= TOTAL_ROUNDS) {
        showFinalScreen();
    } else {
        loadRound();
    }
});

function showFinalScreen() {
    const maxScore = TOTAL_ROUNDS * MAX_POINTS_PER_ROUND;
    document.getElementById("final-score-value").textContent = totalScore.toLocaleString() + " / " + maxScore.toLocaleString();

    // Calculate average distance
    let totalDist = 0;
    const played = roundStadiums.slice(0, TOTAL_ROUNDS);
    played.forEach(s => {
        const r = s._result || { distKm: 0, points: 0 };
        totalDist += r.distKm;
    });
    const avgDist = totalDist / TOTAL_ROUNDS;
    document.getElementById("final-avg-distance").textContent = avgDist < 1
        ? Math.round(avgDist * 1000) + " m"
        : avgDist.toFixed(1) + " km";

    const breakdown = document.getElementById("final-breakdown");
    breakdown.innerHTML = "";
    played.forEach((s, i) => {
        const r = s._result || { distKm: 0, points: 0 };
        const row = document.createElement("div");
        row.className = "breakdown-row";
        row.innerHTML = `
            <span class="breakdown-name">${i + 1}. ${s.name}</span>
            <span class="breakdown-score">${r.distKm < 1 ? Math.round(r.distKm * 1000) + " m" : r.distKm.toFixed(1) + " km"} \u2014 ${r.points.toLocaleString()} pts</span>
        `;
        breakdown.appendChild(row);
    });

    // Hide leaderboard section until user submits
    document.getElementById("leaderboard-section").classList.add("hidden");

    finalOverlay.classList.remove("hidden");

    // Show leaderboard if cached data available
    if (window.cachedEntries && window.cachedEntries.length > 0) {
        const section = document.getElementById("leaderboard-section");
        section.classList.remove("hidden");
        section.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        section.querySelector('[data-tab="alltime"]').classList.add("active");
        window.renderLeaderboard(window.cachedEntries, document.getElementById("leaderboard-list"), "alltime");
    }
}

// ── Scoring ──
function calcPoints(distKm) {
    // 0 km = 5000 pts, 500+ km = 0 pts (exponential decay)
    if (distKm <= 0.5) return MAX_POINTS_PER_ROUND;
    const pts = Math.round(MAX_POINTS_PER_ROUND * Math.exp(-distKm / 80));
    return Math.max(0, pts);
}

// ── Util ──
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// ── Drag handle for mobile result panel ──
(function() {
    const panel = document.getElementById("result-panel");
    let startY = 0;
    let dragging = false;
    let collapsed = false;

    // Listen on the entire panel top area for swipe
    panel.addEventListener("touchstart", (e) => {
        // Only start drag from top 60px of panel or the drag handle
        const rect = panel.getBoundingClientRect();
        const touchY = e.touches[0].clientY;
        if (touchY - rect.top < 60 || e.target.closest("#drag-handle")) {
            startY = touchY;
            dragging = true;
            panel.style.transition = "none";
        }
    });

    panel.addEventListener("touchmove", (e) => {
        if (!dragging) return;
        const dy = e.touches[0].clientY - startY;
        if (dy > 0) {
            panel.style.transform = `translateY(${dy}px)`;
        }
    });

    panel.addEventListener("touchend", (e) => {
        if (!dragging) return;
        dragging = false;
        panel.style.transition = "transform 0.3s ease";
        const dy = e.changedTouches[0].clientY - startY;
        if (dy > 60) {
            panel.classList.add("collapsed");
            panel.style.transform = "";
            collapsed = true;
        } else {
            panel.style.transform = "";
        }
    });

    // Tap to expand when collapsed
    panel.addEventListener("click", () => {
        if (collapsed) {
            panel.classList.remove("collapsed");
            collapsed = false;
        }
    });

    // Reset collapsed state on new round
    const origLoadRound = loadRound;
    loadRound = function() {
        panel.classList.remove("collapsed");
        panel.style.transform = "";
        collapsed = false;
        origLoadRound();
    };
})();
