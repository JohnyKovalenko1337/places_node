import { threadId } from "worker_threads";

class HttpError extends Error {
    code: number;           // property code
    constructor(message: string, errorCode: any) {
        super(message); // Add a message property for 
        this.code = errorCode;
    }
}
export default HttpError;