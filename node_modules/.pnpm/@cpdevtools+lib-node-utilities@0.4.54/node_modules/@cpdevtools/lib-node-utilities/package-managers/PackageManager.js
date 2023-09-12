"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageManager = void 0;
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const posix_1 = __importDefault(require("path/posix"));
const utils_1 = require("../utils");
const PACKAGE_TYPES_1 = require("./impl/PACKAGE_TYPES");
class PackageManager {
    static async loadPackage(path) {
        const matches = ["package.json"];
        let fileName;
        const oPath = (path = posix_1.default.resolve(path));
        const stat = fs_1.default.statSync(path);
        if (stat.isFile()) {
            fileName = posix_1.default.basename(path);
            path = posix_1.default.dirname(path);
            if (!matches.includes(fileName)) {
                fileName = undefined;
            }
        }
        if (fileName === undefined) {
            const dir = await promises_1.default.readdir(path);
            fileName = dir.find((d) => matches.includes(d) && fs_1.default.statSync(posix_1.default.join(path, d)).isFile());
        }
        if (fileName) {
            const fileType = posix_1.default.extname(fileName);
            let data = undefined;
            if (fileType === ".json") {
                data = await (0, utils_1.readJsonFile)(posix_1.default.join(path, fileName));
            }
            if (data) {
                return this.createPackageInstance(data, path, fileName);
            }
        }
        throw new Error(`Could not find a package file at '${oPath}'`);
    }
    static createPackageInstance(data, path, fileName) {
        for (const pType of PACKAGE_TYPES_1.PACKAGE_TYPES) {
            if (pType.detect(data, path, fileName)) {
                return new pType(data, path, fileName);
            }
        }
        return new PACKAGE_TYPES_1.PACKAGE_TYPES[0](data, path, fileName);
    }
}
exports.PackageManager = PackageManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFja2FnZS1tYW5hZ2Vycy9QYWNrYWdlTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBd0I7QUFDeEIsMkRBQTZCO0FBQzdCLHVEQUE4QjtBQUU5QixvQ0FBd0M7QUFDeEMsd0RBQXFEO0FBR3JELE1BQWEsY0FBYztJQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFZO1FBQzFDLE1BQU0sT0FBTyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakMsSUFBSSxRQUE0QixDQUFDO1FBRWpDLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxHQUFHLGVBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLElBQUksR0FBRyxZQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2pCLFFBQVEsR0FBRyxlQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLElBQUksR0FBRyxlQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMvQixRQUFRLEdBQUcsU0FBUyxDQUFDO2FBQ3RCO1NBQ0Y7UUFFRCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDMUIsTUFBTSxHQUFHLEdBQUcsTUFBTSxrQkFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFNLENBQUMsUUFBUSxDQUFDLGVBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNqRztRQUNELElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxRQUFRLEdBQUcsZUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QyxJQUFJLElBQUksR0FBNEIsU0FBUyxDQUFDO1lBQzlDLElBQUksUUFBUSxLQUFLLE9BQU8sRUFBRTtnQkFDeEIsSUFBSSxHQUFHLE1BQU0sSUFBQSxvQkFBWSxFQUFDLGVBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDdEQ7WUFFRCxJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0Y7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFTyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBaUIsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7UUFDcEYsS0FBSyxNQUFNLEtBQUssSUFBSSw2QkFBYSxFQUFFO1lBQ2pDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUN0QyxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDeEM7U0FDRjtRQUNELE9BQU8sSUFBSSw2QkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNGO0FBekNELHdDQXlDQyJ9