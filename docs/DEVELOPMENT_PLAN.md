# Development Plan: Master Framework Migration

## Overview
This plan outlines the steps to migrate the current Vite+React project to the structure defined in the Master Website Framework, while retaining the Vite technology stack.

## Phase 1: Documentation & Structure Setup
- [ ] Create `docs/` directory structure
- [ ] Document current Tech Stack (`docs/00_TechStack.md`)
- [ ] Define Target Project Structure (`docs/18_ProjectStructure.md`)

## Phase 2: Component Reorganization
- [x] Move UI components to `components/ui`
- [x] Move Layout components to `components/layout`
- [x] Move Section components to `components/sections`
- [x] Move Effects components to `components/effects`
- [x] Move Pages to `components/pages`

## Phase 3: Import Updates
- [x] Update all import paths in `App.tsx` and across components.
- [x] Verify application builds and runs correctly.

## Phase 4: Documentation Backfill
- [x] Fill `01_ProjectBrief.md` based on current site content.
- [x] Fill `02_SiteArchitecture.md` based on current navigation.
- [x] Fill `03_DesignSystem.md` based on `tailwind.config.js` and current styles.
