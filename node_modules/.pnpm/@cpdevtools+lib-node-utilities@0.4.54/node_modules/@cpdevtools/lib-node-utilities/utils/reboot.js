"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rebootWindows = void 0;
const process_1 = require("process");
const cmd_1 = require("./cmd");
const inquirer_1 = require("./inquirer");
async function reboot() {
    await (0, cmd_1.exec)(`shutdown.exe -r -t 0`);
    (0, process_1.exit)(0);
}
async function rebootWindows(prompt = false) {
    if (!prompt) {
        await reboot();
    }
    const inquirer = await (0, inquirer_1.importInquirer)();
    const answer = await inquirer.prompt({
        type: "confirm",
        name: "rebootNow",
        message: "Reboot Now?",
    });
    if (answer.rebootNow) {
        await reboot();
    }
}
exports.rebootWindows = rebootWindows;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVib290LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JlYm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBK0I7QUFDL0IsK0JBQTZCO0FBQzdCLHlDQUE0QztBQUU1QyxLQUFLLFVBQVUsTUFBTTtJQUNuQixNQUFNLElBQUEsVUFBSSxFQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDbkMsSUFBQSxjQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDVixDQUFDO0FBS00sS0FBSyxVQUFVLGFBQWEsQ0FBQyxTQUFrQixLQUFLO0lBQ3pELElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLE1BQU0sRUFBRSxDQUFDO0tBQ2hCO0lBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLHlCQUFjLEdBQUUsQ0FBQztJQUN4QyxNQUFNLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUsV0FBVztRQUNqQixPQUFPLEVBQUUsYUFBYTtLQUN2QixDQUFDLENBQUM7SUFFSCxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDcEIsTUFBTSxNQUFNLEVBQUUsQ0FBQztLQUNoQjtBQUNILENBQUM7QUFkRCxzQ0FjQyJ9