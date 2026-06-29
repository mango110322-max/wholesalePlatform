package com.wholesaleplatform.controller;

import com.wholesaleplatform.dto.ProductResponse;
import com.wholesaleplatform.service.ProductService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/buyer/products")
public class BuyerProductController {

    private final ProductService productService;

    public BuyerProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductResponse> getVisibleProductList() {
        return productService.getBuyerVisibleProductList();
    }
}
