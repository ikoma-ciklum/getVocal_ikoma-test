# Project Setup and Overview

This repository contains a technical task from [ikoma@ciklum.com](mailto:ikoma@ciklum.com).

## Setup Instructions

To set up the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

## Features

The project includes the following key features:

- **Forms Handling**: Implemented manually. Alternatives can be explored if needed for form validation and handling with `react-hook-form`.
- **State Management**: State is managed using `zustand`. However, alternative state management libraries can also be considered.
- **Animations**: Two different animation approaches are provided:
    1. **Pure CSS Animations**: Ensures smooth animation behavior.
    2. **Tailwind CSS Class Animations**: An alternative implementation using Tailwind CSS. However, for some reason the animations via Tailwind classes do not perform as smoothly in this case.

### Animation Behavior

The project uses a feature flag to control which animation approach is enabled. The flag is:

```ts
TAILWIND_ANIMATION_ENABLED
```
located in
```ts
./src/widgets/ToDo/hooks/use-animations/use-animations.ts
```

## Notes
- **Config**: eslint, ts rules, vite etc can be improved.
- **Responsiveness**: can be improved.

## Time Breakdown
- **Total**: 13 hours
- **Bonus-less version**: approximately 8 hours.
