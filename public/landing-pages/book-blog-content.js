// Nội dung cuốn đầu tiên. Sửa tại đây rồi tải lại trang.
export const projectBook = {
  id: "book-blog",
  title: "Book-blog",
  discipline: "Giới thiệu dự án",
  note: "Một kệ sách tương tác để khám phá nội dung theo từng trang.",
  deck: "Book-blog là dự án web trình bày nội dung dưới dạng những cuốn sách 3D. Bạn có thể chọn sách trên kệ, mở bìa, lật trang và khám phá thông tin ngay trong trình duyệt.",
  binding: "Bìa xanh đậm · chữ ánh đồng",
  format: "8 trang giới thiệu · bản thử nghiệm",
  theme: "Nội dung kết hợp trải nghiệm đọc tương tác",
  motif: "Những trang sách mở",
  chapters: ["Ý tưởng", "Trải nghiệm", "Công nghệ"],
  spreadLabels: ["Giới thiệu", "Ý tưởng · Khám phá", "Tương tác · Công nghệ", "Cấu trúc · Chạy dự án", "Hướng phát triển"],
  pages: [
    {
      title: "Book-blog",
      kicker: "01 / GIỚI THIỆU",
      paragraphs: [
        "Một kệ sách số, nơi mỗi cuốn sách mở ra một câu chuyện về dự án.",
        "Bản mẫu này kết hợp nội dung tiếng Việt với sách 3D: chọn một cuốn, mở bìa và lật từng trang để tìm hiểu.",
        "Đây là phần giới thiệu chính ứng dụng Book-blog đang chạy trước mắt bạn."
      ]
    },
    {
      title: "Ý tưởng",
      kicker: "02 / MỤC ĐÍCH",
      paragraphs: [
        "Book-blog thử nghiệm cách trình bày nội dung như một thư viện nhỏ, thay cho danh sách bài viết thông thường.",
        "Mỗi cuốn có tên, bìa, lời giới thiệu và các trang riêng. Người đọc khám phá nội dung qua thao tác trực tiếp với cuốn sách.",
        "Cuốn đầu tiên giới thiệu dự án; sáu cuốn còn lại giữ nội dung mẫu ban đầu."
      ]
    },
    {
      title: "Khám phá kệ",
      kicker: "03 / BẮT ĐẦU",
      paragraphs: [
        "Dùng hai nút mũi tên, con lăn chuột hoặc các dấu chỉ mục để chọn một cuốn sách trên kệ.",
        "Tên và mô tả ở cuối màn hình cho biết cuốn đang được chọn. Màu nền chuyển theo từng cuốn.",
        "Nhấn Open hoặc bấm trực tiếp vào cuốn sách để chuyển sang chế độ xem chi tiết."
      ]
    },
    {
      title: "Mở và đọc",
      kicker: "04 / TƯƠNG TÁC",
      paragraphs: [
        "Trong chế độ chi tiết, nhấn Open book hoặc bấm vào bìa để mở sách.",
        "Dùng các nút chuyển trang, phím mũi tên hoặc kéo trang để đọc tiếp. Bạn cũng có thể kéo vùng nền để đổi góc nhìn.",
        "Reset view đưa góc nhìn về ban đầu. Nút đóng hoặc phím Escape đưa cuốn sách trở lại kệ."
      ]
    },
    {
      title: "Công nghệ",
      kicker: "05 / NỀN TẢNG",
      paragraphs: [
        "React và TypeScript tạo phần ứng dụng bao quanh kệ sách. Vite phục vụ môi trường phát triển và đóng gói bản chạy.",
        "Three.js r165 dựng hình sách, ánh sáng, chất liệu và chuyển động lật trang. HTML và CSS trình bày các nút và thông tin.",
        "Kệ sách dựa trên CompleteShelfLandingPage của ThreeUI, được phục vụ trong một iframe cùng dự án."
      ]
    },
    {
      title: "Cấu trúc",
      kicker: "06 / BÊN TRONG",
      paragraphs: [
        "Scene.tsx đặt kệ sách vào ứng dụng và cấu hình kiểu chữ, màu nhấn cùng kích thước chữ.",
        "Bản HTML gốc được giữ nguyên. Ứng dụng dùng một bản tùy biến được tạo từ nguồn đó cho cuốn Book-blog.",
        "Nội dung cuốn này nằm trong book-blog-content.js: bạn có thể sửa tên, mô tả và từng đoạn văn tại một nơi."
      ]
    },
    {
      title: "Chạy dự án",
      kicker: "07 / THỰC HÀNH",
      paragraphs: [
        "Mở thư mục dự án, chạy npm install để cài các thư viện cần thiết.",
        "Chạy npm run dev, rồi mở địa chỉ mà Vite hiển thị trong terminal để xem ứng dụng.",
        "Dùng npm run build để tạo bản phát hành và npm run preview để xem thử. Trình duyệt cần kết nối mạng để tải Three.js và phông Inter."
      ]
    },
    {
      title: "Bước tiếp theo",
      kicker: "08 / HƯỚNG PHÁT TRIỂN",
      paragraphs: [
        "Có thể phát triển mỗi cuốn thành một hồ sơ dự án, nhật ký học tập hoặc tuyển tập bài viết.",
        "Các ý tưởng tiếp theo gồm tìm kiếm nội dung, thêm sách mới và một giao diện biên tập thuận tiện.",
        "Đây là những hướng mở rộng, chưa phải tính năng đã có. Hiện tại, bản mẫu tập trung vào trải nghiệm kệ sách và đọc các trang giới thiệu."
      ]
    }
  ]
};
