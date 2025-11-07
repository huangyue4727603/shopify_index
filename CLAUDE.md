# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Shopify theme named **Horizon** (v3.0.0) - a modern, modular Shopify theme built with Liquid templates, vanilla JavaScript web components, and JSON-based section configuration.

## Architecture

### Directory Structure

- **`/assets/`** - JavaScript modules, CSS files, and SVG icons
  - Component-based JavaScript using ES6 modules and Web Components
  - Base class: `Component` (extends `DeclarativeShadowElement`)
  - Key patterns: ref-based element management, declarative event listeners

- **`/sections/`** - Liquid section files that define page layouts
  - Each section has a corresponding `{% schema %}` block defining settings
  - Special files: `header-group.json`, `footer-group.json` for grouped sections
  - Core pattern: `_blocks.liquid` renders child blocks via `{% content_for 'blocks' %}`

- **`/blocks/`** - Reusable Liquid block components prefixed with `_` or standalone
  - Examples: `_product-card.liquid`, `_slide.liquid`, `accordion.liquid`
  - Used within sections via the blocks API

- **`/snippets/`** - Reusable Liquid template partials
  - Rendered via `{% render 'snippet-name' %}`
  - Examples: `product-card.liquid`, `icon.liquid`, `section.liquid`

- **`/templates/`** - Page templates (JSON and Liquid formats)
  - JSON templates define section composition (e.g., `index.json`, `product.json`)
  - One Liquid template: `gift_card.liquid`

- **`/layout/`** - Theme layouts
  - `theme.liquid` - main layout with header/footer groups and view transitions
  - `password.liquid` - password-protected store layout

- **`/config/`** - Theme configuration
  - `settings_schema.json` - defines theme customizer settings
  - `settings_data.json` - stores current theme settings values

- **`/locales/`** - Internationalization (51 locale files)
  - Translation strings for UI text
  - Schema translations for theme editor

### Component Architecture

**JavaScript Web Components:**
- Base class: `Component` in `assets/component.js`
- Pattern: Custom elements that manage child refs and declarative events
- Common components: `cart-drawer`, `product-card`, `media-gallery`, `slideshow`
- Type definitions: `assets/global.d.ts` provides TypeScript declarations

**Liquid Component Pattern:**
- Sections can contain blocks (defined in `/blocks/`)
- Blocks use `{% schema %}` to define settings
- Static blocks (e.g., `static-header`, `static-product-card`) provide structure
- Settings use visibility conditions: `visible_if` with Liquid expressions

### Key Patterns

**1. Section Rendering:**
```liquid
{% render 'section', section: section, children: children %}
```

**2. Product Cards:**
- Snippet: `snippets/product-card.liquid`
- Uses variant URL logic to match featured images with variants
- Quick-add functionality controlled by theme settings

**3. Color Schemes:**
- Defined in `settings_schema.json` via `color_scheme_group`
- Applied per section via `color_scheme` setting
- CSS variables generated in `snippets/color-schemes.liquid`

**4. Media Handling:**
- Supports image, video, and background media
- Position options: `cover`, `contain`, `fit`
- Overlay support with solid/gradient styles

## Working with this Theme

### Adding a New Section
1. Create file in `/sections/` with `.liquid` extension
2. Define markup and Liquid logic
3. Add `{% schema %}` block with section settings
4. Use existing sections as reference (e.g., `section.liquid` for flexible layouts)

### Adding a New Block
1. Create file in `/blocks/` with `_` prefix for reusable blocks
2. Define block markup with settings via `{% schema %}`
3. Reference in section via `blocks` array in schema

### Modifying JavaScript Components
1. Components are ES6 modules in `/assets/`
2. Import from `@theme/` alias (maps to assets directory)
3. Extend `Component` class for new web components
4. Use `refs` object to reference child elements with `ref` attribute

### Styling
- Main stylesheet: `assets/base.css`
- CSS variables defined in `theme-styles-variables.liquid`
- Component-specific styles inline or in dedicated CSS files
- Overflow list utility: `assets/overflow-list.css`

### Localization
- Add translation keys in `locales/en.default.json`
- Reference via `t:` prefix in schemas and `{{ 'key' | t }}` in Liquid
- Schema translations in `locales/en.default.schema.json`

## Development Notes

- **No build tools required** - Theme runs directly on Shopify
- **Theme editor**: Sections and blocks are fully configurable via Shopify admin
- **View transitions**: Enabled via `settings.page_transition_enabled`
- **Accessibility**: Skip-to-content links, proper ARIA attributes
- **Performance**: Lazy loading, critical CSS inlining, async module loading
