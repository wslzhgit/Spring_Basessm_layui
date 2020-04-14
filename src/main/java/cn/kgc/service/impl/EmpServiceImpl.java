package cn.kgc.service.impl;


import cn.kgc.entity.Emp;
import cn.kgc.service.EmpService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   员工业务层实现类
 */
@Service  //将此子类进行实例化
@Transactional(readOnly = false)
public class EmpServiceImpl extends BaseServiceImpl<Emp> implements EmpService {

}
