/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserCreate = {
    properties: {
        email: {
            type: 'string',
            isRequired: true,
        },
        is_active: {
            type: 'boolean',
        },
        is_superuser: {
            type: 'boolean',
        },
        is_technical_staff: {
            type: 'any-of',
            contains: [{
                type: 'boolean',
            }, {
                type: 'null',
            }],
        },
        full_name: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        phone: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        room: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        study_group: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        institute: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        password: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
