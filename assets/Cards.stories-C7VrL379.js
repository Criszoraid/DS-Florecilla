import"./iframe-sx2bdDX_.js";import"./preload-helper-PPVm8Dsz.js";const l={title:"Components/Cards",parameters:{layout:"centered"}},p=async()=>{const t=await(await fetch("/tokens.json")).json(),e=[];for(const n of t)if(n.name==="Tokens")for(const o of n.variables)o.name.startsWith("Card/")&&e.push(o);return e},s={render:async()=>{const a=await p();let t='<div style="padding: 32px;">';t+='<h1 style="font-size: 32px; margin-bottom: 16px;">Card Components</h1>',t+='<p style="color: #666; margin-bottom: 32px;">Design tokens for card components including basic cards, multi-option cards, and product cards.</p>',t+='<h2 style="font-size: 24px; margin-bottom: 16px;">Card Tokens</h2>',t+='<div style="font-family: monospace; font-size: 14px;">';const e=a.reduce((n,o)=>{const r=o.name.split("/")[1]||"Other";return n[r]||(n[r]=[]),n[r].push(o),n},{});for(const[n,o]of Object.entries(e)){t+=`<h3 style="font-size: 18px; margin-top: 24px; margin-bottom: 12px;">${n}</h3>`,t+='<ul style="list-style: none; padding: 0;">';for(const i of o)t+=`<li style="padding: 8px; background: #f5f5f5; margin-bottom: 4px; border-radius: 4px;">
          <code>${i.name}</code>
        </li>`;t+="</ul>"}return t+="</div>",t+="</div>",t}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: async () => {
    const tokens = await getCardTokens();
    let html = '<div style="padding: 32px;">';
    html += '<h1 style="font-size: 32px; margin-bottom: 16px;">Card Components</h1>';
    html += '<p style="color: #666; margin-bottom: 32px;">Design tokens for card components including basic cards, multi-option cards, and product cards.</p>';
    html += '<h2 style="font-size: 24px; margin-bottom: 16px;">Card Tokens</h2>';
    html += '<div style="font-family: monospace; font-size: 14px;">';

    // Group by card type
    const grouped = tokens.reduce((acc, token) => {
      const parts = token.name.split('/');
      const type = parts[1] || 'Other';
      if (!acc[type]) acc[type] = [];
      acc[type].push(token);
      return acc;
    }, {});
    for (const [type, tokenList] of Object.entries(grouped)) {
      html += \`<h3 style="font-size: 18px; margin-top: 24px; margin-bottom: 12px;">\${type}</h3>\`;
      html += '<ul style="list-style: none; padding: 0;">';
      for (const token of tokenList) {
        html += \`<li style="padding: 8px; background: #f5f5f5; margin-bottom: 4px; border-radius: 4px;">
          <code>\${token.name}</code>
        </li>\`;
      }
      html += '</ul>';
    }
    html += '</div>';
    html += '</div>';
    return html;
  }
}`,...s.parameters?.docs?.source}}};const m=["Overview"];export{s as Overview,m as __namedExportsOrder,l as default};
