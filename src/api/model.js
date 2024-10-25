//导入request.js请求工具
import request from '@/utils/request.js'
export const wenxinService = (query)=>{
    return request.post('/wenxin/ask?question='+ query)
}