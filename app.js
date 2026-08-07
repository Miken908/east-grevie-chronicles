// East Grevie Chronicles: The Shadow's Tale
// Interactive Narrative Engine

const state = {
    currentSceneId: "act1_intro",
    shadowCorruption: 0,
    johanTrust: false,
    alistairSaved: false,
    dialogueHistory: [],
    isTypewriting: false,
    audio: {
        masterVol: 0.8,
        musicVol: 0.5,
        sfxVol: 0.7,
        voiceVol: 0.9,
        selectedVoice: null
    }
};

// ----------------------------------------------------
// STORY NARRATIVE DATA TREE (Act I to Act IV & 4 Endings)
// ----------------------------------------------------
const STORY_DATA = {
    "act1_intro": {
        act: "ACT I: THE WITHERING REALM",
        location: "Citadel Academy Library",
        bg: "assets/images/citadel_library.jpg",
        speaker: "Narrator",
        portraitLeft: null,
        portraitRight: null,
        text: "The Kingdom of East Grevie was once a sanctuary of light. But now, a creeping curse known as the Void Blight withers the golden wheat fields and poisons the woodland streams.",
        nextScene: "act1_alistair_collapse"
    },
    "act1_alistair_collapse": {
        act: "ACT I: THE WITHERING REALM",
        location: "Archmage's Sanctum",
        bg: "assets/images/citadel_library.jpg",
        speaker: "Archmage Alistair",
        portraitLeft: { name: "Rodrigues", img: "assets/images/portrait_rodrigues_scholar.jpg" },
        portraitRight: { name: "Archmage Alistair", img: "assets/images/portrait_alistair.jpg" },
        text: "Rodrigues... my pupil... the Blight has reached the inner Citadel. The light alchemy potions are failing us. You must not seek shortcuts, no matter how desperate the realm becomes...",
        nextScene: "act1_choice_research"
    },
    "act1_choice_research": {
        act: "ACT I: THE WITHERING REALM",
        location: "Forbidden Archives Vault",
        bg: "assets/images/citadel_library.jpg",
        speaker: "Rodrigues",
        portraitLeft: { name: "Rodrigues", img: "assets/images/portrait_rodrigues_scholar.jpg" },
        portraitRight: null,
        text: "Master Alistair is growing weaker by the hour. High Counselor Vane has sealed the Citadel gates, abandoning the outer villagers to their fate. I must choose how to conduct my research.",
        choices: [
            {
                text: "✨ Option A: Research Pure Light Alchemy (Safe, slow, Alistair weakens)",
                target: "act2_light_path",
                action: () => {
                    state.shadowCorruption = 0;
                }
            },
            {
                text: "🔮 Option B: Unseal the Forbidden Shadow Tome (Instant power, Shadow Whispers begin)",
                target: "act2_shadow_path",
                action: () => {
                    state.shadowCorruption = 35;
                }
            }
        ]
    },
    "act2_light_path": {
        act: "ACT II: THE SUNBLADE RUINS",
        location: "Rocky Mountain Cave Ruins",
        bg: "assets/images/snake_cave_treasure_draft.jpg",
        speaker: "Rodrigues",
        portraitLeft: { name: "Rodrigues", img: "assets/images/portrait_rodrigues_scholar.jpg" },
        portraitRight: null,
        text: "I chose the pure path of Light Alchemy. But progress is agonizingly slow. The villagers suffer, and Alistair's life hangs by a thread as I explore the ancient ruins.",
        nextScene: "act2_johan_encounter"
    },
    "act2_shadow_path": {
        act: "ACT II: THE SUNBLADE RUINS",
        location: "Rocky Mountain Cave Ruins",
        bg: "assets/images/snake_cave_treasure_draft.jpg",
        speaker: "Rodrigues",
        portraitLeft: { name: "Rodrigues", img: "assets/images/portrait_rodrigues_scholar.jpg" },
        portraitRight: null,
        text: "The forbidden Shadow Tome unveiled secrets beyond mortal imagination! I forged a potent cure, but dark whispers now echo in my mind, hungering for more power.",
        nextScene: "act2_johan_encounter"
    },
    "act2_johan_encounter": {
        act: "ACT II: THE SUNBLADE RUINS",
        location: "Watchtower Mountain Pass",
        bg: "assets/images/old_watchtower.jpg",
        speaker: "Young Sir Johan",
        portraitLeft: { name: "Rodrigues", img: "assets/images/portrait_rodrigues_scholar.jpg" },
        portraitRight: { name: "Sir Johan", img: "assets/images/portrait_knight.jpg" },
        text: "Rodrigues! High Counselor Vane sent me to search for you. The Council suspects you entered the forbidden ruins. Tell me the truth, my old friend—what did you find?",
        choices: [
            {
                text: "⚔️ Option A: Trust Sir Johan with the complete truth",
                target: "act3_johan_ally",
                action: () => {
                    state.johanTrust = true;
                }
            },
            {
                text: "🛡️ Option B: Conceal the truth to protect him from treason charges",
                target: "act3_johan_distrust",
                action: () => {
                    state.johanTrust = false;
                }
            }
        ]
    },
    "act3_johan_ally": {
        act: "ACT III: THE CITADEL SCHISM",
        location: "Citadel Great Hall",
        bg: "assets/images/temple_sanctum.jpg",
        speaker: "Young Sir Johan",
        portraitLeft: { name: "Rodrigues", img: "assets/images/portrait_rodrigues_scholar.jpg" },
        portraitRight: { name: "Sir Johan", img: "assets/images/portrait_knight.jpg" },
        text: "I swore an oath to the Crown, Rodrigues, but I also swore an oath of brotherhood to you. I will stand at your side when we face the High Council!",
        nextScene: "act3_council_trial"
    },
    "act3_johan_distrust": {
        act: "ACT III: THE CITADEL SCHISM",
        location: "Citadel Great Hall",
        bg: "assets/images/temple_sanctum.jpg",
        speaker: "High Counselor Vane",
        portraitLeft: { name: "Rodrigues", img: "assets/images/portrait_rodrigues_scholar.jpg" },
        portraitRight: { name: "High Counselor Vane", img: "assets/images/portrait_vane.jpg" },
        text: "Seize the cat scholar! He harbors dark alchemy within his heart. Sir Johan, by order of the Council, arrest your childhood friend!",
        nextScene: "act3_council_trial"
    },
    "act3_council_trial": {
        act: "ACT III: THE CITADEL SCHISM",
        location: "Citadel Great Hall",
        bg: "assets/images/temple_sanctum.jpg",
        speaker: "Rodrigues",
        portraitLeft: { name: "Rodrigues", img: "assets/images/portrait_rodrigues_scholar.jpg" },
        portraitRight: null,
        text: "The High Council demands my execution for experimenting with forbidden alchemy. But the villagers outside are dying! I must make my final stand.",
        choices: [
            {
                text: "💥 Option A: Unleash Shadow Magic to break the Citadel gates and heal the realm by force",
                target: "act4_shadow_transformation",
                action: () => {
                    state.shadowCorruption += 45;
                }
            },
            {
                text: "🕊️ Option B: Refuse violence, destroy the Shadow Crystal, and accept noble banishment",
                target: "act4_mortality_choice",
                action: () => {
                    state.shadowCorruption = Math.max(0, state.shadowCorruption - 30);
                }
            }
        ]
    },
    "act4_shadow_transformation": {
        act: "ACT IV: THE FATE OF THE SHADOW LORD",
        location: "Mountain Lair Pinnacle",
        bg: "assets/images/final_boss_rodrigues_solo_1785946852711.jpg",
        speaker: "Rodrigues",
        portraitLeft: { name: "Lord Rodrigues", img: "assets/images/final_boss_rodrigues_solo_1785946852711.jpg" },
        portraitRight: null,
        text: "The shadow magic surges through my blood! My mortal form burns away, replaced by infinite dark power. I have saved East Grevie... but I am no longer Rodrigues the Scholar.",
        nextScene: "eval_ending"
    },
    "act4_mortality_choice": {
        act: "ACT IV: THE FATE OF THE SHADOW LORD",
        location: "Old Watchtower Overlook",
        bg: "assets/images/old_watchtower.jpg",
        speaker: "Rodrigues",
        portraitLeft: { name: "Rodrigues", img: "assets/images/portrait_rodrigues_scholar.jpg" },
        portraitRight: null,
        text: "I shattered the Shadow Crystal, freeing my soul from its dark clutch. The Blight is cleansed, but the High Council has banished me forever into the wilderness.",
        nextScene: "eval_ending"
    },

    // ----------------------------------------------------
    // 4 BRANCHING ENDINGS EVALUATION
    // ----------------------------------------------------
    "eval_ending": {
        act: "EPILOGUE: THE FATE OF EAST GREVIE",
        location: "Kingdom Citadel Overlook",
        bg: "assets/images/victory.jpg",
        speaker: "Narrator",
        portraitLeft: null,
        portraitRight: null,
        text: "Calculating final destiny based on your choices...",
        action: () => {
            if (state.shadowCorruption >= 70) {
                loadScene("ending_a_shadow_lord");
            } else if (state.johanTrust && state.shadowCorruption < 40) {
                loadScene("ending_d_sunfire_harmonizer");
            } else if (state.shadowCorruption >= 30) {
                loadScene("ending_b_tragic_warden");
            } else {
                loadScene("ending_c_wandering_scholar");
            }
        }
    },

    "ending_a_shadow_lord": {
        act: "ENDING A: THE CANON SHADOW LORD",
        location: "Cat's Hall Lair",
        bg: "assets/images/final_boss_rodrigues_solo_1785946852711.jpg",
        speaker: "Lord Rodrigues",
        portraitLeft: { name: "Lord Rodrigues", img: "assets/images/final_boss_rodrigues_solo_1785946852711.jpg" },
        portraitRight: null,
        text: "ENDING A: THE SHADOW LORD (CANON PREQUEL). You absorbed the full shadow crystal. You drove out the corrupt Council and built your lair in the mountain peak. Years later, you would capture Princess Elsa to harvest royal sun-blood to sustain your dark spell...",
        choices: [
            { text: "🔄 Play Again / Explore Different Story Paths", target: "act1_intro" }
        ]
    },

    "ending_b_tragic_warden": {
        act: "ENDING B: THE TRAGIC WARDEN",
        location: "Old Watchtower Ruins",
        bg: "assets/images/old_watchtower.jpg",
        speaker: "Ghost of Rodrigues",
        portraitLeft: null,
        portraitRight: null,
        text: "ENDING B: THE TRAGIC WARDEN. You absorbed the Blight into your own body to spare the villagers, becoming a solitary spirit guarding the Old Watchtower ruins for eternity...",
        choices: [
            { text: "🔄 Play Again / Explore Different Story Paths", target: "act1_intro" }
        ]
    },

    "ending_c_wandering_scholar": {
        act: "ENDING C: THE WANDERING SCHOLAR",
        location: "Wilderness Trail",
        bg: "assets/images/wilderness_trail.jpg",
        speaker: "Rodrigues the Wanderer",
        portraitLeft: { name: "Rodrigues", img: "assets/images/portrait_rodrigues_scholar.jpg" },
        portraitRight: null,
        text: "ENDING C: THE WANDERING SCHOLAR. Rejecting both shadow corruption and Citadel tyranny, you departed East Grevie to seek ancient light secrets in distant lands...",
        choices: [
            { text: "🔄 Play Again / Explore Different Story Paths", target: "act1_intro" }
        ]
    },

    "ending_d_sunfire_harmonizer": {
        act: "ENDING D: SUNFIRE HARMONIZER (SECRET)",
        location: "Citadel Great Throne Room",
        bg: "assets/images/temple_sanctum.jpg",
        speaker: "Archmage Rodrigues",
        portraitLeft: { name: "Rodrigues", img: "assets/images/portrait_rodrigues_scholar.jpg" },
        portraitRight: { name: "Sir Johan", img: "assets/images/portrait_knight.jpg" },
        text: "ENDING D: SUNFIRE HARMONIZER (SECRET). Together with Sir Johan, you harmonized light and shadow magic, cured Archmage Alistair, and were crowned Grand Vizier of East Grevie!",
        choices: [
            { text: "🔄 Play Again / Explore Different Story Paths", target: "act1_intro" }
        ]
    }
};

