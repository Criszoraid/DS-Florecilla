import '../../dist/tokens.css';

export default {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

const getTypographyTokens = async () => {
  const response = await fetch('./tokens.json');
  const data = await response.json();

  const typography = {
    families: [],
    sizes: [],
    weights: [],
    lineHeights: [],
  };

  for (const collection of data) {
    if (collection.name === '_Typography') {
      const modes = collection.modes.reduce((acc, mode) => {
        acc[mode.modeId] = mode.name;
        return acc;
      }, {});

      for (const variable of collection.variables) {
        const firstModeId = Object.keys(modes)[0];
        const value = variable.values[firstModeId];

        if (variable.name.startsWith('Font/Family/')) {
          typography.families.push({ name: variable.name, value });
        } else if (variable.name.startsWith('Font/Size/')) {
          typography.sizes.push({ name: variable.name, value });
        } else if (variable.name.startsWith('Font/Weight/')) {
          typography.weights.push({ name: variable.name, value });
        } else if (variable.name.startsWith('Font/Line height/')) {
          typography.lineHeights.push({ name: variable.name, value });
        }
      }
    }
  }

  return typography;
};

export const FontFamilies = {
  render: async () => {
    const typography = await getTypographyTokens();

    let html = '<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';
    html += '<h1 style="font-size: 32px; margin-bottom: 32px;">Font Families</h1>';

    for (const font of typography.families) {
      const fontName = font.name.split('/').pop();
      html += `
        <div style="margin-bottom: 32px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="font-weight: 600; margin-bottom: 8px;">${fontName}</div>
          <div style="font-family: '${font.value}', sans-serif; font-size: 24px;">
            The quick brown fox jumps over the lazy dog
          </div>
          <div style="font-family: monospace; font-size: 12px; color: #666; margin-top: 8px;">
            ${font.value}
          </div>
        </div>
      `;
    }

    html += '</div>';
    return html;
  },
};

export const FontSizes = {
  render: async () => {
    const typography = await getTypographyTokens();

    let html = '<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';
    html += '<h1 style="font-size: 32px; margin-bottom: 32px;">Font Sizes</h1>';

    // Sort by size
    const sortedSizes = typography.sizes.sort((a, b) => a.value - b.value);

    for (const size of sortedSizes) {
      const sizeName = size.name.split('/').pop();
      html += `
        <div style="margin-bottom: 24px; padding: 16px; border-bottom: 1px solid #e0e0e0;">
          <div style="display: flex; align-items: baseline; gap: 16px;">
            <div style="font-weight: 600; min-width: 100px;">${sizeName}</div>
            <div style="font-size: ${size.value}px;">
              The quick brown fox
            </div>
            <div style="font-family: monospace; font-size: 12px; color: #666; margin-left: auto;">
              ${size.value}px
            </div>
          </div>
        </div>
      `;
    }

    html += '</div>';
    return html;
  },
};

export const FontWeights = {
  render: async () => {
    const typography = await getTypographyTokens();

    let html = '<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';
    html += '<h1 style="font-size: 32px; margin-bottom: 32px;">Font Weights</h1>';

    for (const weight of typography.weights) {
      const weightName = weight.name.split('/').pop();
      html += `
        <div style="margin-bottom: 24px; padding: 16px; border-bottom: 1px solid #e0e0e0;">
          <div style="display: flex; align-items: baseline; gap: 16px;">
            <div style="font-weight: 600; min-width: 100px;">${weightName}</div>
            <div style="font-weight: ${weight.value}; font-size: 24px;">
              The quick brown fox jumps over the lazy dog
            </div>
            <div style="font-family: monospace; font-size: 12px; color: #666; margin-left: auto;">
              ${weight.value}
            </div>
          </div>
        </div>
      `;
    }

    html += '</div>';
    return html;
  },
};
