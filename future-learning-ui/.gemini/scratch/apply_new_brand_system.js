const fs = require('fs');

function updatePage(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Backgrounds & Surface
  content = content.replaceAll('bg-[#FAF8F5]', 'bg-[#F5FBFD]');
  content = content.replaceAll('bg-[#F0F7FF]', 'bg-[#F5FBFD]');
  content = content.replaceAll('bg-[#E0F2FE]', 'bg-[#EDF8FB]');
  content = content.replaceAll('bg-[#F4EFE6]', 'bg-[#EDF8FB]');
  content = content.replaceAll('bg-[#141413]', 'bg-[#151A23]');
  content = content.replaceAll('bg-[#0B192C]', 'bg-[#151A23]');
  content = content.replaceAll('bg-[#0A2540]', 'bg-[#1D222D]');

  // Text
  content = content.replaceAll('text-[#0A2540]', 'text-[#1D222D]');
  content = content.replaceAll('text-[#141413]', 'text-[#1D222D]');
  content = content.replaceAll('text-[#334E68]', 'text-[#526579]');
  content = content.replaceAll('text-[#5C5B56]', 'text-[#526579]');

  // Primary Blue / Accents
  content = content.replaceAll('text-[#007BFF]', 'text-[#2687E8]');
  content = content.replaceAll('text-[#C85A17]', 'text-[#2687E8]');
  content = content.replaceAll('border-[#007BFF]', 'border-[#2687E8]');
  content = content.replaceAll('border-[#C85A17]', 'border-[#2687E8]');
  content = content.replaceAll('border-[#0099FF]', 'border-[#65C4EC]');
  content = content.replaceAll('border-[#BEE3F8]', 'border-[#D8EAF1]');
  content = content.replaceAll('border-[#E6E4DE]', 'border-[#D8EAF1]');

  // Add font-mono-tag to uppercase badges & numbers
  content = content.replaceAll('tracking-[0.2em]', 'font-mono-tag tracking-widest');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated ${filePath} with new Brand design system!`);
}

updatePage('d:/KalpKrafts/future-learning-ui/app/page.tsx');
updatePage('d:/KalpKrafts/future-learning-ui/app/careers/page.tsx');
updatePage('d:/KalpKrafts/future-learning-ui/app/admin/page.tsx');
