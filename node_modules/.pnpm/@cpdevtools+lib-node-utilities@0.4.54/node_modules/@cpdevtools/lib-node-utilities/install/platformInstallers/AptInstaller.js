"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AptInstaller = void 0;
const cmd_1 = require("../../utils/cmd");
const PlatformInstallerBase_1 = require("./PlatformInstallerBase");
class AptInstaller extends PlatformInstallerBase_1.PlatformInstallerBase {
    get isInstalled() {
        return (async () => {
            try {
                await (0, cmd_1.run)(`apt show ${this.id}`);
                return true;
            }
            catch {
                return false;
            }
        })();
    }
    async installOrUpdate() {
        await (0, cmd_1.exec)(`sudo apt install -y ${this.id}`);
    }
    async update() {
        await (0, cmd_1.exec)(`sudo apt install -y ${this.id}`);
    }
    async uninstall() {
        await (0, cmd_1.exec)(`sudo apt -y autoremove ${this.id}`);
    }
}
exports.AptInstaller = AptInstaller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXB0SW5zdGFsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luc3RhbGwvcGxhdGZvcm1JbnN0YWxsZXJzL0FwdEluc3RhbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBNEM7QUFDNUMsbUVBQWdFO0FBRWhFLE1BQWEsWUFBYSxTQUFRLDZDQUFxQjtJQUNyRCxJQUFXLFdBQVc7UUFDcEIsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2pCLElBQUk7Z0JBQ0YsTUFBTSxJQUFBLFNBQUcsRUFBQyxZQUFZLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLElBQUksQ0FBQzthQUNiO1lBQUMsTUFBTTtnQkFDTixPQUFPLEtBQUssQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFDTSxLQUFLLENBQUMsZUFBZTtRQUMxQixNQUFNLElBQUEsVUFBSSxFQUFDLHVCQUF1QixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ00sS0FBSyxDQUFDLE1BQU07UUFDakIsTUFBTSxJQUFBLFVBQUksRUFBQyx1QkFBdUIsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNNLEtBQUssQ0FBQyxTQUFTO1FBQ3BCLE1BQU0sSUFBQSxVQUFJLEVBQUMsMEJBQTBCLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDRjtBQXBCRCxvQ0FvQkMifQ==