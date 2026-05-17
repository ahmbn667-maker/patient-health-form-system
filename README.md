<div align="center">

#  نظام النماذج الصحية للعيادة

نظام صحي متكامل Full-Stack  
تم تطويره باستخدام React و Spring Boot و PostgreSQL و Docker

<p align="center">

<img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge">
<img src="https://img.shields.io/badge/Backend-SpringBoot-green?style=for-the-badge">
<img src="https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge">
<img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge">
<img src="https://img.shields.io/badge/Deployment-Render-black?style=for-the-badge">

</p>

</div>

---

#  نظرة عامة

نظام Clinic Health Form System هو تطبيق صحي حديث متكامل (Full-Stack) مصمم خصيصًا لبيئة عيادة واحدة.

يهدف النظام إلى استبدال النماذج الطبية الورقية التقليدية بسير عمل رقمي آمن، يسمح للمرضى بإرسال بياناتهم الصحية إلكترونيًا، مع تمكين الأطباء والمشرفين من إدارة سجلات المرضى من خلال لوحة تحكم احترافية.

---

#  المميزات

-  نظام رقمي لإدارة النماذج الصحية للمرضى
-  نظام مصادقة وحماية باستخدام JWT
-  لوحة تحكم للطبيب والمشرف
-  دعم تعدد اللغات
- 🇸🇦 دعم كامل للغة العربية واتجاه RTL
-  تصدير وطباعة ملفات PDF
-  البحث والفلترة
-  واجهة سريعة باستخدام React + Vite
-  جاهز للعمل مع Docker
-  جاهز للنشر على Render

---

# اللغات المدعومة

- 🇸🇦 العربية
- 🇺🇸 الإنجليزية
- 🇩🇪 الألمانية

---

#  التقنيات المستخدمة

## الواجهة الأمامية (Frontend)

- React
- Vite
- TypeScript
- Axios
- Custom CSS
- RTL Layout

## الواجهة الخلفية (Backend)

- Spring Boot
- Spring Security
- JWT Authentication
- REST API
- Maven

## قاعدة البيانات

- PostgreSQL
- H2 Database للتطوير المحلي

## DevOps والنشر

- Docker
- Render Web Service
- Render PostgreSQL
- Render Static Site

---

#  بنية النظام

<div align="center">

![System Architecture](./assets/arch.png)

</div>

---

#  هيكلة المشروع

```text
clinic-health-form-system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── security/
│   │   └── service/
│   │
│   ├── Dockerfile
│   ├── pom.xml
│   └── application.properties
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── components/
│   │   └── types/
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── render.yaml
├── docker-compose.yml
├── README.md
└── RENDER_DEPLOYMENT.md
```

---

#  المتطلبات

- Java 17 أو أحدث
- Node.js 18 أو أحدث
- Maven
- PostgreSQL
- Docker (اختياري)

---

#  التثبيت والتشغيل

## تشغيل الواجهة الخلفية

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

## تشغيل الواجهة الأمامية

```bash
cd frontend
npm install
npm run dev
```

---

#  متغيرات البيئة

## إعدادات Backend

```env
PORT=8080

DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE

DB_USERNAME=USER
DB_PASSWORD=PASSWORD

JWT_SECRET=your-secret-key
JWT_EXPIRATION_MS=3600000

ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=admin-password

DOCTOR_USERNAME=doctor@example.com
DOCTOR_PASSWORD=doctor-password

FRONTEND_URL=https://your-frontend-url.com
```

## إعدادات Frontend

```env
VITE_API_URL=https://your-backend-url.com/api
```

---

# آلية عمل النظام

```text
يقوم المريض بتعبئة النموذج الصحي
            ↓
ترسل الواجهة الأمامية الطلب
            ↓
يقوم Spring Boot بمعالجة البيانات
            ↓
يتم حفظ البيانات داخل PostgreSQL
            ↓
يسجل المشرف أو الطبيب الدخول
            ↓
تجلب لوحة التحكم النماذج الطبية
            ↓
يقوم الطبيب بتحديث الحالة والتشخيص
```

---

#  نقاط نهاية الـ API

| Method | Endpoint | الوصف | الحماية |
|---|---|---|---|
| POST | `/api/auth/login` | تسجيل الدخول | Public |
| POST | `/api/forms` | إنشاء نموذج صحي | Public |
| GET | `/api/forms` | جلب جميع النماذج | JWT |
| GET | `/api/forms/{id}` | جلب تفاصيل نموذج | JWT |
| PUT | `/api/forms/{id}/admin` | تحديث حالة النموذج | JWT |
| DELETE | `/api/forms/{id}` | حذف نموذج | JWT |

---

#  الاختبارات

## اختبارات Backend

```bash
cd backend
mvn test
```

## بناء Frontend

```bash
cd frontend
npm run build
```

---

# ☁️ النشر

## خدمات الإنتاج

- Frontend → Render Static Site
- Backend → Render Web Service
- Database → Render PostgreSQL

مزيد من تفاصيل النشر موجودة داخل:

```text
RENDER_DEPLOYMENT.md
```

---

#  ملاحظات الأمان

- استخدم مفتاح JWT قوي وآمن
- فعّل HTTPS في بيئة الإنتاج
- لا تستخدم البيانات الافتراضية في الإنتاج
- قيّد الوصول إلى قاعدة البيانات
- خزّن البيانات السرية داخل Environment Variables

---

#  التطويرات المستقبلية

- دعم الإشعارات البريدية
- دعم رسائل SMS
- رفع الملفات الطبية
- نظام صلاحيات متقدم
- لوحة إحصائيات وتحليلات
- دعم تعدد اللغات الكامل

---

#  تطوير

Ahmed Al-Saadi

مطور Full-Stack مهتم بالتحول الرقمي في القطاع الصحي.

---