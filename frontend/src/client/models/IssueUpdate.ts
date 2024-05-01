/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IIssueType } from './IIssueType';
import type { IStatusEnum } from './IStatusEnum';

export type IssueUpdate = {
    issue_type?: (IIssueType | null);
    status?: (IStatusEnum | null);
    location?: (string | null);
    description?: (string | null);
};

