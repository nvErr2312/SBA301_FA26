package nhiby.example.lab4New.exception;

/**
 * Exception tùy chỉnh: báo "không tìm thấy resource".
 *
 * Cách dùng trong Controller/Service:
 *   if (orchid == null) throw new ResourceNotFoundException("Orchid", id);
 * Hoặc:
 *   throw new ResourceNotFoundException("Không tìm thấy lan với ID " + id);
 *
 * Sau khi ném, GlobalExceptionHandler sẽ bắt và trả về HTTP 404 kèm JSON ErrorResponse.
 */
public class ResourceNotFoundException extends RuntimeException {

    /** Dùng khi đã có sẵn message (vd: "Không tìm thấy lan") */
    public ResourceNotFoundException(String message) {
        super(message);
    }

    /**
     * Dùng khi muốn message chuẩn: "Orchid not found with id: 99"
     * @param resource Tên resource (vd: "Orchid", "Category")
     * @param id       ID không tìm thấy
     */
    public ResourceNotFoundException(String resource, Object id) {
        super(resource + " not found with id: " + id);
    }
}
