import { DataType } from '../types/request.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

export const tutorApi = {
  viewRequest: async (): Promise<DataType[]> => {
    try {
      const response = await http.get<SuccessResponse<DataType[]>>(
        'tutor/viewRequest'
      )
      if (response.status === 200) {
        return response.data.data
      } else {
        throw new Error('Danh sách trống')
      }
    } catch (error) {
      // Handle network or API errors
      throw new Error('Failed to fetch data')
    }
  }
}
