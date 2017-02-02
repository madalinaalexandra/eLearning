package dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import model.User;

@Repository
public class UserDAO {
	
	public List<User> get(){
		List<User> users = new ArrayList<User>();
		User user1 = new User();
		user1.setFirstName("MADALINA");
		user1.setLastName("NEGHINA");
		users.add(user1);
		return users;
	}
}
