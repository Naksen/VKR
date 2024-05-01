/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PublicAreasOut = {
    properties: {
        data: {
            type: 'array',
            contains: {
                type: 'PublicAreaOut',
            },
            isRequired: true,
        },
        count: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
