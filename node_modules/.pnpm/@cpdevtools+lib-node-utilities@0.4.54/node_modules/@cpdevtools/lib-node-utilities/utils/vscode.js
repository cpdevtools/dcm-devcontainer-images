"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.killVsCode = exports.uninstallVSCodeExtension = exports.installVSCodeExtension = exports.launchVSCodeDevContainer = exports.launchContainerUrl = exports.getContainerLaunchUrl = exports.launchVSCode = void 0;
const path_1 = require("path");
const child_process_1 = require("child_process");
const posix_1 = __importDefault(require("path/posix"));
const cmd_1 = require("./cmd");
const wsl_1 = require("./wsl");
const is_wsl_1 = __importDefault(require("is-wsl"));
function launchVSCode(path = ".") {
    (0, child_process_1.spawn)(`code ${path}`, { shell: true, detached: true, stdio: "ignore" });
}
exports.launchVSCode = launchVSCode;
async function getContainerLaunchUrl(containerPath, workspace) {
    const hexPath = Buffer.from(await (0, wsl_1.translateWslPath)(containerPath)).toString("hex");
    return `vscode-remote://dev-container+${posix_1.default.join(hexPath, workspace ?? "")}`;
}
exports.getContainerLaunchUrl = getContainerLaunchUrl;
function launchContainerUrl(launchUrl) {
    const isWS = launchUrl.endsWith(".code-workspace");
    const flag = isWS ? "file-uri" : "folder-uri";
    const cmd = `code --${flag} "${launchUrl}"`;
    (0, child_process_1.spawn)(cmd, { shell: true, detached: true, stdio: "ignore" });
}
exports.launchContainerUrl = launchContainerUrl;
async function launchVSCodeDevContainer(containerPath = ".", open) {
    const isWS = (0, path_1.extname)(open ?? "") === ".code-workspace";
    const flag = isWS ? "file-uri" : "folder-uri";
    const hexPath = Buffer.from(await (0, wsl_1.translateWslPath)(containerPath)).toString("hex");
    let uri = `vscode-remote://dev-container+${hexPath}/${open ?? ""}`;
    const cmd = `code --${flag} "${uri}"`;
    (0, child_process_1.spawn)(cmd, { shell: true, detached: true, stdio: "ignore" });
}
exports.launchVSCodeDevContainer = launchVSCodeDevContainer;
async function installVSCodeExtension(idOrPath, options) {
    const cmd = is_wsl_1.default ? "cd /mnt/c/ && cmd.exe /c code" : "code";
    const command = `${cmd} --install-extension ${idOrPath} ${options?.preRelease ? "--pre-release" : ""} ${options?.force ? "--force" : ""}`;
    await (0, cmd_1.exec)(command);
}
exports.installVSCodeExtension = installVSCodeExtension;
async function uninstallVSCodeExtension(id) {
    const command = `code --uninstall-extension ${id} `;
    await (0, cmd_1.exec)(command);
}
exports.uninstallVSCodeExtension = uninstallVSCodeExtension;
async function killVsCode() {
    try {
        return await (0, cmd_1.run)('taskkill.exe /IM "Code.exe" /F');
    }
    catch {
        return false;
    }
}
exports.killVsCode = killVsCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnNjb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3ZzY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrQkFBK0I7QUFFL0IsaURBQXNDO0FBQ3RDLHVEQUE4QjtBQUM5QiwrQkFBa0M7QUFDbEMsK0JBQXlDO0FBQ3pDLG9EQUEyQjtBQUUzQixTQUFnQixZQUFZLENBQUMsT0FBZSxHQUFHO0lBQzdDLElBQUEscUJBQUssRUFBQyxRQUFRLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFGRCxvQ0FFQztBQUVNLEtBQUssVUFBVSxxQkFBcUIsQ0FBQyxhQUFxQixFQUFFLFNBQWtCO0lBQ25GLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFBLHNCQUFnQixFQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25GLE9BQU8saUNBQWlDLGVBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ2hGLENBQUM7QUFIRCxzREFHQztBQUVELFNBQWdCLGtCQUFrQixDQUFDLFNBQWlCO0lBQ2xELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNuRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQzlDLE1BQU0sR0FBRyxHQUFHLFVBQVUsSUFBSSxLQUFLLFNBQVMsR0FBRyxDQUFDO0lBQzVDLElBQUEscUJBQUssRUFBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUxELGdEQUtDO0FBRU0sS0FBSyxVQUFVLHdCQUF3QixDQUFDLGdCQUF3QixHQUFHLEVBQUUsSUFBYTtJQUN2RixNQUFNLElBQUksR0FBRyxJQUFBLGNBQU8sRUFBQyxJQUFJLElBQUksRUFBRSxDQUFDLEtBQUssaUJBQWlCLENBQUM7SUFDdkQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUM5QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBQSxzQkFBZ0IsRUFBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRixJQUFJLEdBQUcsR0FBRyxpQ0FBaUMsT0FBTyxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztJQUNuRSxNQUFNLEdBQUcsR0FBRyxVQUFVLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUN0QyxJQUFBLHFCQUFLLEVBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFQRCw0REFPQztBQUVNLEtBQUssVUFBVSxzQkFBc0IsQ0FBQyxRQUFnQixFQUFFLE9BQW1EO0lBQ2hILE1BQU0sR0FBRyxHQUFHLGdCQUFLLENBQUMsQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDN0QsTUFBTSxPQUFPLEdBQUcsR0FBRyxHQUFHLHdCQUF3QixRQUFRLElBQUksT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUMxSSxNQUFNLElBQUEsVUFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFKRCx3REFJQztBQUVNLEtBQUssVUFBVSx3QkFBd0IsQ0FBQyxFQUFVO0lBQ3ZELE1BQU0sT0FBTyxHQUFHLDhCQUE4QixFQUFFLEdBQUcsQ0FBQztJQUNwRCxNQUFNLElBQUEsVUFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFIRCw0REFHQztBQUVNLEtBQUssVUFBVSxVQUFVO0lBQzlCLElBQUk7UUFDRixPQUFPLE1BQU0sSUFBQSxTQUFHLEVBQUMsZ0NBQWdDLENBQUMsQ0FBQztLQUNwRDtJQUFDLE1BQU07UUFDTixPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQztBQU5ELGdDQU1DIn0=