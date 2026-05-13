# Patient Health Form System

نظام نموذج صحي للمريض مع لوحة مشرف وربط كامل بين الواجهة الأمامية والواجهة الخلفية.

## فكرة المشروع

يدخل المريض بياناته الصحية من الواجهة الأمامية، ثم ترسل الواجهة البيانات إلى REST API في الخلفية. تحفظ الخلفية النموذج في قاعدة البيانات، وبعد ذلك يستطيع المشرف تسجيل الدخول، استعراض النماذج، وفتح كل سجل لتحديث الحالة والتشخيص والملاحظات الإدارية.

## التقنيات المستخدمة

- **Frontend:** React + Vite + TypeScript
- **UI:** CSS مخصص بواجهة عربية RTL
- **Backend:** Spring Boot
- **Database:** PostgreSQL عبر Docker Compose، مع H2 كخيار افتراضي للتشغيل السريع
- **Auth:** JWT
- **HTTP Client:** Axios
- **Deploy:** مناسب للنشر على Railway أو أي بيئة تدعم Docker/Java/Node

## هيكل المشروع

```text
patient-health-form-system/
|- backend/
|  |- src/main/java/com/example/healthform/
|  |  |- config/
|  |  |- controller/
|  |  |- dto/
|  |  |- entity/
|  |  |- repository/
|  |  |- security/
|  |  `- service/
|  |- src/main/resources/application.properties
|  |- src/test/
|  |- Dockerfile
|  `- pom.xml
|- frontend/
|  |- src/
|  |  |- pages/
|  |  |- services/
|  |  `- types/
|  |- nginx/default.conf
|  |- Dockerfile
|  `- package.json
|- docker-compose.yml
`- README.md
```

## المتطلبات

- Java 17 أو أعلى
- Maven
- Node.js 18 أو أعلى
- Docker Desktop

## التشغيل المحلي باستخدام Docker

يشغل هذا الأمر قاعدة البيانات، الخلفية، والواجهة:

```bash
docker compose up --build -d
```

بعد التشغيل:

```text
Frontend: http://localhost:5173
Backend API: http://localhost:8080/api
PostgreSQL: localhost:5432
```

لإيقاف الخدمات:

```bash
docker compose down
```

ولحذف بيانات قاعدة البيانات المحلية:

```bash
docker compose down -v
```

## التشغيل المحلي بدون Docker

### 1. تشغيل قاعدة البيانات

```bash
docker compose up -d postgres
```

### 2. تشغيل Backend

```bash
cd backend
mvn spring-boot:run
```

الخلفية تعمل على:

```text
http://localhost:8080
```

### 3. تشغيل Frontend

```bash
cd frontend
npm install
npm run dev
```

الواجهة تعمل على:

```text
http://localhost:5173
```

## بيانات تسجيل الدخول (مشرف / دكتور)

```text
email: admin@example.com
password: 12345678

email: doctor@example.com
password: 12345678
```

> هذه بيانات افتراضية للتجربة فقط. غيّر `ADMIN_USERNAME` و`ADMIN_PASSWORD` و`DOCTOR_USERNAME` و`DOCTOR_PASSWORD` في بيئة الإنتاج.

## سير العمل

```text
المريض يعبئ النموذج
        ->
Frontend يرسل POST /api/forms
        ->
Backend يحفظ النموذج في قاعدة البيانات
        ->
المشرف يسجل الدخول عبر POST /api/auth/login
        ->
Frontend يرسل GET /api/forms
        ->
المشرف يستعرض النماذج
        ->
المشرف يحدث الحالة/التشخيص/الملاحظات
        ->
Frontend يرسل PUT /api/forms/{id}/admin
```

## الصفحات الأساسية

- **نموذج المريض:** إدخال البيانات الشخصية والصحية والتوقيع التجريبي.
- **تسجيل الدخول:** دخول المشرف أو الدكتور باستخدام JWT.
- **لوحة المشرف/الدكتور:** عرض النماذج المرسلة مع البحث والفلترة حسب الحالة.
- **تفاصيل السجل:** فتح نموذج محدد، تعديل بيانات المريض، تحديث الحالة (جديدة/قيد العمل/تم الإنجاز)، وطباعة PDF.

## API

| Method | Endpoint | الوصف | الحماية |
|---|---|---|---|
| POST | `/api/auth/login` | تسجيل دخول المشرف وإرجاع JWT | عام |
| POST | `/api/forms` | إرسال نموذج مريض جديد | عام |
| GET | `/api/forms` | جلب كل النماذج | JWT |
| GET | `/api/forms/{id}` | جلب نموذج واحد | JWT |
| PUT | `/api/forms/{id}/admin` | تحديث حقول المشرف | JWT |
| DELETE | `/api/forms/{id}` | حذف نموذج | JWT |

## متغيرات البيئة

### Backend

```env
PORT=8080
SPRING_DATASOURCE_URL=jdbc:postgresql://HOST:PORT/DB
SPRING_DATASOURCE_USERNAME=USER
SPRING_DATASOURCE_PASSWORD=PASSWORD
SPRING_DATASOURCE_DRIVER=org.postgresql.Driver
JWT_SECRET=your-very-strong-secret
JWT_EXPIRATION_MS=3600000
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=12345678
DOCTOR_USERNAME=doctor@example.com
DOCTOR_PASSWORD=12345678
FRONTEND_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## الاختبارات والبناء

اختبارات الخلفية:

```bash
cd backend
mvn test
```

بناء الواجهة:

```bash
cd frontend
npm install
npm run build
```

## النشر على Railway

1. أنشئ قاعدة PostgreSQL في Railway.
2. انشر خدمة Backend واضبط متغيرات البيئة الخاصة بقاعدة البيانات وJWT والمشرف.
3. انشر خدمة Frontend واضبط `VITE_API_BASE_URL` على رابط الخلفية:

```env
VITE_API_BASE_URL=https://your-backend.up.railway.app/api
```

4. اضبط `FRONTEND_URL` في الخلفية على رابط الواجهة:

```env
FRONTEND_URL=https://your-frontend.up.railway.app
```

## ملاحظات أمان

- استخدم قيمة قوية وطويلة في `JWT_SECRET`.
- لا تستخدم بيانات المشرف الافتراضية في الإنتاج.
- فعّل HTTPS في بيئة النشر.
- قيّد الوصول إلى قاعدة البيانات حسب احتياج الشبكة.

## الخلاصة

ابدأ بقاعدة البيانات، ثم Backend، ثم Frontend، ثم اختبر الربط، وبعدها انشر المشروع.
