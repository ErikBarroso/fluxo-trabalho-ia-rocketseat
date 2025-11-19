# Design Principles for Lição IA

## Core Philosophy

- **Content-First & Focused**: The primary goal is to provide a serene and focused reading experience. The UI must be quiet, intuitive, and never distract from the lesson content.
- **Reverent & Appropriate Tone**: The design must feel respectful and appropriate for its context: personal Bible study. It should be calm and inviting.
- **Systematic Consistency**: A unified design language, built upon our Atomic Design structure, ensures the app is predictable and easy to learn.
- **Offline Reliability**: Users must be able to access their downloaded lessons and notes without an internet connection. The design must account for offline states gracefully.
- **Universal Access**: We are committed to making the lesson accessible to everyone. This means strict adherence to WCAG 2.1 AA guidelines for mobile, including high contrast, screen reader support, and scalable text.

## Brand Identity

The app's visual identity is fluid and adapts to the content, creating a fresh experience with each new lesson quarterly.

- **Dynamic Theming**: The primary color scheme of the app is dynamically generated from the cover art of the currently selected quarterly. This is a core feature of our brand identity, managed by `useColor.ts`.
- **Native Typography**: The app uses the default system font of the user's platform (San Francisco on iOS, Roboto on Android). This is a deliberate choice to make the app feel native and familiar, and to ensure maximum readability and accessibility.
- **Iconography**: Icons are simple, clean, and universally understood, following a consistent line-art style.

## Design Standards

### Accessibility Requirements

- **WCAG 2.1 AA Compliance**: This is our minimum standard.
- **Contrast**: All text must have a minimum contrast ratio of 4.5:1 against its background. Large text (18pt+ bold or 24pt+ regular) must have a 3:1 ratio.
- **Screen Readers**: All interactive elements must have clear `accessibilityLabel`s. Navigation order must be logical for VoiceOver (iOS) and TalkBack (Android) users.
- **Dynamic Type**: The app must respect the user's system-level font size settings.

### Mobile-Native Strategy

- **Platform Conventions**: While maintaining a consistent brand feel, the app should respect the native conventions of iOS and Android where it enhances usability.
- **Touch Targets**: All interactive elements must have a minimum touch target size of 44x44 points to be easily tappable.
- **Screen Size Adaptability**: Layouts must be fluid and look great on all supported phone sizes, from smaller devices (like iPhone SE) to the largest ones.

### Architecture

- **Atomic Design**: All UI must be built following the established Atomic Design structure.
- For project pattern:: .claude/rules/atomic-design-patterns.md

## Quality Expectations

- **Cross-Platform Consistency**: The user experience and brand identity should feel consistent across both iOS and Android.
- **Performance**: The app must feel responsive and fluid. Animations should be smooth, and screen transitions should be fast.
- **Regular Accessibility Audits**: New features must be manually tested with screen readers before release.

---

\*_For implementation details, see @react-coder._
