/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScheduleCreate = {
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
    },
} as const;
