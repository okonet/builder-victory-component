<% if (packageGitHubOrg) { %>[![Travis Status][travis_badge]][travis_site]
<% if (packageGitHubOrg) { %>[![Travis Status][travis_badge]][travis_site]

![Library gzip Size](https://badge-size.herokuapp.com/FormidableLabs/victory-pie/master/dist/victory-pie.js.svg?compression=gzip)

<% } %># <%= packageName %>

<%= packageDescription %>

## Development

This component was originally generated with [builder-init][], and uses
[builder][] to support the entire development / release lifecycle.

All development tasks and common workflows can be found in the
[builder-victory-component][] archetype [development guide][arch-dev].

## Contributing

Please see the [builder-victory-component][] archetype [contributing guide][arch-contr].


<% if (packageGitHubOrg) { %>[travis_badge]: https://api.travis-ci.org/<%= packageGitHubOrg %>/<%= packageName %>.svg
[travis_site]: https://travis-ci.org/<%= packageGitHubOrg %>/<%= packageName %>
[gzip_badge](https://badge-size.herokuapp.com/<%= packageGitHubOrg %>/<%= packageName %>/master/dist/<%= packageName %>.js.svg?compression=gzip)
<% } %>[builder]: https://github.com/FormidableLabs/builder
[builder-init]: https://github.com/FormidableLabs/builder-init
[builder-victory-component]: https://github.com/FormidableLabs/builder-victory-component
[arch-dev]: https://github.com/FormidableLabs/builder-victory-component/blob/master/DEVELOPMENT.md
[arch-contr]: https://github.com/FormidableLabs/builder-victory-component/blob/master/dev/CONTRIBUTING.md
