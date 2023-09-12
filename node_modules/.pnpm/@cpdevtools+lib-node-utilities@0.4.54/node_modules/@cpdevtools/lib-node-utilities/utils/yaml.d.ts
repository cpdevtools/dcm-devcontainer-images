export declare function readYamlFile<T = unknown>(path: string): Promise<T>;
export declare function writeYamlFile(path: string, data: any, indent?: number): Promise<void>;
export declare function printYamlFile(path: string, opt?: {
    indent?: number;
    cliColor?: boolean;
}): Promise<void>;
export declare function printAsYaml(data: any, opt?: {
    indent?: number;
    cliColor?: boolean;
}): void;
export declare function toFormattedYaml(data: any, opt?: {
    indent?: number;
    cliColor?: boolean;
}): string;
