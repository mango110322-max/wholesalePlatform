package com.wholesaleplatform.controller;

import com.wholesaleplatform.dto.ProductAuditRequest;
import com.wholesaleplatform.dto.ProductResponse;
import com.wholesaleplatform.service.ProductService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/admin/products")
public class AdminProductController {

    private final ProductService productService;

    public AdminProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductResponse> getProductList(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String auditStatus
    ) {
        return productService.getProductList(status, auditStatus);
    }

    @PatchMapping("/{productId}/audit")
    public ProductResponse auditProduct(
            @PathVariable Long productId,
            @RequestBody ProductAuditRequest request
    ) {
        return productService.auditProduct(productId, request.getAuditStatus());
    }
}
