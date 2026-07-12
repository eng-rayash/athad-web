import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const photosDir = path.resolve(__dirname, "صور الاعمال");
const outputFile = path.resolve(__dirname, "src/app/components/imported_projects.json");

async function main() {
  console.log("=================================================");
  console.log("   رفع صور مجلد الأعمال المحلي إلى ImageKit   ");
  console.log("=================================================");

  let privateKey = process.argv[2] || process.env.IMAGEKIT_PRIVATE_KEY;
  
  if (!privateKey || privateKey === "your_private_key_here") {
    console.error("❌ خطأ: لم يتم العثور على IMAGEKIT_PRIVATE_KEY.");
    console.error("\nيمكنك تشغيل الأمر وتمرير المفتاح الخاص (Private Key) كعامل إضافي كالتالي:");
    console.error("node upload-local-images.js [المفتاح_الخاص_هنا]");
    console.error("\nمثال:");
    console.error("node upload-local-images.js private_xxxxxxxxxxxxxx");
    process.exit(1);
  }

  if (!fs.existsSync(photosDir)) {
    console.error(`❌ خطأ: المجلد غير موجود: ${photosDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(photosDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext);
  });

  console.log(`📌 تم العثور على ${files.length} صورة في مجلد "صور الاعمال".`);
  
  // Read existing imported images if file exists
  let imported = [];
  if (fs.existsSync(outputFile)) {
    try {
      imported = JSON.parse(fs.readFileSync(outputFile, "utf8"));
      console.log(`ℹ️ تم العثور على ${imported.length} صورة مستوردة مسبقاً.`);
    } catch (e) {}
  }

  const credentials = Buffer.from(`${privateKey}:`).toString("base64");
  const newlyImported = [...imported];

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    
    // Check if already uploaded
    const isAlreadyUploaded = imported.some(img => img.url.includes(filename) || (img.title && img.title.includes(filename.replace(/\.[^/.]+$/, ""))));
    if (isAlreadyUploaded) {
      console.log(`[${i + 1}/${files.length}] ⏭️ تخطي: ${filename} (مرفوعة مسبقاً)`);
      continue;
    }

    console.log(`[${i + 1}/${files.length}] 📤 جاري رفع: ${filename}...`);
    const filePath = path.join(photosDir, filename);
    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = filename.endsWith(".png") ? "image/png" : filename.endsWith(".webp") ? "image/webp" : "image/jpeg";

    const form = new FormData();
    form.append("file", fileBuffer, {
      filename: filename,
      contentType: mimeType,
    });
    form.append("fileName", `migrated_${Date.now()}_${filename}`);
    form.append("folder", "projects");

    try {
      const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          ...form.getHeaders(),
        },
        body: form,
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(`❌ فشل رفع ${filename}:`, errText);
        continue;
      }

      const data = await res.json();
      const projectItem = {
        id: `migrated-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: data.url,
        fileId: data.fileId,
        title: filename.replace(/\.[^/.]+$/, "").replace(/-/g, " "),
        category: "أعمال متنوعة", // Default category
        desc: "تم استيرادها تلقائياً من مجلد صور الأعمال المحلي",
        uploadedAt: new Date().toISOString()
      };

      newlyImported.push(projectItem);
      
      // Save progressively in case of interruption
      fs.writeFileSync(outputFile, JSON.stringify(newlyImported, null, 2), "utf8");
      console.log(`✅ تم الرفع بنجاح. الرابط: ${data.url}`);
    } catch (err) {
      console.error(`❌ خطأ أثناء رفع ${filename}:`, err.message);
    }
  }

  console.log("\n✨ اكتملت العملية بنجاح!");
  console.log(`📂 تم حفظ روابط الصور في: src/app/components/imported_projects.json`);
}

main().catch(console.error);
