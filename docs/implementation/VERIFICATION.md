# Kiểm thử Ocean Project ngày 27/11/2026

Ứng dụng mở từ `App.tsx` qua `DesignApp.tsx`, dùng Expo SDK 58 và Supabase. Có 116 màn hình sản phẩm cùng 5 trạng thái logo từ trang High-Fidelity trong Figma. Cả 121 frame đã có ảnh Expo Web để đối chiếu và đều xuất hiện trong ít nhất một kịch bản chạy qua giao diện. Nghiệm thu trên iPhone và Android vẫn đang chờ.

[Mã nguồn ứng dụng đã kiểm tra · 48206f6](https://github.com/imnothoan/Ocean-Project/commit/48206f6b093d1d40da76afe42c86396d00f7a5a8) · [Xem 50 trang ảnh giao diện](VISUAL_REVIEW.pdf) · [Tra cứu bằng Figma node ID hoặc tên component](SCREEN_CHECKS.csv) · [Mở trang High-Fidelity](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---GPT-Code?node-id=101-2721)

## Cách xem và chạy

- Tải PDF rồi bấm vào ảnh để mở đúng frame Figma. Phụ lục có ảnh khi gửi báo cáo kèm hai ảnh, bình luận, điểm danh, ghi tổng kết và dùng app ở bốn chiều rộng.
- Trong thư mục repo, chạy `npm ci` và `npx expo start --go --lan`. Điện thoại dùng Expo Go tương thích SDK 58 và cùng Wi-Fi với máy tính. Quét QR do terminal tạo. Để thử trên trình duyệt, dùng `npm run web`.
- Từ bản đồ, nút dấu cộng mở báo cáo. Tab Community mở bài viết. Tab lịch mở sự kiện. Tab hồ sơ cho phép đăng ký hoặc đăng nhập, xem điểm, bài đã lưu và lịch sử cá nhân.
- Chủ sự kiện xem đăng ký và mở mã điểm danh trong phần quản lý sự kiện. Thành viên được duyệt có thể nhập mã. Trang quản trị chỉ mở với tài khoản đã được cấp `app_metadata.role = admin` ở phía máy chủ. Bài thử dùng ba tài khoản riêng cho thành viên, người tổ chức và quản trị.
- App khôi phục mật khẩu bằng liên kết đặt lại hoặc mã Supabase gửi qua email. Luồng đăng ký, xác nhận và khôi phục đã được thử với GoTrue và hộp thư Mailpit của môi trường kiểm thử riêng.

## Các thao tác đã kiểm tra

| Luồng | Kết quả quan sát trên giao diện web |
|---|---|
| Tài khoản, hồ sơ | Đăng ký, nhận thư, xác nhận, sửa tên, tải lên rồi xóa ảnh riêng. Tải lại trang vẫn còn phiên. Sau khi đăng xuất và đặt mật khẩu mới, đăng nhập lại thành công. Tài khoản thành viên bị chặn ở trang quản trị. |
| Cộng đồng | Đăng bài có ảnh, thích bài và gửi bình luận. Tham gia nhóm, mở danh sách thành viên, tìm hồ sơ, theo dõi rồi bỏ theo dõi. Mở màn chia sẻ từ bài đã đăng. |
| Báo cáo ô nhiễm | Đính kèm hai ảnh, thử tiếp tục khi còn thiếu địa điểm, nhập vị trí, chọn mức độ và loại rác, xem lại rồi gửi. Mã rút gọn vừa khung và chia sẻ đúng định danh đầy đủ. Chủ báo cáo sửa nội dung, bổ sung bằng chứng và theo dõi trạng thái. |
| Sinh vật và bản đồ | Dùng vị trí do trình duyệt mô phỏng, gửi quan sát sinh vật rồi tìm lại trên bản đồ. Đã thử quyền vị trí bị từ chối, bộ lọc, chú giải, chi tiết địa điểm và màn chỉ đường. |
| Xử lý báo cáo | Quản trị nhận báo cáo, chuyển sang đang xử lý rồi đánh dấu đã giải quyết. Luồng từ chối yêu cầu lý do. Thành viên đọc thông báo, lịch sử và kết quả bằng tài khoản của mình. |
| Sự kiện | Tạo qua bốn bước, sửa, tìm sự kiện, đổi tháng và ngày trên lịch. Thành viên đăng ký, chủ sự kiện duyệt. Mã sai bị từ chối, mã đúng ghi nhận lượt điểm danh và mở chứng nhận. Khi trình duyệt từ chối camera, ô nhập mã vẫn sử dụng được. |
| Sau sự kiện | Checklist cập nhật được. Hai tài khoản đọc được tin nhắn đã gửi. Thành viên ghi phản hồi. Người tổ chức kết thúc sự kiện, lưu ảnh tổng kết, 12 kg thu gom và 8 kg có thể tái chế vào dữ liệu thử. Màn tác động đọc lại các con số đó. |
| Tình nguyện | Nộp đơn bằng tài khoản thử đủ tiêu chí. Quản trị duyệt, thành viên học tuần tự ba bài, hoàn thành sáu mục an toàn và làm bài kiểm tra mười câu. Tiến độ lưu trên Supabase. |
| Kiến thức và thành tích | Tìm và lọc danh mục, đọc chi tiết, lưu và bỏ lưu bài, hoàn thành hướng dẫn và bài phân loại. Tham gia rồi rời bảng xếp hạng. Đã mở lịch sử điểm, huy hiệu theo loại, chi tiết cấp độ và phần thưởng. Một lượt thích và một bình luận trên cùng bài được tính một lần vào nhiệm vụ trong ngày. |
| Tác động | Chọn địa điểm từ bản đồ, tra và so sánh vùng, mở xu hướng và thành phần rác. Tải được CSV, PNG và mở tài liệu PDF của chức năng in trên web. PDF của hệ điều hành và bảng chia sẻ native còn chờ thử trên điện thoại. |
| Quyên góp | Chọn chiến dịch thứ hai, lưu cam kết `pending` và tìm lại đúng chiến dịch trong lịch sử tài khoản. Kiểm tra chứng nhận và in bằng một bản ghi đã xác nhận được tạo riêng cho bài thử. Bản chạy hiện chưa kết nối cổng thanh toán. |
| Trạng thái tải, lỗi và bố cục | Khi API sự kiện trả lỗi, app hiện nút thử lại và tải được dữ liệu khi kết nối phục hồi. Kiểm tra điều hướng, cuộn và nhập nội dung ở 320, 393, 430 và 768 px. Năm trạng thái logo xuất hiện tuần tự trước bản đồ khi khởi động bản phát hành. |

## Bằng chứng và phạm vi

Bộ ảnh dùng một đường vào dành riêng cho kiểm tra để chọn frame, cùng component, bộ điều khiển và dữ liệu Supabase của app. Vùng an toàn được mô phỏng ở khung 393 × 852 px. Mỗi dòng CSV ghi node Figma, component, kịch bản web và trạng thái thiết bị. Các kịch bản được chạy riêng qua giao diện app, gồm cả những màn cần đăng nhập, chọn một bản ghi hoặc có vai trò cụ thể.

Cột `mean_rgb_difference` lấy trung bình chênh lệch ba kênh màu trong vùng nội dung y=59…819, sau khi đưa cả hai ảnh về 70 × 138 px. Giá trị 0 là trùng màu trong phép đo này. Chữ và ảnh do người dùng cung cấp, số liệu, bản đồ trực tuyến, trạng thái trống và phần nội dung nằm dưới vùng nhìn đều ảnh hưởng việc đọc kết quả. PDF chỉ chứa ảnh ứng dụng. Từng frame Figma gốc mở qua liên kết.

Bộ ảnh dùng tài khoản thành viên, người tổ chức và quản trị trên dữ liệu lớp học tách biệt. Các luồng ghi dữ liệu sử dụng Auth, PostgreSQL, PostgREST và Storage chạy thật trong môi trường này. Với project Supabase của lớp, bản web phát hành đã khởi động tới bản đồ, mở tab sự kiện và đọc thành công bốn API công khai. Quyền truy cập và thay đổi trạng thái cũng được thử bằng giao dịch SQL hoàn tác.

## Bản dựng và database

| Kiểm tra | Kết quả |
|---|---|
| Cài đúng lockfile, TypeScript | `npm ci`, `npm run typecheck` đạt |
| Kiểm thử tự động | 20/20 test đạt qua `npm test` |
| Tương thích SDK | 20/20 mục đạt qua `npx expo-doctor` |
| Bản xuất Release | `npx expo export --platform all` xuất hai bundle Hermes cho iOS, Android và bản web có thể mở bằng HTTP |
| Migration | 21/21 bản ghi trong repo khớp project lớp theo version, tên và nội dung SQL đã chuẩn hóa |
| SQL | Sáu bộ kiểm tra giao dịch có `ROLLBACK` đạt trên database thử và project lớp. Bao gồm quyền sở hữu, quản trị, giới hạn người tham gia, tập huấn, điểm học tập và nhiệm vụ hỗ trợ bài viết theo ngày |
| Supabase Security Advisor | Không có cảnh báo nào tại lần kiểm tra ngày 27/11/2026 |

[Migration và hướng dẫn cho database mới](../../supabase/README.md) · [Sáu bộ kiểm tra SQL](../../tests/sql)

### Chạy lại kiểm tra trình duyệt

Mở bản web bằng `npm run web`. Lệnh dưới dùng Python và Playwright để kiểm tra chuỗi khởi động, điều hướng, nhập bản nháp ở bốn kích thước và khôi phục sau lỗi API. Truyền URL Metro in ra terminal.

```bash
python -m pip install playwright
python -m playwright install chromium
python tests/web/smoke.py http://localhost:8081
```

[Mã kiểm thử trình duyệt](../../tests/web/smoke.py)

## Phần cần nghiệm thu tiếp

- Chạy trên Expo Go bằng iPhone và Android để đối chiếu font, màn hình khuyết, bàn phím, thư viện ảnh, hộp xin quyền GPS, camera quét QR và chia sẻ tệp. GPS và quyền từ chối đã được thử trên trình duyệt. Kiểm thử điểm danh bằng mã đã thành công.
- Đối chiếu trên thiết bị các màn có chênh lệch lớn ở danh sách sự kiện cá nhân, tổng kết sự kiện, bản đồ và phân tích. Những màn này thay hình và số mẫu bằng dữ liệu của tài khoản.
- Thiết lập nhà cung cấp thanh toán và xác thực thông báo phía máy chủ trước khi thu tiền thật. Bước xét duyệt tự động đã từ chối thay đổi cho phép khách xem tổng tiền và số người quyên góp. Thay đổi này chưa được triển khai. Mỗi tài khoản xem được lịch sử riêng.
- 29 ảnh mẫu từng được giữ lại ở bước xét duyệt công khai. Những vị trí đã có nguồn dữ liệu dùng ảnh tải lên theo quyền. Các vị trí chưa có ảnh hiển thị trạng thái trống hoặc chữ cái đại diện. Một số trường thông tin thiết bị và bằng chứng chưa có nguồn đo. Danh sách node gốc được giữ trong hồ sơ bàn giao.

[Danh sách trường và ảnh đã xử lý](PUBLICATION_GAPS.json)
