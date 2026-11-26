# Ocean Project

Ứng dụng React Native cho bài tập UX/UI, chuyển từ thiết kế BlueCitizen của tác giả trong Figma. Nhánh hiện tại dùng Expo SDK 58 và có 116 bố cục màn hình riêng cùng 5 trạng thái logo.

Ứng dụng đang được hoàn thiện. Việc nghiệm thu giao diện từng màn và kiểm thử Expo Go trên thiết bị thật còn đang chờ. Các bước tiếp theo và giới hạn hiện tại được ghi trong [bản bàn giao Codex](docs/implementation/CODEX_HANDOFF.md).

## Chạy bằng Expo Go SDK 58

```bash
npm ci
npx expo start --go --lan --clear
```

Điện thoại và máy tính cần cùng mạng Wi-Fi. Quét QR mới từ terminal. Nếu Expo Go còn báo SDK 54, dừng Metro cũ và kiểm tra đang mở đúng thư mục đã cập nhật từ `main`.

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

Các migration bổ sung đã được áp dụng lên project `eennwumflulpfhcfzupe`. Kiểm tra lịch sử migration từ xa trước lần triển khai tiếp theo. Các file migration cũ và `supabase/schema.sql` cần đối chiếu với database hiện có trước khi chạy lại.

Service-role key và mật khẩu database thuộc cấu hình phía server. Các biến `EXPO_PUBLIC_*` được đóng gói vào ứng dụng và chỉ dùng cho thông tin được phép công khai.

## Kiểm tra

```bash
npm run typecheck
npm test
npx expo-doctor
npx expo export --platform ios --output-dir /tmp/ocean-ios-check
npx expo export --platform android --output-dir /tmp/ocean-android-check
```

Một số giá trị cá nhân từ Figma đã được thay bằng nhãn hoặc dữ liệu tài khoản khi chạy. Một số ảnh thiết kế đang để trống do bước xét duyệt công khai. Danh sách giới hạn và phần việc còn lại nằm trong bản bàn giao.
