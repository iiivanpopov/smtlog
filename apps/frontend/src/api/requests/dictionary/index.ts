import type { ApiFetchesRequest, FetchesResponse } from '@siberiacancode/fetches'
import type { ApiResponse } from '@/api'
import { $api } from '@/api'

export type GetDictionaryResponse = ApiResponse<{ boards: string[] }>
export const getDictionary: ApiFetchesRequest<undefined, FetchesResponse<GetDictionaryResponse>> = ({ config } = {}) => $api.get('/dictionary', config)