// ----------------------------------------------------
// UI DOM ELEMENTS
// ----------------------------------------------------
const sceneBgImgEl = document.getElementById("scene-bg-img");
const actBadgeEl = document.getElementById("act-badge");
const corruptionBadgeEl = document.getElementById("corruption-badge");
const speakerNameEl = document.getElementById("speaker-name");
const sceneLocationEl = document.getElementById("scene-location");
const dialogueTextEl = document.getElementById("dialogue-text");
const typewriterCursorEl = document.getElementById("typewriter-cursor");
const choicesContainerEl = document.getElementById("choices-container");
const dialogueTextFrameEl = document.getElementById("dialogue-text-frame");

const portraitLeftSlotEl = document.getElementById("portrait-left-slot");
const portraitLeftImgEl = document.getElementById("portrait-left-img");
const portraitLeftLabelEl = document.getElementById("portrait-left-label");

const portraitRightSlotEl = document.getElementById("portrait-right-slot");
const portraitRightImgEl = document.getElementById("portrait-right-img");
const portraitRightLabelEl = document.getElementById("portrait-right-label");

const historyModalEl = document.getElementById("history-modal");
const historyLogContentEl = document.getElementById("history-log-content");
const historyBtnEl = document.getElementById("history-btn");
const closeHistoryModalBtn = document.getElementById("close-history-modal-btn");

