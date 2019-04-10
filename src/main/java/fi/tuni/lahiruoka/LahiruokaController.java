package fi.tuni.lahiruoka;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.*;

// Example class.
@RestController
public class LahiruokaController {

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

        User userHenkilo = new User("googleId1", UserType.FARM, "Mikkolan tila", "kukkakuja 450, 33333 Virrat", "049-8573753", "mikkolan tila on niin perinteinen ettei meillä käytetä edes sähköä", LocalDate.of(2019,3,3));
        userHenkilo.addProducts(p, k);
        userRepository.save(userHenkilo);

        User user2 = new User("googleId2", UserType.FARM, "Mummolan tila", "mummotie 444, 45340 riihimäki", "054-6224112", "mummon ruoka on parasta, kaikkihan sen tietää", LocalDate.of(2019,4,3));
        user2.addProducts(pe);
        userRepository.save(user2);

        userRepository.save(new User("googleId3", UserType.KITCHEN, "Mummolammin kotihoito", "mummotie 666, 67340 mikkeli", "054-6765112", "mummot voivat hyvin täällä", LocalDate.of(2019,3,2)));
        userRepository.save(new User("googleId4", UserType.KITCHEN, "Hirsipään keittiö", "maksakuja 1 c 122, 24090 kankaanpää", "054-6223333", "viiden tähden ruokaa, yhden tähden hinnoilla", LocalDate.of(2019,4,7)));
        
