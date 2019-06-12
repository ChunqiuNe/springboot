package com.cq.hll.service;

import com.cq.hll.entity.UserInfo;

public interface HelloService {
    UserInfo selectByPrimaryKey(Integer id);
    UserInfo selectUserInfo(UserInfo userInfo);
}
