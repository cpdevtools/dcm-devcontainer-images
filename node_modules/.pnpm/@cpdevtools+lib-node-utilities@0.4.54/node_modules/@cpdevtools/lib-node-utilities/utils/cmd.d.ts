/// <reference types="node" />
/// <reference types="node" />
import { SpawnOptions } from "child_process";
import { Observable } from "rxjs";
interface ChildProcessEvent {
    type: string;
}
interface ChildProcessCloseEvent extends ChildProcessEvent {
    type: "close";
    code: number;
}
interface ChildProcessDataEvent extends ChildProcessEvent {
    type: "data";
    data: string;
}
export declare class ChildProcessObservable extends Observable<ChildProcessEvent> {
    private readonly cmd;
    private readonly options;
    private readonly _process$;
    constructor(cmd: string, options: SpawnOptions);
    readonly data$: Observable<ChildProcessDataEvent>;
    readonly dataComplete$: Observable<ChildProcessDataEvent>;
    get complete(): Promise<ChildProcessCloseEvent>;
}
export declare function exec(cmd: string, { cwd, env }?: {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
}): Promise<number>;
export declare function run(cmd: string, { cwd, env }?: {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
}): Promise<string>;
export declare function start(cmd: string, { cwd }?: {
    cwd?: string;
}): Promise<void>;
export {};
