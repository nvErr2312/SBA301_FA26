-- Script chèn dữ liệu mẫu vào bảng Tag.
-- Chạy trong database: A2BuiYenNhi_SE18D04 (hoặc tên DB của bạn).
-- Chạy trước hoặc cùng lúc với insert_news_article_sample.sql nếu muốn gắn tag cho bài viết.

USE A2BuiYenNhi_SE18D04;
GO

-- Chèn một số tag mẫu (TagID tự tăng, chỉ cần TagName và Note).
INSERT INTO Tag (TagName, Note) VALUES
    (N'Công nghệ', N'Tin tức về công nghệ, phần mềm, phần cứng'),
    (N'Giáo dục', N'Tin giáo dục, đào tạo, trường học'),
    (N'AI', N'Trí tuệ nhân tạo, machine learning'),
    (N'5G', N'Mạng 5G, viễn thông'),
    (N'Tin tức', N'Tin tổng hợp'),
    (N'FPT', N'Liên quan FPT University / FPT');
GO
