export interface Emoji {
    id: number;
    name: string;
    img: string;
    is_primary: boolean;
    advices?: string[];
}

export interface Task {
    id: string;
    text: string;
    emoji: Emoji;
    date: Date;
}