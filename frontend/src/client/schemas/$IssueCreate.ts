/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $IssueCreate = {
    properties: {
        issue_type: {
            type: 'all-of',
            contains: [{
                type: 'IIssueType',
            }],
        },
        status: {
            type: 'all-of',
            contains: [{
                type: 'IStatusEnum',
            }],
        },
        location: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
