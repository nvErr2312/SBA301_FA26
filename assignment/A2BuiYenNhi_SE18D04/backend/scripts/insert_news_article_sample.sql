-- Script mẫu chèn dữ liệu vào bảng NewsArticle (và NewsTag nếu có tag).
-- Chạy trong database: A2BuiYenNhi_SE18D04 (hoặc tên DB của bạn).
--
-- Yêu cầu: Đã có ít nhất 1 Category (ví dụ CategoryID = 3) và 1 SystemAccount (ví dụ AccountID = 1).
-- Nếu chưa có Tag, có thể bỏ qua phần INSERT NewsTag hoặc tạo Tag trước.

USE A2BuiYenNhi_SE18D04;
GO

-- Ví dụ: 2 bài viết mẫu
-- CategoryID và CreatedByID phải tồn tại trong bảng Category và SystemAccount.

INSERT INTO NewsArticle (
    NewsTitle,
    Headline,
    CreatedDate,
    NewsContent,
    NewsSource,
    CategoryID,
    NewsStatus,
    CreatedByID,
    UpdatedByID,
    ModifiedDate
) VALUES
(
    N'AI và tương lai giáo dục',
    N'Ứng dụng trí tuệ nhân tạo trong dạy học và đào tạo trực tuyến.',
    GETDATE(),
    N'Nội dung bài viết về AI trong giáo dục: các nền tảng học trực tuyến, công cụ hỗ trợ giảng dạy, và xu hướng EdTech trong năm tới.',
    N'FPT University',
    3,              -- Thay 3 bằng CategoryID thực tế (ví dụ Technology)
    1,              -- 1 = Visible
    1,              -- Thay 1 bằng AccountID của Staff/Admin
    1,
    GETDATE()
),
(
    N'Công nghệ 5G tại Việt Nam',
    N'Tổng quan triển khai mạng 5G và tác động tới doanh nghiệp.',
    GETDATE(),
    N'Bài viết phân tích tình hình triển khai 5G, các nhà mạng, và ứng dụng trong công nghiệp, y tế, giáo dục.',
    N'TechVn',
    3,              -- CategoryID
    1,
    1,
    1,
    GETDATE()
);

-- Nếu có bảng Tag và bảng NewsTag (many-to-many), chèn liên kết bài viết – tag.
-- Giả sử NewsArticleID vừa tạo là 1, 2 và TagID 1, 2 đã tồn tại.

-- INSERT INTO NewsTag (NewsArticleID, TagID) VALUES (1, 1), (1, 2), (2, 1);
-- GO
