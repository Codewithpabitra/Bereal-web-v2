import fs from "fs";

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

if (!fs.existsSync("public/icons")) {
  fs.mkdirSync("public/icons", { recursive: true });
}

sizes.forEach((size) => {
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#6C63FF"/>
  <text x="50%" y="55%" font-size="${size * 0.45}" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="system-ui" font-weight="900">C</text>
</svg>`;

  fs.writeFileSync(`public/icons/icon-${size}x${size}.svg`, svg);
  console.log(`✅ Created icon-${size}x${size}.svg`);
});

console.log("✅ All icons created in public/icons/");