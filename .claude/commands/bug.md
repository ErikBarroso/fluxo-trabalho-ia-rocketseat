# Bug Analysis Command

## Command: `/bug`

Analyzes and documents bugs in the React Native application using the standardized bug template.

### Usage

```bash
/bug [bug-description]
```

### What it does:

1. Creates a new bug report using the bug template
2. Analyzes the provided bug description
3. Attempts to reproduce the issue if possible
4. Fills out relevant sections of the bug template
5. Provides initial investigation insights

### Examples:

```bash
/bug App crashes when opening lesson details
/bug Dark mode toggle not working properly
/bug Loading spinner appears indefinitely
```

### Process:

1. **Analysis**: Examines the bug description and context
2. **Template Creation**: Uses `.claude/templates/bug-template.md`
3. **Investigation**: Searches codebase for related components
4. **Documentation**: Fills template with findings
5. **Recommendations**: Suggests next steps for resolution

### Output:

- Structured bug report following project standards
- Initial technical analysis
- Suggested investigation areas
- Priority and category classification
