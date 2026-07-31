package com.login.demo.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {

    @RequestMapping(value = {
        "/login",
        "/register",
        "/dashboard",
        "/admin"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
