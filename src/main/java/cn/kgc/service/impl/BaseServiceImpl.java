package cn.kgc.service.impl;


import cn.kgc.mapper.BaseMapper;
import cn.kgc.service.BaseService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * time2020/2/19 9:55
 * author:吴树利
 */
public class BaseServiceImpl <T> implements BaseService<T> {
    //依赖注入基础的Mapper代理对象
    @Autowired
    private BaseMapper<T> baseMapper; //T:Emp

    /**
     *   查询所有数据
     * @return  查询的数据结果
     * @throws Exception
     */
    @Override
    public List<T> findAllT() throws Exception {
        return baseMapper.selAllT();
    }

    /**
     *   执行分页查询
     * @param page  当前页
     * @param limit  每一页查询的数据条数
     * @return   分页数据结果
     * @throws Exception
     */
    @Override
    public Map<String, Object> findPageT(Integer page, Integer limit) throws Exception {
        //1.新建Map<String, Object>集合
        Map<String, Object> map = new HashMap<String, Object>();
        //2.执行分页
        PageHelper.startPage(page,limit);
        //3.新建得到分页对象以及数据
        PageInfo<T> pageInfo = new PageInfo<T>(baseMapper.selPageT());
        //4.根据layui的返回数据要求装入相关数据(装入数据时map集合的key一定要与layui的数据的key保持一致)
        //4-1.装入数据总的条数
        map.put("count",pageInfo.getTotal());
        //4-2.装入分页的数据
        map.put("data",pageInfo.getList());
        return map;
    }

    /**
     *   根据主键id删除单个数据
     * @param id  主键id
     * @return  删除结果
     * @throws Exception
     */
    @Override
    public String removeTById(Integer id) throws Exception {
        if(baseMapper.delTById(id)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   修改
     * @param t  要修改的数据
     * @return  修改结果
     * @throws Exception
     */
    @Override
    public String updT(T t) throws Exception {
        if(baseMapper.updT(t)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   添加
     * @param t  添加数据对象
     * @return  操作结果
     * @throws Exception
     */
    @Override
    public String addT(T t) throws Exception {
        if(baseMapper.addT(t)>0){
            return "success";
        }else {
            return "fail";
        }
    }


}
