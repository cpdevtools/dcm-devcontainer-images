export interface AfterInstall {
    afterInstall(): void | Promise<void>;
}
export declare function implementsAfterInstall(obj: any): obj is AfterInstall;
