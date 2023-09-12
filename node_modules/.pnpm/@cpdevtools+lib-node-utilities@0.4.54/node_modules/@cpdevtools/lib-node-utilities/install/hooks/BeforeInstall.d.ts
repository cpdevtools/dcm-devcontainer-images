export interface BeforeInstall {
    beforeInstall(): boolean | void | Promise<boolean | void>;
}
export declare function implementsBeforeInstall(obj: any): obj is BeforeInstall;