const audioSettingsModalEl = document.getElementById("audio-settings-modal");
const audioSettingsBtnEl = document.getElementById("audio-settings-btn");
const closeAudioModalBtn = document.getElementById("close-audio-modal-btn");

const confirmModalEl = document.getElementById("confirm-modal");
const restartBtnEl = document.getElementById("restart-btn");
const confirmCancelBtnEl = document.getElementById("confirm-cancel-btn");
const confirmOkBtnEl = document.getElementById("confirm-ok-btn");

// ----------------------------------------------------
// NARRATIVE ENGINE FUNCTIONS
// ----------------------------------------------------
function loadScene(sceneId) {
    const scene = STORY_DATA[sceneId];
    if (!scene) return;

    state.currentSceneId = sceneId;

    if (typeof scene.action === "function") {
        scene.action();
    }

    // Update Header Badges & Location
    if (actBadgeEl) actBadgeEl.textContent = scene.act || "ACT I";
    if (corruptionBadgeEl) corruptionBadgeEl.textContent = `SHADOW CORRUPTION: ${state.shadowCorruption}%`;
    if (sceneLocationEl) sceneLocationEl.textContent = scene.location || "East Grevie Realm";
    if (speakerNameEl) speakerNameEl.textContent = scene.speaker || "Narrator";

    // Update Background Artwork
    if (sceneBgImgEl && scene.bg) {
        sceneBgImgEl.src = scene.bg;
    }

    // Update Portrats
    updatePortraits(scene.portraitLeft, scene.portraitRight);

    // Hide choices while typewriting
    if (choicesContainerEl) {
        choicesContainerEl.classList.add("hidden");
        choicesContainerEl.innerHTML = "";
    }

    // Record Dialogue History
    state.dialogueHistory.push({
        speaker: scene.speaker,
        text: scene.text
    });

    // Start Typewriter Text Effect
    typewriteText(scene.text, () => {
        // Show Choice buttons or next scene prompt
        if (scene.choices && scene.choices.length > 0) {
            renderChoices(scene.choices);
        } else if (scene.nextScene) {
            if (typewriterCursorEl) typewriterCursorEl.style.display = "block";
        }
    });
}

