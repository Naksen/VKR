/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IIssueType } from './IIssueType';
import type { IStatusEnum } from './IStatusEnum';

export type IssueCreate = {
    issue_type?: IIssueType;
    status?: IStatusEnum;
    location: string;
    description: string;
};

