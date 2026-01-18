# Coding Conventions

This document defines the detailed coding conventions for expo-template-cpk.

## Table of Contents

1. [CPK-UI Library Usage](#cpk-ui-library-usage)
2. [Typography](#typography)
3. [Icons](#icons)
4. [Theme and Colors](#theme-and-colors)
5. [Styling with kstyled](#styling-with-kstyled)
6. [Component Structure](#component-structure)
7. [Navigation and Headers](#navigation-and-headers)
8. [State Management](#state-management)
9. [Internationalization](#internationalization)

---

## CPK-UI Library Usage

This project uses the `cpk-ui` library for core UI components. This library provides:

- Typography components
- Button components with haptic feedback
- Theme management system
- Icon components

### Core Principle

**ALWAYS use cpk-ui components instead of creating custom implementations.**

```tsx
// ✅ Correct - Use cpk-ui components
import {Typography, Button, useCPK} from 'cpk-ui';

// ❌ Incorrect - Don't create custom text/button components
import {Text, TouchableOpacity} from 'react-native';
```

---

## Typography

### Typography Components from cpk-ui

- `Typography.Title` - For page titles and main headings
- `Typography.Heading1` - For section headings
- `Typography.Heading2` - For subsection headings
- `Typography.Body1` - For primary body text
- `Typography.Body2` - For secondary body text
- `Typography.Body3` - For tertiary body text
- `Typography.Body4` - For small text (captions, labels)
- `Typography.Caption` - For the smallest text (footnotes, hints)

### Typography Usage Rules

1. **ALWAYS use Typography components from cpk-ui**

   ```tsx
   // ✅ Correct
   import {Typography} from 'cpk-ui';

   <Typography.Body1>Hello World</Typography.Body1>;

   // ❌ Incorrect - Don't use React Native Text
   import {Text} from 'react-native';

   <Text>Hello World</Text>;
   ```

2. **Font Family in CSS Template Literals**

   When using `font-family` inside `css` template literals, **DO NOT use quotes**:

   ```tsx
   // ✅ Correct - No quotes
   style={css`
     font-family: Pretendard-Bold;
   `}

   // ❌ Incorrect - With quotes
   style={css`
     font-family: "Pretendard-Bold";
   `}
   ```

---

## Icons

### Icon Management

All icons and assets are managed through `src/icons.ts` for centralized control.

**Rules:**

1. **ALWAYS export assets from `src/icons.ts`**

   ```tsx
   // src/icons.ts
   import AppIcon from '../assets/icon.png';
   import MaskIcon from '../assets/icons/mask.png';

   export const IC_APP_ICON = AppIcon;
   export const IC_MASK = MaskIcon;
   ```

2. **Import from icons.ts, not directly from assets**

   ```tsx
   // ✅ Correct
   import {IC_APP_ICON, IC_MASK} from '../src/icons';

   // ❌ Incorrect
   const icon = require('../assets/icon.png');
   ```

### Icon Naming Convention

- `IC_` prefix for icons
- `IMG_` prefix for images
- `FONT_` prefix for fonts
- `BG_` prefix for backgrounds
- Use UPPER_SNAKE_CASE

```tsx
// Examples
export const IC_APP_ICON = AppIcon;
export const IMG_TUTORIAL1 = Tutorial1;
export const FONT_PRETENDARD_BOLD = PretendardBold;
export const BG_LIGHT = BackgroundLight;
```

---

## Theme and Colors

### Theme System with useCPK()

This project uses `cpk-ui`'s theme system with custom extensions defined in `src/theme.ts`.

### Theme Detection Rules

1. **NEVER use `useColorScheme()` from React Native**

   ```tsx
   // ❌ Incorrect - Don't use useColorScheme
   import {useColorScheme} from 'react-native';
   const colorScheme = useColorScheme();
   const isDark = colorScheme === 'dark';
   ```

2. **ALWAYS use `useCPK()` from cpk-ui**

   ```tsx
   // ✅ Correct - Use useCPK
   import {useCPK} from 'cpk-ui';

   function MyComponent() {
     const {theme, themeType} = useCPK();
     const isDark = themeType === 'dark';

     return (
       <View
         style={css`
           background-color: ${theme.bg.basic};
         `}
       />
     );
   }
   ```

### Accessing Theme Colors

**Always destructure theme values from `useCPK()`:**

```tsx
const {theme} = useCPK();

// Access colors
const backgroundColor = theme.bg.basic; // Background colors
const textColor = theme.text.basic; // Text colors
const primaryColor = theme.role.primary; // Primary brand color
const buttonBg = theme.button.primary.bg; // Button colors
```

### Theme Color Categories

**Background Colors (`theme.bg`):**

- `basic` - Main background
- `paper` - Card/paper background
- `disabled` - Disabled state background

**Text Colors (`theme.text`):**

- `basic` - Primary text
- `contrast` - Contrast text (on colored backgrounds)
- `disabled` - Disabled text
- `placeholder` - Placeholder text
- `label` - Label text
- `validation` - Validation message text

**Role Colors (`theme.role`):**

- `primary` - Primary brand color
- `secondary` - Secondary color
- `success` - Success state
- `warning` - Warning state
- `danger` - Error/danger state
- `info` - Information state
- `accent` - Accent color
- `link` - Link color
- `border` - Border color
- `underlay` - Underlay color

**Button Colors (`theme.button`):**

- `primary` - Primary button
- `secondary` - Secondary button
- `success` - Success button
- `danger` - Danger button
- `warning` - Warning button
- `info` - Info button
- `light` - Light button
- `disabled` - Disabled button

Each button object has:

- `bg` - Background color
- `text` - Text color

---

## Styling with kstyled

### Core Principles

1. **Use `kstyled` for all styling** - Zero-runtime compile-time CSS-in-JS
2. **Use `css` template literals for dynamic/inline styles**
3. **Use `styled` components for static container styles**
4. **NEVER pass props to styled-components for dynamic styling**

### Import Pattern

```tsx
import {styled, css} from 'kstyled';
```

### Static Styles - Use `styled`

For static, non-changing styles, use `styled` components:

```tsx
const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
`;
```

### Dynamic Styles - Use `css`

For dynamic styles, use `css` template literals in the `style` prop:

```tsx
// ✅ Correct - Dynamic styles with css
<View
  style={css`
    background-color: ${isActive ? '#3B6F94' : '#E8E8E8'};
    opacity: ${disabled ? 0.5 : 1};
  `}
/>;

// ❌ Incorrect - Props in styled-components
const StyledView = styled.View<{isActive: boolean}>`
  background-color: ${(props) => (props.isActive ? '#3B6F94' : '#E8E8E8')};
`;
```

### Component Margin and Spacing

#### Use `gap` Instead of Margin

**IMPORTANT:** Always prefer using `gap` property for spacing between child elements:

```tsx
// ✅ Correct - Use gap for spacing
const FormContainer = styled.View`
  flex: 1;
  gap: 16px;
`;

// ❌ Incorrect - Individual margins
const EditTextWrapper = styled.View`
  margin-bottom: 16px;
`;
```

#### CPK-UI Component Margin

When adding margin to cpk-ui components, use the `style` prop, NOT the `styles.container` prop:

```tsx
// ✅ Correct - Use style prop for margin
<Button
  styles={{
    container: css`
      height: 56px;
    `,
  }}
  style={css`
    margin-bottom: 12px;
  `}
  text="Submit"
  onPress={handleSubmit}
/>

// ❌ Incorrect - Don't add margin to styles.container
<Button
  styles={{
    container: css`
      height: 56px;
      margin-bottom: 12px; // ❌ This affects inner container
    `,
  }}
  text="Submit"
/>
```

### Conditional Styles - Group Together

When multiple styles depend on the same condition, group them:

```tsx
// ✅ Correct - Grouped conditional styles
<View
  style={css`
    ${selected
      ? `
        background-color: ${theme.role.selectedBg};
        border-color: ${theme.role.selectedBorder};
        border-width: 2px;
      `
      : `
        background-color: ${theme.role.unselectedBg};
        border-color: ${theme.role.border};
        border-width: 1px;
      `}
  `}
/>
```

### Dynamic Values with Units

Use `${variable}px` syntax for values with units:

```tsx
// ✅ Correct - Direct interpolation with units
const height = 50;
<View
  style={css`
    height: ${height}px;
    margin-top: ${spacing * 2}px;
  `}
/>;

// ✅ Correct - In styled components
const IMAGE_SIZE = 320;
const Container = styled.View`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: ${IMAGE_SIZE / 2}px;
`;
```

---

## Component Structure

### Standard Component Template

Every component should follow this structure:

```tsx
/**
 * @name MyComponent
 * @description Brief description of what this component does
 */
import {styled, css} from 'kstyled';
import {Typography, Button, useCPK} from 'cpk-ui';
import {t} from '../STRINGS'; // or '../../STRINGS' depending on folder depth

type Props = {
  title: string;
  onPress?: () => void;
};

export default function MyComponent({title, onPress}: Props): JSX.Element {
  const {theme} = useCPK();

  return (
    <Container>
      <Typography.H1>{title}</Typography.H1>
      <Button text={t('common.confirm')} onPress={onPress} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;
```

### Component Structure Rules

1. **File header with @name annotation**
2. **Import order:**
   - React and React Native core
   - Third-party libraries
   - cpk-ui components
   - Local imports (utils, hooks, stores)
   - Assets (from icons.ts)
3. **Type definitions before component**
4. **Functional component with explicit return type**
5. **Hooks at the top of component body**
6. **Styled components at the bottom of file**

### Component File Naming

- Use **PascalCase** for component files: `MyComponent.tsx`
- Use **camelCase** for utility files: `myUtil.ts`
- Use **kebab-case** for hook files: `use-my-hook.ts`

---

## Navigation and Headers

### Router Hook Destructuring

**ALWAYS destructure methods from `useRouter()`**

```tsx
// ✅ Correct
import {useRouter} from 'expo-router';

const {push, replace, back, dismissAll} = useRouter();

push('/some-route');
replace('/another-route');

// ❌ Incorrect
const router = useRouter();

router.push('/some-route');
```

### Header Button Styling

When adding buttons to Stack navigation headers:

1. **Use `Pressable`** instead of `CustomPressable`
2. **Add `hitSlop`** for better touch targets
3. **DO NOT** add background colors or border-radius

```tsx
// ✅ Correct - Pressable with hitSlop, no background
<Stack.Screen
  options={{
    headerShown: true,
    title: t('screen.title'),
    headerRight: () => (
      <Pressable
        onPress={handleAction}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        style={css`
          padding: 8px;
        `}
      >
        <Icon name="SignOut" size={24} color={theme.text.basic} />
      </Pressable>
    ),
  }}
/>
```

### Safe Area Insets for Bottom Elements

When positioning elements at the bottom of the screen, ALWAYS use `useSafeAreaInsets()`:

```tsx
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function MyScreen(): JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <BottomButton
        style={css`
          margin-bottom: ${insets.bottom + 16}px;
        `}
      >
        <Button text="Action" onPress={handleAction} />
      </BottomButton>
    </Container>
  );
}
```

---

## State Management

### Zustand Store Pattern

All global state uses Zustand with immer middleware.

**Store File Pattern:** `useSomethingStore.ts`

```tsx
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

type SomethingState = {
  value: string;
  isOpen: boolean;
};

type SomethingActions = {
  setValue: (value: string) => void;
  toggle: () => void;
  reset: () => void;
};

const initialState: SomethingState = {
  value: '',
  isOpen: false,
};

export const useSomethingStore = create<SomethingState & SomethingActions>()(
  immer((set) => ({
    ...initialState,
    setValue: (value) =>
      set((state) => {
        state.value = value;
      }),
    toggle: () =>
      set((state) => {
        state.isOpen = !state.isOpen;
      }),
    reset: () => set(initialState),
  })),
);
```

### Store Usage

```tsx
import {useSomethingStore} from '../stores/useSomethingStore';

function MyComponent() {
  const {value, isOpen} = useSomethingStore();
  const {setValue, toggle} = useSomethingStore();

  return (
    <View>
      <Typography.Body1>{value}</Typography.Body1>
      <Button text="Toggle" onPress={toggle} />
    </View>
  );
}
```

---

## Internationalization

### i18n Setup

This project uses `i18n-js` for internationalization.

**Language Files Location:**

- `assets/langs/en.json`
- `assets/langs/ko.json`

### Using i18n

**IMPORTANT:** Always import `t` directly from `src/STRINGS`:

```tsx
// ✅ Correct - In app/ folder
import {t} from '../src/STRINGS';

// ✅ Correct - In src/components/uis/ folder
import {t} from '../../STRINGS';

function MyComponent() {
  return <Typography.Body1>{t('common.welcome')}</Typography.Body1>;
}
```

### i18n Variable Interpolation

Use `%{variable}` syntax for variables:

```json
{
  "greeting": "Hello, %{name}!"
}
```

```tsx
t('greeting', {name: 'John'});
// Output: "Hello, John!"
```

### Language File Structure

**CRITICAL RULE:** Language file structure MUST mirror the app route structure.

```sh
app/
├── index.tsx
└── details.tsx
```

Must map to:

```json
{
  "common": {
    "appTitle": "App Title",
    "confirm": "Confirm",
    "cancel": "Cancel"
  },
  "home": {
    "title": "Home",
    "seeDetails": "See Details"
  },
  "details": {
    "title": "Details"
  }
}
```

---

## Summary

### Quick Reference Checklist

- [ ] Use cpk-ui components (Typography, Button, useCPK)
- [ ] Use `useCPK()` for theme, NOT `useColorScheme()`
- [ ] No quotes in font-family inside css template literals
- [ ] Import assets from `src/icons.ts`
- [ ] Use `css` for dynamic styles, `styled` for static
- [ ] Group conditional styles together
- [ ] Use `${variable}px` syntax for dynamic values with units
- [ ] Zustand stores with immer middleware
- [ ] i18n with `t()` from STRINGS
- [ ] PascalCase for component files
- [ ] Type definitions before components
