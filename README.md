## Microfrontends

Microfrontends describe the trend of breaking up frontend monoliths into many smaller, more manageable pieces in order to increase the effectiveness and efficiency of teams working on frontend code.

In this repository, two competing setups for microfrontends with react are evaluated. Both of them are based on the notion of a "_host_" and multiple "_remote_" apps:

1. Manual implementation based on Cam Jackson's [microfrontends article](1), using [Create React App](2) for the host and remote apps.
2. Using the module federation feature of [Webpack](3) v5 with manually configured build processes for the host and remote apps.

#### 1. Manual implementation

The manual implementation in the `manual` folder differs from the [microfrontends article](1) because the article's version requires all remote apps to be loaded in one large chunk, without being able to lazy load parts of remotes—which is a serious performance problem.

In order to circumvent this and allow parts of remotes to be loaded lazily, all entrypoint chunks of a remote are loaded upfront and the webpack public path has to be explicitly defined in every remote so that lazy chunks of remotes are loaded into the host app from the correct path.

**Benefits**

- Build process configuration is provided to us by `create-react-app`

**Problems**

- Manual implementation to render/unmount remote apps
- Reliance on (partially internal) webpack mechanisms which are prone to change between versions
- `react` [doesn't work](6) with multiple versions of react loaded
- `styled-components` [doesn't work](4) when the same version is loaded twice
- `@material-ui/styles` [doesn't work](5) when several instances are on the same page
- Forcing host and remotes to the same version of a library can only be done with webpack externals. This means we need adjust the build process configuration of the host _and_ every remote
  - to use the webpack externals feature with the same list of dependencies
  - to provide the correct versions of the external dependencies to be used by the build output

#### 2. Module federation

Module federation is a new feature in [webpack](3) v5

**Open questions**

- How can we enforce remote OSS versions via Host?
- Is it viable if we just use ContainerReferencePlugin and SharedPlugin in host and ContainerPlugin and SharedPlugin in remotes?
- Where do i define singleton shared libraries? on host? remotes? both?
- How do we distinguish between development/staging/production environments?
- What's an easy way to deploy all build artifacts to the same folder, without hosting them on different hosts in production?

[1]: https://martinfowler.com/articles/micro-frontends.html
[2]: https://create-react-app.dev/
[3]: https://webpack.js.org/
[4]: https://styled-components.com/docs/faqs#why-am-i-getting-a-warning-about-several-instances-of-module-on-the-page
[5]: https://material-ui.com/getting-started/faq/#i-have-several-instances-of-styles-on-the-page
[6]: https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
