# Figma ↔ theme tokens

The design tokens of this theme are the CSS custom properties in
`resources/styles/config/variables.scss`. This folder keeps them in sync with a
Figma variable collection called **GDS**, in both directions, without a Figma
Enterprise plan: the Figma side runs as Plugin API scripts through the Figma MCP
server (Claude Code, Cursor, or the Figma desktop console), the code side is
plain Node.

```
variables.scss  ──extract-tokens──▶  tokens.json  ──push-variables.plugin.js──▶  Figma "GDS" collection
variables.scss  ◀──pull-tokens────  figma-export.json  ◀──export-variables.plugin.js──  Figma "GDS" collection
```

## How the tokens map

| SCSS                                                            | Figma                                                                      |
| --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `--gds-color-primary: #1d7c88`                                  | `color/primary` (COLOR), code syntax `var(--gds-color-primary)`            |
| `--gds-spacing-m: #{sloped-size(16px, 24px)}`                   | `spacing/m` (FLOAT) · Mobile mode 16 · Desktop mode 24                     |
| `--gds-heading-m-font-size: #{sloped-size(em(22px), em(30px))}` | `heading/m/font-size` · 22 / 30, bound into text style `Heading/M`         |
| `--block-gutter: var(--block-gutter-m)`                         | `block-gutter/default` aliased to `block-gutter/m`                         |
| `--gds-box-shadow: 1px 1px 4px rgba(0 0 0 / 10%)`               | effect style `Shadow/default`                                              |
| `--grid-column-8` (the `@for` loop)                             | `grid/column-8` · 736 / 792, computed from `grid/column` and `grid/gutter` |
| `$mq-breakpoints`                                               | `breakpoint/*` (no CSS custom property, read-only in Figma)                |

Mobile mode is the value at the 375 px end of `sloped-size()`, Desktop mode the
value at 1400 px. A token with the same value in both modes is a plain value in
the SCSS. Values that are not a single number, colour, string or alias
(`calc()`, `currentcolor`, `inherit`) are listed under `skipped` in
`tokens.json` and left alone by both directions.

## Code → Figma

```sh
npm run figma:extract        # variables.scss (+ breakpoints.scss) → figma/tokens.json
npm run figma:push           # prints push-variables.plugin.js with tokens.json inlined
```

Run the printed script with the Figma MCP `use_figma` tool against the target
file. It is idempotent: the GDS collection and its Mobile/Desktop modes are
created if missing, variables are matched by name and updated in place, scopes
and WEB code syntax are set, shadow tokens become effect styles. Commit
`tokens.json` so the last pushed state is in git.

## Figma → code

Run `export-variables.plugin.js` with the Figma MCP `use_figma` tool (read-only)
and save the returned JSON as `figma/figma-export.json`. Then:

```sh
npm run figma:pull -- figma/figma-export.json --dry-run   # show what would change
npm run figma:pull -- figma/figma-export.json             # write variables.scss
git diff resources/styles/config/variables.scss
```

Only values change; the SCSS keeps its structure, comments and `sloped-size()`
wrapping. Variables that exist in Figma but not in the SCSS are reported, not
added, so new tokens are always introduced in code first. `figma-export.json` is
a working file, do not commit it.

## Components

In the Figma file, components are named after the block they represent
(`core/media-text`, `gds/post-teaser`, `parts/header` …) and variants after the
block attribute or style (`Media=Left`, `Style=Outline, Size=M`,
`Align=Wide, Background=Primary`). Every component description names the
theme.json preset, CSS class or block style it maps to, so a designer and a
developer talk about the same thing.

Reference file: Nordic Rakennus Wireframes,
https://www.figma.com/design/9P9WbPV2Zk14MKpNeieySx (Genero team). To start a
new project file, duplicate its Components page and GDS collection, or run the
push script against a blank file and rebuild the components you need.
