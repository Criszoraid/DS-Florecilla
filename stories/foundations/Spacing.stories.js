import '../../dist/tokens.css';

export default {
    title: 'Foundations/Spacing',
    parameters: {
        layout: 'fullscreen',
    },
};

const getSpacingTokens = async () => {
    const response = await fetch('/tokens.json');
    const data = await response.json();

    const spacing = [];

    for (const collection of data) {
        if (collection.name === '_Primitives') {
            const modes = collection.modes.reduce((acc, mode) => {
                acc[mode.modeId] = mode.name;
                return acc;
            }, {});

            for (const variable of collection.variables) {
                if (variable.type === 'FLOAT' && variable.name.startsWith('Number/')) {
                    const firstModeId = Object.keys(modes)[0];
                    const value = variable.values[firstModeId];
                    spacing.push({ name: variable.name, value });
                }
            }
        }
    }

    return spacing.sort((a, b) => a.value - b.value);
};

export const SpacingScale = {
    render: async () => {
        const spacing = await getSpacingTokens();

        let html = '<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';
        html += '<h1 style="font-size: 32px; margin-bottom: 32px;">Spacing Scale</h1>';
        html += '<p style="color: #666; margin-bottom: 32px;">These spacing values can be used for margins, padding, and gaps throughout the design system.</p>';

        for (const space of spacing) {
            const spaceName = space.name.split('/').pop();
            html += `
        <div style="margin-bottom: 24px; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 24px;">
            <div style="font-weight: 600; min-width: 100px;">${spaceName}</div>
            <div style="
              height: 40px;
              width: ${space.value}px;
              background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
              border-radius: 4px;
            "></div>
            <div style="font-family: monospace; font-size: 14px; color: #666;">
              ${space.value}px
            </div>
          </div>
        </div>
      `;
        }

        html += '</div>';
        return html;
    },
};
