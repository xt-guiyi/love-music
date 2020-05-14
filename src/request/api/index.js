/*
 *api接口的统一出口
 */

// 登录模块接口
// 所有页面通用接口
import mainModular from './mainPageApi'
import loginModular from './loginApi'
// 发现页模块接口
import findModular from './findPageApi'
// 歌单详情模块接口
import songListModular from './songListPageApi'
// 播放器模块接口
import playerModular from './playerPageApi'

export const mainPageApi = mainModular
export const loginApi = loginModular
export const findPageApi = findModular
export const songListPageApi = songListModular
export const playerPageApi = playerModular
