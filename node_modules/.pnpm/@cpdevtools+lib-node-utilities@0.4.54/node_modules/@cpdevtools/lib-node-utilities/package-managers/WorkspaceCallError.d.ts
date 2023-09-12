import { WorkspaceCallResult } from "./WorkspaceCallResult";
export interface WorkspaceCallError<T = unknown> extends WorkspaceCallResult {
    success: false;
    error: T;
}
export declare function isWorkspaceCallError<T>(obj: any): obj is WorkspaceCallError<T>;
