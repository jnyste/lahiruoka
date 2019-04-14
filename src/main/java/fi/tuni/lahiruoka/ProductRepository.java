package fi.tuni.lahiruoka;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findAllByOrderByProductIdDesc();
    List<Product> findProductsByNameContainingIgnoreCase(String word);
    List<Product> findProductsByInfoContainingIgnoreCase(String word);
    List<Product> findByTags_Name(List<String> word);
    List<Product> findByFarm(User id);
}
