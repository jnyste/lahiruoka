package fi.tuni.lahiruoka;

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
    int units;
    @Column(nullable = false)
    double unitSize;
    @Column(nullable = false)
    LocalDate availableFrom;
    @Column(nullable = false)
    LocalDate availableTo;
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "product_tags", joinColumns = { @JoinColumn(name = "product_id") }, inverseJoinColumns = { @JoinColumn(name = "tag_id") })
    Set<Tag> tags = new HashSet<>();

    public Product() {}

    public Product(String name, double price, int units, double unitSize, LocalDate availableFrom, LocalDate availableTo) {
        this.name = name;
        this.price = price;
        this.units = units;
        this.unitSize = unitSize;
        this.availableFrom = availableFrom;
        this.availableTo = availableTo;
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

    public int getUnits() {
        return units;
    }

    public void setUnits(int units) {
        this.units = units;
    }

    public double getUnitSize() {
        return unitSize;
    }

    public void setUnitSize(double unitSize) {
        this.unitSize = unitSize;
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

<<<<<<< HEAD
=======
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
                ", units=" + units +
                ", unitSize=" + unitSize +
                ", availableFrom=" + availableFrom +
                ", availableTo=" + availableTo +
                '}';
    }
>>>>>>> dev
}
