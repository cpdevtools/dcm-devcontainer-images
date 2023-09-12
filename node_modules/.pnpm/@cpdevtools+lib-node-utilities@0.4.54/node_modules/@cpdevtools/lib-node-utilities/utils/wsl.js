"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readWindowsEnv = exports.listWslDistributions = exports.isWslDistroInstalled = exports.updateWSL = exports.installWSLKernelUpdate = exports.installWSL = exports.isWslInstalled = exports.getWslDefaultVersion = exports.getWslVersion = exports.translateWslPath = exports.translateWindowsPath = void 0;
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const semver_1 = __importDefault(require("semver"));
const chalk_1 = require("./chalk");
const cmd_1 = require("./cmd");
const windows_1 = require("./windows");
async function translateWindowsPath(path) {
    const result = (await (0, cmd_1.run)(`wslpath -a -u "${path}"`)).trim();
    return result;
}
exports.translateWindowsPath = translateWindowsPath;
async function translateWslPath(path) {
    try {
        return (await (0, cmd_1.run)(`wslpath -a -w "${path}"`)).trim();
    }
    catch {
        return path;
    }
}
exports.translateWslPath = translateWslPath;
async function getWslVersion() {
    try {
        const result = ((await (0, cmd_1.run)(`wsl.exe --status`)) ?? "").split("\n").map((l) => l.trim());
        const kernelError = !!result.find((l) => l.includes("kernel file is not found"));
        if (kernelError) {
            return semver_1.default.parse("1.0.0");
        }
        const verStr = result
            .find((l) => l.includes("Kernel version:"))
            ?.split(":")?.[1]
            ?.trim();
        if (verStr) {
            const p = verStr.split(".").slice(0, 3);
            return semver_1.default.parse(`${p.join(".")}`, true);
        }
    }
    catch { }
    return null;
}
exports.getWslVersion = getWslVersion;
async function getWslDefaultVersion() {
    try {
        const verStr = (await (0, cmd_1.run)(`wsl.exe --status`))
            .split("\n")
            .map((l) => l.trim())
            .find((l) => l.includes("Default Version:"))
            ?.split(":")?.[1]
            ?.trim() ?? "0";
        return Number.isNaN(+verStr) ? 0 : +verStr;
    }
    catch { }
    return 0;
}
exports.getWslDefaultVersion = getWslDefaultVersion;
async function isWslInstalled() {
    return (await getWslVersion()) !== null;
}
exports.isWslInstalled = isWslInstalled;
async function installWSL() {
    if (windows_1.isWindows) {
        const p = path_1.default.join(process.env["temp"] ?? "", `installWSL.cmd`);
        await (0, promises_1.writeFile)(p, `
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
    `, { encoding: "utf-8" });
        await (0, windows_1.execAsWindowsAdmin)([p]);
        return true;
    }
    return false;
}
exports.installWSL = installWSL;
async function installWSLKernelUpdate() {
    const p = path_1.default.join(process.env["temp"] ?? "", `installWSLKernelUpdate.cmd`);
    await (0, promises_1.writeFile)(p, `
curl --ssl https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi > uwsl.msi && uwsl.msi
wsl --update
wsl --shutdown
wsl --set-default-version 2
`, { encoding: "utf-8" });
    await (0, windows_1.execAsWindowsAdmin)([p]);
}
exports.installWSLKernelUpdate = installWSLKernelUpdate;
async function updateWSL() {
    const chalk = await (0, chalk_1.importChalk)();
    if (windows_1.isWindows) {
        console.info(chalk.gray(`Updating wsl...`));
        await (0, windows_1.execAsWindowsAdmin)([`wsl`, `--update`]);
        console.info(chalk.gray(`Restarting wsl...`));
        await (0, windows_1.execAsWindowsAdmin)([`wsl`, `--shutdown`]);
    }
}
exports.updateWSL = updateWSL;
async function isWslDistroInstalled(name) {
    return (await listWslDistributions()).includes(name);
}
exports.isWslDistroInstalled = isWslDistroInstalled;
async function listWslDistributions() {
    try {
        return (await (0, cmd_1.run)("wsl.exe --list"))
            .split("\n")
            .slice(1)
            .map((l) => {
            let r = l.trim();
            if (r.toLowerCase().endsWith(" (default)")) {
                r = r.slice(0, -10).trim();
            }
            return r;
        })
            .filter((l) => !!l);
    }
    catch { }
    return [];
}
exports.listWslDistributions = listWslDistributions;
async function readWindowsEnv(name) {
    return cleanValue(await (0, cmd_1.run)(`cmd.exe /c echo %${name}%`)).trim();
}
exports.readWindowsEnv = readWindowsEnv;
function cleanValue(val) {
    val = val.trim().split("\n").pop()?.trim() ?? "";
    if ((val.startsWith(`'`) && val.endsWith(`'`)) || (val.startsWith(`"`) && val.endsWith(`"`))) {
        return val.slice(1, -1);
    }
    return val;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3NsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3dzbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwwQ0FBd0M7QUFDeEMsZ0RBQXdCO0FBQ3hCLG9EQUE0QjtBQUM1QixtQ0FBc0M7QUFDdEMsK0JBQTRCO0FBQzVCLHVDQUFtRTtBQUU1RCxLQUFLLFVBQVUsb0JBQW9CLENBQUMsSUFBWTtJQUNyRCxNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQU0sSUFBQSxTQUFHLEVBQUMsa0JBQWtCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3RCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBSEQsb0RBR0M7QUFDTSxLQUFLLFVBQVUsZ0JBQWdCLENBQUMsSUFBWTtJQUNqRCxJQUFJO1FBQ0YsT0FBTyxDQUFDLE1BQU0sSUFBQSxTQUFHLEVBQUMsa0JBQWtCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN0RDtJQUFDLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQztBQU5ELDRDQU1DO0FBRU0sS0FBSyxVQUFVLGFBQWE7SUFDakMsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUEsU0FBRyxFQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV4RixNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7UUFDakYsSUFBSSxXQUFXLEVBQUU7WUFDZixPQUFP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