# Ocean Project

Ứng dụng React Native Expo cho Ocean Project, triển khai các luồng cốt lõi theo High-Fidelity trong Figma:

- Trang chủ và chỉ số tác động
- Báo cáo ô nhiễm/động vật/tái chế, gồm quét QR vị trí
- Sự kiện cộng đồng
- Dữ liệu và phân tích tác động
- Hồ sơ, điểm và huy hiệu
- Danh mục route đủ 116 màn hình High-Fidelity, có tìm kiếm và mở từng flow để kiểm thử
- Renderer chuyên biệt cho Report, Event, Donate, Data, Admin, Community và Gamification

> Danh mục route đã đủ 116 màn hình và các luồng cốt lõi chạy end-to-end. Các nhóm flow hiện đã có renderer, form và trạng thái riêng; một số frame phụ vẫn dùng biến thể theo ngữ cảnh thay vì component pixel-perfect độc lập cho từng frame.

## Chạy bằng Expo Go

```bash
npm ci
npx expo start --go --lan --clear
```

`npm start` đã được cấu hình chạy LAN để không cần Expo tunnel. Quét QR hiển thị trong terminal bằng Expo Go khi điện thoại và máy tính cùng mạng Wi-Fi. Tính năng camera cần cấp quyền khi được hỏi.

## Supabase

Bản dành cho lớp học đã cấu hình URL và publishable key của Ocean Project. Có thể chạy ngay sau `npm ci`. Để dùng project riêng, đặt cả `EXPO_PUBLIC_SUPABASE_URL` và `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` trong `.env.local`.

Nếu điện thoại báo SDK 54, kiểm tra đang chạy đúng bản `main` trong thư mục này bằng `npx expo config --type public` (sdkVersion phải là 58.0.0). Dừng Metro cũ, chạy lệnh bên trên rồi quét mã QR mới.

### Expo Go on iOS/Android

The default scripts use LAN mode when Expo Go reports that you must sign in:

```bash
npm start
# or
npm run ios:lan
```

The `--tunnel` mode requires an authenticated Expo CLI and Expo Go account. LAN mode avoids the tunnel, but the phone and development machine must be on the same network. If the Expo Go app itself displays a sign-in screen, sign in once in Expo Go; that is an app-level requirement and cannot be bypassed by Metro.

Mở Supabase Dashboard → SQL Editor, dán và chạy toàn bộ file [`supabase/schema.sql`](./supabase/schema.sql). File này tạo các bảng báo cáo, sự kiện, đăng ký sự kiện, quyên góp và chỉ số tác động, kèm RLS policies và dữ liệu mẫu.

Không đặt `sb_secret_*` hoặc database password vào `.env` của Expo. Secret/database credentials chỉ được dùng ở server-side hoặc Supabase Dashboard. Khi chưa cấu hình Supabase, ứng dụng vẫn chạy với dữ liệu demo và báo lỗi rõ ràng khi gửi dữ liệu.

## Trạng thái xác minh

Trạng thái remote Supabase phải được xác minh lại bằng project credentials hợp lệ trước khi áp dụng migration. Không ghi service-role key hoặc database password vào `.env` của Expo. Local typecheck và test chỉ được coi là hợp lệ sau khi dependency lockfile được cài đặt thành công.