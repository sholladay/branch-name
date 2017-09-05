import { promisify } from 'util';
import childProcess from 'child_process';
import test from 'ava';
import mkdirtemp from 'mkdirtemp';
import branchName from '.';

const exec = promisify(childProcess.exec);

const git = async (command, option) => {
    const config = Object.assign(
        {
            // Tests will fail in CI without an identity.
            env : {
                GIT_AUTHOR_NAME     : 'Test',
                GIT_AUTHOR_EMAIL    : 'test@example.com',
                GIT_COMMITTER_NAME  : 'Test',
                GIT_COMMITTER_EMAIL : 'test@example.com'
            }
        },
        option
    );
    const { stdout } = await exec('git ' + command, config);
    return stdout.trimRight();
};

const initRepo = (cwd) => {
    return git('init --quiet', { cwd });
};

test('get()', async (t) => {
    const branch = await branchName.get();
    t.is(typeof branch, 'string');
    t.truthy(branch);
    t.true(branch.length > 0);
    t.is(branch, branch.trim().toLowerCase());
});

test('get() custom cwd', async (t) => {
    const cwd = await mkdirtemp();
    const error = await t.throws(branchName.get({ cwd }));
    t.true(error.message.trimRight().endsWith('fatal: Not a git repository (or any of the parent directories): .git'));
    await initRepo(cwd);
    await git('checkout -b foo', { cwd });
    const branch = await branchName.get({ cwd });
    t.is(branch, 'foo');
});

test('assume()', async (t) => {
    const cwd = await mkdirtemp();
    const error = await t.throws(branchName.get({ cwd }));
    t.true(error.message.trimRight().endsWith('fatal: Not a git repository (or any of the parent directories): .git'));
    const assumed = await branchName.assume('bar', { cwd });
    t.is(assumed, 'bar');
    await initRepo(cwd);
    await git('checkout -b blah', { cwd });
    const branch = await branchName.get({ cwd });
    t.is(branch, 'blah');
});

test('assumeMaster()', async (t) => {
    const cwd = await mkdirtemp();
    const error = await t.throws(branchName.get({ cwd }));
    t.true(error.message.trimRight().endsWith('fatal: Not a git repository (or any of the parent directories): .git'));
    const assumed = await branchName.assumeMaster({ cwd });
    t.is(assumed, 'master');
    await initRepo(cwd);
    await git('checkout -b weee', { cwd });
    const branch = await branchName.get({ cwd });
    t.is(branch, 'weee');
});
