"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrInstallWinget = exports.updateWinget = exports.uninstallWinget = exports.installWinget = exports.isValidInstallFile = exports.wingetInfo = exports.isInstalledWsl = void 0;
const fs_1 = require("fs");
const sha256_file_1 = __importDefault(require("sha256-file"));
const yaml_1 = __importDefault(require("yaml"));
const chalk_1 = require("./chalk");
const cmd_1 = require("./cmd");
async function isInstalledWsl(id) {
    try {
        await (0, cmd_1.run)(`winget.exe list -e --id ${id}`);
        return true;
    }
    catch (e) {
        if (e.code === 20) {
            return false;
        }
        throw e;
    }
}
exports.isInstalledWsl = isInstalledWsl;
async function wingetInfo(id) {
    let result = await (0, cmd_1.run)(`winget.exe show -e --id ${id}`);
    result = result.slice(result.indexOf("Version:"));
    const raw = yaml_1.default.parse(result);
    return {
        id,
        author: raw.Author,
        copyright: raw.Copyright,
        description: raw.Description,
        homepage: raw.Homepage,
        license: raw.License,
        moniker: raw.Moniker,
        publisher: raw.Publisher,
        publisherSupportUrl: raw["Publisher Support Url"],
        publisherUrl: raw["Publisher Url"],
        version: raw.Version,
        installer: {
            downloadUrl: raw.Installer["Download Url"],
            locale: raw.Installer.Locale,
            releaseDate: raw.Installer["Release Date"],
            SHA256: raw.Installer.SHA256,
            type: raw.Installer.Type,
        },
    };
}
exports.wingetInfo = wingetInfo;
async function isValidInstallFile(filepath, id) {
    if ((0, fs_1.existsSync)(filepath)) {
        const [info, sha] = await Promise.all([
            wingetInfo(id),
            new Promise((res, rej) => (0, sha256_file_1.default)(filepath, (error, check) => (error ? rej(error) : res(check)))),
        ]);
        return info.installer.SHA256 === sha;
    }
    return false;
}
exports.isValidInstallFile = isValidInstallFile;
async function installWinget(id) {
    const chalk = await (0, chalk_1.importChalk)();
    console.info(chalk.greenBright(`${chalk.cyanBright(id)}: Installing...`));
    console.info();
    const result = await (0, cmd_1.exec)(`winget.exe install -e --id ${id}`);
    console.info();
    console.info();
    return result;
}
exports.installWinget = installWinget;
async function uninstallWinget(id) {
    const chalk = await (0, chalk_1.importChalk)();
    console.info(chalk.greenBright(`${chalk.cyanBright(id)}: Uninstalling...`));
    console.info();
    const result = await (0, cmd_1.exec)(`winget.exe uninstall -e --id ${id}`);
    console.info();
    console.info();
    return result;
}
exports.uninstallWinget = uninstallWinget;
async function updateWinget(id, args) {
    const chalk = await (0, chalk_1.importChalk)();
    console.info(chalk.blueBright(`${chalk.cyanBright(id)}: Checking for updates...`));
    console.info();
    const result = await (0, cmd_1.exec)(`winget.exe upgrade -he --verbose-logs --id ${id}${args ? " " + args : ""}`);
    console.info();
    console.info();
    return result;
}
exports.updateWinget = updateWinget;
async function updateOrInstallWinget(id) {
    if (await isInstalledWsl(id)) {
        return await updateWinget(id);
    }
    return await installWinget(id);
}
exports.updateOrInstallWinget = updateOrInstallWinget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3dpbmdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyQkFBZ0M7QUFDaEMsOERBQXFDO0FBQ3JDLGdEQUF3QjtBQUN4QixtQ0FBc0M7QUFDdEMsK0JBQWtDO0FBVzNCLEtBQUssVUFBVSxjQUFjLENBQUMsRUFBVTtJQUM3QyxJQUFJO1FBQ0YsTUFBTSxJQUFBLFNBQUcsRUFBQywyQkFBMkIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQyxPQUFPLElBQUksQ0FBQztLQUNiO0lBQUMsT0FBTyxDQUFNLEVBQUU7UUFDZixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxNQUFNLENBQUMsQ0FBQztLQUNUO0FBQ0gsQ0FBQztBQVZELHdDQVVDO0FBNkNNLEtBQUssVUFBVSxVQUFVLENBQUMsRUFBVTtJQUN6QyxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUEsU0FBRyxFQUFDLDJCQUEyQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNsRCxNQUFNLEdBQUcsR0FBRyxjQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBa0IsQ0FBQztJQUNoRCxPQUFPO1FBQ0wsRUFBRTtRQUNGLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtRQUNsQixTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVM7UUFDeEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1FBQzVCLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtRQUN0QixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87UUFDcEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1FBQ3BCLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FB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