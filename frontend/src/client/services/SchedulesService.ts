/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LaundrySchedulesOut } from '../models/LaundrySchedulesOut';
import type { Message } from '../models/Message';
import type { PublicAreaSchedulesOut } from '../models/PublicAreaSchedulesOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SchedulesService {

    /**
     * Get My Laundries Schedules
     * @returns LaundrySchedulesOut Successful Response
     * @throws ApiError
     */
    public static getMyLaundriesSchedules({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<LaundrySchedulesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/schedules/laundries',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get My Public Area Schedules
     * @returns PublicAreaSchedulesOut Successful Response
     * @throws ApiError
     */
    public static getMyPublicAreaSchedules({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<PublicAreaSchedulesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/schedules/public_areas',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Laundry Schedule
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static deleteLaundrySchedule({
        id,
    }: {
        id: number,
    }): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/schedules/laundry/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Public Area Schedule
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static deletePublicAreaSchedule({
        id,
    }: {
        id: number,
    }): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/schedules/public_area/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
