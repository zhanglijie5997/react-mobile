
// 当前环境判断
const nowEnv  = process.env.NODE_ENV as string;

const envMap: Map<string, string> = new Map([
    ["development",    "http://localhost:8091"],
    ["production",     "http://localhost:5000"],
    ["testProduction", "testProduction" ]
])

// axios 请求url
export const baseUrl = envMap.get(nowEnv);