# East Grevie Chronicles: The Shadow's Tale

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

An interactive dark fantasy visual novel exploring the tragic origin story of **Lord Rodrigues** in the *East Grevie Universe*.

---

### [Play Game Live in Browser](https://miken908.github.io/east-grevie-chronicles/)

---

## Story Overview

Long before he became the notorious Shadow Lord hiding in the mountain lair of East Grevie, **Rodrigues** was a brilliant young scholar and alchemist at the High Citadel Academy. 

When a mysterious magical famine—the **Void Blight**—begins withering crops and sickening the villagers of East Grevie, the High Council chooses passive isolation. Desperate to save his dying homeland and his mentor Archmage Alistair, Rodrigues discovers an ancient forbidden tome detailing **Shadow Alchemy**: a volatile magic capable of curing the Blight, but at a terrible personal cost.

---

## Core Features

- **Branching Decision Engine**: Shape Rodrigues's moral trajectory through critical ethical, loyalty, and political dilemmas.
- **Shadow Corruption Meter**: Dynamic state tracking that monitors Rodrigues's corruption percentage based on your alchemy and magic choices.
- **Dual Character Portrait Stage**: Animated left/right character slots featuring dynamic expression switching.
- **4 Distinct Endings**:
  1. **Ending A (Canon Prequel Lead-In)**: *The Shadow Lord* (Direct prequel lead-in to *East Grevie Adventures*).
  2. **Ending B**: *The Tragic Warden* (Haunting the Old Watchtower ruins).
  3. **Ending C**: *The Wandering Scholar* (Choosing noble exile over dark power).
  4. **Ending D (Secret Ending)**: *Sunfire Harmonizer* (Mastering Light & Shadow together alongside Sir Johan).
- **Dialogue History Log**: Review past choices and story dialogue in real-time.
- **Audio Control Center**: Master, Music, SFX, and Narrator Voice volume controls with Web Speech API integration.

---

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3 (Flexbox & CSS Grid), JavaScript (ES6+).
- **Audio & Speech Engine**: Web Audio API & Web Speech API SpeechSynthesis.
- **State Machine**: Modular `state` object tracking corruption level, character trust, and narrative branching trees.

---

## Getting Started Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Miken908/east-grevie-chronicles.git
   cd east-grevie-chronicles
   ```

2. **Open in Browser**:
   - Double-click `index.html` or run with Live Server in VS Code.

---

## License & Credits

- **Game Creator & Lead Director**: Miken908
- **AI Development Partner**: Antigravity (Google DeepMind)
- **License**: [MIT](LICENSE)
