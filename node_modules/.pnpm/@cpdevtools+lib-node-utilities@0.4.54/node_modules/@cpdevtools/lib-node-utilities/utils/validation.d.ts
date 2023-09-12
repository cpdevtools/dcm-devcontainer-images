export interface ValidationResult {
    failed: boolean;
    errors: ValidationFailure[];
}
export interface ValidationFailure {
    field: string;
    rule: string;
    message: string;
}
export declare class ValidationError extends Error {
    readonly errors: ValidationFailure[];
    constructor(errors: ValidationFailure[], message?: string);
}
