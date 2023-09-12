"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForDockerInit = exports.killDockerDesktop = exports.getDockerDesktopConfigPath = exports.throwIfDockerDesktopNotRunning = exports.throwIfDockerNotRunning = exports.isDockerRunning = exports.isDockerDesktopRunning = exports.restartDockerDesktop = exports.startDockerDesktop = exports.getDockerDesktopPath = exports.dockerLogin = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const chalk_1 = require("./chalk");
const cmd_1 = require("./cmd");
const sleep_1 = require("./sleep");
const windows_1 = require("./windows");
const wsl_1 = require("./wsl");
async function dockerLogin(url, user, token) {
    const chalk = await (0, chalk_1.importChalk)();
    console.info(`Attempting to log docker into ${chalk.blueBright(url)} with user ${chalk.yellowBright(user)}`);
    const result = await (0, cmd_1.exec)(`echo "${token}" | docker login ${url} -u ${user} --password-stdin`);
    return !result;
}
exports.dockerLogin = dockerLogin;
async function getDockerDesktopPath() {
    const path = await (0, wsl_1.translateWindowsPath)("C:\\Program Files\\Docker\\Docker");
    return path;
}
exports.getDockerDesktopPath = getDockerDesktopPath;
async function startDockerDesktop() {
    try {
        const cmd = `"${await getDockerDesktopPath()}/Docker Desktop.exe" &`;
        await (0, cmd_1.exec)(cmd);
        const dockerConfigPath = await getDockerDesktopConfigPath();
        while (!(0, fs_1.existsSync)(dockerConfigPath)) {
            await (0, sleep_1.sleep)(500);
        }
    }
    catch (e) {
        throw e;
    }
}
exports.startDockerDesktop = startDockerDesktop;
async function restartDockerDesktop() {
    const chalk = await (0, chalk_1.importChalk)();
    console.info(chalk.gray("Restarting Docker Desktop..."));
    await killDockerDesktop();
    await startDockerDesktop();
    await waitForDockerInit(true);
}
exports.restartDockerDesktop = restartDockerDesktop;
async function isDockerDesktopRunning() {
    return await (0, windows_1.isApplicationRunning)("Docker Desktop.exe");
}
exports.isDockerDesktopRunning = isDockerDesktopRunning;
async function isDockerRunning() {
    try {
        await throwIfDockerNotRunning();
        return true;
    }
    catch { }
    return false;
}
exports.isDockerRunning = isDockerRunning;
async function throwIfDockerNotRunning() {
    try {
        await (0, cmd_1.run)("docker info");
    }
    catch {
        throw new Error(`Docker is not running`);
    }
}
exports.throwIfDockerNotRunning = throwIfDockerNotRunning;
async function throwIfDockerDesktopNotRunning() {
    if (!(await isDockerDesktopRunning())) {
        throw new Error(`Docker Desktop is not running`);
    }
}
exports.throwIfDockerDesktopNotRunning = throwIfDockerDesktopNotRunning;
async function getDockerDesktopConfigPath() {
    const dataPath = (await (0, wsl_1.translateWindowsPath)(await (0, wsl_1.readWindowsEnv)("appdata"))).trim();
    return (0, path_1.join)(dataPath, "Docker", "settings.json");
}
exports.getDockerDesktopConfigPath = getDockerDesktopConfigPath;
async function killDockerDesktop() {
    try {
        return await (0, cmd_1.run)('taskkill.exe /IM "Docker Desktop.exe" /F');
    }
    catch {
        return false;
    }
}
exports.killDockerDesktop = killDockerDesktop;
async function waitForDockerInit(isRestart = false) {
    await (0, sleep_1.sleep)(100);
    const chalk = await (0, chalk_1.importChalk)();
    let c = 0;
    const headerDelay = isRestart ? 8 : 4;
    while (c !== -1) {
        try {
            if (c < headerDelay) {
                c++;
            }
            else if (c === headerDelay) {
                if (isRestart) {
                    console.info();
                    console.info(chalk.yellow("********************************************************************"));
                    console.info(chalk.yellow("* Waiting for docker to restart...                                 *"));
                    console.info(chalk.yellow("*                                                                  *"));
                    console.info(chalk.yellow("* If it fails to start automatically make sure it is running       *"));
                    console.info(chalk.yellow("* and if nessisarry execute a restart from the taskbar menu.       *"));
                    console.info(chalk.yellow("*                                                                  *"));
                    console.info(chalk.yellow("* Sure is taking it's time          (╯°□°)╯︵ ┻━┻                 *"));
                    console.info(chalk.yellow("********************************************************************"));
                    console.info();
                }
                else {
                    console.info();
                    console.info(chalk.yellow("********************************************************************"));
                    console.info(chalk.yellow("* Waiting for access to docker                                     *"));
                    console.info(chalk.yellow("*                                                                  *"));
                    console.info(chalk.yellow("* Please make sure that docker desktop is running and restart      *"));
                    console.info(chalk.yellow("* the service if nessisarry                                        *"));
                    console.info(chalk.yellow("********************************************************************"));
                    console.info();
                }
                c++;
            }
            await throwIfDockerNotRunning();
            if (c >= headerDelay) {
                if (isRestart) {
                    console.info(chalk.grey("Docker is ready.                     ┬─┬ノ(º_ºノ)"));
                }
                else {
                    console.info(chalk.grey("Docker is ready."));
                }
            }
            c = -1;
        }
        catch {
            await (0, sleep_1.sleep)(3750);
        }
    }
}
exports.waitForDockerInit = waitForDockerInit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2RvY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBZ0M7QUFDaEMsK0JBQTRCO0FBQzVCLG1DQUFzQztBQUN0QywrQkFBa0M7QUFDbEMsbUNBQWdDO0FBQ2hDLHVDQUFpRDtBQUNqRCwrQkFBNkQ7QUFFdEQsS0FBSyxVQUFVLFdBQVcsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQWE7SUFDeEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFBLG1CQUFXLEdBQUUsQ0FBQztJQUNsQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdHLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxVQUFJLEVBQUMsU0FBUyxLQUFLLG9CQUFvQixHQUFHLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9GLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDakIsQ0FBQztBQUxELGtDQUtDO0FBRU0sS0FBSyxVQUFVLG9CQUFvQjtJQUN4QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsMEJBQW9CLEVBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUM3RSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFIRCxvREFHQztBQUVNLEtBQUssVUFBVSxrQkFBa0I7SUFDdEMsSUFBSTtRQUNGLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxvQkFBb0IsRUFBRSx3QkFBd0IsQ0FBQztRQUNyRSxNQUFNLElBQUEsVUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSwwQkFBMEIsRUFBRSxDQUFDO1FBQzVELE9BQU8sQ0FBQyxJQUFBLGVBQVUsRUFBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lB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