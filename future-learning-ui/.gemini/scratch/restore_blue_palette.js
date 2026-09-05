const fs = require('fs');

function restorePalette(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replaceAll('bg-[#FAF8F5]', 'bg-[#F0F7FF]');
  content = content.replaceAll('text-[#141413]', 'text-[#0A2540]');
  content = content.replaceAll('text-[#5C5B56]', 'text-[#334E68]');
  content = content.replaceAll('border-[#E6E4DE]', 'border-[#BEE3F8]');
  content = content.replaceAll('bg-[#F4EFE6]', 'bg-[#E0F2FE]');
  content = content.replaceAll('text-[#C85A17]', 'text-[#007BFF]');
  content = content.replaceAll('border-[#C85A17]', 'border-[#007BFF]');
  content = content.replaceAll('from-[#C85A17]', 'from-[#007BFF]');
  content = content.replaceAll('via-[#DA6E35]', 'via-[#0099FF]');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully restored KalpKrafts color palette for ${filePath}`);
}

restorePalette('d:/KalpKrafts/future-learning-ui/app/page.tsx');
restorePalette('d:/KalpKrafts/future-learning-ui/app/careers/page.tsx');
