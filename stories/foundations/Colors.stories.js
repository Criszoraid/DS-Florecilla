import '../../dist/tokens.css';

export default {
    title: 'Foundations/Colors',
    parameters: {
        layout: 'fullscreen',
    },
};

// Read the tokens.json to get color data
const getColorTokens = async () => {
    const response = await fetch('./tokens.json');
    const data = await response.json();

    const colors = [];
    for (const collection of data) {
        if (collection.name === '_Primitives') {
            const modes = collection.modes.reduce((acc, mode) => {
                acc[mode.modeId] = mode.name;
                return acc;
            }, {});

            for (const variable of collection.variables) {
                if (variable.type === 'COLOR' && variable.name.startsWith('Colors/')) {
                    const firstModeId = Object.keys(modes)[0];
                    const value = variable.values[firstModeId];

                    if (value && value.r !== undefined) {
                        const hex = `#${Math.round(value.r * 255).toString(16).padStart(2, '0')}${Math.round(value.g * 255).toString(16).padStart(2, '0')}${Math.round(value.b * 255).toString(16).padStart(2, '0')}`;
                        colors.push({
                            name: variable.name,
                            hex,
                            rgb: `rgb(${Math.round(value.r * 255)}, ${Math.round(value.g * 255)}, ${Math.round(value.b * 255)})`,
                        });
                    }
                }
            }
        }
    }
    return colors;
};

const ColorSwatch = ({ name, hex, rgb }) => `
  <div style="margin-bottom: 24px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="
        width: 80px;
        height: 80px;
        background-color: ${hex};
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      "></div>
      <div>
        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${name}</div>
        <div style="font-family: monospace; font-size: 12px; color: #666;">${hex}</div>
        <div style="font-family: monospace; font-size: 12px; color: #666;">${rgb}</div>
      </div>
    </div>
  </div>
`;

export const AllColors = {
    render: async () => {
        const colors = await getColorTokens();

        // Group colors by category
        const grouped = colors.reduce((acc, color) => {
            const parts = color.name.split('/');
            const category = parts[1] || 'Other';
            if (!acc[category]) acc[category] = [];
            acc[category].push(color);
            return acc;
        }, {});

        let html = '<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';
        html += '<h1 style="font-size: 32px; margin-bottom: 32px;">Color Palette</h1>';

        for (const [category, colorList] of Object.entries(grouped)) {
            html += `<h2 style="font-size: 24px; margin-top: 40px; margin-bottom: 24px;">${category}</h2>`;
            html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">';

            for (const color of colorList) {
                html += ColorSwatch(color);
            }

            html += '</div>';
        }

        html += '</div>';
        return html;
    },
};
