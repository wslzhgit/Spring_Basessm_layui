package cn.kgc.service;

import java.util.List;
import java.util.Map;

/**
 * time2020/2/19 10:02
 * author:吴树利
 */
public interface BaseService<T> {
    List<T> findAllT() throws Exception;

    Map<String, Object> findPageT(Integer page, Integer limit) throws Exception;

    String removeTById(Integer id) throws Exception;

    String updT(T t) throws Exception;

    String addT(T t) throws Exception;
}
