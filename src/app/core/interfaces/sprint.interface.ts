
export enum StatusSprint {
    PLANNED = 'PLANNED',
    IN_PROGRESS = 'IN_PROGRESS',
    BLOCKED = 'BLOCKED',
    COMPLETE = 'COMPLETE',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
    REVIEW = 'REVIEW',
    RETROSPECTIVE = 'RETROSPECTIVE',
    PENDING_APPROVAL = 'PENDING_APPROVAL'
}

export interface CreateSprint {
    name: string,
    aim: string,
    startDate: Date,
    endDate: Date,
    projectId: number
}

export interface Sprint extends CreateSprint {
    id: number,
    statusSprint: StatusSprint,
    statusDate: Date

}