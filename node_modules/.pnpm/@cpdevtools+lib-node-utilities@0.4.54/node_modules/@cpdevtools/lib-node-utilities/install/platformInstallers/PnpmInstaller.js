"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnpmInstaller = void 0;
const cmd_1 = require("../../utils/cmd");
const PlatformInstallerBase_1 = require("./PlatformInstallerBase");
class PnpmInstaller extends PlatformInstallerBase_1.PlatformInstallerBase {
    get isInstalled() {
        return (async () => {
            try {
                const result = await (0, cmd_1.run)(`pnpm ls -gp ${this.id}`);
                return !!result.trim();
            }
            catch { }
            return false;
        })();
    }
    async installOrUpdate() {
        await (0, cmd_1.exec)(`pnpm add -g ${this.id}@latest`);
    }
    async update() {
        await (0, cmd_1.exec)(`pnpm add -g ${this.id}@latest`);
    }
    async uninstall() {
        await (0, cmd_1.exec)(`pnpm remove -g ${this.id}`);
    }
}
exports.PnpmInstaller = PnpmInstaller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG5wbUluc3RhbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnN0YWxsL3BsYXRmb3JtSW5zdGFsbGVycy9QbnBtSW5zdGFsbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUE0QztBQUM1QyxtRUFBZ0U7QUFFaEUsTUFBYSxhQUFjLFNBQVEsNkNBQXFCO0lBQ3RELElBQVcsV0FBVztRQUNwQixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDakIsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsU0FBRyxFQUFDLGVBQWUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtZQUFDLE1BQU0sR0FBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFDTSxLQUFLLENBQUMsZUFBZTtRQUMxQixNQUFNLElBQUEsVUFBSSxFQUFDLGVBQWUsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNNLEtBQUssQ0FBQyxNQUFNO1FBQ2pCLE1BQU0sSUFBQSxVQUFJLEVBQUMsZUFBZSxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ00sS0FBSyxDQUFDLFNBQVM7UUFDcEIsTUFBTSxJQUFBLFVBQUksRUFBQyxrQkFBa0IsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGO0FBbkJELHNDQW1CQyJ9