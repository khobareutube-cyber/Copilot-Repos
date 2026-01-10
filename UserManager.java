import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * User Manager Class
 * Demonstrates basic Java class structure with CRUD operations
 */
public class UserManager {
    
    private List<User> users;
    
    public UserManager() {
        this.users = new ArrayList<>();
    }
    
    /**
     * Add a new user to the manager
     */
    public void addUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        users.add(user);
    }
    
    /**
     * Find a user by ID
     */
    public Optional<User> findUserById(int id) {
        return users.stream()
                .filter(user -> user.getId() == id)
                .findFirst();
    }
    
    /**
     * Get all users
     */
    public List<User> getAllUsers() {
        return new ArrayList<>(users);
    }
    
    /**
     * Remove a user by ID
     */
    public boolean removeUser(int id) {
        return users.removeIf(user -> user.getId() == id);
    }
    
    /**
     * Update user information
     */
    public boolean updateUser(int id, String name, String email) {
        Optional<User> userOpt = findUserById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setName(name);
            user.setEmail(email);
            return true;
        }
        return false;
    }
    
    /**
     * Inner User class
     */
    public static class User {
        private int id;
        private String name;
        private String email;
        
        public User(int id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }
        
        public int getId() {
            return id;
        }
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public String getEmail() {
            return email;
        }
        
        public void setEmail(String email) {
            this.email = email;
        }
        
        @Override
        public String toString() {
            return "User{id=" + id + ", name='" + name + "', email='" + email + "'}";
        }
    }
    
    /**
     * Demo usage
     */
    public static void main(String[] args) {
        UserManager manager = new UserManager();
        
        // Add users
        manager.addUser(new User(1, "Alice", "alice@example.com"));
        manager.addUser(new User(2, "Bob", "bob@example.com"));
        
        // Display all users
        System.out.println("All users:");
        manager.getAllUsers().forEach(System.out::println);
        
        // Find specific user
        manager.findUserById(1).ifPresent(user -> 
            System.out.println("\nFound user: " + user)
        );
        
        // Update user
        manager.updateUser(1, "Alice Smith", "alice.smith@example.com");
        System.out.println("\nAfter update:");
        manager.findUserById(1).ifPresent(System.out::println);
        
        // Remove user
        manager.removeUser(2);
        System.out.println("\nAfter removal, remaining users:");
        manager.getAllUsers().forEach(System.out::println);
    }
}
