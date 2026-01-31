package nhiby.example.slot5.services;

import nhiby.example.slot5.pojos.Product;

import java.util.List;

public interface IProductService {
    public List<Product> getAllProducts();
    public Product getProductById(int id);
    public Product addProduct(Product product);
    public Product updateProduct(Product product);
    public boolean deleteProduct(int id);
    public List<Product> searchProductsByName(String name);


}
