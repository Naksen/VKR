/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { PublicAreaCreate } from '../models/PublicAreaCreate';
import type { PublicAreaOut } from '../models/PublicAreaOut';
import type { PublicAreasOut } from '../models/PublicAreasOut';
import type { PublicAreaUpdate } from '../models/PublicAreaUpdate';
import type { ScheduleCreate } from '../models/ScheduleCreate';
import type { SchedulesOut } from '../models/SchedulesOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PublicAreaService {

    /**
     * Read Public Areas
     * Retrieve public areas.
     * @returns PublicAreasOut Successful Response
     * @throws ApiError
     */
    public static readPublicAreas({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<PublicAreasOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/public_area/',
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
     * Create Public Area
     * Create new public area.
     * @returns PublicAreaOut Successful Response
     * @throws ApiError
     */
    public static createPublicArea({
        requestBody,
    }: {
        requestBody: PublicAreaCreate,
    }): CancelablePromise<PublicAreaOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/public_area/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Public Area
     * Get public_area by ID.
     * @returns PublicAreaOut Successful Response
     * @throws ApiError
     */
    public static readPublicArea({
        id,
    }: {
        id: number,
    }): CancelablePromise<PublicAreaOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/public_area/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Public Area
     * Update a public area
     * @returns PublicAreaOut Successful Response
     * @throws ApiError
     */
    public static updatePublicArea({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: PublicAreaUpdate,
    }): CancelablePromise<PublicAreaOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/public_area/{id}',
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

    /**
     * Delete Public Area
     * Delete a public area.
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static deletePublicArea({
        id,
    }: {
        id: number,
    }): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/public_area/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Public Area Schedules
     * @returns SchedulesOut Successful Response
     * @throws ApiError
     */
    public static getPublicAreaSchedules({
        id,
    }: {
        id: number,
    }): CancelablePromise<SchedulesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/public_area/{id}/schedules',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Reserve Public Area
     * Reserve a public area.
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static reservePublicArea({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: ScheduleCreate,
    }): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/public_area/{id}/reserve',
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
