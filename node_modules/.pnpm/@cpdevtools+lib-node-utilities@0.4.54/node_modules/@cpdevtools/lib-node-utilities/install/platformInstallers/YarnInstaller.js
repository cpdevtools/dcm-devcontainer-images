"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YarnInstaller = void 0;
const cmd_1 = require("../../utils/cmd");
const PlatformInstallerBase_1 = require("./PlatformInstallerBase");
class YarnInstaller extends PlatformInstallerBase_1.PlatformInstallerBase {
    get isInstalled() {
        return (async () => {
            try {
                const result = await (0, cmd_1.run)(`yarn global list --pattern ${this.id}`);
                return !!result.trim();
            }
            catch { }
            return false;
        })();
    }
    async installOrUpdate() {
        await (0, cmd_1.exec)(`yarn global add -g ${this.id}@latest`);
    }
    async update() {
        await (0, cmd_1.exec)(`yarn global add -g ${this.id}@latest`);
    }
    async uninstall() {
        await (0, cmd_1.exec)(`yarn global remove -g ${this.id}`);
    }
}
exports.YarnInstaller = YarnInstaller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWWFybkluc3RhbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnN0YWxsL3BsYXRmb3JtSW5zdGFsbGVycy9ZYXJuSW5zdGFsbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUE0QztBQUM1QyxtRUFBZ0U7QUFFaEUsTUFBYSxhQUFjLFNBQVEsNkNBQXFCO0lBQ3RELElBQVcsV0FBVztRQUNwQixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDakIsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsU0FBRyxFQUFDLDhCQUE4QixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3hCO1lBQUMsTUFBTSxHQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1AsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlO1FBQzFCLE1BQU0sSUFBQSxVQUFJLEVBQUMsc0JBQXNCLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTTtRQUNqQixNQUFNLElBQUEsVUFBSSxFQUFDLHNCQUFzQixJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sS0FBSyxDQUFDLFNBQVM7UUFDcEIsTUFBTSxJQUFBLFVBQUksRUFBQyx5QkFBeUIsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNGO0FBdEJELHNDQXNCQyJ9