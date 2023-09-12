"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importInquirerSelect = exports.importInquirer = void 0;
const tsimportlib_1 = require("tsimportlib");
async function importInquirer() {
    return (await (0, tsimportlib_1.dynamicImport)("inquirer", module))?.default;
}
exports.importInquirer = importInquirer;
async function importInquirerSelect() {
    return (await (0, tsimportlib_1.dynamicImport)("@inquirer/select", module))?.default;
}
exports.importInquirerSelect = importInquirerSelect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5xdWlyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5xdWlyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNkNBQTRDO0FBRXJDLEtBQUssVUFBVSxjQUFjO0lBQ2xDLE9BQU8sQ0FBQyxNQUFNLElBQUEsMkJBQWEsRUFBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUM7QUFDNUQsQ0FBQztBQUZELHdDQUVDO0FBRU0sS0FBSyxVQUFVLG9CQUFvQjtJQUN4QyxPQUFPLENBQUMsTUFBTSxJQUFBLDJCQUFhLEVBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUM7QUFDcEUsQ0FBQztBQUZELG9EQUVDIn0=