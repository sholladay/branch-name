# branch-name [![Build status for branch-name](https://img.shields.io/circleci/project/sholladay/branch-name/master.svg "Build Status")](https://circleci.com/gh/sholladay/branch-name "Builds")

> Get the current branch name

## Why?

 - Clean, minimal, promise-based API.
 - Respects your `$PATH`.
 - Uses the most reliable branch [detection algorithm](http://stackoverflow.com/a/19585361/2990144).
 - Gives you control in weird situations.

## Install

```sh
npm install branch-name --save
```

## Usage

Get it into your program.

```js
const branchName = require('branch-name');
```

Get the current branch name.

```js
branchName.get().then((name) => {
   console.log(name);
});
```

Get the current branch name, but with a fallback result for detached head and non-repository situations.

```js
branchName.assume('dev').then((name) => {
   console.log(name);  // prints current branch if possible, 'dev' otherwise
});
```

Get the current branch name, with the default `master` as a fallback.

```js
branchName.assumeMaster().then((name) => {
   console.log(name);  // prints current branch if possible, 'master' otherwise
});
```

## API

### get(option)

Returns the branch name that HEAD points to. Throws an error if not in a git repository or HEAD is not a branch.

### assume(name, option)

Similar to `.get()`, but will return `name` if not in a git repository or the HEAD is detached.

### assumeMaster(option)

Similar to `.assume()` but always uses "master" as the fallback name.

#### option

Type: `object`

##### cwd

Type: `string`<br>
Default: `process.cwd()`

Directory whose branch you want determine.

## Related

 - [head-hash](https://github.com/sholladay/head-hash) - Get the current commit hash

## Contributing

See our [contributing guidelines](https://github.com/sholladay/branch-name/blob/master/CONTRIBUTING.md "Guidelines for participating in this project") for more details.

1. [Fork it](https://github.com/sholladay/branch-name/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/branch-name/compare "Submit code to this project for review").

## License

[MPL-2.0](https://github.com/sholladay/branch-name/blob/master/LICENSE "License for branch-name") © [Seth Holladay](https://seth-holladay.com "Author of branch-name")

Go make something, dang it.
