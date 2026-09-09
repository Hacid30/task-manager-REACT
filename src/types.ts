export interface Task {
    id: number;
    text: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low' | '';
    date: number;
    isDeleting?: boolean;
}

