<div align="center">

🔴Work In Progress🔴

# Denominator 🔱

A wannabe user-friendly and customizable cli for manifesting React components.

[Why?](#why) •
[Getting started](#getting-started) •
[Configuration](#configuration) • [Buid](#build)

<!-- [Integrations](#third-party-integrations) -->

</div>

## Why? 💡

In a nutshell I wanted a tool that saves me from doing repetitive task of creating boilerplate for components. This is a npm package for adding new React components in your project. Pretty straight forward to use and requires no configurations, completely configurable, though 😵‍💫.

## Getting started 🚥

Install via NPM:

```bash
# Using Yarn:
$ yarn global add denominator

# or, using NPM
$ npm i -g denominator
```

`cd` into your project's directory, and try creating a new component:


```bash
$ damn -c Button -ext js
```

Your project will now have a new directory at `src/components/Button`. This directory will have three files:

```jsx
// `Button/index.js`
export { default } from "./Button";
```

```jsx
// `Button/Button.js`
import React from "react";
import * as Styles from "./Button.style";

const Button = () => {
    return <Styles.Wrapper>Button</Styles.Wrapper>;
};

export default Button;
```

```js
// `Button/Button.style.js`
import styled from "styled-components";

export const Wrapper = styled.div``;
```

<br/>

> This structure might appear odd to you, with an `index.js` that points to a named file.<br>Personally, for me this's has been an optimal way to set up components; the `index.js` allows you to `import` from the directory (eg. `import Button from 'components/Button'`), while having `Button.js` means that you're never lost in a sea of `index.js` files in your editor.
> <br />

<br/>

## Configuration ⚙️
