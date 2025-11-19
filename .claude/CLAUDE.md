# Claude Code Configuration for Lição IA

This document is the master guide for developing the "Lição IA" React Native application with AI assistance. It outlines the project's core philosophies, commands, and architectural rules.

## Core Philosophy

- rules: .claude/rules

- KISS - Keep It Simple, avoid over-engineering

* YAGNI - Build only what's needed now
* DRY - Don't repeat, but don't abstract prematurely
* TDA - Tell, Don't Ask - objects handle their own state

## Project Commands

Use these commands in the terminal to run and manage the project.

```bash
npm start          # Start the Metro bundler
npm run ios        # Run the app on the iOS Simulator
npm run android     # Run the app on the Android Emulator/Device
npm run lint         # Run the linter to check for code quality issues
```

## Claude Commands

### General Commands

```bash
/fix:lint          # Attempt to fix ESLint errors automatically
/fix:types         # Fix TypeScript errors with @agent-typescript-expert
```

## Available Agents

Use `@agent-[name]` for specialized help. These are the official agents for this project:

- `@react-coder`: For implementing React Native components, hooks, and screens.
- `@ux-ui-designer`: For designing new UI components and experiences that align with our existing system.

## Reference Documentation

Core project standards and agent definitions are located in the `.claude` directory.

- `@/.claude/context/design-principles.md`: The high-level design philosophy.
- `@/.claude/context/style-guide.md`: The detailed guide to our design token system.
- `@/.claude/agents/`: Contains the detailed instructions for each specialized agent.
- `@/.claude/templates/`: Contains templates for tasks and technical specifications.
- `@/.claude/commands/`: Contains the definitions for custom commands.
