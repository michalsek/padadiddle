# AI Coding Agent Instructions - UI directory

## Directory overview

This directory contains basic (business logic less) components to build application user interface in a design-system manner.

## Sub directories structure

each component available here should have:

[ComponentName] - directory to wrap all of its implementation
[ComponentName]/index.ts - exports the Component and prop types, and other types that should be accessible outside of the component code
[ComponentName]/[ComponentName.tsx] - main implementation file
[ComponentName]/utils.ts - contains all function and helper method that isn't part of the main application
[ComponentName]/types.ts - contains all types associated with the component (unless the component uses something outside of its scope)
[ComponentName]/constants.ts - contains all constant-like values used withing the directory code
[ComponentName]/[ComponentName.tests.tsx] - contains unit tests and snapshot tests of the components
