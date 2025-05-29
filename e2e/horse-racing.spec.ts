// !!!!!! IMPORTANT: You may need to run yarn playwright install before running the tests

import { test, expect } from '@playwright/test'

test('page renders okay', async ({ page }) => {
  // Start from the home page
  await page.goto('http://localhost:5173')

  // Should see some horses in the list
  const horseList = page.getByTestId('horse-list')
  await expect(horseList).toBeVisible()

  // See race track
  const raceTrack = page.getByTestId('race-track')
  await expect(raceTrack).toBeVisible()

  // See race controls
  const raceControls = page.getByTestId('race-controls')
  await expect(raceControls).toBeVisible()

  // See race schedule
  const raceSchedule = page.getByTestId('race-schedule')
  await expect(raceSchedule).toBeVisible()

  // See race results
  const raceResults = page.getByTestId('race-results')
  await expect(raceResults).toBeVisible()

  // Check if there are horses listed
  const horseItems = page.getByTestId('horse-racer')
  await expect(horseItems.first()).toBeVisible()
  const horseCount = await horseItems.count()
  expect(horseCount).toBeGreaterThan(0)
})
