const moods = [
    {
        id: "minimal",
        name: "Minimal",
        quote: "Less, but better.",
        headingFont: "Inter",
        bodyFont: "Inter",
        palettes: [
            ["#FFFFFF", "#F4F4F5", "#D4D4D8", "#71717A", "#18181B"],
            ["#FAFAFA", "#E5E5E5", "#A3A3A3", "#525252", "#171717"],
            ["#F8F9FA", "#E9ECEF", "#DEE2E6", "#6C757D", "#212529"],
            ["#F2F0EA", "#E4E1DB", "#C9C7C1", "#8C8A85", "#2C2C2A"]
        ],
        bgColor: "#E4E4E7",
        textColor: "#18181B",
        mutedColor: "#71717A",
        cardBg: "rgba(255, 255, 255, 0.7)",
        cardBorder: "rgba(255, 255, 255, 0.5)"
    },
    {
        id: "dark-academia",
        name: "Dark Academia",
        quote: "A cup of tea, a good book, and the quiet comfort of old libraries.",
        headingFont: "Playfair Display",
        bodyFont: "Lora",
        palettes: [
            ["#1B1814", "#302B27", "#4C4138", "#7C6D5F", "#B5A799"],
            ["#1C2321", "#36453B", "#596854", "#A2A79E", "#D1D5DE"],
            ["#231F20", "#4B3B40", "#826C7F", "#B19CD9", "#E0C8DE"],
            ["#261C15", "#473322", "#7E5939", "#A67B5B", "#D2B48C"]
        ],
        bgColor: "#141210",
        textColor: "#E6DCD3",
        mutedColor: "#938576",
        cardBg: "rgba(48, 43, 39, 0.4)",
        cardBorder: "rgba(124, 109, 95, 0.2)"
    },
    {
        id: "cottagecore",
        name: "Cottagecore",
        quote: "Finding magic in the simple, quiet moments of life.",
        headingFont: "Quicksand",
        bodyFont: "Lora",
        palettes: [
            ["#5C715E", "#8B9A80", "#EAE2D6", "#D6C5B3", "#C49C8D"],
            ["#6B8E23", "#9ACD32", "#FFF8DC", "#FFE4C4", "#D2B48C"],
            ["#8F9779", "#B2B09B", "#FDF5E6", "#E3DAC9", "#C1A68D"],
            ["#556B2F", "#8FBC8F", "#FAF0E6", "#E8A38F", "#CD5C5C"]
        ],
        bgColor: "#F4F1ED",
        textColor: "#3F4E40",
        mutedColor: "#7A877B",
        cardBg: "rgba(255, 255, 255, 0.6)",
        cardBorder: "rgba(139, 154, 128, 0.3)"
    },
    {
        id: "bold-bright",
        name: "Bold & Bright",
        quote: "Color is a power which directly influences the soul.",
        headingFont: "Montserrat",
        bodyFont: "Poppins",
        palettes: [
            ["#FF2A54", "#FF9900", "#FFD700", "#00E5FF", "#8A2BE2"],
            ["#FF007F", "#FF5E00", "#FFC300", "#00FF00", "#0000FF"],
            ["#F72585", "#7209B7", "#3A0CA3", "#4361EE", "#4CC9F0"],
            ["#FF3F8E", "#FF7A00", "#FFD600", "#00FF9D", "#6F00FF"]
        ],
        bgColor: "#F0F4F8",
        textColor: "#0A0A0A",
        mutedColor: "#5A5A5A",
        cardBg: "rgba(255, 255, 255, 0.85)",
        cardBorder: "rgba(255, 42, 84, 0.2)"
    },
    {
        id: "cozy",
        name: "Cozy",
        quote: "The feeling of a warm blanket on a rainy afternoon.",
        headingFont: "Merriweather",
        bodyFont: "Nunito",
        palettes: [
            ["#29323C", "#635246", "#C7B3A1", "#EDE4DB", "#F6EFE9"],
            ["#3D2B1F", "#6B4423", "#9C6A48", "#C3A082", "#E8D8C8"],
            ["#2A3439", "#4F5D65", "#8E9A9E", "#C2C8C6", "#E2E5E3"],
            ["#4A3728", "#7D5A40", "#B88E6D", "#E0C3A9", "#F7EADC"]
        ],
        bgColor: "#DFD3C8",
        textColor: "#3D3128",
        mutedColor: "#857364",
        cardBg: "rgba(246, 239, 233, 0.65)",
        cardBorder: "rgba(255, 255, 255, 0.5)"
    },
    {
        id: "cyber-tech",
        name: "Cyber/Tech",
        quote: "Lost in the neon lights and endless data streams.",
        headingFont: "Space Mono",
        bodyFont: "Fira Code",
        palettes: [
            ["#0B0C10", "#1F2833", "#C5C6C7", "#45A29E", "#66FCF1"],
            ["#000000", "#0B192C", "#1A365D", "#2B6CB0", "#63B3ED"],
            ["#050505", "#140021", "#3B0066", "#7300FF", "#E100FF"],
            ["#020202", "#0A1F0A", "#1A401A", "#33FF33", "#CCFFCC"]
        ],
        bgColor: "#050608",
        textColor: "#66FCF1",
        mutedColor: "#898B8E",
        cardBg: "rgba(31, 40, 51, 0.4)",
        cardBorder: "rgba(102, 252, 241, 0.2)"
    }
];

