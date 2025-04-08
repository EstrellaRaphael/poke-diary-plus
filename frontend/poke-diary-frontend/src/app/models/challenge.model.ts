export interface ChallengeProgress {
    caught: string[];
    fainted: string[];
    badges: string[];
}

export type ChallengeStatus = 'ativo' | 'completo' | 'falhou';

export interface Challenge {
    id: string;
    name: string;
    type: string;
    status: ChallengeStatus;
    owner: string;
    rules?: string;
    progress: ChallengeProgress;
}
