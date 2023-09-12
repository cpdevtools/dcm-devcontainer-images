"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlatformInstaller = void 0;
function isPlatformInstaller(obj) {
    return (typeof obj === "object" &&
        "id" in obj &&
        "isInstalled" in obj &&
        "installOrUpdate" in obj &&
        "update" in obj &&
        "uninstall" in obj &&
        typeof obj.installOrUpdate === "function" &&
        typeof obj.update === "function" &&
        typeof obj.uninstall === "function");
}
exports.isPlatformInstaller = isPlatformInstaller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxhdGZvcm1JbnN0YWxsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5zdGFsbC9wbGF0Zm9ybS9QbGF0Zm9ybUluc3RhbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFVQSxTQUFnQixtQkFBbUIsQ0FBQyxHQUFRO0lBQzFDLE9BQU8sQ0FDTCxPQUFPLEdBQUcsS0FBSyxRQUFRO1FBQ3ZCLElBQUksSUFBSSxHQUFHO1FBQ1gsYUFBYSxJQUFJLEdBQUc7UUFDcEIsaUJBQWlCLElBQUksR0FBRztRQUN4QixRQUFRLElBQUksR0FBRztRQUNmLFdBQVcsSUFBSSxHQUFHO1FBQ2xCLE9BQU8sR0FBRyxDQUFDLGVBQWUsS0FBSyxVQUFVO1FBQ3pDLE9BQU8sR0FBRyxDQUFDLE1BQU0sS0FBSyxVQUFVO1FBQ2hDLE9BQU8sR0FBRyxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQ3BDLENBQUM7QUFDSixDQUFDO0FBWkQsa0RBWUMifQ==