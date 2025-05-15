import { MinLength } from "class-validator";

export class createPostDto {
    @MinLength(3)
    title: string;
    
    author: string;
    pages: number;
    status: 'published'|'draft';
}
