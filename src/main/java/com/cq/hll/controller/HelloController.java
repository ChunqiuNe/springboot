package com.cq.hll.controller;

import com.cq.hll.entity.UserInfo;
import com.cq.hll.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("cq")
public class HelloController {
    @Autowired
    public HelloService helloService;

    @RequestMapping("cq")
    public String a(){
        UserInfo userInfo = helloService.selectByPrimaryKey(1);
        return  "hello.html";
    }



}
