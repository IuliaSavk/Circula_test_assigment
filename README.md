# Playwright Test Automation Project

This repository contains a Playwright test automation project with the solution to the Home test assignments for QA Analyst position at Circula. Those autotests are covering the main checks from the checklist created for the first task.

## Project Structure

```
.
├── data
│   └── testData.ts
├── pages
│   └── SignUpPage.ts
├── tests
│   └── signUpPage.spec.ts
├── utils.ts
└── playwright.config.ts
```

## Prerequisites

- Node.js (v18+ recommended)
- Playwright installed globally or locally via npm/yarn

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Install Playwright browsers:

   ```sh
   npx playwright install
   ```

## Running Tests

### Run all tests

```sh
npx playwright test
```

### Run tests in headed mode (for debugging)

```sh
npx playwright test --headed
```

### Run a specific test file

```sh
npx playwright test tests/signUpPage.spec.ts
```

### View the HTML report

After running tests, an HTML report will be generated. Open it with:

```sh
npx playwright show-report
```

## Test Cases

The tests cover the following scenarios:

1. **Successful Signup with Sweden Selected:**
   - Select Sweden from the country dropdown
   - Complete the signup form
   - Verify successful signup confirmation

2. **Country Persistence After Navigation:**
   - Select Sweden from the dropdown
   - Navigate back and forward
   - Verify Sweden remains selected

3. **Country Suggestion Functionality:**
   - Type "Sweden" in the country input
   - Verify only one suggestion appears
   - Select Sweden and verify it is correctly selected

4. **Signup with Austria Selected:**
   - Select Austria from the dropdown
   - Complete the signup form
   - Verify successful signup confirmation

## Configuration

The `playwright.config.ts` file includes:
- **Base URL** set to `https://circula-qa-challenge.vercel.app/users/sign_in`
- **Parallel Test Execution** enabled
- **Cross-browsers testing** enabled for:
     - chromium
     - firefox
     - webkit
- **HTML Reporting** configured
