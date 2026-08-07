// Automated QA Test Suite for East Grevie Chronicles: The Shadow's Tale
const fs = require('fs');
const path = require('path');

const testResults = [];
function check(description, condition) {
    if (condition) {
        testResults.push({ status: "PASS", description });
        console.log(`[PASS] ${description}`);
    } else {
        testResults.push({ status: "FAIL", description });
        console.error(`[FAIL] ${description}`);
    }
}

console.log("==================================================");
console.log("🎮 EAST GREVIE CHRONICLES - QA TEST SWEEP");
console.log("==================================================\n");

const htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
const cssContent = fs.readFileSync(path.join(__dirname, '../style.css'), 'utf-8');
const jsContent = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf-8');
const { state, STORY_DATA } = require('../app.js');

// 1. DOM Elements Verification
console.log("--- TEST GROUP 1: HTML Structure & Viewport Layout ---");
check("Game viewport container present (#game-container)", htmlContent.includes('id="game-container"'));
check("Scene background image present (#scene-bg-img)", htmlContent.includes('id="scene-bg-img"'));
check("Left character portrait slot present (#portrait-left-slot)", htmlContent.includes('id="portrait-left-slot"'));
check("Right character portrait slot present (#portrait-right-slot)", htmlContent.includes('id="portrait-right-slot"'));
check("Speaker nameplate present (#speaker-name)", htmlContent.includes('id="speaker-name"'));
check("Dialogue text display box present (#dialogue-text-frame)", htmlContent.includes('id="dialogue-text-frame"'));
check("Choices container present (#choices-container)", htmlContent.includes('id="choices-container"'));
check("History log modal present (#history-modal)", htmlContent.includes('id="history-modal"'));
check("Audio settings modal present (#audio-settings-modal)", htmlContent.includes('id="audio-settings-modal"'));

// 2. CSS Design System Verification
console.log("\n--- TEST GROUP 2: CSS Visual Styling & Widescreen Layout ---");
check("Console container max-width defined as 1240px", cssContent.includes('max-width: 1240px'));
check("Cyan glow theme variable defined", cssContent.includes('--border-cyan: #00f0ff'));
check("Cinzel fantasy font imported", cssContent.includes('Cinzel'));
check("Character portrait slots flex layout", cssContent.includes('.portrait-stage'));

// 3. Narrative Data Tree & Branching Choices Verification
console.log("\n--- TEST GROUP 3: Narrative Data Tree & 4 Endings Verification ---");
check("Act I Intro scene present in STORY_DATA", STORY_DATA["act1_intro"] !== undefined);
check("Act I Research choice scene present", STORY_DATA["act1_choice_research"] !== undefined);
check("Act II Sir Johan encounter scene present", STORY_DATA["act2_johan_encounter"] !== undefined);
check("Act III Citadel trial scene present", STORY_DATA["act3_council_trial"] !== undefined);
check("Ending A (Shadow Lord) present", STORY_DATA["ending_a_shadow_lord"] !== undefined);
check("Ending B (Tragic Warden) present", STORY_DATA["ending_b_tragic_warden"] !== undefined);
check("Ending C (Wandering Scholar) present", STORY_DATA["ending_c_wandering_scholar"] !== undefined);
check("Ending D (Sunfire Harmonizer Secret) present", STORY_DATA["ending_d_sunfire_harmonizer"] !== undefined);

// 4. State Machine & Dynamic Branching Simulation
console.log("\n--- TEST GROUP 4: Dynamic Narrative Branching Simulation ---");
check("Initial state has 0 Shadow Corruption", state.shadowCorruption === 0);
check("Initial state has johanTrust == false", state.johanTrust === false);

// Simulate Choice 1 Option B (Shadow Path)
STORY_DATA["act1_choice_research"].choices[1].action();
check("Shadow Alchemy choice adds +35 Shadow Corruption", state.shadowCorruption === 35);

// Simulate Choice 2 Option A (Trust Johan)
STORY_DATA["act2_johan_encounter"].choices[0].action();
check("Trusting Sir Johan sets johanTrust == true", state.johanTrust === true);

// Simulate Choice 3 Option A (Shadow Transformation)
STORY_DATA["act3_council_trial"].choices[0].action();
check("Shadow transformation adds +45 Corruption (Total: 80%)", state.shadowCorruption === 80);

console.log("\n==================================================");
console.log("📊 SUMMARY OF CHRONICLES QA TEST RESULTS");
console.log("==================================================");
const passedCount = testResults.filter(r => r.status === "PASS").length;
console.log(`TOTAL TESTS EXECUTED: ${testResults.length}`);
console.log(`PASSED: ${passedCount}`);
console.log(`FAILED: ${testResults.length - passedCount}`);
console.log(`SUCCESS RATE: ${((passedCount / testResults.length) * 100).toFixed(1)}%\n`);

if (testResults.length - passedCount > 0) {
    process.exit(1);
}
