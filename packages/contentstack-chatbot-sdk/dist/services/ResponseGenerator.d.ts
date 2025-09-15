import { ContentstackEntry, ResponseGenerator as IResponseGenerator } from '../types';
export declare class ResponseGenerator implements IResponseGenerator {
    generateResponse(message: string, content: {
        tours: ContentstackEntry[];
        faqs: ContentstackEntry[];
    }): string;
}
