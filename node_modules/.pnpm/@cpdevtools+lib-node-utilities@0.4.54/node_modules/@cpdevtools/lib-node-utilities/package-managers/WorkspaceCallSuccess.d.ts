import { WorkspaceCallResult } from "./WorkspaceCallResult";
export interface WorkspaceCallSuccess<T = any> extends WorkspaceCallResult {
    success: true;
    result: T;
}
export declare function isWorkspaceCallSuccess<T>(obj: any): obj is WorkspaceCallSuccess<T>;
