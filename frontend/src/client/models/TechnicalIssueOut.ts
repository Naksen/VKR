/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IIssueType } from './IIssueType';
import type { IStatusEnum } from './IStatusEnum';

export type TechnicalIssueOut = {
    full_name: (string | null);
    email: string;
    issue_type?: IIssueType;
    status?: IStatusEnum;
    id: number;
};

