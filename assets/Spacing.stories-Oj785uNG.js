import"./iframe-Dp6a9kcD.js";import"./preload-helper-PPVm8Dsz.js";const m={title:"Foundations/Spacing",parameters:{layout:"fullscreen"}},d=async()=>{const e=await(await fetch("./tokens.json")).json(),a=[];for(const n of e)if(n.name==="_Primitives"){const o=n.modes.reduce((t,s)=>(t[s.modeId]=s.name,t),{});for(const t of n.variables)if(t.type==="FLOAT"&&t.name.startsWith("Number/")){const s=Object.keys(o)[0],r=t.values[s];a.push({name:t.name,value:r})}}return a.sort((n,o)=>n.value-o.value)},i={render:async()=>{const p=await d();let e='<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';e+='<h1 style="font-size: 32px; margin-bottom: 32px;">Spacing Scale</h1>',e+='<p style="color: #666; margin-bottom: 32px;">These spacing values can be used for margins, padding, and gaps throughout the design system.</p>';for(const a of p){const n=a.name.split("/").pop();e+=`
        <div style="margin-bottom: 24px; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 24px;">
            <div style="font-weight: 600; min-width: 100px;">${n}</div>
            <div style="
              height: 40px;
              width: ${a.value}px;
              background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
              border-radius: 4px;
            "></div>
            <div style="font-family: monospace; font-size: 14px; color: #666;">
              ${a.value}px
            </div>
          </div>
        </div>
      `}return e+="</div>",e}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: async () => {
    const spacing = await getSpacingTokens();
    let html = '<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';
    html += '<h1 style="font-size: 32px; margin-bottom: 32px;">Spacing Scale</h1>';
    html += '<p style="color: #666; margin-bottom: 32px;">These spacing values can be used for margins, padding, and gaps throughout the design system.</p>';
    for (const space of spacing) {
      const spaceName = space.name.split('/').pop();
      html += \`
        <div style="margin-bottom: 24px; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 24px;">
            <div style="font-weight: 600; min-width: 100px;">\${spaceName}</div>
            <div style="
              height: 40px;
              width: \${space.value}px;
              background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
              border-radius: 4px;
            "></div>
            <div style="font-family: monospace; font-size: 14px; color: #666;">
              \${space.value}px
            </div>
          </div>
        </div>
      \`;
    }
    html += '</div>';
    return html;
  }
}`,...i.parameters?.docs?.source}}};const g=["SpacingScale"];export{i as SpacingScale,g as __namedExportsOrder,m as default};
