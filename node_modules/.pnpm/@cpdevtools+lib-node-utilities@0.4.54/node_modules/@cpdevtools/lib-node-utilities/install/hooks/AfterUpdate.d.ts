export interface AfterUpdate {
    afterUpdate(): void | Promise<void>;
}
export declare function implementsAfterUpdate(obj: any): obj is AfterUpdate;
