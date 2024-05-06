/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PublicAreaScheduleOut = {
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
        name: {
            type: 'string',
            isRequired: true,
        },
        area_type: {
            type: 'AreaEnum',
            isRequired: true,
        },
    },
} as const;
