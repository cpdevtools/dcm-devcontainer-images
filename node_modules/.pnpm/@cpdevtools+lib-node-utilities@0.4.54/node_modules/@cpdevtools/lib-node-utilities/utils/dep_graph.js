"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depGraphToArray = exports.depGraphToTaskOrderFlat = exports.depGraphToTaskOrder = void 0;
function depGraphToTaskOrder(depGraph) {
    const taskOrder = [];
    let depIds = depGraph.overallOrder(true);
    while (depIds?.length) {
        taskOrder.push(depIds.map((i) => depGraph.getNodeData(i)));
        depIds.forEach((i) => depGraph.removeNode(i));
        depIds = depGraph.overallOrder(true);
    }
    return taskOrder;
}
exports.depGraphToTaskOrder = depGraphToTaskOrder;
function depGraphToTaskOrderFlat(depGraph) {
    return depGraphToTaskOrder(depGraph).flat();
}
exports.depGraphToTaskOrderFlat = depGraphToTaskOrderFlat;
function depGraphToArray(depGraph) {
    return depGraph.overallOrder().map((i) => depGraph.getNodeData(i));
}
exports.depGraphToArray = depGraphToArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwX2dyYXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2RlcF9ncmFwaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFnQixtQkFBbUIsQ0FBSSxRQUFxQjtJQUMxRCxNQUFNLFNBQVMsR0FBVSxFQUFFLENBQUM7SUFDNUIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxPQUFPLE1BQU0sRUFBRSxNQUFNLEVBQUU7UUFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBTSxDQUFDLENBQUMsQ0FBQztRQUNoRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEM7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBVEQsa0RBU0M7QUFFRCxTQUFnQix1QkFBdUIsQ0FBSSxRQUFxQjtJQUM5RCxPQUFPLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzlDLENBQUM7QUFGRCwwREFFQztBQUVELFNBQWdCLGVBQWUsQ0FBSSxRQUFxQjtJQUN0RCxPQUFPLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFNLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBRkQsMENBRUMifQ==