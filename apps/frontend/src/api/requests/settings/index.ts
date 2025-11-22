import type { ApiFetchesRequest, FetchesResponse } from '@siberiacancode/fetches'
import type { ApiResponse, SetSettingData } from '@/api/types'
import { $api } from '@/api/instance'

export type SetSettingResponse = ApiResponse
export const setSetting: ApiFetchesRequest<SetSettingData, FetchesResponse<SetSettingResponse>> = ({ params, config }) => $api.put('/settings', params, config)
