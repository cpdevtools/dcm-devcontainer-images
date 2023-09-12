import { PackageJson } from "type-fest";
import { Package } from "./Package";
export declare class NpmPackage extends Package {
    static detect(data: PackageJson, path: string, filename: string): Promise<boolean>;
    protected execPackageManager(cmd: string): Promise<number>;
}
