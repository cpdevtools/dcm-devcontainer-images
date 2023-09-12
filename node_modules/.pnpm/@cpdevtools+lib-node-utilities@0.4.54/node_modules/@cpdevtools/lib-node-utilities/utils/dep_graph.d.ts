import { DepGraph } from "dependency-graph";
export declare function depGraphToTaskOrder<T>(depGraph: DepGraph<T>): T[][];
export declare function depGraphToTaskOrderFlat<T>(depGraph: DepGraph<T>): T[];
export declare function depGraphToArray<T>(depGraph: DepGraph<T>): T[];
