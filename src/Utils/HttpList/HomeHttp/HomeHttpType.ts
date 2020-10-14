interface PersonalizedNewsongData {
    alg: string
    canDislike: boolean
    copywriter: null
    id: number
    name: string
    picUrl: string
    song: Song
    trackNumberUpdateTime: null
    type: number
}

interface Song {
    album: {
        name: string
        id: number
        company: string
        picUrl: string
        subType: string
        type: string
    }
}

// 数据类型接口
export interface PersonalizedNewsong {
    category: number
    code: number,
    result: PersonalizedNewsongData[]
};
