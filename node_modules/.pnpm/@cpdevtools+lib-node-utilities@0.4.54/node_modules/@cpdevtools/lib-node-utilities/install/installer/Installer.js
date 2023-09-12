"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidInstaller = exports.isInstaller = void 0;
function isInstaller(obj) {
    return (typeof obj === "object" &&
        typeof obj.id === "string" &&
        typeof obj.name === "string" &&
        (typeof obj.platforms === "object" || typeof obj.platforms === "function"));
}
exports.isInstaller = isInstaller;
function isValidInstaller(obj) {
    return isInstaller(obj) && (typeof obj.platforms === "function" || Object.keys(obj.platforms).length > 0);
}
exports.isValidInstaller = isValidInstaller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zdGFsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luc3RhbGwvaW5zdGFsbGVyL0luc3RhbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFXQSxTQUFnQixXQUFXLENBQUMsR0FBUTtJQUNsQyxPQUFPLENBQ0wsT0FBTyxHQUFHLEtBQUssUUFBUTtRQUN2QixPQUFPLEdBQUcsQ0FBQyxFQUFFLEtBQUssUUFBUTtRQUMxQixPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUTtRQUM1QixDQUFDLE9BQU8sR0FBRyxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLENBQUMsU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUMzRSxDQUFDO0FBQ0osQ0FBQztBQVBELGtDQU9DO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsR0FBUTtJQUN2QyxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLFNBQVMsS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzVHLENBQUM7QUFGRCw0Q0FFQyJ9