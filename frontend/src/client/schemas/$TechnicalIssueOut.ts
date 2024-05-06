/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TechnicalIssueOut = {
    properties: {
        full_name: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        email: {
            type: 'string',
            isRequired: true,
        },
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
        id: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
