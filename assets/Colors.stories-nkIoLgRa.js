import"./iframe-Dp6a9kcD.js";import"./preload-helper-PPVm8Dsz.js";const u={title:"Foundations/Colors",parameters:{layout:"fullscreen"}},d=async()=>{const s=await(await fetch("./tokens.json")).json(),o=[];for(const t of s)if(t.name==="_Primitives"){const a=t.modes.reduce((r,e)=>(r[e.modeId]=e.name,r),{});for(const r of t.variables)if(r.type==="COLOR"&&r.name.startsWith("Colors/")){const e=Object.keys(a)[0],n=r.values[e];if(n&&n.r!==void 0){const c=`#${Math.round(n.r*255).toString(16).padStart(2,"0")}${Math.round(n.g*255).toString(16).padStart(2,"0")}${Math.round(n.b*255).toString(16).padStart(2,"0")}`;o.push({name:r.name,hex:c,rgb:`rgb(${Math.round(n.r*255)}, ${Math.round(n.g*255)}, ${Math.round(n.b*255)})`})}}}return o},p=({name:l,hex:s,rgb:o})=>`
  <div style="margin-bottom: 24px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="
        width: 80px;
        height: 80px;
        background-color: ${s};
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      "></div>
      <div>
        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${l}</div>
        <div style="font-family: monospace; font-size: 12px; color: #666;">${s}</div>
        <div style="font-family: monospace; font-size: 12px; color: #666;">${o}</div>
      </div>
    </div>
  </div>
`,i={render:async()=>{const s=(await d()).reduce((t,a)=>{const e=a.name.split("/")[1]||"Other";return t[e]||(t[e]=[]),t[e].push(a),t},{});let o='<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';o+='<h1 style="font-size: 32px; margin-bottom: 32px;">Color Palette</h1>';for(const[t,a]of Object.entries(s)){o+=`<h2 style="font-size: 24px; margin-top: 40px; margin-bottom: 24px;">${t}</h2>`,o+='<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">';for(const r of a)o+=p(r);o+="</div>"}return o+="</div>",o}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
      html += \`<h2 style="font-size: 24px; margin-top: 40px; margin-bottom: 24px;">\${category}</h2>\`;
      html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">';
      for (const color of colorList) {
        html += ColorSwatch(color);
      }
      html += '</div>';
    }
    html += '</div>';
    return html;
  }
}`,...i.parameters?.docs?.source}}};const f=["AllColors"];export{i as AllColors,f as __namedExportsOrder,u as default};
