"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFormattedYaml = exports.printAsYaml = exports.printYamlFile = exports.writeYamlFile = exports.readYamlFile = void 0;
const cli_highlight_1 = require("cli-highlight");
const promises_1 = require("fs/promises");
const yaml_1 = __importDefault(require("yaml"));
async function readYamlFile(path) {
    return yaml_1.default.parse(await (0, promises_1.readFile)(path, { encoding: "utf-8" }));
}
exports.readYamlFile = readYamlFile;
async function writeYamlFile(path, data, indent) {
    await (0, promises_1.writeFile)(path, toFormattedYaml(data, { indent }));
}
exports.writeYamlFile = writeYamlFile;
async function printYamlFile(path, opt) {
    printAsYaml(await readYamlFile(path), opt);
}
exports.printYamlFile = printYamlFile;
function printAsYaml(data, opt) {
    console.info(toFormattedYaml(data, opt));
}
exports.printAsYaml = printAsYaml;
function toFormattedYaml(data, opt = {}) {
    let yml = yaml_1.default.stringify(data, { indent: opt.indent ?? 2 });
    if (opt.cliColor) {
        yml = (0, cli_highlight_1.highlight)(yml, { language: "yaml" });
    }
    return yml;
}
exports.toFormattedYaml = toFormattedYaml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy95YW1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlEQUEwQztBQUMxQywwQ0FBa0Q7QUFDbEQsZ0RBQXdCO0FBRWpCLEtBQUssVUFBVSxZQUFZLENBQWMsSUFBWTtJQUMxRCxPQUFPLGNBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFBLG1CQUFRLEVBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRkQsb0NBRUM7QUFFTSxLQUFLLFVBQVUsYUFBYSxDQUFDLElBQVksRUFBRSxJQUFTLEVBQUUsTUFBZTtJQUMxRSxNQUFNLElBQUEsb0JBQVMsRUFBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRkQsc0NBRUM7QUFFTSxLQUFLLFVBQVUsYUFBYSxDQUFDLElBQVksRUFBRSxHQUE2QztJQUM3RixXQUFXLENBQUMsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUZELHNDQUVDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLElBQVMsRUFBRSxHQUE2QztJQUNsRixPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRkQsa0NBRUM7QUFFRCxTQUFnQixlQUFlLENBQUMsSUFBUyxFQUFFLE1BQStDLEVBQUU7SUFDMUYsSUFBSSxHQUFHLEdBQUcsY0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVELElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTtRQUNoQixHQUFHLEdBQUcsSUFBQSx5QkFBUyxFQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0tBQzVDO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBTkQsMENBTUMifQ==