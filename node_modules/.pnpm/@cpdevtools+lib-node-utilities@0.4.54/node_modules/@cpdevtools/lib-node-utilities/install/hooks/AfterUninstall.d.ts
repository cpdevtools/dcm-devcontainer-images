export interface AfterUninstall {
    afterUninstall(): void | Promise<void>;
}
export declare function implementsAfterUninstall(obj: any): obj is AfterUninstall;
