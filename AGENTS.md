# AI Agent Instructions for expo-template-cpk

## Overview

This document provides guidelines for AI agents (Claude, Gemini, etc.) working on expo-template-cpk. For detailed coding conventions, **refer to [CONVENTION.md](./CONVENTION.md)**.

---

## Quick Start

### Core Technologies

- **Frontend:** React Native with Expo Router
- **UI Library:** cpk-ui
- **Styling:** kstyled (compile-time CSS-in-JS)
- **State Management:** Zustand with immer
- **Internationalization:** i18n-js
- **Package Manager:** Bun

### Essential Rules

1. **Use cpk-ui components** - Typography, Button, useCPK, Icons
2. **Use `useCPK()` for theme** - NEVER use `useColorScheme()`
3. **Import assets from `src/icons.ts`** - Centralized asset management
4. **Use `css` for dynamic styles** - No props in styled-components
5. **Use Stack header** - NEVER create custom headers

---

## Project Configuration

### Package Manager

This project uses **Bun** as the package manager.

### Commands

- Install dependencies: `bun install`
- Run development server: `bun start`
- Run tests: `bun test`
- Run linting: `bun lint`
- Run type checking: `npx tsc --noEmit`

### Important Notes

- Always use `bun` instead of `npm` or `yarn` for package management
- The lock file is `bun.lock` (not `package-lock.json` or `yarn.lock`)

---

## 1. General Coding Guidelines

- Always use **TypeScript (TSX) and ES6+ syntax**
- Use **explicit type definitions** for function parameters and return values
- Always use **named exports** for utility functions
- Prefer **functional components** over class components
- Use `styled.View` instead of `View` for wrapping components
- **Use `css` from `kstyled` for inline styles instead of passing props to `styled-components`**
- Follow **consistent indentation, double quotes for strings, and no semicolons**
- **After writing code, ALWAYS run `bun lint && npx tsc --noEmit` to ensure no errors**

---

## 2. File & Directory Structure

expo-template-cpk uses `expo-router`, which determines the structure of the project:

```sh
app/                  # Page components managed by Expo Router
  ├── _layout.tsx     # Root layout
  ├── index.tsx       # Main entry point
  └── details.tsx     # Example detail page
src/                  # Core logic and reusable code
  ├── components/     # All React reusable code
  │   ├── hooks/      # Custom React hooks
  │   ├── modals/     # Modal components
  │   ├── providers/  # Context providers
  │   └── uis/        # UI components
  ├── stores/         # Zustand state management
  ├── utils/          # Utility functions
  ├── icons.ts        # Asset exports
  ├── theme.ts        # Theme configuration
  ├── styled.d.ts     # kstyled TypeScript types
  └── STRINGS.ts      # i18n configuration
assets/               # Static files
  ├── fonts/          # Custom font files
  ├── icons/          # Icon images
  └── langs/          # i18n language files
```

### 📂 `src/components/` Folder

All React reusable code is organized under `src/components/`:

- **`hooks/`** - Custom React hooks (useDebounce, useAppState, etc.)
- **`modals/`** - Modal components
- **`providers/`** - Context providers (RootProvider)
- **`uis/`** - UI components (ListEmptyItem, etc.)

---

## 3. CPK-UI Library

### Core Rules

1. **ALWAYS use cpk-ui components instead of React Native primitives**

   ```tsx
   // ✅ Correct
   import {Typography, Button} from 'cpk-ui';
   <Typography.Body1>Text</Typography.Body1>

   // ❌ Incorrect
   import {Text} from 'react-native';
   <Text>Text</Text>
   ```

2. **ALWAYS use `useCPK()` for theme, NEVER `useColorScheme()`**

   ```tsx
   // ✅ Correct
   import {useCPK} from 'cpk-ui';
   const {theme, themeType} = useCPK();

   // ❌ Incorrect
   import {useColorScheme} from 'react-native';
   const colorScheme = useColorScheme();
   ```

---

## 4. Theme and Styling

### Theme Detection

```tsx
import {useCPK} from 'cpk-ui';

const {theme, themeType, changeThemeType} = useCPK();
const isDark = themeType === 'dark';

// Access theme colors
const backgroundColor = theme.bg.basic;
const textColor = theme.text.basic;
const primaryColor = theme.role.primary;
```

### Styling with kstyled

