export interface AfterInstallOrUpdate {
    afterInstallOrUpdate(): void | Promise<void>;
}
export declare function implementsAfterInstallOrUpdate(obj: any): obj is AfterInstallOrUpdate;
