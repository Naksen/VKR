/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $IssuesOut = {
    properties: {
        data: {
            type: 'array',
            contains: {
                type: 'IssueOut',
            },
            isRequired: true,
        },
        count: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
