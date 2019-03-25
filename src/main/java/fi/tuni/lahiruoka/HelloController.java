package fi.tuni.lahiruoka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

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

        Product p = new Product("Porkkana", 2.3, 100, LocalDate.of(2019, 3, 12), LocalDate.of(2019, 4, 6), "todella makea sluuurrrppss");
        Product k = new Product("Kaali", 3.5, 150, LocalDate.of(2019, 3, 12), LocalDate.of(2019, 4, 6), "rouskuu mukavasti hampaissa");
        Product pe = new Product("Peruna", 1.3, 50, LocalDate.of(2019, 2, 10), LocalDate.of(2019, 12, 24), "herkkuperunaa");

        p.getTags().add(new Tag("peruna"));
        p.getTags().add(new Tag("porkkana"));
        p.getTags().add(new Tag("vihannes"));

        User userHenkilo = new User(UserType.FARM, "henkilo", "salasana", "Mikkolan tila", "kukkakuja 450, 33333 Virrat", "049-8573753", "mikkolan tila on niin perinteinen ettei meillä käytetä edes sähköä", LocalDate.of(2019,03,12));
        userHenkilo.addProducts(p, k);
        userRepository.save(userHenkilo);

        User user2 = new User(UserType.KITCHEN, "ukkeli", "salasana","Mummolan tila", "mummotie 444, 45340 riihimäki", "054-6224112", "mummon ruoka on parasta, kaikkihan sen tietää", LocalDate.of(2019,03,13));
        user2.addProducts(pe);
        userRepository.save(user2);

        productRepository.save(p);
        productRepository.save(k);
        productRepository.save(pe);
    }

    @GetMapping("/api/users")
    public Iterable<User> hello() {
        return userRepository.findAll();
    }

    @GetMapping("/api/products")
    public Iterable<Product> products() {
        return productRepository.findAll();
    }

    @GetMapping("/api/products/{farmerid}")
    public Iterable<Product> productsByFarmer(@PathVariable int farmerid) {
        Optional<User> u = userRepository.findById(farmerid);
        User findThis;
        if(u.isPresent()) {
            findThis = u.get();
        } else {
            findThis = null;
        }
        return productRepository.findByFarm(findThis);
    }
}
