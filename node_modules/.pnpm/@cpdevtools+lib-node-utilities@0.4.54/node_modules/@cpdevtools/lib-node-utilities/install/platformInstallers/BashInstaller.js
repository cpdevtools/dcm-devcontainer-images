"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BashInstaller = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const utils_1 = require("../../utils");
const PlatformInstallerBase_1 = require("./PlatformInstallerBase");
class BashInstaller extends PlatformInstallerBase_1.PlatformInstallerBase {
    get isInstalled() {
        return (async () => {
            return true;
        })();
    }
    async installOrUpdate() {
        await this.execScript(this.installOrUpdateScript);
    }
    async update() {
        await this.execScript(this.updateScript);
    }
    async uninstall() {
        await this.execScript(this.uninstallScript);
    }
    async execScript(script, cwd) {
        const p = path_1.default.join(__dirname, "__exec_script.sh");
        try {
            if ((0, fs_1.existsSync)(p)) {
                await (0, promises_1.rm)(p, { force: true });
            }
            await (0, promises_1.writeFile)(p, script, { encoding: "utf-8" });
            await (0, utils_1.exec)(`chmod +x ${p}`);
            await (0, utils_1.exec)(p, { cwd });
        }
        finally {
            if ((0, fs_1.existsSync)(p)) {
                await (0, promises_1.rm)(p, { force: true });
            }
        }
    }
}
exports.BashInstaller = BashInstaller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaEluc3RhbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnN0YWxsL3BsYXRmb3JtSW5zdGFsbGVycy9CYXNoSW5zdGFsbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUFnQztBQUNoQywwQ0FBbUQ7QUFDbkQsZ0RBQXdCO0FBQ3hCLHVDQUFtQztBQUNuQyxtRUFBZ0U7QUFFaEUsTUFBc0IsYUFBYyxTQUFRLDZDQUFxQjtJQUMvRCxJQUFXLFdBQVc7UUFDcEIsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFDTSxLQUFLLENBQUMsZUFBZTtRQUMxQixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNNLEtBQUssQ0FBQyxNQUFNO1FBQ2pCLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNNLEtBQUssQ0FBQyxTQUFTO1FBQ3BCLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQU1PLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBYyxFQUFFLEdBQVk7UUFDbkQsTUFBTSxDQUFDLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxJQUFJO1lBQ0YsSUFBSSxJQUFBLGVBQVUsRUFBQyxDQUFDLENBQUMsRUFBRTtnQkFDakIsTUFBTSxJQUFBLGFBQUUsRUFBQyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUM5QjtZQUNELE1BQU0sSUFBQSxvQkFBUyxFQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNsRCxNQUFNLElBQUEsWUFBSSxFQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QixNQUFNLElBQUEsWUFBSSxFQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDeEI7Z0JBQVM7WUFDUixJQUFJLElBQUEsZUFBVSxFQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNqQixNQUFNLElBQUEsYUFBRSxFQUFDLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7QUFuQ0Qsc0NBbUNDIn0=