function updatePortraits(left, right) {
    if (portraitLeftSlotEl && portraitLeftImgEl && portraitLeftLabelEl) {
        if (left && left.img) {
            portraitLeftImgEl.src = left.img;
            portraitLeftLabelEl.textContent = left.name || "";
            portraitLeftSlotEl.classList.remove("hidden");
        } else {
            portraitLeftSlotEl.classList.add("hidden");
        }
    }

    if (portraitRightSlotEl && portraitRightImgEl && portraitRightLabelEl) {
        if (right && right.img) {
            portraitRightImgEl.src = right.img;
            portraitRightLabelEl.textContent = right.name || "";
            portraitRightSlotEl.classList.remove("hidden");
        } else {
            portraitRightSlotEl.classList.add("hidden");
        }
    }
}

let typewriterInterval = null;
function typewriteText(fullText, onComplete) {
    if (!dialogueTextEl) return;
    clearInterval(typewriterInterval);
    state.isTypewriting = true;
    dialogueTextEl.textContent = "";
    if (typewriterCursorEl) typewriterCursorEl.style.display = "none";

    let charIndex = 0;
    typewriterInterval = setInterval(() => {
        if (charIndex < fullText.length) {
            dialogueTextEl.textContent += fullText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typewriterInterval);
            state.isTypewriting = false;
            if (typeof onComplete === "function") onComplete();
        }
    }, 20);
}

