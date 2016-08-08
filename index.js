'use strict';

const { exec } = require('child_process');

const get = () => {
    return new Promise((resolve, reject) => {
        exec('git symbolic-ref --short HEAD', (err, stdout, stderr) => {
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
const assume = (assumedName) => {
    return get().catch((err) => {
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
const assumeMaster = () => {
    return assume('master');
};

module.exports = {
    get,
    assume,
    assumeMaster
};
