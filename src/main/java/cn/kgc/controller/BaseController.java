package cn.kgc.controller;

import cn.kgc.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * time2020/2/19 10:04
 * author:吴树利
 */
public class BaseController<T> {
    //依赖注入基础业务层对象
    @Autowired
    private BaseService<T> baseService;  //T:Emp

    //加载所有数据
    @RequestMapping("/getAllT")
    public @ResponseBody
    List<T> getAllT(){
        try {
            return baseService.findAllT();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *   分页加载数据
     * @param page  页面请求传来的当前页参数
     * @param limit  页面请求传来的每一页数据条数参数
     * @return  分页的数据，此时已将其进行了JSON化，由于layui的数据表格的请求为ajax请求
     * 当定义当前页和每一页数据条数时的形式参数名字必须为page和limit
     * (因为此时要与layui的table数据渲染的传参时参数名一致)
     */
    @RequestMapping("/loadPageT")
    public @ResponseBody
    Map<String,Object> loadPageT(Integer page, Integer limit){
        //1.新建Map<String,Object>集合
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            map = baseService.findPageT(page,limit);
            //设置数据访问响应成功状态
            map.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("msg","数据访问异常！！");
            map.put("code",200);
        }
        return map;
    }

    /**
     *   根据主键id删除单个数据
     * @param id  主键id
     * @return  删除操作的结果
     */
    @RequestMapping("/delTById")
    public @ResponseBody String delTById(Integer id){
        try {
            return baseService.removeTById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   修改
     * @param t  修改的对象参数
     * @return  修改的结果
     */
    @RequestMapping("/xgT")
    public @ResponseBody String xgT(T t){
        try {
            return baseService.updT(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   添加
     * @param t  添加的对象数据
     * @return  添加操作结果
     */
    @RequestMapping("/addT")
    public @ResponseBody String addT(T t){
        try {
            return baseService.addT(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
}
