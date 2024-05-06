/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LaundriesOut } from '../models/LaundriesOut';
import type { LaundryCreate } from '../models/LaundryCreate';
import type { LaundryOut } from '../models/LaundryOut';
import type { Message } from '../models/Message';
import type { ScheduleCreate } from '../models/ScheduleCreate';
import type { SchedulesOut } from '../models/SchedulesOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LaundriesService {

    /**
     * Read Laundries
     * Получить постирочные.
     * @returns LaundriesOut Successful Response
     * @throws ApiError
     */
    public static readLaundries({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<LaundriesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/laundries/',
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
     * Create Laundry
     * Create new laundry.
     * @returns LaundryOut Successful Response
     * @throws ApiError
     */
    public static createLaundry({
        requestBody,
    }: {
        requestBody: LaundryCreate,
    }): CancelablePromise<LaundryOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/laundries/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Laundry
     * Get laundry by ID.
     * @returns LaundryOut Successful Response
     * @throws ApiError
     */
    public static readLaundry({
        id,
    }: {
        id: number,
    }): CancelablePromise<LaundryOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/laundries/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Laundry
     * Delete an laundry.
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static deleteLaundry({
        id,
    }: {
        id: number,
    }): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/laundries/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Laundry Schedules
     * @returns SchedulesOut Successful Response
     * @throws ApiError
     */
    public static getLaundrySchedules({
        id,
    }: {
        id: number,
    }): CancelablePromise<SchedulesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/laundries/{id}/schedules',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Reserve Laundry
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static reserveLaundry({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: ScheduleCreate,
    }): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/laundries/{id}/reserve',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
