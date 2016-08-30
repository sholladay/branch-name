'use strict';

const { exec } = require('child_process');

const branchName = (option) => {
    const config = Object.assign({}, option);
    return new Promise((resolve, reject) => {
        exec('git symbolic-ref --short HEAD', { cwd : config.cwd }, (err, stdout, stderr) => {
            if (err) {
                err.stderr = stderr;
                reject(err);
                return;
            }
            resolve(stdout.trimRight());
        });
    });
};

// Get the current branch name, unless one is not available, in which case
// return the provided branch as a fallback.
branchName.assume = (assumedName, option) => {
    return branchName(option).catch((err) => {
        const problem = err.stderr.substring('fatal; '.length);

        const noBranchErrors = [
            'Not a git repository',
            'ref HEAD is not a symbolic ref'
        ];

        const matchProblem = (scenario) => {
            return problem.startsWith(scenario);
        };

        if (noBranchErrors.some(matchProblem)) {
            return assumedName;
        }

        throw err;
    });
};

// Master is a nice fallback assumption because it is
// the default branch name in git.
branchName.assumeMaster = (option) => {
    return branchName.assume('master', option);
};

module.exports = branchName;
