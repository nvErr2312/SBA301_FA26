package nhiby.example.lab4New.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

/**
 * DTO (Data Transfer Object) mô tả format JSON trả về khi API báo lỗi.
 * Thay vì trả trang HTML lỗi mặc định, backend luôn trả một object có cấu trúc cố định
 * để frontend dễ parse và hiển thị thông báo.
 *
 * Ví dụ JSON trả về (404):
 * { "status": 404, "message": "Orchid not found with id: 99", "path": "/api/orchids/99", "timestamp": "..." }
 *
 * Ví dụ JSON trả về (400 validation):
 * { "status": 400, "message": "Dữ liệu không hợp lệ", "path": "/api/orchids", "timestamp": "...", "errors": ["name: không được để trống"] }
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // Bỏ qua field null khi chuyển sang JSON
public class ErrorResponse {

    /** Mã HTTP (404, 400, 500...) */
    private int status;

    /** Thông báo lỗi ngắn gọn */
    private String message;

    /** Đường dẫn API gây lỗi (vd: /api/orchids/99) */
    private String path;

    /** Thời điểm xảy ra lỗi */
    private Instant timestamp;

    /** Chi tiết lỗi validation (chỉ có khi 400 Bad Request - dữ liệu không hợp lệ) */
    private List<String> errors;

    /**
     * Tạo ErrorResponse đơn giản (dùng cho 404, 400, 500 không kèm danh sách lỗi).
     */
    public static ErrorResponse of(int status, String message, String path) {
        return ErrorResponse.builder()
                .status(status)
                .message(message)
                .path(path)
                .timestamp(Instant.now())
                .build();
    }
}
