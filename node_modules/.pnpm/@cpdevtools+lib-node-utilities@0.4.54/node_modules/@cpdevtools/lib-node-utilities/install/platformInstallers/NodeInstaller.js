"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeInstaller = void 0;
const utils_1 = require("../../utils");
const PlatformInstallerBase_1 = require("./PlatformInstallerBase");
class NodeInstaller extends PlatformInstallerBase_1.PlatformInstallerBase {
    get isInstalled() {
        return (async () => {
            try {
                const result = await (0, utils_1.run)(`npm ls -gp ${this.id}`);
                return !!result.trim();
            }
            catch { }
            return false;
        })();
    }
    async installOrUpdate() {
        await (0, utils_1.exec)(`npm install -g ${this.id}@latest`);
    }
    async update() {
        await (0, utils_1.exec)(`npm install -g ${this.id}@latest`);
    }
    async uninstall() {
        await (0, utils_1.exec)(`npm uninstall -g ${this.id}`);
    }
}
exports.NodeInstaller = NodeInstaller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9kZUluc3RhbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnN0YWxsL3BsYXRmb3JtSW5zdGFsbGVycy9Ob2RlSW5zdGFsbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUF3QztBQUN4QyxtRUFBZ0U7QUFFaEUsTUFBYSxhQUFjLFNBQVEsNkNBQXFCO0lBQ3RELElBQVcsV0FBVztRQUNwQixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDakIsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsV0FBRyxFQUFDLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtZQUFDLE1BQU0sR0FBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFDTSxLQUFLLENBQUMsZUFBZTtRQUMxQixNQUFNLElBQUEsWUFBSSxFQUFDLGtCQUFrQixJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ00sS0FBSyxDQUFDLE1BQU07UUFDakIsTUFBTSxJQUFBLFlBQUksRUFBQyxrQkFBa0IsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNNLEtBQUssQ0FBQyxTQUFTO1FBQ3BCLE1BQU0sSUFBQSxZQUFJLEVBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRjtBQW5CRCxzQ0FtQkMifQ==