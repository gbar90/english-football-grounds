// ── Leaderboard via GitHub Gist ──
const GIST_ID = "03af45eb5cfbc2e4b9155d7bbeef31f0";
const GIST_TOKEN = atob("Z2l0aHViX3BhdF8xMUFKRUZKS0kwRlhKQnVaWmd0ZTB5X2VGOTN6RGNNT1RJNTRNRzJFbDVuNk4xSmZhWHlmc0syRFZSTHZFN1VvbmlJTDRUV003UTA0NDZZMHhO");
const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;
const MAX_ENTRIES = 200;

let cachedEntries = [];

async function fetchLeaderboard() {
    try {
        const res = await fetch(GIST_URL, {
            headers: { "Authorization": `token ${GIST_TOKEN}` }
        });
        if (!res.ok) {
            console.error("Leaderboard fetch failed:", res.status);
            return [];
        }
        const gist = await res.json();
        const content = gist.files["leaderboard.json"].content;
        const data = JSON.parse(content);
        cachedEntries = data.leaderboard || [];
        return cachedEntries;
    } catch (err) {
        console.error("Leaderboard fetch error:", err);
        return [];
    }
}

async function saveLeaderboard(entries) {
    try {
        await fetch(GIST_URL, {
            method: "PATCH",
            headers: {
                "Authorization": `token ${GIST_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                files: {
                    "leaderboard.json": {
                        content: JSON.stringify({ leaderboard: entries })
                    }
                }
            })
        });
    } catch {
        // silent fail
    }
}

function getToday() {
    return new Date().toISOString().split("T")[0];
}

function leagueLabel(league) {
    if (league === "premier") return "PL";
    if (league === "championship") return "Champ";
    return "Both";
}

function filterEntries(entries, tab) {
    if (tab === "today") {
        const today = getToday();
        return entries.filter(e => e.date === today);
    }
    return entries;
}

async function submitScore(name, score, rounds, avgDist, league, difficulty) {
    const entries = await fetchLeaderboard();
    entries.push({
        name: name.trim().substring(0, 20),
        score,
        rounds,
        avgDist: Math.round(avgDist * 10) / 10,
        league,
        difficulty,
        date: getToday()
    });
    entries.sort((a, b) => b.score - a.score);
    const trimmed = entries.slice(0, MAX_ENTRIES);
    await saveLeaderboard(trimmed);
    cachedEntries = trimmed;
    return trimmed;
}

function renderLeaderboard(entries, container, tab) {
    const filtered = filterEntries(entries, tab || "alltime");
    container.innerHTML = "";
    if (filtered.length === 0) {
        container.innerHTML = `<p class="leaderboard-empty">${tab === "today" ? "No scores today yet. Be the first!" : "No scores yet. Be the first!"}</p>`;
        return;
    }
    filtered.slice(0, 10).forEach((entry, i) => {
        const row = document.createElement("div");
        row.className = "breakdown-row";
        const medal = i === 0 ? "\u{1F947}" : i === 1 ? "\u{1F948}" : i === 2 ? "\u{1F949}" : `${i + 1}.`;
        const mode = `${leagueLabel(entry.league)}, ${entry.difficulty || "easy"}`;
        row.innerHTML = `
            <span class="breakdown-name">${medal} ${entry.name} <span class="mode-tag">(${mode})</span></span>
            <span class="breakdown-score">${entry.score.toLocaleString()} pts</span>
        `;
        container.appendChild(row);
    });
}

// ── Tab switching ──
function setupTabs(tabContainer, listContainer, entriesGetter) {
    tabContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".tab-btn");
        if (!btn) return;
        tabContainer.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderLeaderboard(entriesGetter(), listContainer, btn.dataset.tab);
    });
}

// ── Submit score from final screen ──
function handleSubmit() {
    const nameInput = document.getElementById("player-name");
    const name = nameInput.value.trim();
    if (!name) {
        nameInput.focus();
        return;
    }

    // Disable input immediately
    nameInput.disabled = true;
    const btn = document.getElementById("submit-score-btn");
    btn.disabled = true;
    btn.textContent = "Submitted!";

    const avgDist = totalScore > 0 ? (() => {
        let d = 0;
        roundStadiums.slice(0, TOTAL_ROUNDS).forEach(s => {
            d += (s._result || { distKm: 0 }).distKm;
        });
        return d / TOTAL_ROUNDS;
    })() : 0;

    // Build local entry and show leaderboard immediately
    const newEntry = {
        name: name.substring(0, 20),
        score: totalScore,
        rounds: TOTAL_ROUNDS,
        avgDist: Math.round(avgDist * 10) / 10,
        league: selectedLeague,
        difficulty: selectedDifficulty,
        date: getToday()
    };
    const localEntries = [...cachedEntries, newEntry].sort((a, b) => b.score - a.score);
    cachedEntries = localEntries;

    document.getElementById("leaderboard-submit").style.display = "none";
    const section = document.getElementById("leaderboard-section");
    section.classList.remove("hidden");
    section.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    section.querySelector('[data-tab="alltime"]').classList.add("active");
    renderLeaderboard(localEntries, document.getElementById("leaderboard-list"), "alltime");

    // Save to server in background
    submitScore(name, totalScore, TOTAL_ROUNDS, avgDist, selectedLeague, selectedDifficulty);
}

document.getElementById("submit-score-btn").addEventListener("click", handleSubmit);
document.getElementById("player-name").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSubmit();
});

// Setup tabs for final screen
const finalSection = document.getElementById("leaderboard-section");
const finalTabs = finalSection.querySelector(".leaderboard-tabs");
if (finalTabs) {
    setupTabs(finalTabs, document.getElementById("leaderboard-list"), () => cachedEntries);
}

// ── View leaderboard from menu ──
document.getElementById("view-leaderboard-btn").addEventListener("click", async () => {
    const overlay = document.getElementById("leaderboard-overlay");
    const list = document.getElementById("menu-leaderboard-list");
    overlay.classList.remove("hidden");

    overlay.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    overlay.querySelector('[data-tab="alltime"]').classList.add("active");

    // Wait for preload if still in-flight, then use cache
    await leaderboardReady;
    renderLeaderboard(cachedEntries, list, "alltime");
});

// Setup tabs for menu leaderboard
const menuOverlay = document.getElementById("leaderboard-overlay");
const menuTabs = menuOverlay.querySelector(".leaderboard-tabs");
if (menuTabs) {
    setupTabs(menuTabs, document.getElementById("menu-leaderboard-list"), () => cachedEntries);
}

document.getElementById("close-leaderboard-btn").addEventListener("click", () => {
    document.getElementById("leaderboard-overlay").classList.add("hidden");
});

// Preload leaderboard on page load
const leaderboardReady = fetchLeaderboard();
