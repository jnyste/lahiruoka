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

}
