import"./iframe-Dp6a9kcD.js";import"./preload-helper-PPVm8Dsz.js";const y={title:"Foundations/Typography",parameters:{layout:"fullscreen"}},m=async()=>{const t=await(await fetch("./tokens.json")).json(),e={families:[],sizes:[],weights:[],lineHeights:[]};for(const n of t)if(n.name==="_Typography"){const s=n.modes.reduce((o,a)=>(o[a.modeId]=a.name,o),{});for(const o of n.variables){const a=Object.keys(s)[0],p=o.values[a];o.name.startsWith("Font/Family/")?e.families.push({name:o.name,value:p}):o.name.startsWith("Font/Size/")?e.sizes.push({name:o.name,value:p}):o.name.startsWith("Font/Weight/")?e.weights.push({name:o.name,value:p}):o.name.startsWith("Font/Line height/")&&e.lineHeights.push({name:o.name,value:p})}}return e},r={render:async()=>{const i=await m();let t='<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';t+='<h1 style="font-size: 32px; margin-bottom: 32px;">Font Families</h1>';for(const e of i.families){const n=e.name.split("/").pop();t+=`
        <div style="margin-bottom: 32px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="font-weight: 600; margin-bottom: 8px;">${n}</div>
          <div style="font-family: '${e.value}', sans-serif; font-size: 24px;">
            The quick brown fox jumps over the lazy dog
          </div>
          <div style="font-family: monospace; font-size: 12px; color: #666; margin-top: 8px;">
            ${e.value}
          </div>
        </div>
      `}return t+="</div>",t}},l={render:async()=>{const i=await m();let t='<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';t+='<h1 style="font-size: 32px; margin-bottom: 32px;">Font Sizes</h1>';const e=i.sizes.sort((n,s)=>n.value-s.value);for(const n of e){const s=n.name.split("/").pop();t+=`
        <div style="margin-bottom: 24px; padding: 16px; border-bottom: 1px solid #e0e0e0;">
          <div style="display: flex; align-items: baseline; gap: 16px;">
            <div style="font-weight: 600; min-width: 100px;">${s}</div>
            <div style="font-size: ${n.value}px;">
              The quick brown fox
            </div>
            <div style="font-family: monospace; font-size: 12px; color: #666; margin-left: auto;">
              ${n.value}px
            </div>
          </div>
        </div>
      `}return t+="</div>",t}},d={render:async()=>{const i=await m();let t='<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';t+='<h1 style="font-size: 32px; margin-bottom: 32px;">Font Weights</h1>';for(const e of i.weights){const n=e.name.split("/").pop();t+=`
        <div style="margin-bottom: 24px; padding: 16px; border-bottom: 1px solid #e0e0e0;">
          <div style="display: flex; align-items: baseline; gap: 16px;">
            <div style="font-weight: 600; min-width: 100px;">${n}</div>
            <div style="font-weight: ${e.value}; font-size: 24px;">
              The quick brown fox jumps over the lazy dog
            </div>
            <div style="font-family: monospace; font-size: 12px; color: #666; margin-left: auto;">
              ${e.value}
            </div>
          </div>
        </div>
      `}return t+="</div>",t}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: async () => {
    const typography = await getTypographyTokens();
    let html = '<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';
    html += '<h1 style="font-size: 32px; margin-bottom: 32px;">Font Families</h1>';
    for (const font of typography.families) {
      const fontName = font.name.split('/').pop();
      html += \`
        <div style="margin-bottom: 32px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="font-weight: 600; margin-bottom: 8px;">\${fontName}</div>
          <div style="font-family: '\${font.value}', sans-serif; font-size: 24px;">
            The quick brown fox jumps over the lazy dog
          </div>
          <div style="font-family: monospace; font-size: 12px; color: #666; margin-top: 8px;">
            \${font.value}
          </div>
        </div>
      \`;
    }
    html += '</div>';
    return html;
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: async () => {
    const typography = await getTypographyTokens();
    let html = '<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';
    html += '<h1 style="font-size: 32px; margin-bottom: 32px;">Font Sizes</h1>';

    // Sort by size
    const sortedSizes = typography.sizes.sort((a, b) => a.value - b.value);
    for (const size of sortedSizes) {
      const sizeName = size.name.split('/').pop();
      html += \`
        <div style="margin-bottom: 24px; padding: 16px; border-bottom: 1px solid #e0e0e0;">
          <div style="display: flex; align-items: baseline; gap: 16px;">
            <div style="font-weight: 600; min-width: 100px;">\${sizeName}</div>
            <div style="font-size: \${size.value}px;">
              The quick brown fox
            </div>
            <div style="font-family: monospace; font-size: 12px; color: #666; margin-left: auto;">
              \${size.value}px
            </div>
          </div>
        </div>
      \`;
    }
    html += '</div>';
    return html;
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: async () => {
    const typography = await getTypographyTokens();
    let html = '<div style="padding: 32px; max-width: 1200px; margin: 0 auto;">';
    html += '<h1 style="font-size: 32px; margin-bottom: 32px;">Font Weights</h1>';
    for (const weight of typography.weights) {
      const weightName = weight.name.split('/').pop();
      html += \`
        <div style="margin-bottom: 24px; padding: 16px; border-bottom: 1px solid #e0e0e0;">
          <div style="display: flex; align-items: baseline; gap: 16px;">
            <div style="font-weight: 600; min-width: 100px;">\${weightName}</div>
            <div style="font-weight: \${weight.value}; font-size: 24px;">
              The quick brown fox jumps over the lazy dog
            </div>
            <div style="font-family: monospace; font-size: 12px; color: #666; margin-left: auto;">
              \${weight.value}
            </div>
          </div>
        </div>
      \`;
    }
    html += '</div>';
    return html;
  }
}`,...d.parameters?.docs?.source}}};const f=["FontFamilies","FontSizes","FontWeights"];export{r as FontFamilies,l as FontSizes,d as FontWeights,f as __namedExportsOrder,y as default};
