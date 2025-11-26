# DS Florecilla

Welcome to the **Florecilla Design System** repository.

## Overview
This repository serves as the single source of truth for the Florecilla Design System. It contains the master Figma file and the exported design tokens.

## Contents

### 🎨 Design Source
- **File**: `DS-Florecilla.fig`
- **Description**: The master Figma file containing all components, styles, and layouts for the design system.

### 🪙 Design Tokens
- **File**: `tokens.json`
- **Description**: JSON export of the design tokens (Colors, Typography, Spacing, etc.) for consumption in development.

## Documentation
We have automatically generated documentation based on the design tokens, organized to match the Supernova structure:

### Foundations
Core design variables and primitives:
- [Colors](docs/foundations/COLORS.md) - Complete color palette
- [Typography](docs/foundations/FONT.md) - Font families, sizes, weights, and line heights
- [Spacing](docs/foundations/NUMBER.md) - Spacing scale and sizing values
- [Shadows](docs/foundations/SHADOW.md) - Shadow definitions
- [Boolean](docs/foundations/BOOLEAN.md) - Boolean tokens

### Components
Semantic tokens for UI components:
- [Buttons](docs/components/BUTTONS.md) - Button component tokens
- [Card](docs/components/CARD.md) - Card component tokens
- [Input Text](docs/components/INPUT_TEXT.md) - Text input tokens
- [List Item](docs/components/LIST_ITEM.md) - List item tokens
- [Navigator Item](docs/components/NAVIGATOR_ITEM.md) - Navigation tokens
- [Status Bar](docs/components/STATUS_BAR.md) - Status bar tokens

### Translations
- [Translations](docs/TRANSLATIONS.md) - Localized strings for the application

## Usage
Design tokens can be transformed for various platforms (Web, iOS, Android) using tools like [Style Dictionary](https://amzn.github.io/style-dictionary/).

## Contributing
Please ensure any changes to the design tokens in code are reflected in the Figma file and vice versa.
