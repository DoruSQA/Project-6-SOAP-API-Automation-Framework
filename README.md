# 🎭 Project 6 – SOAP API Automation Framework (ShiftLeft-API)

![JavaScript](https://img.shields.io/badge/JavaScript-ES2022%2B-yellow)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Playwright](https://img.shields.io/badge/Playwright-API%20Testing-2EAD33)
![SOAP](https://img.shields.io/badge/SOAP-API%20Testing-005571)

> **Note:** This project is part of my personal QA Automation portfolio.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Framework Features](#framework-features)
- [Framework Architecture](#framework-architecture)
- [Test Execution](#test-execution)
- [Framework Requirements](#framework-requirements)
- [Conclusion](#conclusion)


## 📖 Overview

A modular SOAP API automation framework built with JavaScript, Node.js, and Playwright.
The framework covers CRUD operations for the following SOAP services:
- Users
- Products

Both positive and negative scenarios are automated, including validation and boundary testing.


<a id="tech-stack"></a>
## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| JavaScript | Scripting language used for test implementation |
| Node.js | JavaScript runtime environment |
| Playwright | API automation, HTTP request handling, test execution and assertions |
| fast-xml-parser | XML response parsing and deserialization |
| SOAP | API protocol under test |
| XML | Request payload templates and response format |

## ✨ Framework Features

- Template parametrization with runtime test data
- HTML test reporting with Playwright
- XML response deserialization using `fast-xml-parser`
- Separation of request data from test logic
- Service Object Model for reusable API operations
- Test execution control through Playwright parameters
- Custom Playwright Fixtures used as request payload
- Centralized HTTP status codes and expected response values

<a id="framework-architecture"></a>
## 🏗️ Framework Architecture

The framework is organized into dedicated layers, each with a clear responsibility to improve
maintainability, reusability, and separation of concerns.


| Component | Purpose |
|-------------------|---------|
| Service | Encapsulates API endpoints and HTTP operations for each resource |
| Payload | Provides reusable SOAP request templates with placeholders |
| Fixtures | Provides ready-to-use payloads passed as parameters directly into each test|
| Test Data | Contains scenario-specific input data used to populate request templates |
| Expected | Centralizes expected status codes, headers, response values and validation messages |
| Tests | Contains test scenarios organized by API resource and operation |
| Utils | Provides generic methods for XML parsing, placeholder replacement and XML field manipulation |

## ▶️ Test Execution

### Smoke Suite

```bash
npx playwright test --grep '@smoke'
```
- Executes all the tests with 'Smoke' tag

### Regression Suite

```bash
npx playwright test --grep '@regression'
```
- Executes all API tests with 'Regression' tag


### Service Suite

```bash
npx playwright test --grep '@product'
```
- Executes all API tests with 'Product' tag


---

## ⚙️ Framework Requirements
- Node.js (LTS)
- npm
- Playwright
- JavaScript (ES Modules)


## 🎯 Conclusion

The main focus of this project was to demonstrate a solid understanding of core API Automation concepts, particularly 
SOAP API testing, and their practical application within a structured and configurable framework.


**Author:** [DoruSQA](https://github.com/DoruSQA) | [LinkedIn](https://www.linkedin.com/in/sava-doru/)