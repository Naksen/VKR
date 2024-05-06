/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScheduleOut = {
    properties: {
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
        id: {
            type: 'number',
            isRequired: true,
        },
        user_id: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