function renderChoices(choices) {
    if (!choicesContainerEl) return;
    choicesContainerEl.innerHTML = "";
    choicesContainerEl.classList.remove("hidden");
    if (typewriterCursorEl) typewriterCursorEl.style.display = "none";

    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = choice.text;
        btn.addEventListener("click", () => {
            if (typeof choice.action === "function") {
                choice.action();
            }
            if (choice.target) {
                loadScene(choice.target);
            }
        });
        choicesContainerEl.appendChild(btn);
    });
}

// Advance scene on dialogue text click if no choices
if (dialogueTextFrameEl) {
    dialogueTextFrameEl.addEventListener("click", () => {
        const scene = STORY_DATA[state.currentSceneId];
        if (state.isTypewriting) {
            // Fast forward typewriting
            clearInterval(typewriterInterval);
            state.isTypewriting = false;
            dialogueTextEl.textContent = scene.text;
            if (scene.choices && scene.choices.length > 0) {
                renderChoices(scene.choices);
            } else if (scene.nextScene) {
                if (typewriterCursorEl) typewriterCursorEl.style.display = "block";
            }
        } else if (scene && scene.nextScene && (!scene.choices || scene.choices.length === 0)) {
            loadScene(scene.nextScene);
        }
    });
}

// Dialogue History Modal Handlers
if (historyBtnEl && historyModalEl) {
    historyBtnEl.addEventListener("click", () => {
        renderHistoryLog();
        historyModalEl.classList.remove("hidden");
    });
}

if (closeHistoryModalBtn && historyModalEl) {
    closeHistoryModalBtn.addEventListener("click", () => {
        historyModalEl.classList.add("hidden");
    });
}

function renderHistoryLog() {
    if (!historyLogContentEl) return;
    historyLogContentEl.innerHTML = "";
    state.dialogueHistory.forEach(entry => {
        const div = document.createElement("div");
        div.className = "history-entry";
        div.innerHTML = `<div class="history-speaker">${entry.speaker}</div><div class="history-text">${entry.text}</div>`;
        historyLogContentEl.appendChild(div);
    });
}

// Audio Settings Modal Handlers
if (audioSettingsBtnEl && audioSettingsModalEl) {
    audioSettingsBtnEl.addEventListener("click", () => {
        audioSettingsModalEl.classList.remove("hidden");
    });
}

if (closeAudioModalBtn && audioSettingsModalEl) {
    closeAudioModalBtn.addEventListener("click", () => {
        audioSettingsModalEl.classList.add("hidden");
    });
}

// Restart Confirmation Modal Handlers
if (restartBtnEl && confirmModalEl) {
    restartBtnEl.addEventListener("click", () => {
        confirmModalEl.classList.remove("hidden");
    });
}

if (confirmCancelBtnEl && confirmModalEl) {
    confirmCancelBtnEl.addEventListener("click", () => {
        confirmModalEl.classList.add("hidden");
    });
}

if (confirmOkBtnEl && confirmModalEl) {
    confirmOkBtnEl.addEventListener("click", () => {
        confirmModalEl.classList.add("hidden");
        state.shadowCorruption = 0;
        state.johanTrust = false;
        state.alistairSaved = false;
        state.dialogueHistory = [];
        loadScene("act1_intro");
    });
}

// Initialize Story on Load
window.addEventListener("DOMContentLoaded", () => {
    loadScene("act1_intro");
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        state,
        STORY_DATA,
        loadScene
    };
}
