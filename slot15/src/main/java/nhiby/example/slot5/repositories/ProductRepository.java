package nhiby.example.slot5.repositories;

import jakarta.annotation.PostConstruct;
import nhiby.example.slot5.pojos.Product;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepository implements IProductRepository {

    private List<Product> list = new ArrayList<>();

    @PostConstruct
    public void init() {
        createProducts();
    }

    public void createProducts() {
        list = new ArrayList<>(List.of(
                new Product(1, "Product A", 10.0, "Description A", 100),
                new Product(2, "Product B", 20.0, "Description B", 200),
                new Product(3, "Product C", 30.0, "Description C", 300)
        ));
    }

    @Override
    public List<Product> getAllProducts() {
        return list;
    }

    @Override
    public Product getProductById(int id) {
        for (Product p : list) if (p.getId() == id) return p;
        return null;
    }

    @Override
    public Product addProduct(Product product) {
        Product newProduct = new Product(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getQuantity()
        );
        list.add(newProduct);
        return newProduct;
    }

    @Override
    public Product updateProduct(Product product) {
        for (Product p : list) {
            if (p.getId() == product.getId()) {
                p.setName(product.getName());
                p.setPrice(product.getPrice());
                p.setDescription(product.getDescription());
                p.setQuantity(product.getQuantity());
                return p;
            }
        }
        return null;
    }

    @Override
    public boolean deleteProduct(int id) {
        return list.removeIf(p -> p.getId() == id);
    }

    @Override
    public List<Product> searchProductsByName(String name) {
        List<Product> result = new ArrayList<>();
        for (Product p : list) {
            if (p.getName().toLowerCase().contains(name.toLowerCase())) {
                result.add(p);
            }
        }
        return result;
    }
}
