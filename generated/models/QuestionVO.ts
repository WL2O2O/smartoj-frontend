/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeConfig } from './JudgeConfig';
import type { UserVO } from './UserVO';

export type QuestionVO = {
    acceptNum?: number;
    content?: string;
    createTime?: string;
    id?: number;
    judgeConfig?: JudgeConfig;
    // 优化题目显示界面的显示字段
    status?: number;
    difficulty?: string;
    submitNum?: number;
    tags?: Array<string>;
    title?: string;
    userId?: number;
    userVO?: UserVO;
};
