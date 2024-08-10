# WARNING!!!

This repository contains test cases that require the installation of the `cypress-real-events` plugin to work correctly. Without this plugin, some tests may not function as expected.

## Installation

To ensure the tests run correctly, please install the `cypress-real-events` plugin by running the following command:
 
```bash
npm install cypress-real-events --save-dev

```


## Known Issues

Please note that 4 out of the 9 tests are expected to fail due to known bugs. The failing tests are:

1. **Test 1: UI** - This test fails due to a known UI rendering bug.
2. **Test 3: Empty Fields** - This test fails due to incorrect handling of empty input fields.
3. **Test 6: Special Characters** - This test fails due to a bug related to special character input.
4. **Test 7: Field Formatting** - This test fails due to issues with formatting validation.

These issues are currently being investigated, and fixes will be provided in future updates.

Please proceed with caution and refer to the documentation for further details on these bugs.
