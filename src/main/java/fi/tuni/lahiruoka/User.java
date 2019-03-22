package fi.tuni.lahiruoka;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
    boolean active = true;

    @Column(nullable = false)
    UserType userType;

    @Column(nullable = false)
    String companyName;

    @Column(nullable = false)
    String info = "";

    @OneToMany(mappedBy="farm", cascade = CascadeType.ALL)
    Set<Product> products = new HashSet<>();


    /**
     * Default constructor.
     */
    public User(){}

    public User(UserType userType, String username, String password, String companyName, String address, String phone, String info, LocalDate lastLogin) {
        this.userType = userType;
        this.username = username;
        this.password = password;
        this.companyName = companyName;
        this.address = address;
        this.phone = phone;
        this.info = info;
        this.lastLogin = lastLogin;
    }

    public void addProducts(Product... products) {
        this.products.addAll(Stream.of(products).collect(Collectors.toSet()));
        this.products.forEach(x -> x.setFarm(this));
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", company name=" + companyName +
                ", user type=" + userType +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", lastLogin=" + lastLogin +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", active=" + active +
                '}';
    }

    public int getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public UserType getUserType() {
        return this.userType;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public LocalDate getLastLogin() {
        return lastLogin;
    }

    public String getAddress() {
        return address;
    }

    public String getPhone() {
        return phone;
    }

    public boolean isActive() {
        return active;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setLastLogin(LocalDate lastLogin) {
        this.lastLogin = lastLogin;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
