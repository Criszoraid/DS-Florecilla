import"./iframe-sx2bdDX_.js";import"./preload-helper-PPVm8Dsz.js";const c={title:"Components/Buttons",parameters:{layout:"centered"}},p=async()=>{const t=await(await fetch("/tokens.json")).json(),e=[];for(const n of t)if(n.name==="Tokens")for(const o of n.variables)o.name.startsWith("Buttons/")&&e.push(o);return e},s={render:async()=>{const i=await p();let t='<div style="padding: 32px;">';t+='<h1 style="font-size: 32px; margin-bottom: 16px;">Button Components</h1>',t+='<p style="color: #666; margin-bottom: 32px;">Design tokens for button components including primary, secondary, and their various states.</p>',t+='<h2 style="font-size: 24px; margin-bottom: 16px;">Button Tokens</h2>',t+='<div style="font-family: monospace; font-size: 14px;">';const e=i.reduce((n,o)=>{const r=o.name.split("/")[1]||"Other";return n[r]||(n[r]=[]),n[r].push(o),n},{});for(const[n,o]of Object.entries(e)){t+=`<h3 style="font-size: 18px; margin-top: 24px; margin-bottom: 12px;">${n}</h3>`,t+='<ul style="list-style: none; padding: 0;">';for(const a of o)t+=`<li style="padding: 8px; background: #f5f5f5; margin-bottom: 4px; border-radius: 4px;">
          <code>${a.name}</code>
        </li>`;t+="</ul>"}return t+="</div>",t+="</div>",t}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const d=["Overview"];export{s as Overview,d as __namedExportsOrder,c as default};
