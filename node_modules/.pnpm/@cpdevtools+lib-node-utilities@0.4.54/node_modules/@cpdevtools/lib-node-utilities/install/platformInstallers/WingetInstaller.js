"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WingetInstaller = void 0;
const utils_1 = require("../../utils");
const PlatformInstallerBase_1 = require("./PlatformInstallerBase");
class WingetInstaller extends PlatformInstallerBase_1.PlatformInstallerBase {
    get isInstalled() {
        return (async () => {
            return true;
        })();
    }
    async installOrUpdate() {
        await (0, utils_1.updateOrInstallWinget)(this.id);
    }
    async update() {
        await (0, utils_1.updateWinget)(this.id);
    }
    async uninstall() {
        await (0, utils_1.uninstallWinget)(this.id);
    }
}
exports.WingetInstaller = WingetInstaller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2luZ2V0SW5zdGFsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luc3RhbGwvcGxhdGZvcm1JbnN0YWxsZXJzL1dpbmdldEluc3RhbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBbUY7QUFDbkYsbUVBQWdFO0FBRWhFLE1BQWEsZUFBZ0IsU0FBUSw2Q0FBcUI7SUFDeEQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDUCxDQUFDO0lBQ00sS0FBSyxDQUFDLGVBQWU7UUFDMUIsTUFBTSxJQUFBLDZCQUFxQixFQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ00sS0FBSyxDQUFDLE1BQU07UUFDakIsTUFBTSxJQUFBLG9CQUFZLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDTSxLQUFLLENBQUMsU0FBUztRQUNwQixNQUFNLElBQUEsdUJBQWUsRUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNGO0FBZkQsMENBZUMifQ==