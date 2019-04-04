package fi.tuni.lahiruoka;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Product {

    @Id
    @GeneratedValue(generator="product_seq")
    @SequenceGenerator(name="product_seq",sequenceName="PRODUCT_SEQ", allocationSize=1)
    int product_id;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    double price;

    @Column(nullable = false)
    double amount;

    @Column(nullable = false)
    LocalDate availableFrom;

    @Column(nullable = false)
    LocalDate availableTo;

    @Column(nullable = false)
    String info;

    @ManyToOne
    @JoinColumn
    User farm;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(name = "product_tags", joinColumns = { @JoinColumn(name = "product_id") }, inverseJoinColumns = { @JoinColumn(name = "tag_id") })
    Set<Tag> tags = new HashSet<>();

    public Product() {}

    public Product(String name, double price, double amount, LocalDate availableFrom, LocalDate availableTo, String info) {
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.availableFrom = availableFrom;
        this.availableTo = availableTo;
        this.info = info;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(LocalDate availableFrom) {
        this.availableFrom = availableFrom;
    }

    public LocalDate getAvailableTo() {
        return availableTo;
    }

    public void setAvailableTo(LocalDate availableTo) {
        this.availableTo = availableTo;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public User getFarm() {
        return farm;
    }

    public void setFarm(User farm) {
        this.farm = farm;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "Product{" +
                "product_id=" + product_id +
                ", tags='" + tags.toString() + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", amount=" + amount +
                ", availableFrom=" + availableFrom +
                ", availableTo=" + availableTo +
                '}';
    }
}
