// !!!!!! IMPORTANT: You may need to run "yarn playwright install" before running the tests

import { test, expect } from '@playwright/test'

test('run all rounds and finish race', async ({ page }) => {
  // Start from the home page
  await page.goto('http://localhost:5173')

  // Start the race
  const controls = page.getByTestId('race-controls')
  const startButton = controls.getByText('Start Round')

  // Loop Each round till last
  for (let i = 0; i < 5; i++) {
    await startButton.click()

    // Wait for race to complete
    await page.waitForTimeout(4000)

    // check next round button
    const nextRoundButton = controls.getByText('Next Round')
    nextRoundButton.click()
  }
  await startButton.click()

  // Wait for race to complete
  await page.waitForTimeout(4000)

  await expect(controls.getByText('Race Finished')).toBeVisible()
})
