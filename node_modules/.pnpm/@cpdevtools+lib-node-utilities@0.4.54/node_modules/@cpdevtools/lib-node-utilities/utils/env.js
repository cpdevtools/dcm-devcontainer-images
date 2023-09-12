"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = exports.setWindowsEnv = exports.envVars = void 0;
const promises_1 = require("fs/promises");
const os_1 = __importDefault(require("os"));
const path_1 = require("path");
const cmd_1 = require("./cmd");
const homedir = os_1.default.homedir();
async function envVars(key, value) {
    if (typeof key !== "string") {
        const result = await (0, cmd_1.run)("env");
        const lines = result.split("\n").map((l) => l.trim());
        const env = {};
        lines.forEach((l) => {
            const p = l.split("=");
            env[p.shift()] = p.join("=");
        });
        return env;
    }
    else if (value === undefined) {
        const env = (await envVars());
        return env[key];
    }
    else if (value === null) {
        await deleteEnvVar(key);
    }
    else {
        await setEnvVar(key, value);
    }
}
exports.envVars = envVars;
async function deleteEnvVar(name) {
    const NAME = name.toUpperCase();
    const path = (0, path_1.join)(homedir, ".bashrc");
    const lines = (await (0, promises_1.readFile)(path, { encoding: "utf-8" })).split("\n").map((l) => l.trimEnd());
    const idx = lines.findIndex((i) => i.startsWith(`export ${NAME}=`));
    if (~idx) {
        lines.splice(idx, 1);
        delete process.env[NAME];
        await (0, promises_1.writeFile)(path, lines.join("\n"), "utf-8");
    }
}
async function setEnvVar(name, value) {
    const NAME = name.toUpperCase();
    const path = (0, path_1.join)(homedir, ".bashrc");
    const exportStr = `export ${NAME}=${value}`;
    const lines = (await (0, promises_1.readFile)(path, { encoding: "utf-8" })).split("\n").map((l) => l.trimEnd());
    const idx = lines.findIndex((i) => i.startsWith(`export ${NAME}=`));
    if (~idx) {
        lines[idx] = exportStr;
    }
    else {
        lines.push(exportStr);
    }
    process.env[name] = value;
    await (0, promises_1.writeFile)(path, lines.join("\n"), "utf-8");
}
async function setWindowsEnv(name, value) {
    try {
        if (value === null) {
            await (0, cmd_1.run)(`setx.exe ${name} ''`);
        }
        else {
            await (0, cmd_1.run)(`setx.exe ${name} "${value}"`);
        }
        process.env[name] = value ?? undefined;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}
exports.setWindowsEnv = setWindowsEnv;
function getEnv(name) {
    return process.env[name] ?? null;
}
exports.getEnv = getEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2Vudi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwwQ0FBa0Q7QUFDbEQsNENBQW9CO0FBQ3BCLCtCQUE0QjtBQUM1QiwrQkFBa0M7QUFDbEMsTUFBTSxPQUFPLEdBQUcsWUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBcUN0QixLQUFLLFVBQVUsT0FBTyxDQUFDLEdBQVksRUFBRSxLQUFxQjtJQUMvRCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsU0FBRyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN0RCxNQUFNLEdBQUcsR0FBOEIsRUFBRSxDQUFDO1FBQzFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7S0FDWjtTQUFNLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUM5QixNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sT0FBTyxFQUFFLENBQThCLENBQUM7UUFDM0QsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7U0FBTSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDekIsTUFBTSxZQUFZLENBQUMs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