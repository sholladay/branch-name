'use strict';

const
    execa = require('execa'),
    noBranchErrors = [
        'Not a git repository',
        'ref HEAD is not a symbolic ref'
    ];

function getBranch() {
    return execa.shell('git symbolic-ref --short HEAD').then((data) => {
        return data.stdout;
    });
}

// Get the current branch name, unless one is not available, in which case
// return the provided branch as a fallback.
function assume(branchName) {
    return getBranch().catch((err) => {

        // Strip off common "fatal: " prefix.
        const problem = err.stderr.substring(7);

        function matchProblem(scenario) {
            return problem.startsWith(scenario);
        }

        if (noBranchErrors.some(matchProblem)) {
            return branchName;
        }

        throw err;
    });
}

// Master is a nice fallback assumption because it is
// the default branch name in git.
function assumeMaster() {
    return assume('master');
}

module.exports = {
    get : getBranch,
    assume,
    assumeMaster
};
