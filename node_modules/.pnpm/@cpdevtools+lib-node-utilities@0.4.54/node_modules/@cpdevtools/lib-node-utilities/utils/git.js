"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitHasChanges = exports.gitStatus = exports.gitSync = exports.gitAdd = exports.gitClone = exports.gitCommit = exports.gitPush = exports.gitPull = exports.gitIsRepo = exports.setConfig = exports.getConfig = void 0;
const fs_1 = require("fs");
const simple_git_1 = require("simple-git");
const cmd_1 = require("./cmd");
async function getConfig(name) {
    const git = (0, simple_git_1.simpleGit)();
    const result = await git.getConfig(name, "global");
    return result.value;
}
exports.getConfig = getConfig;
async function setConfig(name, value) {
    const git = (0, simple_git_1.simpleGit)(".");
    const result = await git.addConfig(name, value, false, "global");
    return result;
}
exports.setConfig = setConfig;
async function gitIsRepo(path) {
    if (!(0, fs_1.existsSync)(path)) {
        return false;
    }
    const git = (0, simple_git_1.simpleGit)(path);
    const result = await git.checkIsRepo();
    return result;
}
exports.gitIsRepo = gitIsRepo;
async function gitPull(path) {
    const git = (0, simple_git_1.simpleGit)(path);
    const result = await git.pull();
    return result;
}
exports.gitPull = gitPull;
async function gitPush(path) {
    const git = (0, simple_git_1.simpleGit)(path);
    const result = await git.push();
    return result;
}
exports.gitPush = gitPush;
async function gitCommit(path, message) {
    const git = (0, simple_git_1.simpleGit)(path);
    const result = await git.commit(message, undefined);
    return result;
}
exports.gitCommit = gitCommit;
async function gitClone(path, url) {
    await (0, cmd_1.exec)(`git clone ${url}`, { cwd: path });
}
exports.gitClone = gitClone;
async function gitAdd(path) {
    const git = (0, simple_git_1.simpleGit)(path);
    const result = await git.add(".");
    return result;
}
exports.gitAdd = gitAdd;
async function gitSync(path) {
    if (await gitIsRepo(path)) {
        await gitAdd(path);
        await gitCommit(path, "Syncronizing");
        try {
            await gitPull(path);
        }
        catch { }
        await gitPush(path);
    }
}
exports.gitSync = gitSync;
async function gitStatus(path) {
    const git = (0, simple_git_1.simpleGit)(path);
    const result = await git.status();
    return result;
}
exports.gitStatus = gitStatus;
async function gitHasChanges(path) {
    const git = (0, simple_git_1.simpleGit)(path);
    const result = await git.diffSummary();
    return result.files.length > 0;
}
exports.gitHasChanges = gitHasChanges;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2dpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBZ0M7QUFDaEMsMkNBQXVDO0FBQ3ZDLCtCQUE2QjtBQUV0QixLQUFLLFVBQVUsU0FBUyxDQUFDLElBQVk7SUFDMUMsTUFBTSxHQUFHLEdBQUcsSUFBQSxzQkFBUyxHQUFFLENBQUM7SUFDeEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDdEIsQ0FBQztBQUpELDhCQUlDO0FBRU0sS0FBSyxVQUFVLFNBQVMsQ0FBQyxJQUFZLEVBQUUsS0FBYTtJQUN6RCxNQUFNLEdBQUcsR0FBRyxJQUFBLHNCQUFTLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pFLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFKRCw4QkFJQztBQUVNLEtBQUssVUFBVSxTQUFTLENBQUMsSUFBWTtJQUMxQyxJQUFJLENBQUMsSUFBQSxlQUFVLEVBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckIsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELE1BQU0sR0FBRyxHQUFHLElBQUEsc0JBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBUEQsOEJBT0M7QUFFTSxLQUFLLFVBQVUsT0FBTyxDQUFDLElBQVk7SUFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBQSxzQkFBUyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hDLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFKRCwwQkFJQztBQUVNLEtBQUssVUFBVSxPQUFPLENBQUMsSUFBWTtJQUN4QyxNQUFNLEdBQUcsR0FBRyxJQUFBLHNCQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUpELDBCQUlDO0FBRU0sS0FBSyxVQUFVLFNBQVMsQ0FBQyxJQUFZLEVBQUUsT0FBZTtJQUMzRCxNQUFNLEdBQUcsR0FBRyxJQUFBLHNCQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBSkQsOEJBSUM7QUFFTSxLQUFLLFVBQVUsUUFBUSxDQUFDLElBQVksRUFBRSxHQUFXO0lBQ3RELE1BQU0sSUFBQSxVQUFJLEVBQUMsYUFBYSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFGRCw0QkFFQztBQUVNLEtBQUssVUFBVSxNQUFNLENBQUMsSUFBWTtJQUN2QyxNQUFNLEdBQUcsR0FBRyxJQUFBLHNCQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFKRCx3QkFJQztBQUVNLEtBQUssVUFBVSxPQUFPLENBQUMsSUFBWTtJQUN4QyxJQUFJLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0QyxJQUFJO1lBQ0YsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckI7UUFBQyxNQUFNLEdBQUU7UUFDVixNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNyQjtBQUNILENBQUM7QUFURCwwQkFTQztBQUVNLEtBQUssVUFBVSxTQUFTLENBQUMsSUFBWTtJQUMxQyxNQUFNLEdBQUcsR0FBRyxJQUFBLHNCQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEMsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUpELDhCQUlDO0FBRU0sS0FBSyxVQUFVLGFBQWEsQ0FBQyxJQUFZO0lBQzlDLE1BQU0sR0FBRyxHQUFHLElBQUEsc0JBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBSkQsc0NBSUMifQ==