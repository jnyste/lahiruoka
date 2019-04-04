package fi.tuni.lahiruoka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

// Example class.
@RestController
public class HelloController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TagRepository tagRepository;

    // To see table description, use SHOW COLUMNS from PRODUCT; in h2.
    @PostConstruct
    public void init() {

        Tag porkkanaTag = new Tag("porkkana");
        Tag perunaTag = new Tag("peruna");
        Tag vihannesTag = new Tag("vihannes");

        Product p = new Product("Porkkana", 2.3, 100, LocalDate.of(2019, 3, 12), LocalDate.of(2019, 4, 6), "todella makea sluuurrrppss");
        Product k = new Product("Kaali", 3.5, 150, LocalDate.of(2019, 3, 12), LocalDate.of(2019, 4, 6), "rouskuu mukavasti hampaissa");
        Product pe = new Product("Peruna", 1.3, 50, LocalDate.of(2019, 2, 10), LocalDate.of(2019, 12, 24), "herkkuperunaa");

        pe.getTags().add(perunaTag);
        pe.getTags().add(vihannesTag);
        k.getTags().add(vihannesTag);
        p.getTags().add(porkkanaTag);
        p.getTags().add(vihannesTag);

        tagRepository.save(porkkanaTag);
        tagRepository.save(perunaTag);
        tagRepository.save(vihannesTag);

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

    @PostMapping(value = "/api/products")
    public void saveProduct(@RequestBody Product product) {
        productRepository.save(product);
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

    @GetMapping("/api/products/tag/{tagName}")
    public Iterable<Product> getProductsByTag(@PathVariable String tagName) {
        Optional<Tag> tagOptional = tagRepository.findByNameIgnoreCase(tagName);

        if (tagOptional.isPresent()) {
            return tagOptional.get().getProducts();
        } else {
            return new LinkedList<Product>();
        }
    }

    @DeleteMapping("/api/products/{productId}")
    public void removeProductById(@PathVariable int productId) {
        Product product = productRepository.findById(productId).get();
        LinkedList<Tag> tagsToBeRemoved = new LinkedList<>();

        for (Tag t : product.getTags()) {
            if (t.getProducts().size() > 1) {
                // If the tag has other products than the one to be deleted, only remove product from tags.
                t.getProducts().remove(product);
            } else {
                // Remove tag from repository (to be done)
                tagsToBeRemoved.add(t);
            }
        }

        if (tagsToBeRemoved.size() > 0) {
            for (Tag t : tagsToBeRemoved) {
                product.getTags().remove(t);
            }

            tagRepository.deleteAll(tagsToBeRemoved);
        }

        productRepository.deleteById(productId);
    }
}
