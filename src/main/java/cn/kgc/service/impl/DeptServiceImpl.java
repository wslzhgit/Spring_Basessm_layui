package cn.kgc.service.impl;

import cn.kgc.entity.Dept;

import cn.kgc.service.DeptService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * time2020/2/16 15:49
 * author:吴树利
 */

@Service
@Transactional(readOnly = false)
public class DeptServiceImpl extends BaseServiceImpl<Dept> implements DeptService {

}
