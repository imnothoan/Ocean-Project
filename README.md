# Ocean Project

Ứng dụng React Native cho bài tập UX/UI, chuyển từ thiết kế BlueCitizen của tác giả trong Figma. Nhánh hiện tại dùng Expo SDK 58 và có 116 bố cục màn hình riêng cùng 5 trạng thái logo.

Đã có ảnh đối chiếu Figma và kịch bản chạy trên web cho 116 màn hình và 5 trạng thái logo. Việc nghiệm thu bằng Expo Go trên điện thoại thật còn đang chờ. Quyên góp hiện ghi nhận cam kết chờ thanh toán.

[Xem ảnh giao diện và mở từng frame Figma](docs/implementation/VISUAL_REVIEW.pdf) · [Kết quả kiểm thử](docs/implementation/VERIFICATION.md) · [Bảng theo từng màn](docs/implementation/SCREEN_CHECKS.csv)

## Chạy bằng Expo Go SDK 58

Bản dựng đã được kiểm tra với Node.js 24.22.3 và npm 11.19.1. Nếu đã có bản sao trên nhánh `main`, chạy `git pull --ff-only origin main` trong thư mục đó.

Nếu mới tải dự án lần đầu, mở terminal trong thư mục muốn lưu rồi chạy các lệnh sau.

```bash
git clone https://github.com/imnothoan/Ocean-Project.git
cd Ocean-Project
```

Trong thư mục dự án, chạy

```bash
npm ci
npx expo start --go --lan --clear
```

Cài Expo Go tương thích SDK 58 trên điện thoại. Điện thoại và máy tính cần cùng mạng Wi-Fi. Quét QR mới từ terminal. Nếu Expo Go còn báo SDK 54, dừng Metro cũ và kiểm tra đang mở đúng thư mục đã cập nhật từ `main`.

```bash
npx expo config --type public
```

Giá trị `sdkVersion` của bản này là `58.0.0`. Sau khi thay đổi dependencies, chạy lại `npm ci`.

## Mã nguồn hiện tại

- `App.tsx` mở `src/features/design/DesignApp.tsx`.
- `src/features/design/screens` chứa bố cục native theo từng Figma node.
- `src/features/design/components.tsx` cung cấp các thành phần chữ, hình, trường nhập liệu, liên kết và vùng cuộn.
- Các module `community`, `reports`, `events`, `donations` và `interactions` nối giao diện với hành động và dữ liệu.
- [Danh mục Figma](docs/implementation/FIGMA_SCREEN_INVENTORY.md) liên kết từng màn với component tương ứng và ghi trạng thái nghiệm thu.

## Supabase

Bản dành cho lớp học đã cấu hình URL và publishable key của project. Để dùng project riêng, cung cấp cả `EXPO_PUBLIC_SUPABASE_URL` và `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` trong `.env.local`.

Ngày 27/11/2026, 21 migration của project `eennwumflulpfhcfzupe` đã được đối chiếu với repo. Database Supabase mới dùng `bootstrap.sql` trước khi phát lại lịch sử. [Hướng dẫn database](supabase/README.md).

Service-role key và mật khẩu database thuộc cấu hình phía server. Các biến `EXPO_PUBLIC_*` được đóng gói vào ứng dụng và chỉ dùng cho thông tin được phép công khai.

## Kiểm tra

```bash
npm run typecheck
npm test
npx expo-doctor
npx expo export --platform ios --output-dir /tmp/ocean-ios-check
npx expo export --platform android --output-dir /tmp/ocean-android-check
```

Các phiên bản, nguồn dữ liệu và những thao tác còn cần thử trên điện thoại được ghi trong [kết quả kiểm thử](docs/implementation/VERIFICATION.md).
