package utils;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
@ComponentScan("learning*")
public class SpringConfig extends WebMvcConfigurerAdapter {

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		System.out.println("3AsdsfGFD");
		configurer.enable();
	}; 
	@Bean
	public DataSource dataSource() {
		System.out.println("4AsdsfGFD");
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("oracle.jdbc.driver.OracleDriver");
		dataSource.setUrl("jdbc:oracle:thin:@//localhost:1521/XE");
		dataSource.setUsername("madalina");
		dataSource.setPassword("madalina");
		return dataSource;
	}

	@Bean
	public JdbcTemplate jdbcTemplate(DataSource dataSource) {
		System.out.println("5AsdsfGFD");
		return new JdbcTemplate(dataSource);
	}
	
	/*@Bean
	public ViewResolver resourceBundleViewResolver(){
		InternalResourceViewResolver r= new InternalResourceViewResolver();
		//r.setPrefix("/WEB-INF/views/");
		//r.setSuffix(".jsp");
		return r;
	}*/
}
