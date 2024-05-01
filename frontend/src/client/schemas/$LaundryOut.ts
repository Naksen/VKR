/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $LaundryOut = {
    properties: {
        room: {
            type: 'string',
            isRequired: true,
        },
        washing_machine_number: {
            type: 'number',
            isRequired: true,
        },
        is_busy: {
            type: 'boolean',
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        updated_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        created_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
