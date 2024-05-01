/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $IssueOut = {
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
        id: {
            type: 'number',
            isRequired: true,
        },
        user_id: {
            type: 'number',
            isRequired: true,
        },
        created_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
