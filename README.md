# Hei, Norsk!

Website tự học tiếng Na Uy Bokmål cho người Việt: 48 phiên bài học, 4 phiên ôn tổng, 507 thẻ, quiz và bài luyện nghe/nói/viết. Bài trắc nghiệm nội bộ không phải bài thi chứng nhận A1.

## Chạy tại máy

Không cần cài dependency hay build ứng dụng. Tại thư mục dự án:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Tiến độ lưu trong localStorage `heinorsk.v1`, không đồng bộ giữa thiết bị. Xuất JSON trong trang Tiến độ trước khi chuyển máy hoặc xóa dữ liệu. Giữ nguyên ID thẻ và phiên khi sửa nội dung để bảo toàn tiến độ. Nếu dữ liệu cũ sai định dạng, web giữ một bản gốc ở `heinorsk.v1.recovery` và cho tải xuống tại trang Tiến độ.

## Kiểm tra

```sh
node --check app.js
node --check data.js
python3 tests/smoke.py
```

Bộ kiểm thử cần Python Playwright và Chromium ở `/usr/bin/chromium` (đã có trong môi trường cloud hiện tại). Nó tự mở máy chủ tạm và dùng dữ liệu trình duyệt riêng; không đụng vào tiến độ thật. Các kiểm tra bao gồm 80 câu quiz, đề 30 câu, lịch ôn qua ngày đổi giờ Europe/Oslo, tương tác bàn phím, chép chính tả, nhập tiến độ, điều hướng và giao diện điện thoại.

## Cập nhật website

Website được người dùng xác nhận ở `https://letsstudy222.github.io/nauy/`. Các tệp ứng dụng nằm tại thư mục gốc. Đẩy bản đã kiểm tra lên nhánh `main`; việc xuất bản phụ thuộc cấu hình GitHub Pages của kho. Không coi push thành công là bằng chứng deploy thành công: cần kiểm tra trang công khai và các asset mới. Khi đổi CSS/JS, cập nhật phiên bản query trong `index.html` để tránh dùng asset đã lưu đệm. Không đổi tên miền hoặc đường dẫn site vì localStorage gắn với origin.

## Phương pháp và nguồn đối chiếu

Hướng dẫn học nhấn mạnh luyện nhớ lại, ôn cách quãng, phản hồi lỗi và thực hành giao tiếp. Lịch Leitner 1–3–7–14–30 ngày là quy tắc của ứng dụng, không phải kết quả nghiên cứu xác định lịch tối ưu cho mọi người. Tài liệu tham khảo được liên kết trên trang chủ:

- Dunlosky et al. (2013), DOI `10.1177/1529100612453266`.
- Roediger & Karpicke (2006), DOI `10.1111/j.1467-9280.2006.01693.x`.
- NTNU Norwegian on the Web, Ordbøkene, HK-dir và UDI.

Lần rà soát này không truy cập được các trang nguồn bên ngoài và trang công khai do proxy trả HTTP 403; các liên kết là tài liệu tham khảo, không được trình bày như thông tin vừa xác minh trực tuyến. Quy định cư trú, điều kiện thi và giờ mở cửa cần kiểm tra tại nguồn hiện hành. Phát âm máy chưa được kiểm chứng bằng nghe thực tế; chất lượng phụ thuộc giọng Na Uy cài trên thiết bị.
