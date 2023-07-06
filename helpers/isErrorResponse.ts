import { AxiosResponse } from "axios";
import { ErrorResponseType } from '@/types/types';

type AxiosErrorResponse = AxiosResponse<ErrorResponseType>;

const isErrorResponse = (response: AxiosResponse): response is AxiosErrorResponse => {
    return (response as AxiosErrorResponse).data.error !== undefined;
}

export default isErrorResponse;
