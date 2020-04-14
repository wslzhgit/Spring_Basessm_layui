package cn.kgc.controller;

import cn.kgc.entity.Dept;
import cn.kgc.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * time2020/2/16 15:57
 * author:吴树利
 */
@Controller
@RequestMapping("/dept")
public class DeptController extends BaseController<Dept> {

}
