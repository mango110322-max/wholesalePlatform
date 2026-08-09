package com.wholesaleplatform.mapper;

import com.wholesaleplatform.dto.ProductUpdateRequest;
import com.wholesaleplatform.entity.Product;
import java.util.List;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface ProductMapper {

    @Insert("""
            INSERT INTO product (
              seller_id,
              name,
              category_name,
              price,
              stock,
              min_order_quantity,
              main_image_url,
              status,
              audit_status
            ) VALUES (
              #{sellerId},
              #{name},
              #{categoryName},
              #{price},
              #{stock},
              #{minOrderQuantity},
              #{mainImageUrl},
              #{status},
              #{auditStatus}
            )
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Product product);

    @Select("""
            <script>
            SELECT
              id,
              seller_id AS sellerId,
              name,
              category_name AS categoryName,
              price,
              stock,
              min_order_quantity AS minOrderQuantity,
              main_image_url AS mainImageUrl,
              status,
              audit_status AS auditStatus,
              created_at AS createdAt,
              updated_at AS updatedAt
            FROM product
            WHERE 1 = 1
            <if test="status != null and status != ''">
              AND status = #{status}
            </if>
            <if test="auditStatus != null and auditStatus != ''">
              AND audit_status = #{auditStatus}
            </if>
            ORDER BY id DESC
            </script>
            """)
    List<Product> findByCondition(
            @Param("status") String status,
            @Param("auditStatus") String auditStatus
    );

    @Update("""
            UPDATE product
            SET audit_status = #{auditStatus}
            WHERE id = #{productId}
            """)
    int updateAuditStatus(
            @Param("productId") Long productId,
            @Param("auditStatus") String auditStatus
    );

    @Update("""
            UPDATE product
            SET status = #{status}
            WHERE id = #{productId}
            """)
    int updateStatus(
            @Param("productId") Long productId,
            @Param("status") String status
    );

    @Select("""
            SELECT
              id,
              seller_id AS sellerId,
              name,
              category_name AS categoryName,
              price,
              stock,
              min_order_quantity AS minOrderQuantity,
              main_image_url AS mainImageUrl,
              status,
              audit_status AS auditStatus,
              created_at AS createdAt,
              updated_at AS updatedAt
            FROM product
            WHERE id = #{productId}
            """)
    Product findById(@Param("productId") Long productId);

    @Update("""
            <script>
            UPDATE product
            <set>
              <if test="request.name != null">
                name = #{request.name},
              </if>
              <if test="request.categoryName != null">
                category_name = #{request.categoryName},
              </if>
              <if test="request.price != null">
                price = #{request.price},
              </if>
              <if test="request.stock != null">
                stock = #{request.stock},
              </if>
              <if test="request.minOrderQuantity != null">
                min_order_quantity = #{request.minOrderQuantity},
              </if>
              <if test="request.mainImageUrl != null">
                main_image_url = #{request.mainImageUrl},
              </if>
            </set>
            WHERE id = #{productId}
            </script>
            """)
    int update(
            @Param("productId") Long productId,
            @Param("request") ProductUpdateRequest request
    );

    @Select("""
            SELECT
              id,
              seller_id AS sellerId,
              name,
              category_name AS categoryName,
              price,
              stock,
              min_order_quantity AS minOrderQuantity,
              main_image_url AS mainImageUrl,
              status,
              audit_status AS auditStatus,
              created_at AS createdAt,
              updated_at AS updatedAt
            FROM product
            WHERE status = 'ON_SHELF'
              AND audit_status = 'APPROVED'
              AND stock > 0
            ORDER BY id DESC
            """)
    List<Product> findBuyerVisibleProducts();
}