```tsx
import {styled, css} from 'kstyled';

// Static styles - use styled
const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

// Dynamic styles - use css
<View
  style={css`
    background-color: ${theme.bg.basic};
    opacity: ${isActive ? 1 : 0.5};
  `}
/>
```

**Important:**

- Use `css` for dynamic styles
- NO quotes in font-family inside css template literals
- For dynamic values with units, use `${variable}px` syntax
- kstyled compiles styles at build-time for zero runtime overhead

---

## 5. Navigation and Headers

### Router Hook Destructuring

**ALWAYS destructure methods from `useRouter()`**

```tsx
// ✅ Correct
import {useRouter} from 'expo-router';
const {push, replace, back} = useRouter();
push('/some-route');

// ❌ Incorrect
const router = useRouter();
router.push('/some-route');
```

### Stack Navigation Headers

Use native Stack header instead of custom header implementations:

```tsx
import {Stack} from 'expo-router';

export default function MyScreen(): JSX.Element {
  return (
    <Container>
      <Stack.Screen
        options={{
          title: t('screen.title'),
        }}
      />
      {/* Content */}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
```

---

## 6. State Management (Zustand)

- Use **Zustand** for global state management
- Store files should follow the pattern: `useSomethingStore.ts`
- Always use the `immer` middleware for state immutability

```tsx
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

type SomethingState = {
  value: string;
  setValue: (value: string) => void;
};

export const useSomethingStore = create<SomethingState>()(
  immer((set) => ({
    value: '',
    setValue: (value) =>
      set((state) => {
        state.value = value;
      }),
  })),
);
```

---

## 7. Internationalization

```tsx
import {t} from '../src/STRINGS';

<Typography.Body1>
  {t('common.welcome')}
</Typography.Body1>
```

**Language Files:**

- `assets/langs/en.json`
- `assets/langs/ko.json`

---

## 8. Asset Management

All assets (images, fonts) should be defined in `src/icons.ts`:

```tsx
// ✅ Correct
import {IC_APP_ICON, IMG_TUTORIAL1} from '../src/icons';

// ❌ Incorrect
const icon = require('../assets/icon.png');
```

**Naming Convention:**

- `IC_` prefix for icons
- `IMG_` prefix for images
- `FONT_` prefix for fonts
- `BG_` prefix for backgrounds
- Use UPPER_SNAKE_CASE

---

## 9. Component Structure

Every component should follow this structure:

```tsx
/**
 * @name MyComponent
 */
import {styled, css} from 'kstyled';
import {Typography, Button, useCPK} from 'cpk-ui';

type Props = {};

export default function MyComponent({}: Props): JSX.Element {
  const {theme} = useCPK();

  return (
    <Container>
      <Typography.Body1
        style={css`
          color: ${theme.text.basic};
        `}
      >
        Example Text
      </Typography.Body1>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
```

### Component File Naming

- Use **PascalCase** for component files: `MyComponent.tsx`
- Use **camelCase** for utility files: `myUtil.ts`
- Use **kebab-case** for hook files: `use-my-hook.ts`

---

## 10. Git Commit Message Guidelines

- Use the following format for commit messages:
  - `feat: Add new feature`
  - `fix: Fix a bug`
  - `chore: Update dependencies`
  - `refactor: Improve code structure`
  - `docs: Update documentation`
  - `test: Add or update tests`
- Always write commit messages in **present tense**

---

## Quick Reference Checklist

### Before Writing Code

- [ ] Check [CONVENTION.md](./CONVENTION.md) for detailed conventions
- [ ] Use cpk-ui components (Typography, Button, useCPK)
- [ ] Use `useCPK()` for theme, NOT `useColorScheme()`
- [ ] Import assets from `src/icons.ts`

### Component Checklist

- [ ] File name in PascalCase
- [ ] @name annotation at top
- [ ] Import cpk-ui components
- [ ] Use `useCPK()` for theme
- [ ] Use `css` for dynamic styles
- [ ] Styled components at bottom

### Styling Checklist

- [ ] Use `styled` for static styles
- [ ] Use `css` for dynamic styles
- [ ] No props in styled-components
- [ ] Use `${variable}px` syntax for dynamic values with units

---

## Documentation

- **Detailed Conventions:** [CONVENTION.md](./CONVENTION.md)
- **Project Structure:** Section 2 of this document

---

By following these guidelines, we ensure high-quality, maintainable code.
