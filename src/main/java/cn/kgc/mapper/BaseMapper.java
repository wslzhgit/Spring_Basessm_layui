package cn.kgc.mapper;

import java.util.List;

/**
 * time2020/2/18 18:35
 * author:吴树利
 */
public interface BaseMapper<T> {
    //查询所有部门数据
    List<T> selAllT() throws  Exception;
    //分页查询
    List<T> selPageT() throws Exception;
    //根据id删除单个数据
    Integer delTById(Integer id) throws Exception;
    //修改
    Integer updT(T t) throws Exception;
    //添加
    Integer addT(T t)throws Exception;
}
