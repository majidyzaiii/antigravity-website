const fs = require('fs');
let content = fs.readFileSync('contact.html', 'utf8');

const regex = /\.floating-whatsapp \{[\s\S]*?z-index: 999;\s*\}/;

const newCss = `.floating-whatsapp {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #25D366;
  color: #ffffff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
  z-index: 999;
  animation: bounceWa 2s infinite ease-in-out;
  transition: transform 0.3s ease;
}

.floating-whatsapp:hover {
  transform: scale(1.1);
}

@keyframes bounceWa {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}`;

if(regex.test(content)) {
    content = content.replace(regex, newCss);
    fs.writeFileSync('contact.html', content, 'utf8');
    console.log('Fixed CSS');
} else {
    console.log('Regex did not match');
}
