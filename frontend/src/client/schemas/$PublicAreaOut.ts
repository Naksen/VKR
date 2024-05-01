/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PublicAreaOut = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        capacity: {
            type: 'number',
            isRequired: true,
            minimum: 1,
        },
        area_type: {
            type: 'any-of',
            contains: [{
                type: 'AreaEnum',
            }, {
                type: 'null',
            }],
        },
        id: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
