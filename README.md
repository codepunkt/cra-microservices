Current setup is roughly based on Cam Jackson's [microfrontends article](https://martinfowler.com/articles/micro-frontends.html).

It differs because it

- doesn't externalize shared dependencies
- loads all entrypoint chunks upfront and defines the webpack public path in remotes so that lazy chunks loaded from remotes still work in host.
