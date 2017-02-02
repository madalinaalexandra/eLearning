package services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.UserDAO;
import model.User;

@Service
public class UserService {
	
	@Autowired
	private UserDAO userDAO;
	
	
	public List<User> get(){
		return userDAO.get();
	}
}
