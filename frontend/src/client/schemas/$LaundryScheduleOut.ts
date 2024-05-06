/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $LaundryScheduleOut = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        start_time: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        end_time: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        room: {
            type: 'string',
            isRequired: true,
        },
        washing_machine_number: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
