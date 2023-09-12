"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRepo = exports.cloneRepo = exports.configureGithubCli = exports.githubAuthStatus = exports.githubLogin = void 0;
const chalk_1 = require("./chalk");
const cmd_1 = require("./cmd");
async function githubLogin(...args) {
    const chalk = await (0, chalk_1.importChalk)();
    if (args.length === 2) {
        console.info(`Attempting to log into github.com with user ${chalk.yellowBright(args[0])}`);
        const result = await (0, cmd_1.exec)(`echo "${args[1]}" | gh auth login --with-token`);
        return !result;
    }
    const result = await (0, cmd_1.exec)(`GITHUB_TOKEN="${args[0]}"; gh auth login -h github.com`);
    return !result;
}
exports.githubLogin = githubLogin;
async function githubAuthStatus(env) {
    const result = await (0, cmd_1.run)(`gh auth status -t`, { env });
    const usernameRegExp = /Logged in to github\.com as ([\w\d]+)/i;
    const usernameMatch = result.match(usernameRegExp);
    const username = usernameMatch?.[1];
    const protocolRegExp = /configured to use ([\w]+) protocol/i;
    const protocolMatch = result.match(protocolRegExp);
    const protocol = protocolMatch?.[1];
    const tokenRegExp = /Token: ([\w\d\*]+)/i;
    const tokenMatch = result.match(tokenRegExp);
    const token = tokenMatch?.[1];
    const scopesRegExp = /Token scopes: (.*?)$/im;
    const scopesMatch = result.match(scopesRegExp);
    const scopes = scopesMatch?.[1]?.split(",").map((s) => s.trim());
    return {
        username,
        protocol,
        token,
        scopes,
    };
}
exports.githubAuthStatus = githubAuthStatus;
async function configureGithubCli() {
    console.info(`Configuring Github Cli`);
    await (0, cmd_1.exec)(`gh config set git_protocol https -h github.com`);
    await (0, cmd_1.exec)(`gh auth setup-git`);
}
exports.configureGithubCli = configureGithubCli;
async function cloneRepo(id, path, opts) {
    await (0, cmd_1.exec)(`gh repo clone ${id} ${path ?? ""}`, { cwd: opts?.cwd });
}
exports.cloneRepo = cloneRepo;
async function createRepo(id, opts) {
    const cmd = [`gh repo create ${id}`];
    if (opts?.clone) {
        cmd.push(`--clone`);
    }
    if (opts?.description) {
        cmd.push(`--description "${opts?.description}"`);
    }
    if (opts?.disableIssues) {
        cmd.push(`--disable-issues`);
    }
    if (opts?.disableWiki) {
        cmd.push(`--disable-wiki`);
    }
    if (opts?.gitIgnore) {
        cmd.push(`--gitignore "${opts?.gitIgnore}"`);
    }
    if (opts?.homepage) {
        cmd.push(`--homepage "${opts?.homepage}"`);
    }
    if (opts?.includeAllBranches) {
        cmd.push(`--include-all-branches`);
    }
    if (opts?.internal) {
        cmd.push(`--internal`);
    }
    if (opts?.license) {
        cmd.push(`--license "${opts?.license}"`);
    }
    if (opts?.private) {
        cmd.push(`--private`);
    }
    if (opts?.public) {
        cmd.push(`--public`);
    }
    if (opts?.push) {
        cmd.push(`--push`);
    }
    if (opts?.remote) {
        cmd.push(`--remote "${opts?.remote}"`);
    }
    if (opts?.source) {
        cmd.push(`--source "${opts?.source}"`);
    }
    if (opts?.team) {
        cmd.push(`--team "${opts?.team}"`);
    }
    if (opts?.template) {
        cmd.push(`--template "${opts?.template}"`);
    }
    await (0, cmd_1.exec)(cmd.join(" "), { cwd: opts?.cwd });
}
exports.createRepo = createRepo;
/*
export async function searchRepos() {
  const a = new Octokit({auth: process.env.GITHUB_TOKEN});

  return await a.repos.listForAuthenticatedUser({type: 'all', });
}
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2dpdGh1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBc0M7QUFDdEMsK0JBQWtDO0FBK0UzQixLQUFLLFVBQVUsV0FBVyxDQUFDLEdBQUcsSUFBYztJQUNqRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUEsbUJBQVcsR0FBRSxDQUFDO0lBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQywrQ0FBK0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLFVBQUksRUFBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM1RSxPQUFPLENBQUMsTUFBTSxDQUFDO0tBQ2hCO0lBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLFVBQUksRUFBQyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQ3BGLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDakIsQ0FBQztBQVRELGtDQVNDO0FBU00sS0FBSyxVQUFVLGdCQUFnQixDQUFDLEdBQXVCO0lBQzVELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxTQUFHLEVBQUMsbUJBQW1CLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRXZELE1BQU0sY0FBYyxHQUFHLHdDQUF3QyxDQUFDO0lBQ2hFLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbkQsTUFBTSxRQUFRLEdBQUcsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEMsTUFBTSxjQUFjLEdBQUcscUNBQXFDLENBQUM7SUFDN0QsTUFBTSxh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