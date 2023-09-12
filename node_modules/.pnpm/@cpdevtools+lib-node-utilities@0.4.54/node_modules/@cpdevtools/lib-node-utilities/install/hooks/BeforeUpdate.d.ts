export interface BeforeUpdate {
    beforeUpdate(): boolean | void | Promise<boolean | void>;
}
export declare function implementsBeforeUpdate(obj: any): obj is BeforeUpdate;
