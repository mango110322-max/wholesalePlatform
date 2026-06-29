package com.wholesaleplatform.mapper;

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
              status,
              audit_status
            ) VALUES (
              #{sellerId},
              #{name},
              #{categoryName},
              #{price},
              #{stock},
              #{minOrderQuantity},
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
              status,
              audit_status AS auditStatus,
              created_at AS createdAt,
              updated_at AS updatedAt
            FROM product
            WHERE id = #{productId}
            """)
    Product findById(@Param("productId") Long productId);

    @Select("""
            SELECT
              id,
              seller_id AS sellerId,
              name,
              category_name AS categoryName,
              price,
              stock,
              min_order_quantity AS minOrderQuantity,
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
