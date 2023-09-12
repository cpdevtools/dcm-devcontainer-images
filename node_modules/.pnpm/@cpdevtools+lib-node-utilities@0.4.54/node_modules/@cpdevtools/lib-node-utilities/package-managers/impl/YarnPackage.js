"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YarnPackage = void 0;
const Package_1 = require("./Package");
class YarnPackage extends Package_1.Package {
    static async detect(data, path, filename) {
        return true;
    }
    execPackageManager(cmd) {
        return this.execCmd(`yarn ${cmd}`);
    }
}
exports.YarnPackage = YarnPackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWWFyblBhY2thZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFja2FnZS1tYW5hZ2Vycy9pbXBsL1lhcm5QYWNrYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFvQztBQUVwQyxNQUFhLFdBQVksU0FBUSxpQkFBTztJQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFpQixFQUFFLElBQVksRUFBRSxRQUFnQjtRQUMxRSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFUyxrQkFBa0IsQ0FBQyxHQUFXO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNGO0FBUkQsa0NBUUMifQ==