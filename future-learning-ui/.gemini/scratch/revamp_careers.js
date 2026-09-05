const fs = require('fs');
const pagePath = 'd:/KalpKrafts/future-learning-ui/app/careers/page.tsx';
let content = fs.readFileSync(pagePath, 'utf8');

content = content.replaceAll('bg-[#F0F7FF]', 'bg-[#FAF8F5]');
content = content.replaceAll('text-[#0A2540]', 'text-[#141413]');
content = content.replaceAll('text-[#334E68]', 'text-[#5C5B56]');
content = content.replaceAll('border-[#BEE3F8]', 'border-[#E6E4DE]');
content = content.replaceAll('bg-[#E0F2FE]', 'bg-[#F4EFE6]');
content = content.replaceAll('text-[#007BFF]', 'text-[#C85A17]');
content = content.replaceAll('border-[#0099FF]', 'border-[#C85A17]');

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Successfully updated app/careers/page.tsx with Anthropic design system!');
