package fi.tuni.lahiruoka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.Date;

// Example class.
@RestController
public class HelloController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    // To see table description, use SHOW COLUMNS from PRODUCT; in h2.
    @PostConstruct
    public void init() {

        Product p = new Product("Porkkana", 2.3, 10, 1.0, LocalDate.of(2019, 3, 12), LocalDate.of(2019, 4, 6));

        p.getTags().add(new Tag("porkkana"));
        p.getTags().add(new Tag("vihannes"));

        //String name, double price, int units, double unitSize, LocalDate availableFrom, LocalDate availableTo
        productRepository.save(p);
        productRepository.save(new Product("Peruna", 1.3, 15, 2.0, LocalDate.of(2019, 2, 10), LocalDate.of(2019, 12, 24)));
        //String username, String password, LocalDate lastLogin, String address, String phone, boolean active
        userRepository.save(new User(UserType.FARM, "henkilo", "salasana", LocalDate.of(2019,03,12), "joku osoite 450", "049857", true));
        userRepository.save(new User(UserType.KITCHEN, "ukkeli", "salasana", LocalDate.of(2019,03,13), "toinen osote 444", "546224", true));
    }

    @RequestMapping ("/api/hello")
    public String hello() {
        return "User repo on " + userRepository.findAll() + "\n\n, product repo on " + productRepository.findAll() + "\n";
    }
}