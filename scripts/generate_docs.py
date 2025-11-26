import json
import os
from collections import defaultdict

def rgba_to_hex(r, g, b, a=1):
    return '#{:02x}{:02x}{:02x}'.format(int(r*255), int(g*255), int(b*255))

def generate_docs():
    if not os.path.exists('docs'):
        os.makedirs('docs')

    with open('tokens.json', 'r', encoding='utf-8', errors='replace') as f:
        data = json.load(f)

    # Helper to find variable by ID (for alias resolution - simple version)
    var_map = {}
    for collection in data:
        for var in collection.get('variables', []):
            var_map[var['id']] = var

    for collection in data:
        collection_name = collection['name']
        modes = {m['modeId']: m['name'] for m in collection['modes']}
        
        if collection_name == '_Primitives':
            # Split into Colors and Others, and Semantic/Component tokens
            colors = []
            floats = []
            component_tokens = defaultdict(list)
            
            for var in collection['variables']:
                name = var['name']
                parts = name.split('/')
                
                # Heuristic: if it starts with "Colors", it's a primitive color
                if name.startswith('Colors/'):
                    colors.append(var)
                # If it starts with a component name (heuristic: not Colors, not Spacing if that existed)
                # Actually, let's look at the structure. 
                # "Card/Product/..." -> Component: Card, Sub: Product
                elif len(parts) > 1 and parts[0] not in ['Colors', 'Spacing']:
                    component_tokens[parts[0]].append(var)
                else:
                    # Fallback
                    if var['type'] == 'COLOR':
                        colors.append(var)
                    else:
                        floats.append(var)

            # Generate COLORS.md
            with open('docs/COLORS.md', 'w') as f:
                f.write('# Colors\n\n')
                f.write('| Name | Value (Mode 1) | Type |\n')
                f.write('| --- | --- | --- |\n')
                for var in colors:
                    # Try to get value for first mode
                    first_mode_id = list(modes.keys())[0]
                    val_obj = var['values'].get(first_mode_id)
                    
                    val_str = "N/A"
                    if isinstance(val_obj, dict):
                        if 'r' in val_obj:
                            hex_val = rgba_to_hex(val_obj['r'], val_obj['g'], val_obj['b'])
                            val_str = f"`{hex_val}` <br> <div style='background-color:{hex_val};width:20px;height:20px;display:inline-block;border:1px solid #ccc'></div>"
                        elif val_obj.get('type') == 'VARIABLE_ALIAS':
                            alias_id = val_obj['id']
                            alias_name = var_map.get(alias_id, {}).get('name', 'Unknown')
                            val_str = f"Alias: `{alias_name}`"
                    
                    f.write(f"| {var['name']} | {val_str} | {var['type']} |\n")

            # Generate COMPONENTS.md
            with open('docs/COMPONENTS.md', 'w') as f:
                f.write('# Component Tokens\n\n')
                for comp_name, vars in component_tokens.items():
                    f.write(f"## {comp_name}\n\n")
                    f.write('| Token Name | Type | Description/Value |\n')
                    f.write('| --- | --- | --- |\n')
                    for var in vars:
                        # Simplified value display
                        first_mode_id = list(modes.keys())[0]
                        val_obj = var['values'].get(first_mode_id)
                        val_display = "..."
                        if isinstance(val_obj, dict) and val_obj.get('type') == 'VARIABLE_ALIAS':
                             alias_id = val_obj['id']
                             alias_name = var_map.get(alias_id, {}).get('name', 'Unknown')
                             val_display = f"Alias: `{alias_name}`"
                        elif isinstance(val_obj, dict) and 'r' in val_obj:
                             val_display = "Color Value"
                        elif isinstance(val_obj, (int, float)):
                             val_display = str(val_obj)
                        
                        f.write(f"| {var['name']} | {var['type']} | {val_display} |\n")
                    f.write('\n')

        elif collection_name == 'Translations':
            with open('docs/TRANSLATIONS.md', 'w') as f:
                f.write('# Translations\n\n')
                
                # Table header with modes
                mode_names = [modes[mid] for mid in modes]
                header = "| Key | " + " | ".join(mode_names) + " |"
                separator = "| --- | " + " | ".join(["---"] * len(mode_names)) + " |"
                
                f.write(header + '\n')
                f.write(separator + '\n')
                
                for var in collection['variables']:
                    row = f"| {var['name']} |"
                    for mid in modes:
                        val = var['values'].get(mid, '')
                        row += f" {val} |"
                    f.write(row + '\n')

if __name__ == '__main__':
    generate_docs()
