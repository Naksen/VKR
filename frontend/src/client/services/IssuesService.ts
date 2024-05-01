/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IssueCreate } from '../models/IssueCreate';
import type { IssueOut } from '../models/IssueOut';
import type { IssuesOut } from '../models/IssuesOut';
import type { IssueUpdate } from '../models/IssueUpdate';
import type { Message } from '../models/Message';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class IssuesService {

    /**
     * Read Issues
     * Retrieve issues.
     * @returns IssuesOut Successful Response
     * @throws ApiError
     */
    public static readIssues({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<IssuesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/issues/',
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
     * Create Issue
     * Create new issue.
     * @returns IssueOut Successful Response
     * @throws ApiError
     */
    public static createIssue({
        requestBody,
    }: {
        requestBody: IssueCreate,
    }): CancelablePromise<IssueOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/issues/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Issue
     * Get issue by ID.
     * @returns IssueOut Successful Response
     * @throws ApiError
     */
    public static readIssue({
        id,
    }: {
        id: number,
    }): CancelablePromise<IssueOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/issues/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Issue
     * Update an issue.
     * @returns IssueOut Successful Response
     * @throws ApiError
     */
    public static updateIssue({
        id,
        requestBody,
    }: {
        id: number,
        requestBody: IssueUpdate,
    }): CancelablePromise<IssueOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/issues/{id}',
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
     * Delete Issue
     * Delete an issue.
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static deleteIssue({
        id,
    }: {
        id: number,
    }): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/issues/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
