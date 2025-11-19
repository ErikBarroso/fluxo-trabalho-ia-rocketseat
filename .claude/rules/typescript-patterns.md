# TypeScript Patterns

## Core Principles

- **Never use `any`** - Use `unknown` with type guards
- **Type everything** - Explicit types for all data structures
- **Validate at boundaries** - Runtime validation for external data

## Key Patterns

### Function Design

- **Options objects** for functions with multiple parameters
- **Result pattern** for expected errors

### Async Patterns

- Use `Promise.all` for parallel execution
- Always clean up resources with `try/finally`

### Control Flow

- **Early returns** to avoid deep nesting
- **No flag parameters** - use separate functions instead
- Throw errors for invalid states

## Best Practices

1. **Never use `any`** - Use `unknown` with type guards
2. **Validate at boundaries** - Use Zod for external data
3. **Options objects** - For functions with multiple parameters
4. **Result pattern** - For expected errors
5. **Early returns** - Avoid deep nesting
6. **Composition over inheritance** - More flexible
7. **Resource cleanup** - Always use try/finally
