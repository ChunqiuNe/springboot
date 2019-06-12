package com.cq.hll.service.Impl;

import com.cq.hll.entity.UserInfo;
import com.cq.hll.mapper.UserInfoMapper;
import com.cq.hll.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("HelloService")
public class HelloServiceImpl  implements HelloService  {
    @Autowired
    protected UserInfoMapper userInfoMapper;

    @Override
    public UserInfo selectByPrimaryKey(Integer id) {
        return userInfoMapper.selectByPrimaryKey(id);

    }

    @Override
    public UserInfo selectUserInfo(UserInfo userInfo) {
        return userInfoMapper.selectUserInfo(userInfo);
    }
}

