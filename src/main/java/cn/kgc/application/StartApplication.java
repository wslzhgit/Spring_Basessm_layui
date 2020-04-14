package cn.kgc.application;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * time2020/2/10 15:04
 * author:吴树利
 */


@SpringBootApplication(scanBasePackages = "cn.kgc.*")
@MapperScan(basePackages = "cn.kgc.mapper")
public class StartApplication {
    public static void main(String[] args) {
        //关闭热部署
      //  System.setProperty("spring.devtools.restart.enabled","flase");
        SpringApplication.run(StartApplication.class,args);
    }

}
