"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAsWindowsAdmin = exports.execAsWindowsAdmin = exports.isApplicationRunning = exports.removeRunOnceAfterRestart = exports.runOnceAfterRestart = exports.isWin11 = exports.isWin10 = exports.windowsVersion = exports.windowsVer = exports.isWindows = exports.locateInstallationPath = exports.loadAppxPackage = exports.loadAppxPackages = void 0;
const os_1 = __importDefault(require("os"));
const semver_1 = __importDefault(require("semver"));
const cmd_1 = require("./cmd");
const wsl_1 = require("./wsl");
async function loadAppxPackages() {
    const result = await (0, cmd_1.run)(`powershell.exe Get-AppxPackage"`);
    return result
        .split("\n\n")
        .map((appStr) => appStr.trim().split("\n"))
        .map((lines) => {
        const result = {};
        lines.forEach((line) => {
            const p = line.split(":", 2);
            result[p[0].trim()] = p[1].trim();
        });
        return result;
    });
}
exports.loadAppxPackages = loadAppxPackages;
async function loadAppxPackage(appxPackageName) {
    const packages = await loadAppxPackages();
    return packages.find((p) => p.Name === "appxPackageName");
}
exports.loadAppxPackage = loadAppxPackage;
async function locateInstallationPath(appxPackageName) {
    const pkg = await loadAppxPackage(appxPackageName);
    return pkg?.InstallLocation ? (0, wsl_1.translateWindowsPath)(pkg?.InstallLocation) : undefined;
}
exports.locateInstallationPath = locateInstallationPath;
exports.isWindows = os_1.default.platform() === "win32";
exports.windowsVer = exports.isWindows ? os_1.default.release() : null;
exports.windowsVersion = exports.isWindows ? semver_1.default.parse(exports.windowsVer) : null;
exports.isWin10 = !exports.isWindows ? false : exports.windowsVersion?.major === 10 && exports.windowsVersion?.patch !== 22000;
exports.isWin11 = !exports.isWindows ? false : exports.windowsVersion?.major === 10 && exports.windowsVersion?.patch === 22000;
async function runOnceAfterRestart(id, script) {
    await (0, cmd_1.run)(`reg.exe add "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce" /v "${id}" /d "${script}" /f`);
}
exports.runOnceAfterRestart = runOnceAfterRestart;
async function removeRunOnceAfterRestart(id) {
    await (0, cmd_1.run)(`reg.exe delete "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce" /v "${id}" /f`);
}
exports.removeRunOnceAfterRestart = removeRunOnceAfterRestart;
async function isApplicationRunning(name) {
    try {
        await (0, cmd_1.run)(`tasklist.exe /fi "ImageName eq ${name}" | find /I "${name}"`);
        return true;
    }
    catch { }
    return false;
}
exports.isApplicationRunning = isApplicationRunning;
async function execAsWindowsAdmin(cmd, opts = {}) {
    return await (0, cmd_1.exec)(`powershell.exe Start-Process cmd.exe -Wait -Verb runAs -ArgumentList @('/c', '${cmd.join(`', '`)}')`, opts);
}
exports.execAsWindowsAdmin = execAsWindowsAdmin;
async function runAsWindowsAdmin(cmd, opts = {}) {
    return await (0, cmd_1.run)(`powershell.exe Start-Process cmd.exe -Wait -Verb runAs -ArgumentList @('/c', '${cmd.join(`', '`)}')`, opts);
}
exports.runAsWindowsAdmin = runAsWindowsAdmin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy93aW5kb3dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRDQUFvQjtBQUNwQixvREFBNEI7QUFDNUIsK0JBQWtDO0FBQ2xDLCtCQUE2QztBQXNCdEMsS0FBSyxVQUFVLGdCQUFnQjtJQUNwQyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsU0FBRyxFQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDNUQsT0FBTyxNQUFNO1NBQ1YsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNiLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNiLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWJELDRDQWFDO0FBRU0sS0FBSyxVQUFVLGVBQWUsQ0FBQyxlQUF1QjtJQUMzRCxNQUFNLFFBQVEsR0FBRyxNQUFNLGdCQUFnQixFQUFFLENBQUM7SUFDMUMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUhELDBDQUdDO0FBRU0sS0FBSyxVQUFVLHNCQUFzQixDQUFDLGVBQXVCO0lBQ2xFLE1BQU0sR0FBRyxHQUFHLE1BQU0sZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25ELE9BQU8sR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBQSwwQkFBb0IsRUFBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUN2RixDQUFDO0FBSEQsd0RBR0M7QUFFWSxRQUFBLFNBQVMsR0FBRyxZQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssT0FBTyxDQUFDO0FBQ3RDLFFBQUEsVUFBVSxHQUFHLGlCQUFTLENBQUMsQ0FBQyxDQUFDLFlBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzdDLFFBQUEsY0FBYyxHQUFHLGlCQUFTLENBQUMsQ0FBQyxDQUFDLGdCQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBRTdELFFBQUEsT0FBTyxHQUFHLENBQUMsaUJBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxzQkFBYyxFQUFFLEtBQUssS0FBSyxFQUFFLElBQUksc0JBQWMsRUFBRSxLQUFLLEtBQUssS0FBSyxDQUFDO0FBQy9GLFFBQUEsT0FBTyxHQUFHLENBQUMsaUJBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxzQkFBYyxFQUFFLEtBQUssS0FBSyxFQUFFLElBQUksc0JBQWMsRUFBRSxLQUFLLEtBQUssS0FBSyxDQUFDO0FBRXJHLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxFQUFVLEVBQUUsTUFBYztJQUNsRSxNQUFNLElBQUEsU0FBRyxFQUFDLDhGQUE4RixFQUFFLFNBQVMsTUFBTSxNQUFNLENBQUMsQ0FBQztBQUNuSSxDQUFDO0FBRkQsa0RBRUM7QUFFTSxLQUFLLFVBQVUseUJBQXlCLENBQUMsRUFBVTtJQUN4RCxNQUFNLElBQUEsU0FBRyxFQUFDLGlHQUFpRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZILENBQUM7QUFGRCw4REFFQztBQUVNLEtBQUssVUFBVSxvQkFBb0IsQ0FBQyxJQUFZO0lBQ3JELElBQUk7UUFDRixNQUFNLElBQUEsU0FBRyxFQUFDLGtDQUFrQyxJQUFJLGdCQUFnQixJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFBQyxNQUFNLEdBQUU7SUFDVixPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFORCxvREFNQztBQUVNLEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxHQUFhLEVBQUUsT0FBeUIsRUFBRTtJQUNqRixPQUFPLE1BQU0sSUFBQSxVQUFJLEVBQUMsaUZBQWlGLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqSSxDQUFDO0FBRkQsZ0RBRUM7QUFFTSxLQUFLLFVBQVUsaUJBQWlCLENBQUMsR0FBYSxFQUFFLE9BQXlCLEVBQUU7SUFDaEYsT0FBTyxNQUFNLElBQUEsU0FBRyxFQUFDLGlGQUFpRixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEksQ0FBQztBQUZELDhDQUVDIn0=