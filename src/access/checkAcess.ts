/**
 * 检察权限，判断用户是都有某个权限
 * @param loginUser
 * @param needAcess
 * @return boolean
 */

import ACCESS_ENUM from "@/access/accessEnum";

const checkAcess = (loginUser: any, needAcess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前用户具有的权限
  const loginUserAcess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  // 如果是不需要登录，直接返回true
  if (needAcess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 如果需要登录
  if (needAcess === ACCESS_ENUM.USER) {
    // 如果用户没有登录
    if (loginUserAcess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 如果需要管理员登录
  if (needAcess === ACCESS_ENUM.ADMIN) {
    if (loginUserAcess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};
export default checkAcess;
