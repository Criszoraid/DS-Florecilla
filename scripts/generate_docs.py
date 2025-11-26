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
            # Group by category based on name prefix or type
            foundations = defaultdict(list)
            
            for var in collection['variables']:
                name = var['name']
                parts = name.split('/')
                category = parts[0]
                
                # If it's a color but not explicitly named "Colors", we might still want to group it
                if var['type'] == 'COLOR':
                    if category == 'Colors':
                        foundations['Colors'].append(var)
                    else:
                        # Check if it's a component token or a foundation color
                        # User asked to treat variables as foundations. 
                        # If it's in _Primitives, it's likely a foundation or a primitive token.
                        # Let's group by the first part of the name.
                        foundations[category].append(var)
                elif var['type'] == 'FLOAT':
                    # Likely Spacing, Radius, Numbers
                    foundations[category].append(var)
                else:
                    foundations[category].append(var)

            # Generate FOUNDATIONS.md
            with open('docs/FOUNDATIONS.md', 'w') as f:
                f.write('# Foundations\n\n')
                f.write('Primitive variables that define the design system.\n\n')
                
                # Order: Colors, Number, others
                ordered_keys = sorted(foundations.keys())
                if 'Colors' in ordered_keys:
                    ordered_keys.remove('Colors')
                    ordered_keys.insert(0, 'Colors')
                
                for category in ordered_keys:
                    f.write(f"## {category}\n\n")
                    f.write('| Name | Value | Type |\n')
                    f.write('| --- | --- | --- |\n')
                    
                    for var in foundations[category]:
                        # Get value for first mode
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
                        elif isinstance(val_obj, (int, float)):
                            val_str = str(val_obj)
                        
                        f.write(f"| {var['name']} | {val_str} | {var['type']} |\n")
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