        productRepository.save(p);
        productRepository.save(k);
        productRepository.save(pe);
    }


    // -----------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------POST MAPPINGS--------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------

    @PostMapping(value = "/api/products")
    public int saveProduct(@RequestBody Product product) {
        product.getTags().clear();
        productRepository.save(product);
        return product.getProductId();
    }

    @PostMapping("/api/products/{productId}/tag")
    public void saveTagsForProduct(@PathVariable int productId, @RequestBody List<String> tagNames) {
        Optional<Product> productOptional = productRepository.findById(productId);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();

            for (String tagName : tagNames) {
                Optional<Tag> tag = tagRepository.findByNameIgnoreCase(tagName);

                if (tag.isPresent()) {
                    product.getTags().add(tag.get());
                } else {
                    Tag newTag = new Tag(tagName.toLowerCase());
                    tagRepository.save(newTag);
                    product.getTags().add(newTag);
                }
            }

            productRepository.save(product);
        }
    }

    @PostMapping("/api/products/{productId}/farm")
    public void saveFarmToProduct(@PathVariable int productId, @RequestBody int farmId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        Optional<User> farmOptional = getFarmerById(farmId);

        if (productOptional.isPresent() && farmOptional.isPresent()) {
            farmOptional.get().addProducts(productOptional.get());
            userRepository.save(farmOptional.get());
            productRepository.save(productOptional.get());
        }
    }

    @PostMapping("/api/users")
    public int saveUser(@RequestBody User user) {
        user.getProducts().clear();
        user.setLastLogin(LocalDate.now());
        userRepository.save(user);
        return user.getId();
    }

    // -----------------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------GET MAPPING---------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------

    @GetMapping("/api/users")
    public Iterable<User> hello() {
        return userRepository.findAll();
    }

    @GetMapping("/api/users/{googleId}")
    public Optional<User> findUserByGoogleId(@PathVariable String googleId) {
        return userRepository.findUserByGoogleId(googleId);
    }

    @GetMapping("/api/products")
    public Iterable<Product> products() {
        return productRepository.findAllByOrderByProductIdDesc();
    }

    @GetMapping("/api/products/{productId}")
    public Optional<Product> getProductById(@PathVariable int productId) {
        return productRepository.findById(productId);
    }

    @GetMapping("/api/farm/{farmerId}")
    public Optional<User> getFarmerById(@PathVariable int farmerId) {
        Optional<User> userOptional = userRepository.findById(farmerId);

        if (userOptional.isPresent()) {
            if (userOptional.get().getUserType() == UserType.FARM) {
                return userOptional;
            } else {
                return Optional.empty();
            }
        }

        return userOptional;
    }

    @GetMapping("/api/farm/{farmerId}/products")
    public Iterable<Product> productsByFarmer(@PathVariable int farmerId) {
        Optional<User> u = userRepository.findById(farmerId);
        if(u.isPresent()) {
            return u.get().getProducts();
        } else {
            return new LinkedList<Product>();
        }
    }

    // GetMappings for searches

    @GetMapping("/api/products/tag/{tagName}")
    public Iterable<Product> getProductsByTag(@PathVariable String tagName) {
        Optional<Tag> tagOptional = tagRepository.findByNameIgnoreCase(tagName);

        if (tagOptional.isPresent()) {
            return tagOptional.get().getProducts();
        } else {
            return new LinkedList<Product>();
        }
    }

    @GetMapping("/api/products/name/{containsWord}")
    public Iterable<Product> getProductsByTitleContaining(@PathVariable String containsWord) {
        return productRepository.findProductsByNameContainingIgnoreCase(containsWord);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------PUT MAPPING---------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------

    @PutMapping("/api/products/{productId}")
    public void modifyProduct(@PathVariable int productId, @RequestBody ObjectNode updatedProduct) {
        Optional<Product> productOpt = productRepository.findById(productId);

        String name = updatedProduct.get("name").asText();
        double price = updatedProduct.get("price").asDouble();
        double amount = updatedProduct.get("amount").asDouble();;
        LocalDate availableFrom = LocalDate.parse(updatedProduct.get("availableFrom").asText());
        LocalDate availableTo = LocalDate.parse(updatedProduct.get("availableTo").asText());;
        String info = updatedProduct.get("info").asText();

        ArrayNode tagArray = (ArrayNode) updatedProduct.get("tags");
        LinkedList<String> tags = new LinkedList<>();

        for (int i = 0; i < tagArray.size(); i++) {
            tags.add(tagArray.get(i).asText());
        }

        if (productOpt.isPresent()) {
            Product product = productOpt.get();

            product.setName(name);
            product.setPrice(price);
            product.setAmount(amount);
            product.setAvailableFrom(availableFrom);
            product.setAvailableTo(availableTo);
            product.setInfo(info);

            updateProductTags(product, tags);

            productRepository.save(product);
        }
    }

    public void updateProductTags(Product product, List<String> tags) {
        LinkedList<Tag> tagsToBeRemoved = new LinkedList<>();

        for (Tag t : product.getTags()) {
            if (t.getProducts().size() > 1) {
                t.getProducts().remove(product);
            } else {
                tagsToBeRemoved.add(t);
            }
        }

        if (tagsToBeRemoved.size() > 0) {
            for (Tag t : tagsToBeRemoved) {
                product.getTags().remove(t);
            }

            tagRepository.deleteAll(tagsToBeRemoved);
        }

        saveTagsForProduct(product.getProductId(), tags);
    }

    @PutMapping("/api/user/{userId}")
    public void modifyUser(@PathVariable int userId, @RequestBody ObjectNode updatedUser) {
        Optional<User> userOptional = userRepository.findById(userId);

        String companyName = updatedUser.get("companyName").asText();
        String address = updatedUser.get("address").asText();
        String phone = updatedUser.get("phone").asText();
        String info = updatedUser.get("info").asText();

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            user.setCompanyName(companyName);
            user.setAddress(address);
            user.setPhone(phone);
            user.setInfo(info);

            userRepository.save(user);
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------DELETE MAPPING--------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------

    @DeleteMapping("/api/products/{productId}")
    public void removeProductById(@PathVariable int productId) {
        Product product = productRepository.findById(productId).get();
        LinkedList<Tag> tagsToBeRemoved = new LinkedList<>();

        for (Tag t : product.getTags()) {
            if (t.getProducts().size() > 1) {
                t.getProducts().remove(product);
            } else {
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

    @DeleteMapping("/api/users/{userId}")
    public void removeUserById(@PathVariable int userId) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getUserType().equals(UserType.FARM)) {
                Set<Product> products = user.getProducts();

                for (Product product : products) {
                    removeProductById(product.getProductId());
                }
            } else {
                // productien poistaminen tilauksesta, en voi vielä tehdä, kun tilausten backend ei ole valmis
            }

            userRepository.delete(user);
        }
    }
}
