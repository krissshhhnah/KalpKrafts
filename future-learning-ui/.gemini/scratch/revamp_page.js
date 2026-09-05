const fs = require('fs');
const path = require('path');

const pagePath = 'd:/KalpKrafts/future-learning-ui/app/page.tsx';
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Top container background and text color
content = content.replace(
  'bg-[#F0F7FF] text-[#0A2540] selection:bg-[#0099FF]/30',
  'bg-[#FAF8F5] text-[#141413] selection:bg-[#C85A17]/20'
);

// 2. Header / Navbar
content = content.replace(
  'border border-white/80 bg-white/75 px-5 py-2.5 backdrop-blur-2xl shadow-lg shadow-[#007BFF]/10 transition-all duration-300 hover:bg-white/85 hover:border-white',
  'border border-[#E6E4DE] bg-[#FAF8F5]/85 px-5 py-2.5 backdrop-blur-2xl shadow-sm transition-all duration-300 hover:bg-white hover:border-[#C85A17]/40'
);

content = content.replace(
  'text-[#334E68] transition-colors hover:text-[#0A2540]',
  'text-[#5C5B56] transition-colors hover:text-[#141413] hover:bg-[#F4EFE6]'
);

// 3. Hero Section
content = content.replace(
  'from-[#007BFF]/20 via-[#0099FF]/15 to-[#E0F2FE]/50',
  'from-[#C85A17]/15 via-[#DA6E35]/10 to-transparent'
);

content = content.replace(
  'border border-[#0099FF]/30 bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#007BFF] shadow-sm backdrop-blur-md',
  'border border-[#E6E4DE] bg-[#F4EFE6] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C85A17] shadow-xs backdrop-blur-md'
);

content = content.replace(
  'text-[#0A2540] sm:text-5xl lg:text-[58px]',
  'text-[#141413] sm:text-5xl lg:text-[58px] tracking-tight'
);

content = content.replace(
  'text-[#334E68] sm:text-lg',
  'text-[#5C5B56] sm:text-lg font-normal'
);

content = content.replace(
  'border border-[#E0F2FE] bg-white px-8 py-4 text-sm font-bold text-[#0A2540] shadow-sm transition-all hover:border-[#0099FF]',
  'border border-[#E6E4DE] bg-white px-8 py-4 text-sm font-bold text-[#141413] shadow-xs transition-all hover:border-[#C85A17] hover:bg-[#F4EFE6]'
);

// 4. General Section Text replacements
content = content.replaceAll('text-[#0A2540]', 'text-[#141413]');
content = content.replaceAll('text-[#334E68]', 'text-[#5C5B56]');
content = content.replaceAll('border-[#BEE3F8]', 'border-[#E6E4DE]');
content = content.replaceAll('bg-[#F0F7FF]', 'bg-[#FAF8F5]');
content = content.replaceAll('bg-[#E0F2FE]', 'bg-[#F4EFE6]');
content = content.replaceAll('text-[#007BFF]', 'text-[#C85A17]');
content = content.replaceAll('border-[#0099FF]', 'border-[#C85A17]');

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Successfully updated app/page.tsx with Anthropic design system!');
