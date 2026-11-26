# Bàn giao tiếp tục Ocean Project

Cập nhật ngày 26 tháng 11 năm 2026. Đây là bản làm việc đang hoàn thiện. Người dùng yêu cầu tiếp tục trong Codex và cho phép commit, push trực tiếp lên `main` theo từng công đoạn.

## Mục tiêu của tác giả

Chuyển toàn bộ thiết kế UX/UI do người dùng tự làm thành ứng dụng React Native chạy được trên Expo Go SDK 58. Bám sát màu, font, khoảng cách, kích thước, ảnh và luồng từ Figma. Kết nối dữ liệu thật với Supabase. Nghiệm thu từng màn bằng đối chiếu ảnh và kiểm thử thao tác trên thiết bị.

- Repository [imnothoan/Ocean-Project](https://github.com/imnothoan/Ocean-Project)
- Thiết kế [High-Fidelity](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=101-2721)
- Project [Supabase](https://supabase.com/dashboard/project/eennwumflulpfhcfzupe)

Quyền truy cập của phiên trước cần được kiểm tra lại trong môi trường Codex mới. Mật khẩu truy cập và thông tin xác thực được giữ ngoài repository.

## Trạng thái mã nguồn

- Đã điều chỉnh Expo thành `~58.0.26`, React Native `0.88.1`, kèm lockfile.
- `App.tsx` mở `src/features/design/DesignApp.tsx`. Đây là entry point cần kiểm thử.
- Có 116 component màn hình đang hiển thị trong Figma và 5 component trạng thái logo trong `src/features/design/screens`. Frame `311:353` bị ẩn trong Figma. Frame lồng trong bản đồ và các hình trang trí được tính là layer.
- Đã lấy design context và hình tham chiếu cho các frame. Các file tham chiếu nguyên gốc của phiên trước nằm trong workspace tạm và phải lấy lại từ Figma khi cần.
- Bố cục có layer chữ, hình, vùng cuộn, footer và tap target theo Figma. Dữ liệu runtime nối vào node ID thông qua `Interaction`.
- SVG Figma được Metro transformer đưa vào `expo-image`. Giữ kiểm tra native export khi sửa cấu hình này.
- Đã viết các thao tác hồ sơ, bài viết và ảnh, bình luận, lượt thích, báo cáo, sự kiện, đăng ký, điểm danh, trò chuyện, nhận xét và cam kết quyên góp. Nhiều nhánh nghiệp vụ vẫn cần hoàn thiện và kiểm thử end-to-end.
- Các module tính năng cũ vẫn tồn tại trong repo. Bắt đầu lần theo entry point mới khi sửa lỗi.

## Dữ liệu cá nhân và ảnh còn thiếu

Bước xét duyệt tự động đã từ chối công khai một số giá trị cá nhân và một ảnh xuất từ Figma. Bản bàn giao thay 84 trường giá trị bằng nhãn trung tính hoặc chỗ cho dữ liệu tài khoản. Bản bàn giao bỏ 29 raster assets gồm ảnh bị từ chối và các ảnh chân dung mẫu. Khung ảnh và node ID được giữ để nối dữ liệu phù hợp sau đó. Một số frame vì vậy còn khoảng trống.

Danh sách node và tên file được ghi trong `PUBLICATION_GAPS.json`. Lần công khai ảnh hoặc thông tin bị từ chối cần xử lý lý do xét duyệt và có phê duyệt cụ thể của người dùng nếu vẫn cần nội dung đó. Các tên, email, số điện thoại, ngày sinh mẫu trong thiết kế cần được thay bằng dữ liệu thuộc tài khoản đang sử dụng hoặc trạng thái trống.

Người dùng đã xác nhận cho phép công khai các ảnh thiết kế còn lại trong bản bàn giao sau khi được thông báo về repo công khai và khả năng ảnh chứa thông tin nhận diện. Xác nhận này áp dụng cho 88 raster assets còn lại. Các trường và 29 ảnh đã bỏ vẫn được ghi trong danh sách công việc tiếp theo.

Ngoài các trường cá nhân ở trên, bước xét duyệt tiếp theo phát hiện các giá trị tọa độ GPS, thời gian, thiết bị và chi tiết bằng chứng mẫu trong source. Bản bàn giao đã để trống 64 giá trị này để các màn quản trị lấy dữ liệu đúng theo quyền truy cập khi hoàn thiện. Danh sách node nằm trong trường `sensitive_evidence_nodes` của `PUBLICATION_GAPS.json`.

## Supabase đã triển khai

Đã xác minh và áp dụng các migration sau lên project hiện có. Tên file trong lần bàn giao này khớp version migration từ xa.

| Version | Migration |
|---|---|
| 20261126060106 | event_participation_access |
| 20261126060129 | restrict_client_updates |
| 20261126060449 | lock_report_trigger |
| 20261126060455 | community_profiles_and_reactions |
| 20261126061055 | community_photos |
| 20261126062245 | learning_progress_and_rewards |
| 20261126062351 | report_followups |
| 20261126062406 | moderation_roles |

Lịch sử migration trước ngày 26 tháng 11 có sự khác nhau giữa repo và database. Đối chiếu lịch sử và schema trước khi dùng `supabase db push`. Giữ dữ liệu hiện có khi điều chỉnh migration.

Phiên trước chạy `tests/sql/ownership.sql` trong transaction rollback để kiểm tra quyền sở hữu báo cáo, cập nhật trạng thái, phê duyệt người tham gia, điểm danh lặp lại, feedback và chat. Supabase security advisor trả về danh sách cảnh báo trống tại lần kiểm tra bàn giao.

Client dùng publishable key. Tài liệu người dùng gửi trước đó có chứa thông tin xác thực riêng tư. Chủ project cần thay các secret đã chia sẻ thông qua cơ chế quản lý secret của Supabase.

## Bằng chứng kiểm thử và giới hạn

- TypeScript typecheck và 12 unit test đã qua sau khi chỉnh trường thông tin cá nhân.
- Trước bước thay ảnh và giá trị cá nhân, trình duyệt render được 121 component ở kích thước 393 × 852, ghi nhận 0 lỗi JavaScript. Smoke test entry point đi từ bản đồ đến Community và Create Post, ghi nhận 0 lỗi JavaScript.
- Các lần render trên là React Native Web. Độ trùng khớp hình ảnh từng màn vẫn đang chờ đánh giá.
- Kết quả native export và Expo Doctor mới nhất được ghi ở phần kiểm tra cuối tài liệu này.
- Phiên trước chưa có thiết bị thật hoặc simulator để xác minh ứng dụng trong Expo Go. Quyền camera, ảnh, vị trí, bàn phím, safe area, Android back và khôi phục phiên cần chạy thử trên thiết bị.
- Chưa kiểm thử vòng đời tài khoản thật bằng email xác nhận và khôi phục mật khẩu.
- Luồng quyên góp hiện tạo bản ghi pending. Tích hợp nhà cung cấp thanh toán, webhook xác nhận và cấp chứng nhận thanh toán còn đang chờ.

## Ưu tiên cho phiên Codex tiếp theo

1. Fetch `origin/main`, đọc bản bàn giao, README và `FIGMA_SCREEN_INVENTORY.md`. Kiểm tra diff, cài dependencies rồi chạy typecheck, test, Expo Doctor và native export.
2. Xác nhận truy cập Figma và Supabase trong phiên mới. Mở từng node từ danh mục để lấy lại hình tham chiếu gốc.
3. Chạy entry point mới trên Expo Go SDK 58. Kiểm thử đăng ký, đăng nhập, đăng xuất, báo cáo có ảnh và vị trí, tạo sự kiện, đăng ký sự kiện, điểm danh và community với các tài khoản thử được phép sử dụng.
4. Kiểm tra mọi frame có đường đi hợp lý từ giao diện. Figma prototype đơn thuần chưa nối toàn bộ màn. Event Calendar, Share Activity và Level Up là các nhánh cần rà soát thêm.
5. Hoàn thiện các thao tác còn thiếu ở nhóm tổ chức và thành viên, lọc và xếp hạng, các màn phân tích, quản trị, đơn tình nguyện và training. Tách dữ liệu mẫu của bố cục ra khỏi dữ liệu nghiệp vụ trong quá trình nối backend.
6. So ảnh từng màn theo cùng viewport, sửa font nhiều màu trong cùng text run, border, shadow, image crop, kích thước và scrolling. Kiểm thử thêm ở màn hình nhỏ và lớn. Ghi bằng chứng visual và functional riêng cho từng frame.
7. Duy trì kiểm tra RLS, role, chống gửi lặp, xử lý lỗi upload và dọn trạng thái tài khoản khi đăng xuất. Test SQL dùng fixture rollback hoặc tài khoản thử được cho phép.
8. Commit và push trực tiếp `main` theo công đoạn như người dùng yêu cầu. Kiểm tra head từ xa sau mỗi lần push. Nếu gặp chặn quyền, báo rõ hành động và nguyên nhân để người dùng xử lý.

`FIGMA_SCREEN_INVENTORY.md` có 116 màn và 5 trạng thái logo được triển khai bố cục. Cột nghiệm thu thiết bị đang ở trạng thái Pending cho toàn bộ. Báo cáo hoàn thành cần dựa trên kết quả kiểm thử từng màn.

## Kiểm tra cuối bản bàn giao

Đã chạy lại trên bản bàn giao sau khi thay giá trị cá nhân và bỏ ảnh đang chờ xét duyệt.

- TypeScript typecheck đạt.
- 12/12 unit test đạt.
- Expo Doctor đạt 20/20 kiểm tra.
- Native iOS export đạt.
- Native Android export đạt.

Native export xác nhận việc đóng gói. Nghiệm thu trên Expo Go bằng thiết bị thật còn đang chờ.
