/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $IssueUpdate = {
    properties: {
        issue_type: {
            type: 'any-of',
            contains: [{
                type: 'IIssueType',
            }, {
                type: 'null',
            }],
        },
        status: {
            type: 'any-of',
            contains: [{
                type: 'IStatusEnum',
            }, {
                type: 'null',
            }],
        },
        location: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        description: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
    },
} as const;