const moodSelectors = document.getElementById('mood-selectors');
const titleEl = document.getElementById('mood-title');
const quoteEl = document.getElementById('mood-quote');
const headingFontEl = document.getElementById('heading-font');
const bodyFontEl = document.getElementById('body-font');
const paletteContainer = document.getElementById('palettes-container');
const root = document.documentElement;

const elementsToAnimate = [
    titleEl,
    quoteEl,
    document.querySelector('.info-section')
];

function init() {
    moods.forEach((mood, index) => {
        const btn = document.createElement('button');
        btn.className = 'mood-btn';
        btn.textContent = mood.name;
        btn.onclick = () => setMood(mood, btn);
        moodSelectors.appendChild(btn);
    });

    // Set minimal mood by default (index 0)
    setMood(moods[0], moodSelectors.children[0]);
}

function setMood(mood, activeBtn) {
    // Update button states
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
    if (activeBtn) activeBtn.classList.add('active');

    // Update root CSS variables for theme
    root.style.setProperty('--bg-color', mood.bgColor);
    root.style.setProperty('--text-main', mood.textColor);
    root.style.setProperty('--text-muted', mood.mutedColor);
    root.style.setProperty('--card-bg', mood.cardBg);
    root.style.setProperty('--card-border', mood.cardBorder);

    // Reset animations
    elementsToAnimate.forEach(el => {
        if (el) {
            el.classList.remove('fade-in');
            void el.offsetWidth; // Trigger reflow to restart animation
        }
    });

    // Update content after a tiny delay so the fade-out feels right
    setTimeout(() => {
        titleEl.textContent = mood.name;
        titleEl.style.fontFamily = `"${mood.headingFont}", sans-serif`;

        quoteEl.textContent = `"${mood.quote}"`;
        quoteEl.style.fontFamily = `"${mood.bodyFont}", sans-serif`;

        headingFontEl.textContent = mood.headingFont;
        headingFontEl.style.fontFamily = `"${mood.headingFont}", sans-serif`;

        bodyFontEl.textContent = mood.bodyFont;
        bodyFontEl.style.fontFamily = `"${mood.bodyFont}", sans-serif`;

        // Render palettes
        renderPalettes(mood);

        // Add fade-in classes back
        elementsToAnimate.forEach(el => {
            if (el) el.classList.add('fade-in');
        });
    }, 50);
}

