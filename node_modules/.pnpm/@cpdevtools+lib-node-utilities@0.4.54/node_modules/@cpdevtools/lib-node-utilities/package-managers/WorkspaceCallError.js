"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWorkspaceCallError = void 0;
function isWorkspaceCallError(obj) {
    return typeof obj === "object" && obj.success === false && obj.hasOwnProperty("error");
}
exports.isWorkspaceCallError = isWorkspaceCallError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ya3NwYWNlQ2FsbEVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhY2thZ2UtbWFuYWdlcnMvV29ya3NwYWNlQ2FsbEVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU9BLFNBQWdCLG9CQUFvQixDQUFJLEdBQVE7SUFDOUMsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxLQUFLLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBRkQsb0RBRUMifQ==