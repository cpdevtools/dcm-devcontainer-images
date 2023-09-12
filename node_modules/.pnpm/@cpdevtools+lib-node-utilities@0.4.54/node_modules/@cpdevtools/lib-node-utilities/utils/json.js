"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJsonFile = exports.readJsonFile = void 0;
const promises_1 = require("fs/promises");
async function readJsonFile(path) {
    return JSON.parse(await (0, promises_1.readFile)(path, { encoding: "utf-8" }));
}
exports.readJsonFile = readJsonFile;
async function writeJsonFile(path, data, indent) {
    await (0, promises_1.writeFile)(path, JSON.stringify(data, undefined, indent));
}
exports.writeJsonFile = writeJsonFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9qc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUFrRDtBQUUzQyxLQUFLLFVBQVUsWUFBWSxDQUFjLElBQVk7SUFDMUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBQSxtQkFBUSxFQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQztBQUZELG9DQUVDO0FBRU0sS0FBSyxVQUFVLGFBQWEsQ0FBQyxJQUFZLEVBQUUsSUFBUyxFQUFFLE1BQWU7SUFDMUUsTUFBTSxJQUFBLG9CQUFTLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFGRCxzQ0FFQyJ9