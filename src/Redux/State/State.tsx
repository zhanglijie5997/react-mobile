
export const userStatus: boolean = localStorage.getItem("userStatus") ? 
                                                                      localStorage.getItem("userStatus") === "true" ? true : false 
                                                                                                                                : false; // 用户状态

export const token: string = ''; // 用户token