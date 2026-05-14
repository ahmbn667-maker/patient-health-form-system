# Clinic-Health-Form-System
مرحباً بك في مشروع Clinic Health Form System، وهو نظام ويب متكامل يوفّر نموذجاً صحياً إلكترونياً للمرضى مع لوحة تحكم خاصة بالطبيب أو المشرف، إضافة إلى ربط كامل بين الواجهة الأمامية والواجهة الخلفية.
فكرة المشروع
يُعد نظام النموذج الصحي الإلكتروني تطبيق Full-Stack Web Application مخصصاً لعيادة واحدة فقط، ويهدف إلى تحويل النموذج الصحي الورقي المستخدم داخل العيادة إلى نظام رقمي حديث وآمن وسهل الاستخدام.
يستطيع المريض إدخال بياناته الصحية إلكترونياً من خلال واجهة النظام، ثم تُرسل البيانات إلى الخلفية عبر REST API ليتم حفظها داخل قاعدة البيانات بطريقة منظمة وآمنة.
بعد تسجيل الدخول، يمكن للطبيب أو المشرف داخل العيادة استعراض النماذج المرسلة من المرضى، وفتح كل سجل للاطلاع على بيانات المريض، وتحديث الحالة الطبية، وإضافة التشخيص والملاحظات الطبية أو الإدارية.
يساعد النظام على تنظيم بيانات المرضى، وتسريع إجراءات الاستقبال والمتابعة داخل العيادة، وتقليل الاعتماد على النماذج

#  Supported Languages | اللغات المدعومة

يدعم النظام تعدد اللغات (**Multi-Language Support**) مع دعم كامل لاتجاه الكتابة من اليمين إلى اليسار (**RTL**).

> تم تصميم الواجهة لتكون قابلة للتوسع وإضافة أي لغة مستقبلية بسهولة باستخدام نظام ترجمة ديناميكي.

## اللغات الحالية

- 🇸🇦 العربية (Arabic)
- 🇺🇸 الإنجليزية (English) 
- 🇩🇪 الألمانية (German)


# مميزات المشروع | Features

-  نظام صحي رقمي لإدارة نماذج المرضى.
-  واجهة عربية احترافية تدعم RTL.
-  نظام مصادقة وحماية باستخدام JWT.
-  لوحة تحكم للأطباء والمشرفين.
-  البحث والفلترة حسب الحالة الصحية.
-  دعم تصدير وطباعة PDF.
-  واجهة سريعة باستخدام React + Vite.
-  جاهز للنشر باستخدام Docker.
- ☁️ قابل للنشر على Vercel وRailway.


## التقنيات المستخدمة

- **Frontend:** React + Vite + TypeScript
- **UI:** - Custom CSS مخصص بواجهة عربية - RTL Layout
- **Backend:** Spring Boot
 **Authentication:** JWT
- Spring Boot
- Spring Security
- REST API
- Maven

- **Database:** PostgreSQL 
 H2 Database كخيار افتراضي للتشغيل السريع
-
- **HTTP Client:** Axios
 Railway أو أي بيئة تدعم Docker/Java/Node



## DevOps & Deployment

- Docker/Java/Node
- Railway أو أي بيئة تدعم
- Docker Compose
- **Deploy:** مناسب للنشر على
- Vercel
- Railway

---
![System Architecture][def]
![Architecture][def]

[def]: ./assets/architecture.png
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
Frontend: http://localhost:3000
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
http://localhost:3000
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
نموذج المريض: إدخال البيانات الشخصية والصحية والتوقيع التجريبي.
تسجيل الدخول: دخول المشرف أو الدكتور باستخدام JWT.
لوحة المشرف/الدكتور: عرض النماذج المرسلة مع البحث والفلترة حسب الحالة.
تفاصيل السجل: فتح نموذج محدد، تعديل بيانات المريض، وتحديث الحالة.
 تجربة المستخدم: إرشاد المريض أثناء إدخال البيانات
تم تصميم واجهة "نموذج صحة المريض" لتكون مرشداً رقمياً يضمن دقة البيانات وسهولة الفهم من خلال العناصر التالية:
عناوين الأقسام الواضحة: تقسيم النموذج إلى كتل منطقية (المعلومات الشخصية، العنوان، التاريخ الطبي)، مما يساعد المريض على التركيز في جانب واحد في كل مرة.
تلميحات الإدخال (Placeholders & Hints): تحتوي حقول الإدخال على أمثلة توضيحية ليفهم المريض الصيغة المطلوبة قبل البدء بالكتابة.
رسائل التحقق الفوري (Real-time Validation): يوفر النظام ملاحظات فورية أسفل الحقول تمنع الأخطاء قبل إرسال النموذج وتشرح للمريض سبب رفض البيانات إن وجدت.
قوائم الاختيار التوجيهية: توفير مربعات اختيار (Checkboxes) سهلة الفهم للأعراض، مما يساعد المريض على تذكر وتحديد حالته بدقة.
تنبيهات الحقول الإلزامية: تظهر علامة النجمة (*) بجانب الحقول الضرورية لضمان استكمال البيانات الأساسية.
شرح الأمان والخصوصية: يتضمن النظام شرحاً بسيطاً لاتفاقية معالجة البيانات لضمان السرية التامة- .-
- تسجيل الدخول:** دخول المشرف أو الدكتور باستخدام JWT.
- لوحة المشرف/الدكتور:** عرض النماذج المرسلة مع البحث والفلترة حسب الحالة.
- تفاصيل السجل:** فتح نموذج محدد، تعديل بيانات المريض، تحديث الحالة (جديدة/قيد العمل/تم الإنجاز)، وطباعة PDF.

## API Endpoints
Method	Endpoint	     Description                  jwt
POST	/api/auth/login 	عام                تسجيل الدخول       
POST	/api/forms	            عام                    إنشاء نموذج جديد         
GET	/api/forms	       جلب جميع النماذج        jwt
GET	/api/forms/{id} 	جلب نموذج محدد       jwt
PUT	/api/forms/{id}/admin	تحديث الحالة         jwt
DELETE	/api/forms/{id}	       حذف نموذج            jwt

|## متغيرات البيئة

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
FRONTEND_URL=http://localhost:3000
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

#Deployment# النشر على  Frontend Deployment /Vercel
Backend Deployment /Railway /Render
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

#Security Notes# ملاحظات أمان

- استخدم قيمة قوية وطويلة في `JWT_SECRET`.
- لا تستخدم بيانات المشرف الافتراضية في الإنتاج.
- فعّل HTTPS في بيئة النشر.
- قيّد الوصول إلى قاعدة البيانات حسب احتياج الشبكة.
.......
Developed With Passion
تم تطوير هذا المشروع لدعم التحول الرقمي في القطاع الصحي وتسهيل إدارة بيانات المرضى بشكل حديث وآمن.
---
Future Improvements | التطوير المستقبلي
دعم الإشعارات.
رفع الملفات الطبية.
دعم تعدد اللغات الكامل.
نظام صلاحيات متقدم.
لوحة إحصائيات متقدمة.



[def]: ./assets/arch.png
