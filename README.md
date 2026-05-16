# Ahmed Al-Saadi / نظام النموذج الصحي للعيادة
مرحباً بك في مشروع Ahmed Al-Saadi، وهو نظام ويب متكامل يوفّر نموذجاً صحياً إلكترونياً للمرضى مع لوحة تحكم خاصة بالطبيب أو المشرف، إضافة إلى ربط كامل بين الواجهة الأمامية والواجهة الخلفية.
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
-  جاهز للنشر على Render.
- ☁️ قابل للنشر على Render Web Service + Render Static Site + Render PostgreSQL.


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
 Render Web Service + Render Static Site + Render PostgreSQL



## DevOps & Deployment

- Render PostgreSQL
- Render Web Service for Spring Boot backend
- Render Static Site for React + Vite frontend
- Environment-variable based production configuration
---
![System Architecture](./assets/arch.png)

## Project Structure


```text
ahmed-al-saadi/
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
|  `- package.json
|- render.yaml
|- RENDER_DEPLOYMENT.md
`- README.md
``

## المتطلبات

- Java 17 أو أعلى
- Maven
- Node.js 18 أو أعلى

## Render Deployment

See `RENDER_DEPLOYMENT.md` for Render PostgreSQL, backend Web Service, and frontend Static Site configuration.

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
POST	/api/forms	            عام         إنشاء نموذج جديد         
GET	/api/forms	       جلب جميع النماذج        jwt
GET	/api/forms/{id} 	جلب نموذج محدد       jwt
PUT	/api/forms/{id}/admin	تحديث الحالة         jwt
DELETE	/api/forms/{id}	       حذف نموذج            jwt

|## متغيرات البيئة

### Backend

```env
PORT=8080
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
DB_USERNAME=USER
DB_PASSWORD=PASSWORD
JWT_SECRET=your-very-strong-secret
JWT_EXPIRATION_MS=3600000
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=12345678
DOCTOR_USERNAME=doctor@example.com
DOCTOR_PASSWORD=12345678
FRONTEND_URL=https://your-frontend.onrender.com
```

### Frontend

```env
VITE_API_URL=https://your-backend.onrender.com/api
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

## Deployment

Render deployment notes are in `RENDER_DEPLOYMENT.md`.

#Security Notes# ملاحظات أمان

- استخدم قيمة قوية وطويلة في `JWT_SECRET`.
- لا تستخدم بيانات المشرف الافتراضية في الإنتاج.
- فعّل HTTPS في بيئة النشر.
- قيّد الوصول إلى قاعدة البيانات حسب احتياج الشبكة.
.......
Ahmed Al-Saadi
تم تطوير هذا المشروع لدعم التحول الرقمي في القطاع الصحي وتسهيل إدارة بيانات المرضى بشكل حديث وآمن.
---
Future Improvements | التطوير المستقبلي
دعم الإشعارات.
رفع الملفات الطبية.
دعم تعدد اللغات الكامل.
نظام صلاحيات متقدم.
لوحة إحصائيات متقدمة.



[def]: ./assets/arch.png
