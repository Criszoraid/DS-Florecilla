import json
import os
from collections import defaultdict

def rgba_to_hex(r, g, b, a=1):
    return '#{:02x}{:02x}{:02x}'.format(int(r*255), int(g*255), int(b*255))

def generate_docs():
    # Create directory structure
    os.makedirs('docs/foundations', exist_ok=True)
    os.makedirs('docs/components', exist_ok=True)

    with open('tokens.json', 'r', encoding='utf-8', errors='replace') as f:
        data = json.load(f)

    # Helper to find variable by ID (for alias resolution)
    var_map = {}
    for collection in data:
        for var in collection.get('variables', []):
            var_map[var['id']] = var

    for collection in data:
        collection_name = collection['name']
        modes = {m['modeId']: m['name'] for m in collection['modes']}
        
        if collection_name == '_Primitives':
            # Separate foundations from components
            foundations = defaultdict(list)
            components = defaultdict(list)
            
            # Foundation categories (primitive tokens)
            foundation_categories = ['Colors', 'Number', 'Spacing', 'Radius', 'Boolean', 'Shadow']
            
            for var in collection['variables']:
                name = var['name']
                parts = name.split('/')
                category = parts[0]
                
                # Determine if this is a foundation or component token
                if category in foundation_categories:
                    foundations[category].append(var)
                else:
                    # Component tokens (Card, Buttons, Navigator, etc.)
                    components[category].append(var)

            # Generate Foundation files
            for category, vars in foundations.items():
                filename = f'docs/foundations/{category.upper()}.md'
                with open(filename, 'w') as f:
                    f.write(f'# {category}\n\n')
                    f.write('| Name | Value | Type |\n')
                    f.write('| --- | --- | --- |\n')
                    
                    for var in vars:
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
                        
                        f.write(f"| `{var['name']}` | {val_str} | {var['type']} |\n")

            # Generate Component files
            for category, vars in components.items():
                filename = f'docs/components/{category.upper().replace(" ", "_")}.md'
                with open(filename, 'w') as f:
                    f.write(f'# {category}\n\n')
                    f.write('| Token Name | Value/Alias | Type |\n')
                    f.write('| --- | --- | --- |\n')
                    
                    for var in vars:
                        first_mode_id = list(modes.keys())[0]
                        val_obj = var['values'].get(first_mode_id)
                        
                        val_str = "N/A"
                        if isinstance(val_obj, dict):
                            if 'r' in val_obj:
                                hex_val = rgba_to_hex(val_obj['r'], val_obj['g'], val_obj['b'])
                                val_str = f"`{hex_val}`"
                            elif val_obj.get('type') == 'VARIABLE_ALIAS':
                                alias_id = val_obj['id']
                                alias_name = var_map.get(alias_id, {}).get('name', 'Unknown')
                                val_str = f"→ `{alias_name}`"
                        elif isinstance(val_obj, (int, float)):
                            val_str = str(val_obj)
                        
                        f.write(f"| `{var['name']}` | {val_str} | {var['type']} |\n")


        elif collection_name == '_Typography':
            # Typography is also a foundation
            typography_tokens = defaultdict(list)
            
            for var in collection['variables']:
                name = var['name']
                parts = name.split('/')
                category = parts[0] if len(parts) > 0 else 'Typography'
                typography_tokens[category].append(var)
            
            for category, vars in typography_tokens.items():
                filename = f'docs/foundations/{category.upper().replace(" ", "_")}.md'
                with open(filename, 'w') as f:
                    f.write(f'# {category}\n\n')
                    f.write('| Name | Value | Type |\n')
                    f.write('| --- | --- | --- |\n')
                    
                    for var in vars:
                        first_mode_id = list(modes.keys())[0]
                        val_obj = var['values'].get(first_mode_id)
                        
                        val_str = "N/A"
                        if isinstance(val_obj, dict):
                            if val_obj.get('type') == 'VARIABLE_ALIAS':
                                alias_id = val_obj['id']
                                alias_name = var_map.get(alias_id, {}).get('name', 'Unknown')
                                val_str = f"→ `{alias_name}`"
                        elif isinstance(val_obj, (int, float, str)):
                            val_str = f"`{val_obj}`"
                        
                        f.write(f"| `{var['name']}` | {val_str} | {var['type']} |\n")

        elif collection_name == 'Tokens':
            # This collection contains component tokens
            component_tokens = defaultdict(list)
            
            for var in collection['variables']:
                name = var['name']
                parts = name.split('/')
                category = parts[0] if len(parts) > 0 else 'Other'
                component_tokens[category].append(var)
            
            for category, vars in component_tokens.items():
                filename = f'docs/components/{category.upper().replace(" ", "_")}.md'
                with open(filename, 'w') as f:
                    f.write(f'# {category}\n\n')
                    f.write('| Token Name | Value/Alias | Type |\n')
                    f.write('| --- | --- | --- |\n')
                    
                    for var in vars:
                        first_mode_id = list(modes.keys())[0]
                        val_obj = var['values'].get(first_mode_id)
                        
                        val_str = "N/A"
                        if isinstance(val_obj, dict):
                            if 'r' in val_obj:
                                hex_val = rgba_to_hex(val_obj['r'], val_obj['g'], val_obj['b'])
                                val_str = f"`{hex_val}`"
                            elif val_obj.get('type') == 'VARIABLE_ALIAS':
                                alias_id = val_obj['id']
                                alias_name = var_map.get(alias_id, {}).get('name', 'Unknown')
                                val_str = f"→ `{alias_name}`"
                        elif isinstance(val_obj, (int, float)):
                            val_str = str(val_obj)
                        
                        f.write(f"| `{var['name']}` | {val_str} | {var['type']} |\n")

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
                    row = f"| `{var['name']}` |"
                    for mid in modes:
                        val = var['values'].get(mid, '')
                        row += f" {val} |"
                    f.write(row + '\n')

if __name__ == '__main__':
    generate_docs()
