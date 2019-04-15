package fi.tuni.lahiruoka;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NaturalId;

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

    @Column(nullable=false)
    String googleId;

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

    @OneToMany(mappedBy = "orderer", cascade = CascadeType.ALL)
    @JsonIgnore
    Set<Order> orders = new HashSet<>();

    @OneToMany(mappedBy="farm", cascade = CascadeType.ALL)
    @JsonIgnore
    Set<Product> products = new HashSet<>();


    /**
     * Default constructor.
     */
    public User(){}

    public User(String googleId, UserType userType, String companyName, String address, String phone, String info, LocalDate lastLogin) {
        this.googleId = googleId;
        this.userType = userType;
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
                ", googleId=" + googleId +
                ", company name=" + companyName +
                ", user type=" + userType +
                ", lastLogin=" + lastLogin +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", active=" + active +
                '}';
    }

    public int getId() {
        return id;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
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

    public String getInfo() {
        return info;
    }

    public void setId(int id) {
        this.id = id;
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

    public void setInfo(String info) {
        this.info = info;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Set<Order> getOrders() {
        return orders;
    }
}
