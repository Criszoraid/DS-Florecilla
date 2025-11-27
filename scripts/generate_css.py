import json
import os

def rgba_to_hex(r, g, b, a=1):
    return '#{:02x}{:02x}{:02x}'.format(int(r*255), int(g*255), int(b*255))

def sanitize_name(name):
    """Convert token name to valid CSS variable name"""
    return name.replace('/', '-').replace(' ', '-').lower()

def generate_css():
    os.makedirs('dist', exist_ok=True)
    
    with open('tokens.json', 'r', encoding='utf-8', errors='replace') as f:
        data = json.load(f)
    
    # Helper to find variable by ID (for alias resolution)
    var_map = {}
    for collection in data:
        for var in collection.get('variables', []):
            var_map[var['id']] = var
    
    css_output = []
    css_output.append('/* Florecilla Design System Tokens */')
    css_output.append('/* Auto-generated from tokens.json */')
    css_output.append('')
    css_output.append(':root {')
    
    for collection in data:
        collection_name = collection['name']
        modes = {m['modeId']: m['name'] for m in collection['modes']}
        
        if collection_name in ['_Primitives', '_Typography', 'Tokens']:
            css_output.append(f'  /* {collection_name} */')
            
            for var in collection['variables']:
                name = var['name']
                var_name = f'--{sanitize_name(name)}'
                
                # Get value for first mode
                first_mode_id = list(modes.keys())[0]
                val_obj = var['values'].get(first_mode_id)
                
                css_value = None
                if isinstance(val_obj, dict):
                    if 'r' in val_obj:
                        # Color value
                        css_value = rgba_to_hex(val_obj['r'], val_obj['g'], val_obj['b'])
                    elif val_obj.get('type') == 'VARIABLE_ALIAS':
                        # Alias - reference another variable
                        alias_id = val_obj['id']
                        alias_var = var_map.get(alias_id)
                        if alias_var:
                            alias_name = sanitize_name(alias_var['name'])
                            css_value = f'var(--{alias_name})'
                elif isinstance(val_obj, (int, float)):
                    # Numeric value (spacing, font size, etc.)
                    css_value = f'{val_obj}px'
                elif isinstance(val_obj, str):
                    # String value (font family, etc.)
                    css_value = val_obj
                
                if css_value:
                    css_output.append(f'  {var_name}: {css_value};')
            
            css_output.append('')
    
    css_output.append('}')
    
    with open('dist/tokens.css', 'w') as f:
        f.write('\n'.join(css_output))
    
    print('Generated dist/tokens.css')

if __name__ == '__main__':
    generate_css()