function hexToRgba(hex, alpha) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function renderPalettes(mood) {
    paletteContainer.innerHTML = '';

    mood.palettes.forEach((originalColors, index) => {
        const panel = document.createElement('div');
        panel.className = 'glass-panel palette-panel fade-in';
        panel.style.animationDelay = `${0.2 + (index * 0.1)}s`;

        let currentColors = [...originalColors];

        // Create Grid
        const grid = document.createElement('div');
        grid.className = 'panel-grid';

        // Text Content Container
        const textContent = document.createElement('div');
        textContent.className = 'panel-text-content';

        const heading = document.createElement('h3');
        heading.className = 'panel-heading';
        heading.textContent = `Variant ${index + 1}: ${mood.name}`;
        heading.style.fontFamily = `"${mood.headingFont}", sans-serif`;

        const subheading = document.createElement('h4');
        subheading.className = 'panel-subheading';
        subheading.textContent = `Aesthetic Palette`;
        subheading.style.fontFamily = `"${mood.bodyFont}", sans-serif`;

        const paragraphDesktop = document.createElement('p');
        paragraphDesktop.className = 'panel-paragraph desktop-text';
        paragraphDesktop.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed arcu ac lorem vulputate eleifend. Maecenas scelerisque, sapien a efficitur pellentesque, libero lorem accumsan odio, non semper mauris metus sed diam.";
        paragraphDesktop.style.fontFamily = `"${mood.bodyFont}", sans-serif`;

        const paragraphMobile = document.createElement('p');
        paragraphMobile.className = 'panel-paragraph mobile-text';
        paragraphMobile.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed arcu ac lorem vulputate eleifend.";
        paragraphMobile.style.fontFamily = `"${mood.bodyFont}", sans-serif`;

        const row = document.createElement('div');
        row.className = 'palette-display';

        const shuffleBtn = document.createElement('button');
        shuffleBtn.className = 'shuffle-btn';
        shuffleBtn.textContent = 'Shuffle Colors';
        shuffleBtn.style.fontFamily = `"${mood.headingFont}", sans-serif`;

        const saveBtn = document.createElement('button');
        saveBtn.className = 'save-btn';
        saveBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
        `;
        
        saveBtn.onclick = () => {
            savePalette(mood.name, currentColors);
            saveBtn.classList.add('saved');
            setTimeout(() => saveBtn.classList.remove('saved'), 500);
        };
        
        panel.appendChild(saveBtn);

        const updateColors = () => {
            const bgHex = currentColors[0];
            const headingColor = currentColors[1];
            const paragraphColor = currentColors[2];
            const subheadingColor = currentColors[3];
            const borderColor = currentColors[4];

            panel.style.backgroundColor = hexToRgba(bgHex, 0.9);
            panel.style.borderColor = hexToRgba(borderColor, 0.3);

            heading.style.color = headingColor;
            subheading.style.color = subheadingColor;
            paragraphDesktop.style.color = paragraphColor;
            paragraphMobile.style.color = paragraphColor;
            
            shuffleBtn.style.color = headingColor;
            shuffleBtn.style.borderColor = headingColor;
            
            saveBtn.style.color = headingColor;

            row.innerHTML = '';
            originalColors.forEach(color => {
                const swatch = document.createElement('div');
                swatch.className = 'color-swatch';
                swatch.style.backgroundColor = color;

                const swatchHsp = getHsp(color);
                let swatchTextHex = originalColors[0];
                let maxSwatchDiff = 0;
                originalColors.forEach(c => {
                    const diff = Math.abs(getHsp(c) - swatchHsp);
                    if (diff > maxSwatchDiff) {
                        maxSwatchDiff = diff;
                        swatchTextHex = c;
                    }
                });

                const hexBgColor = hexToRgba(color, 0.85);

                swatch.innerHTML = `
                    <span class="hex-code" style="color: ${swatchTextHex}; background-color: ${hexBgColor}; border: 1px solid ${hexToRgba(swatchTextHex, 0.2)}">
                        ${color}
                    </span>
                `;

                swatch.onclick = () => {
                    navigator.clipboard.writeText(color);
                    const hexCode = swatch.querySelector('.hex-code');
                    const origText = hexCode.textContent.trim();
                    hexCode.textContent = "Copied!";
                    setTimeout(() => {
                        hexCode.textContent = origText;
                    }, 1200);
                };

                row.appendChild(swatch);
            });
        };

        const bgHsp = getHsp(originalColors[0]);
        const sorted = originalColors.slice(1).sort((a, b) => Math.abs(getHsp(b) - bgHsp) - Math.abs(getHsp(a) - bgHsp));
        currentColors = [originalColors[0], sorted[0], sorted[1], sorted[2], sorted[3]];
        updateColors();

        shuffleBtn.onclick = () => {
            for (let i = currentColors.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [currentColors[i], currentColors[j]] = [currentColors[j], currentColors[i]];
            }
            updateColors();
        };

        // Append text elements to textContent
        textContent.appendChild(heading);
        textContent.appendChild(subheading);
        textContent.appendChild(paragraphDesktop);
        textContent.appendChild(paragraphMobile);
        textContent.appendChild(row);
        textContent.appendChild(shuffleBtn);

        // Image Container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'panel-image-container';

        const image = document.createElement('img');
        image.className = 'panel-image';
        image.src = `images/${mood.id}.png`;
        image.alt = `${mood.name} Aesthetic Image`;

        imageContainer.appendChild(image);

        // Append columns to grid
        grid.appendChild(textContent);
        grid.appendChild(imageContainer);

        panel.appendChild(grid);
        paletteContainer.appendChild(panel);
    });
}

function getHsp(color) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );
}

function isLightColor(color) {
    return getHsp(color) > 127.5;
}

// Start app
init();

// Basket Logic
const savedPalettes = [];
const basketBtn = document.getElementById('basket-btn');
const basketModal = document.getElementById('basket-modal');
const closeBasket = document.getElementById('close-basket');
const basketItemsContainer = document.getElementById('basket-items');
const basketCount = document.getElementById('basket-count');

if (basketBtn) {
    basketBtn.onclick = () => {
        renderBasket();
        basketModal.classList.add('active');
    };
}
if (closeBasket) {
    closeBasket.onclick = () => basketModal.classList.remove('active');
}

function savePalette(moodName, colorsArr) {
    savedPalettes.push({ moodName, colors: [...colorsArr] });
    basketCount.textContent = savedPalettes.length;
}

function renderBasket() {
    basketItemsContainer.innerHTML = '';
    if (savedPalettes.length === 0) {
        basketItemsContainer.innerHTML = '<p style="text-align:center; opacity:0.7">Your basket is empty. Save some palettes!</p>';
        return;
    }
    
    savedPalettes.forEach((item, index) => {
        const bgHex = item.colors[0];
        const headingColor = item.colors[1];
        const paragraphColor = item.colors[2];
        const subheadingColor = item.colors[3];
        const borderColor = item.colors[4];

        const savedItem = document.createElement('div');
        savedItem.className = 'saved-item glass-panel';
        savedItem.style.backgroundColor = hexToRgba(bgHex, 0.9);
        savedItem.style.borderColor = hexToRgba(borderColor, 0.3);
        savedItem.style.padding = '1.5rem';

        const title = document.createElement('div');
        title.className = 'saved-item-header';
        title.textContent = item.moodName;
        title.style.color = headingColor;
        title.style.fontSize = '1.2rem';
        title.style.fontWeight = '600';
        title.style.marginBottom = '0.5rem';

        const sub = document.createElement('div');
        sub.textContent = 'Saved Palette';
        sub.style.color = subheadingColor;
        sub.style.fontSize = '0.8rem';
        sub.style.textTransform = 'uppercase';
        sub.style.marginBottom = '1rem';

        const row = document.createElement('div');
        row.className = 'saved-item-swatches';
        item.colors.forEach(c => {
            const s = document.createElement('div');
            s.style.backgroundColor = c;
            s.style.flex = '1';
            row.appendChild(s);
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.style.border = `1px solid ${hexToRgba(headingColor, 0.5)}`;
        removeBtn.style.color = headingColor;
        removeBtn.onclick = () => {
            savedPalettes.splice(index, 1);
            basketCount.textContent = savedPalettes.length;
            renderBasket();
        };

        savedItem.appendChild(title);
        savedItem.appendChild(sub);
        savedItem.appendChild(row);
        savedItem.appendChild(removeBtn);

        basketItemsContainer.appendChild(savedItem);
    });
}
