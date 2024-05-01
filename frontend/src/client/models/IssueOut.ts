/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IIssueType } from './IIssueType';
import type { IStatusEnum } from './IStatusEnum';

export type IssueOut = {
    issue_type?: IIssueType;
    status?: IStatusEnum;
    location: string;
    description: string;
    id: number;
    user_id: number;
    created_at: string;
};

