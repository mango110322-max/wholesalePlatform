package com.wholesaleplatform.service;

import com.wholesaleplatform.dto.ProductCreateRequest;
import com.wholesaleplatform.dto.ProductResponse;
import com.wholesaleplatform.dto.ProductUpdateRequest;
import com.wholesaleplatform.entity.Product;
import com.wholesaleplatform.mapper.ProductMapper;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProductService {

    private static final String DEFAULT_STATUS = "DRAFT";
    private static final String DEFAULT_AUDIT_STATUS = "PENDING";
    private static final String APPROVED_AUDIT_STATUS = "APPROVED";
    private static final String ON_SHELF_STATUS = "ON_SHELF";

    private final ProductMapper productMapper;

    public ProductService(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    public ProductResponse createProduct(ProductCreateRequest request) {
        Product product = new Product();
        product.setSellerId(request.getSellerId());
        product.setName(request.getName());
        product.setCategoryName(request.getCategoryName());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setMinOrderQuantity(request.getMinOrderQuantity());
        product.setMainImageUrl(request.getMainImageUrl());
        product.setStatus(DEFAULT_STATUS);
        product.setAuditStatus(DEFAULT_AUDIT_STATUS);

        productMapper.insert(product);

        return ProductResponse.from(product);
    }

    public ProductResponse getProductById(Long productId) {
        Product product = productMapper.findById(productId);

        if (product == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "商品不存在");
        }

        return ProductResponse.from(product);
    }

    public List<ProductResponse> getProductList(String status, String auditStatus) {
        return productMapper.findByCondition(status, auditStatus)
                .stream()
                .map(ProductResponse::from)
                .toList();
    }

    public ProductResponse auditProduct(Long productId, String auditStatus) {
        productMapper.updateAuditStatus(productId, auditStatus);

        Product product = productMapper.findById(productId);

        return ProductResponse.from(product);
    }

    public ProductResponse updateProductStatus(Long productId, String status) {
        Product product = productMapper.findById(productId);

        if (product == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "商品不存在");
        }

        if (ON_SHELF_STATUS.equals(status)
                && !APPROVED_AUDIT_STATUS.equals(product.getAuditStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "商品审核通过后才能上架");
        }

        productMapper.updateStatus(productId, status);

        Product updatedProduct = productMapper.findById(productId);

        return ProductResponse.from(updatedProduct);
    }

    public List<ProductResponse> getBuyerVisibleProductList() {
        return productMapper.findBuyerVisibleProducts()
                .stream()
                .map(ProductResponse::from)
                .toList();
    }

    public ProductResponse updateProduct(Long productId, ProductUpdateRequest request) {
        Product product = productMapper.findById(productId);

        if (product == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "商品不存在");
        }

        if (!hasUpdateFields(request)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "没有需要更新的商品信息");
        }

        productMapper.update(productId, request);

        Product updatedProduct = productMapper.findById(productId);

        return ProductResponse.from(updatedProduct);
    }

    private boolean hasUpdateFields(ProductUpdateRequest request) {
        return request.getName() != null
                || request.getCategoryName() != null
                || request.getPrice() != null
                || request.getStock() != null
                || request.getMinOrderQuantity() != null
                || request.getMainImageUrl() != null;
    }
}
