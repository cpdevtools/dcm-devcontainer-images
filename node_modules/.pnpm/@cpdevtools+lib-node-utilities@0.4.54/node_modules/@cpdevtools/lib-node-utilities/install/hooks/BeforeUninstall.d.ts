export interface BeforeUninstall {
    beforeUninstall(): boolean | void | Promise<boolean | void>;
}
export declare function implementsBeforeUninstall(obj: any): obj is BeforeUninstall;
