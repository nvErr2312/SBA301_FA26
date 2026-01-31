package nhiby.example.lab4New.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Global Exception Handler: bắt mọi exception ném ra từ Controller và chuyển thành JSON.
 *
 * Luồng xử lý:
 * 1. Controller (vd: OrchidController) gọi service, nếu không tìm thấy → ném ResourceNotFoundException
 * 2. Spring không tìm thấy handler trong Controller → chuyển sang @RestControllerAdvice
 * 3. GlobalExceptionHandler có method được đánh dấu @ExceptionHandler(ResourceNotFoundException.class)
 * 4. Method đó tạo ErrorResponse, set status 404, trả ResponseEntity → client nhận JSON thống nhất
 *
 * Thứ tự ưu tiên: handler cụ thể (404, 400) được gọi trước; Exception.class bắt mọi thứ còn lại (500).
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // --- 1. 404 Not Found: không tìm thấy resource (vd: orchid ID không tồn tại) ---
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex,
            HttpServletRequest request
    ) {
        ErrorResponse body = ErrorResponse.of(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    // --- 2. 400 Bad Request: dữ liệu gửi lên không hợp lệ (vd: @Valid fail) ---
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            MethodArgumentNotValidException ex,
            HttpServletRequest request
    ) {
        List<String> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.toList());
        ErrorResponse body = ErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message("Dữ liệu không hợp lệ")
                .path(request.getRequestURI())
                .timestamp(java.time.Instant.now())
                .errors(errors)
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    // --- 3. 400 Bad Request: tham số sai kiểu (vd: /api/orchids/abc thay vì số) ---
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex,
            HttpServletRequest request
    ) {
        String message = "Tham số không hợp lệ: " + ex.getName();
        ErrorResponse body = ErrorResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                message,
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    // --- 4. 500 Internal Server Error: mọi exception khác chưa được xử lý ở trên ---
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(
            Exception ex,
            HttpServletRequest request
    ) {
        String message = ex.getMessage() != null ? ex.getMessage() : "Lỗi máy chủ";
        ErrorResponse body = ErrorResponse.of(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                message,
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
