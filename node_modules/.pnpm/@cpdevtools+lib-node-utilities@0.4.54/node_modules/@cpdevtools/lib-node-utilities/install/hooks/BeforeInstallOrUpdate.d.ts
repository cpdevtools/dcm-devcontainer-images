export interface BeforeInstallOrUpdate {
    beforeInstallOrUpdate(): boolean | void | Promise<boolean | void>;
}
export declare function implementsBeforeInstallOrUpdate(obj: any): obj is BeforeInstallOrUpdate;
