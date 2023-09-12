"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(errors, message = "Validation Failed.") {
        super(message);
        Object.defineProperty(this, "errors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: errors
        });
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy92YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVdBLE1BQWEsZUFBZ0IsU0FBUSxLQUFLO0lBQ3hDLFlBQTRCLE1BQTJCLEVBQUUsVUFBa0Isb0JBQW9CO1FBQzdGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7bUJBRFc7O0lBRTVCLENBQUM7Q0FDRjtBQUpELDBDQUlDIn0=