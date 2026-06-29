package com.wholesaleplatform.controller;

import com.wholesaleplatform.dto.ProductCreateRequest;
import com.wholesaleplatform.dto.ProductResponse;
import com.wholesaleplatform.dto.ProductStatusRequest;
import com.wholesaleplatform.service.ProductService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/seller/products")
public class SellerProductController {

    private final ProductService productService;

    public SellerProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ProductResponse createProduct(@RequestBody ProductCreateRequest request) {
        return productService.createProduct(request);
    }

    @GetMapping
    public List<ProductResponse> getProductList(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String auditStatus
    ) {
        return productService.getProductList(status, auditStatus);
    }

    @PatchMapping("/{productId}/status")
    public ProductResponse updateProductStatus(
            @PathVariable Long productId,
            @RequestBody ProductStatusRequest request
    ) {
        return productService.updateProductStatus(productId, request.getStatus());
    }
}
