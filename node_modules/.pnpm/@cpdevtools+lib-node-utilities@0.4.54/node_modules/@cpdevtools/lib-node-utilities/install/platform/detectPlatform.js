"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPlatform = void 0;
const is_wsl_1 = __importDefault(require("is-wsl"));
const os_1 = __importDefault(require("os"));
const Platform_1 = require("./Platform");
function detectPlatform() {
    if (is_wsl_1.default) {
        return Platform_1.Platform.WSL;
    }
    /*if (isDocker()) {
      return Platform.UNKNOWN;
    }*/
    if (os_1.default.platform() === "linux") {
        return Platform_1.Platform.LINUX;
    }
    return Platform_1.Platform.UNKNOWN;
}
exports.detectPlatform = detectPlatform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0ZWN0UGxhdGZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5zdGFsbC9wbGF0Zm9ybS9kZXRlY3RQbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvREFBMkI7QUFDM0IsNENBQW9CO0FBQ3BCLHlDQUFzQztBQUV0QyxTQUFnQixjQUFjO0lBQzVCLElBQUksZ0JBQUssRUFBRTtRQUNULE9BQU8sbUJBQVEsQ0FBQyxHQUFHLENBQUM7S0FDckI7SUFDRDs7T0FFRztJQUNILElBQUksWUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLE9BQU8sRUFBRTtRQUM3QixPQUFPLG1CQUFRLENBQUMsS0FBSyxDQUFDO0tBQ3ZCO0lBQ0QsT0FBTyxtQkFBUSxDQUFDLE9BQU8sQ0FBQztBQUMxQixDQUFDO0FBWEQsd0NBV0MifQ==