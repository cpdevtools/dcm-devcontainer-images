"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
async function sleep(ms) {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, ms);
    });
}
exports.sleep = sleep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xlZXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvc2xlZXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sS0FBSyxVQUFVLEtBQUssQ0FBQyxFQUFVO0lBQ3BDLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMvQixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsR0FBRyxFQUFFLENBQUM7UUFDUixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFORCxzQkFNQyJ9