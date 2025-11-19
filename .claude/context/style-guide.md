# Style Guide for Lição IA

This document serves as a reference for the design system implemented in the "Lição IA" application. The single source of truth for all design tokens is the code itself, primarily located in the `src/theme/` directory.

## Core Principle: Token-Based Styling

All styling **must** be done using the pre-defined design tokens. **Never hardcode values** like hex codes, font sizes, or pixel dimensions in components. This ensures consistency, maintainability, and allows for seamless theme switching (like light/dark mode).

### How to Style Components: The Correct Workflow

1.  **Get Tokens**: In your component, use the `useTokens` hook to get the current theme's tokens.
2.  **Create Styles**: Use `StyleSheet.create` to define your component's styles.
3.  **Apply Tokens**: Use the token values (e.g., `colors.primary`, `spacing.md`) within your `StyleSheet` object.

```tsx
// Example of the correct styling workflow
import { useTokens } from "../../theme";

const MyComponent = () => {
  const { colors, spacing, borderRadius } = useTokens();

  return <View style={styles.container} />;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.primary, // ✅ Correct: Using a color token
      padding: spacing.md, // ✅ Correct: Using a spacing token
      borderRadius: borderRadius.lg, // ✅ Correct: Using a radius token
      // color: '#FFFFFF', ❌ WRONG: Hardcoded value
      // padding: 16, ❌ WRONG: Magic number
    },
  });
};
```

---

## Color System

The color system is defined in `src/theme/tokens.ts` and exposed through the `useTokens` hook.

- **Source**: `src/theme/tokens.ts` (defines `lightColors` and `darkColors`)
- **Usage**: `const { colors } = useTokens();`

**Semantic Color Tokens**

Always use the semantic token that best describes the element's purpose.

| Token Path                    | Description                                     |
| ----------------------------- | ----------------------------------------------- |
| `colors.primary`              | The primary brand color, often dynamic.         |
| `colors.secondary`            | A secondary accent color.                       |
| `colors.background.primary`   | The main screen background color.               |
| `colors.background.secondary` | A slightly different background for contrast.   |
| `colors.surface.primary`      | The surface color for components like cards.    |
| `colors.surface.disabled`     | The surface color for disabled elements.        |
| `colors.content.primary`      | The primary color for text and icons.           |
| `colors.content.secondary`    | The secondary color for less important text.    |
| `colors.content.disabled`     | The color for disabled text and icons.          |
| `colors.content.inverse`      | A content color for use on primary backgrounds. |
| `colors.border.primary`       | The color for borders and dividers.             |

---

## Typography

All text **must** be rendered using the `Typography` component. This ensures consistency in font styles and allows for dynamic type support.

- **Source**: `src/components/atoms/Typography.tsx`
- **Usage**: `<Typography.Title>My Title</Typography.Title>`

**Available Styles**

| Component                 | Usage                                  |
| ------------------------- | -------------------------------------- |
| `<Typography.Display>`    | For major screen titles (rarely used). |
| `<Typography.Title>`      | For screen and section titles.         |
| `<Typography.Heading>`    | For card titles and sub-sections.      |
| `<Typography.Body>`       | For all standard paragraph text.       |
| `<Typography.Caption>`    | For helper text and minor details.     |
| `<Typography.ButtonText>` | For text inside buttons.               |

---

## Spacing

Use the `spacing` tokens for all `padding`, `margin`, and other layout spacing.

- **Source**: `src/theme/tokens.ts`
- **Usage**: `const { spacing } = useTokens();`

| Token | Value |
| ----- | ----- |
| `xs`  | 4     |
| `sm`  | 8     |
| `md`  | 12    |
| `lg`  | 16    |
| `xl`  | 24    |
| `xxl` | 32    |

---

## Border Radius & Shadows

- **Source**: `src/theme/tokens.ts`
- **Usage**: `const { borderRadius, shadows } = useTokens();`

### Border Radius

| Token  | Value |
| ------ | ----- |
| `sm`   | 4     |
| `md`   | 8     |
| `lg`   | 16    |
| `full` | 9999  |

### Shadows

Use the spread operator to apply pre-defined shadow styles.

**Example**: `...shadows.md`

| Token | Usage                                   |
| ----- | --------------------------------------- |
| `sm`  | For subtle elevation on small elements. |
| `md`  | For standard components like cards.     |
| `lg`  | For prominent elements like modals.     |
