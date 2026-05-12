// Supabase Setup
const { createClient } = supabase;
const supabaseUrl = 'https://gezkzveuhugkbuilhvpv.supabase.co';
const supabaseKey = 'sb_publishable_UVhKpQAxK1aBv_cP35blgg_4il4zcnI';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

const addNewBtn = document.getElementById('add-new-btn');
const customPalettesContainer = document.getElementById('custom-palettes-container');

function hexToRgba(hex, alpha) {
    let r = 0, g = 0, b = 0;
    if (hex && hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex && hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getHsp(color) {
    const hex = (color || '#000000').replace('#', '');
    if (hex.length < 6) return 0;
    const r = parseInt(hex.substr(0, 2), 16) || 0;
    const g = parseInt(hex.substr(2, 2), 16) || 0;
    const b = parseInt(hex.substr(4, 2), 16) || 0;
    return Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );
}

function createCustomPanel(startColors = null, editId = null) {
    const initialColors = startColors || ["#F4F4F5", "#D4D4D8", "#A3A3A3", "#71717A", "#27272A"];
    let currentColors = [...initialColors];

    const wrapper = document.createElement('div');
    wrapper.className = 'panel-wrapper fade-in';

    const panel = document.createElement('div');
    panel.className = 'glass-panel palette-panel';

    const grid = document.createElement('div');
    grid.className = 'panel-grid';
    grid.style.display = 'block'; // Full width since we omit image

    const textContent = document.createElement('div');
    textContent.className = 'panel-text';

    const heading = document.createElement('h2');
    heading.className = 'panel-heading';
    heading.textContent = editId ? 'Edit Palette' : 'Custom Palette';
    heading.style.fontFamily = '"Inter", sans-serif';

    const subheading = document.createElement('h3');
    subheading.className = 'panel-subheading';
    subheading.textContent = 'Design your mood';
    subheading.style.fontFamily = '"Inter", sans-serif';

    const paragraph = document.createElement('p');
    paragraph.className = 'panel-paragraph';
    paragraph.textContent = 'Mix and match hex codes below to curate your perfect visual aesthetic. Watch as the abstract composition on the right responds dynamically to every choice you make, ensuring seamless contrast and harmony.';
    paragraph.style.fontFamily = '"Inter", sans-serif';

    const row = document.createElement('div');
    row.className = 'palette-display';
    row.style.marginBottom = '1.5rem';

    const inputsContainer = document.createElement('div');
    inputsContainer.style.display = 'flex';
    inputsContainer.style.gap = '1rem';
    inputsContainer.style.justifyContent = 'space-between';
    inputsContainer.style.flexWrap = 'wrap';

    const swatches = [];

    // Adjacent Panel for CSS Art
    const adjacentPanel = document.createElement('div');
    adjacentPanel.className = 'glass-panel adjacent-panel';

    const artContainer = document.createElement('div');
    artContainer.className = 'css-art-container';

    const artBgLeft = document.createElement('div');
    artBgLeft.className = 'art-bg-left';

    const artBgRight = document.createElement('div');
    artBgRight.className = 'art-bg-right';

    const artTopShape = document.createElement('div');
    artTopShape.className = 'art-top-shape';

    const artHeading = document.createElement('h3');
    artHeading.textContent = 'Custom';
    artHeading.style.fontFamily = '"Inter", sans-serif';

    const artSubheading = document.createElement('p');
    artSubheading.textContent = 'Aesthetic';
    artSubheading.style.fontFamily = '"Inter", sans-serif';

    artTopShape.appendChild(artHeading);
    artTopShape.appendChild(artSubheading);

    const artMainShape = document.createElement('div');
    artMainShape.className = 'art-main-shape';

    const artHorizontalRect = document.createElement('div');
    artHorizontalRect.className = 'art-horizontal-rect';

    artContainer.appendChild(artBgLeft);
    artContainer.appendChild(artBgRight);
    artContainer.appendChild(artTopShape);
    artContainer.appendChild(artMainShape);
    artContainer.appendChild(artHorizontalRect);

    adjacentPanel.appendChild(artContainer);

    const updatePanelColors = () => {
        const bgHex = currentColors[0];
        const headingColor = currentColors[1];
        const paragraphColor = currentColors[2];
        const subheadingColor = currentColors[3];
        const borderColor = currentColors[4];

        panel.style.backgroundColor = hexToRgba(bgHex, 0.9);
        panel.style.borderColor = hexToRgba(borderColor, 0.3);
        
        adjacentPanel.style.backgroundColor = hexToRgba(bgHex, 0.9);
        adjacentPanel.style.borderColor = hexToRgba(borderColor, 0.3);

        heading.style.color = headingColor;
        subheading.style.color = subheadingColor;
        paragraph.style.color = paragraphColor;

        artBgLeft.style.backgroundColor = currentColors[0];
        artBgRight.style.backgroundColor = currentColors[1];
        artTopShape.style.backgroundColor = currentColors[2];
        artMainShape.style.backgroundColor = currentColors[3];
        artHorizontalRect.style.backgroundColor = currentColors[4];

        const topShapeBgHsp = getHsp(currentColors[2]);
        let bestTextColor = currentColors[0];
        let maxDiff = 0;
        currentColors.forEach(c => {
            const diff = Math.abs(getHsp(c) - topShapeBgHsp);
            if (diff > maxDiff) {
                maxDiff = diff;
                bestTextColor = c;
            }
        });

        artHeading.style.color = bestTextColor;
        artSubheading.style.color = bestTextColor;
    };

    initialColors.forEach((color, index) => {
        // Swatch
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.style.flex = '1';
        row.appendChild(swatch);
        swatches.push(swatch);

        // Input Wrapper
        const inputWrapper = document.createElement('div');
        inputWrapper.style.flex = '1';
        inputWrapper.style.display = 'flex';
        inputWrapper.style.flexDirection = 'column';
        inputWrapper.style.alignItems = 'center';
        inputWrapper.style.minWidth = '80px';

        const inputLabel = document.createElement('label');
        inputLabel.textContent = `Color ${index + 1}`;
        inputLabel.style.fontSize = '0.75rem';
        inputLabel.style.textTransform = 'uppercase';
        inputLabel.style.letterSpacing = '0.05em';
        inputLabel.style.opacity = '0.7';
        inputLabel.style.marginBottom = '0.5rem';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = color;
        input.className = 'custom-hex-input';
        input.maxLength = 7;
        
        input.addEventListener('input', (e) => {
            let val = e.target.value.trim();
            if (val && !val.startsWith('#')) {
                val = '#' + val;
            }
            if (/^#[0-9A-Fa-f]{6}$/.test(val) || /^#[0-9A-Fa-f]{3}$/.test(val)) {
                swatch.style.backgroundColor = val;
                currentColors[index] = val;
                updatePanelColors();
            }
        });

        inputWrapper.appendChild(inputLabel);
        inputWrapper.appendChild(input);
        inputsContainer.appendChild(inputWrapper);
    });

    const actionContainer = document.createElement('div');
    actionContainer.style.marginTop = '2.5rem';
    actionContainer.style.display = 'flex';
    actionContainer.style.gap = '1rem';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'mood-btn';
    saveBtn.textContent = editId ? 'Save Changes' : 'Save Custom Palette';
    saveBtn.style.fontFamily = '"Inter", sans-serif';
    
    saveBtn.onclick = async () => {
        saveBtn.textContent = 'Saving...';
        saveBtn.disabled = true;
        try {
            if (editId) {
                const { error } = await supabaseClient
                    .from('palettes')
                    .update({ colors: [...currentColors] })
                    .eq('id', editId);
                if (error) throw error;
            } else {
                // Check for duplicates
                const { data: existingPalettes, error: fetchErr } = await supabaseClient
                    .from('palettes')
                    .select('colors');
                if (fetchErr) throw fetchErr;
                
                const isDuplicate = existingPalettes && existingPalettes.some(palette => 
                    palette.colors && palette.colors.length === currentColors.length && 
                    palette.colors.every((val, idx) => val.toLowerCase() === currentColors[idx].toLowerCase())
                );
                
                if (isDuplicate) {
                    alert('This exact color palette is already saved!');
                    saveBtn.textContent = 'Save Custom Palette';
                    saveBtn.disabled = false;
                    return;
                }

                const { error } = await supabaseClient
                    .from('palettes')
                    .insert([
                        { mood: 'Custom', colors: [...currentColors] }
                    ]);
                if (error) throw error;
            }
            
            saveBtn.textContent = 'Saved!';
            saveBtn.classList.add('active');
            setTimeout(() => {
                saveBtn.textContent = editId ? 'Save Changes' : 'Save Custom Palette';
                saveBtn.classList.remove('active');
                saveBtn.disabled = false;
                
                // Optionally redirect to home after edit
                if (editId) {
                    window.location.href = 'index.html';
                }
            }, 1000);
            
        } catch (error) {
            console.error('Error saving custom palette:', error);
            alert('Failed to save palette to database.');
            saveBtn.textContent = editId ? 'Save Changes' : 'Save Custom Palette';
            saveBtn.disabled = false;
        }
    };

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Cancel';
    removeBtn.style.padding = '0.6rem 1.4rem';
    removeBtn.onclick = () => {
        if (editId) {
            window.location.href = 'index.html';
            return;
        }
        wrapper.style.animation = 'none'; // reset
        void wrapper.offsetWidth;
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'translateY(15px)';
        wrapper.style.transition = 'all 0.4s ease';
        setTimeout(() => wrapper.remove(), 400);
    };

    actionContainer.appendChild(saveBtn);
    actionContainer.appendChild(removeBtn);

    textContent.appendChild(heading);
    textContent.appendChild(subheading);
    textContent.appendChild(paragraph);
    textContent.appendChild(row);
    textContent.appendChild(inputsContainer);
    textContent.appendChild(actionContainer);

    grid.appendChild(textContent);
    panel.appendChild(grid);

    wrapper.appendChild(panel);
    wrapper.appendChild(adjacentPanel);

    customPalettesContainer.prepend(wrapper);
    updatePanelColors();
}

addNewBtn.addEventListener('click', () => createCustomPanel());

// Initialization
async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');

    if (editId) {
        try {
            const { data, error } = await supabaseClient
                .from('palettes')
                .select('*')
                .eq('id', editId)
                .single();
                
            if (error) throw error;
            
            if (data && data.colors) {
                // If editing, hide the "Add New" button to focus on edit
                addNewBtn.style.display = 'none';
                createCustomPanel(data.colors, data.id);
                return;
            }
        } catch (error) {
            console.error('Error fetching edit palette:', error);
            alert('Failed to load the palette for editing.');
        }
    }
    
    // Default
    createCustomPanel();
}

init();
