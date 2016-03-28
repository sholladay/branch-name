# branch-name

> Get the current branch name or fallback to one

## Why?

 - Clean, minimal, promise-based API.
 - Respects your `$PATH`.
 - Uses the most reliable branch [detection algorithm](http://stackoverflow.com/a/19585361/2990144).
 - Gives you control in weird situations.

## Install

````sh
npm install branch-name --save
````

## Usage

Get it into your program.
````javascript
const branchName = require('branch-name');
````

Get the current branch name.
````javascript
branchName.get().then(function (name) {
   console.log(name);
});
````

Get the current branch name, but with a fallback result for detached head and non-repository situations.
````javascript
branchName.assume('dev').then(function (name) {
   console.log(name);  // prints current branch if possible, 'dev' otherwise
});
````

Get the current branch name, with the default `master` as a fallback.
````javascript
branchName.assumeMaster().then(function (name) {
   console.log(name);  // prints current branch if possible, 'master' otherwise
});
````

## Contributing
See our [contributing guidelines](https://github.com/sholladay/branch-name/blob/master/CONTRIBUTING.md "The guidelines for being involved in this project.") for more details.

1. [Fork it](https://github.com/sholladay/branch-name/fork).
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/branch-name/compare "Submit code to this repo now for review.").

## License
[MPL-2.0](https://github.com/sholladay/branch-name/blob/master/LICENSE "The license for branch-name.")

Go make something, dang it.
