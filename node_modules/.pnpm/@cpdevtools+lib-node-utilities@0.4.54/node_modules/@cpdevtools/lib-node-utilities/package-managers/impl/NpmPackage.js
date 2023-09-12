"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpmPackage = void 0;
const Package_1 = require("./Package");
class NpmPackage extends Package_1.Package {
    static async detect(data, path, filename) {
        return true;
    }
    execPackageManager(cmd) {
        return this.execCmd(`npm ${cmd}`);
    }
}
exports.NpmPackage = NpmPackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnBtUGFja2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWNrYWdlLW1hbmFnZXJzL2ltcGwvTnBtUGFja2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBb0M7QUFFcEMsTUFBYSxVQUFXLFNBQVEsaUJBQU87SUFDOUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBaUIsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7UUFDMUUsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRVMsa0JBQWtCLENBQUMsR0FBVztRQUN0QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDRjtBQVJELGdDQVFDIn0=