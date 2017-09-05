'use strict';

const { promisify } = require('util');
const childProcess = require('child_process');

const exec = promisify(childProcess.exec);

const get = async (option) => {
    const { cwd } = Object.assign({}, option);
    const { stdout } = await exec('git symbolic-ref --short HEAD', { cwd });
    return stdout.trimRight();
};

// Get the current branch name, unless one is not available, in which case
// return the provided branch as a fallback.
const assume = (assumedName, option) => {
    return get(option).catch((err) => {
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
const assumeMaster = (option) => {
    return assume('master', option);
};

module.exports = {
    get,
    assume,
    assumeMaster
};
