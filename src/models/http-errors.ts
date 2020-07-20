import { threadId } from "worker_threads";

class HttpError extends Error {
    code: number;           // property code
    message: string;
    constructor(message: string, errorCode: any) {
        super(message); // Add a message property for 
        this.code = errorCode;
        this.message = message;
    }
}
export default HttpError;