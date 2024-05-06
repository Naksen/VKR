/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IssueDetails } from '../models/IssueDetails';
import type { IStatusEnum } from '../models/IStatusEnum';
import type { TechnicalIssuesOut } from '../models/TechnicalIssuesOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TechnicalService {

    /**
     * Read Technical Issues
     * @returns TechnicalIssuesOut Successful Response
     * @throws ApiError
     */
    public static readTechnicalIssues({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<TechnicalIssuesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/technical/',
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
     * Change Status
     * @returns any Successful Response
     * @throws ApiError
     */
    public static changeStatus({
        issueId,
        newStatus,
    }: {
        issueId: number,
        newStatus: IStatusEnum,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/technical/{issue_id}',
            path: {
                'issue_id': issueId,
            },
            query: {
                'new_status': newStatus,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Details
     * @returns IssueDetails Successful Response
     * @throws ApiError
     */
    public static getDetails({
        issueId,
    }: {
        issueId: number,
    }): CancelablePromise<IssueDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/technical/{issue_id}/details',
            path: {
                'issue_id': issueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
