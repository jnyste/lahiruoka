package fi.tuni.lahiruoka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.Date;

// Example class.
@RestController
public class HelloController {

    @Autowired
    ProductRepository productRepository;

    // To see table description, use SHOW COLUMNS from PRODUCT; in h2.
    @PostConstruct
    public void init() {
        //String name, double price, int units, double unitSize, LocalDate availableFrom, LocalDate availableTo
        productRepository.save(new Product("Porkkana", 2.3, 10, 1.0, LocalDate.of(2019, 3, 12), LocalDate.of(2019, 4, 6)));
        productRepository.save(new Product("Peruna", 1.3, 15, 2.0, LocalDate.of(2019, 2, 10), LocalDate.of(2019, 12, 24)));

    }

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello, the time at the server is now " + new Date() + "\n";
    }
}