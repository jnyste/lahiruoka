package fi.tuni.lahiruoka;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class User {
    @Id
    @GeneratedValue(generator="user_seq")
    @SequenceGenerator(name="user_seq",sequenceName="USER_SEQ", allocationSize=1)
    int id;
    @Column(nullable = false)
    String username;
    @Column(nullable = false)
    String password;
    @Column(nullable = false)
    LocalDate lastLogin;
    @Column(nullable = false)
    String address;
    @Column(nullable = false)
    String phone;
    @Column(nullable = false)
    boolean active;
    

    public User(){}

    public User(String username, String password, LocalDate lastLogin, String address, String phone, boolean active) {
        this.username = username;
        this.password = password;
        this.lastLogin = lastLogin;
        this.address = address;
        this.phone = phone;
        this.active = active;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", lastLogin=" + lastLogin +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", active=" + active +
                '}';
    }
}
