package fi.tuni.lahiruoka;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
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
}
