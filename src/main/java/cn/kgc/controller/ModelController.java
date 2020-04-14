package cn.kgc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * time2020/2/15 14:21
 * author:吴树利
 */
@Controller
public class ModelController {
    @RequestMapping("toShowEmp")
    public String toShowEmp(){
        return "showEmp";
    }
}
