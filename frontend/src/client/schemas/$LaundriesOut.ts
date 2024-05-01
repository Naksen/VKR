/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $LaundriesOut = {
    properties: {
        data: {
            type: 'array',
            contains: {
                type: 'LaundryOut',
            },
            isRequired: true,
        },
        count: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
