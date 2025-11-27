import '../../dist/tokens.css';

export default {
    title: 'Components/Buttons',
    parameters: {
        layout: 'centered',
    },
};

const getButtonTokens = async () => {
    const response = await fetch('/tokens.json');
    const data = await response.json();

    const buttons = [];

    for (const collection of data) {
        if (collection.name === 'Tokens') {
            for (const variable of collection.variables) {
                if (variable.name.startsWith('Buttons/')) {
                    buttons.push(variable);
                }
            }
        }
    }

    return buttons;
};

export const Overview = {
    render: async () => {
        const tokens = await getButtonTokens();

        let html = '<div style="padding: 32px;">';
        html += '<h1 style="font-size: 32px; margin-bottom: 16px;">Button Components</h1>';
        html += '<p style="color: #666; margin-bottom: 32px;">Design tokens for button components including primary, secondary, and their various states.</p>';

        html += '<h2 style="font-size: 24px; margin-bottom: 16px;">Button Tokens</h2>';
        html += '<div style="font-family: monospace; font-size: 14px;">';

        // Group by button type
        const grouped = tokens.reduce((acc, token) => {
            const parts = token.name.split('/');
            const type = parts[1] || 'Other';
            if (!acc[type]) acc[type] = [];
            acc[type].push(token);
            return acc;
        }, {});

        for (const [type, tokenList] of Object.entries(grouped)) {
            html += `<h3 style="font-size: 18px; margin-top: 24px; margin-bottom: 12px;">${type}</h3>`;
            html += '<ul style="list-style: none; padding: 0;">';

            for (const token of tokenList) {
                html += `<li style="padding: 8px; background: #f5f5f5; margin-bottom: 4px; border-radius: 4px;">
          <code>${token.name}</code>
        </li>`;
            }

            html += '</ul>';
        }

        html += '</div>';
        html += '</div>';
        return html;
    },
};
