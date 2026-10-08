# SpeakEasy English

MVP เว็บแอปฝึกพูดภาษาอังกฤษสำหรับคนไทยหลายวัย

## ฟีเจอร์ใน MVP
- ไทย / English language switcher
- Welcome / onboarding
- เลือกระดับ Beginner - Advanced
- Home dashboard
- Learning path
- บทเรียนพร้อม English / คำอ่าน / คำแปล
- Text-to-Speech สำหรับฟังประโยคภาษาอังกฤษ
- Speaking practice UI
- คะแนนและ XP
- Vocabulary
- Progress
- Profile + ปรับขนาดตัวอักษร
- Responsive mobile / desktop

## วิธีรัน
ต้องใช้ Node.js 18+ หรือใหม่กว่า

```bash
npm install
npm run dev
```

จากนั้นเปิด URL ที่ Vite แสดง เช่น http://localhost:5173

## Build production
```bash
npm run build
npm run preview
```

## หมายเหตุ
MVP นี้ยังไม่เชื่อมฐานข้อมูลหรือระบบ AI ตรวจเสียงจริง ปุ่มฝึกพูดใช้เป็น flow จำลองก่อน ส่วน Text-to-Speech ใช้ Web Speech API ของเบราว์เซอร์

ขั้นต่อไปสามารถเชื่อม:
- Supabase / Firebase สำหรับ Auth + Database
- Speech-to-Text
- AI pronunciation scoring
- AI conversation
- ระบบ subscription
