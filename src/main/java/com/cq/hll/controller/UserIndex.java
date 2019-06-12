package com.cq.hll.controller;

import com.cq.hll.entity.UserInfo;
import com.cq.hll.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**a
  * @Description: 登陆控制层
  * @Param: 
  * @hll:   我曾难自拔于世界之大  也沉溺于其中梦话
  * @Author: hlll
  * @Date: 2019/5/8  21:37
*/
@Controller
@RequestMapping("hll")
public class UserIndex {

    @Autowired
    public HelloService helloService;


    @RequestMapping("hll")
    public  String  login(){
        return  "login.html";

    }
    @RequestMapping("idex")
    public  String  index(){
        return  "index.html";

    }
    /**
     * @Description: 登陆的方法
     * @Param: []
     * @return: com.cq.hll.entity.UserInfo
     * @Author: hll
     * @Date: 2019/5/8 21:43
     *
     */
    @RequestMapping(value = {"/index"},method = RequestMethod.POST)
    @ResponseBody
    public UserInfo ab(HttpServletRequest request, HttpSession session, HttpServletResponse response){
        //用户名
        String username = request.getParameter("userName");
        //密码
        String password = request.getParameter("password");
        UserInfo userInfo=new UserInfo();
        if (username!=""&&username.length()>0){
            userInfo.setUserName(username);
        }
        System.out.println(username);
        System.out.println(password);
        if (password!=""&&password.length()>=6){
            userInfo.setPassword(password);
        }
        UserInfo user = helloService.selectUserInfo(userInfo);
        if(user!=null){
            session = request.getSession();
            System.out.println(user.getUserName()+session.getId());
        }
          return  user;
    }
}
