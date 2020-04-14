package cn.kgc.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

/**
 * time2020/2/11 16:00
 * author:吴树利
 * 员工实体类
 */
public class Emp {
    private Integer empno;//编号
    private String ename;//姓名
    private String job;//工作
    private Double sal;//工资
    private Integer mgr;//上司编号
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss",timezone = "GMT+8")
    private Date hiredate;//入职时间
    private Double comm;//奖金
    private Dept dept;//部门实体对象

    public Integer getEmpno() {
        return empno;
    }

    public void setEmpno(Integer empno) {
        this.empno = empno;
    }

    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public Double getSal() {
        return sal;
    }

    public void setSal(Double sal) {
        this.sal = sal;
    }

    public Integer getMgr() {
        return mgr;
    }

    public void setMgr(Integer mgr) {
        this.mgr = mgr;
    }

    public Date getHiredate() {
        return hiredate;
    }

    public void setHiredate(Date hiredate) {
        this.hiredate = hiredate;
    }

    public Double getComm() {
        return comm;
    }

    public void setComm(Double comm) {
        this.comm = comm;
    }

    public Dept getDept() {
        return dept;
    }

    public void setDept(Dept dept) {
        this.dept = dept;
    }

    @Override
    public String toString() {
        return "Emp{" +
                "empno=" + empno +
                ", ename='" + ename + '\'' +
                ", job='" + job + '\'' +
                ", sal=" + sal +
                ", mgr=" + mgr +
                ", hiredate=" + hiredate +
                ", comm=" + comm +
                '}';
    }
}
