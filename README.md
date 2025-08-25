# 🔐 Key Genie

**Generate secure passwords with advanced customization options**

A modern, client-side password generator built with Next.js 15 and React 19. Create random, memorable passwords and PINs with built-in strength indicators and export functionality.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/asimdevprov/key-genie)

## ✨ Features

- **🔒 Cryptographically Secure**: Uses `secure-random-password` library with CSPRNG
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop
- **🎨 Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **🌓 Dark/Light Theme**: Toggle between themes with persistent storage
- **💪 Password Strength Indicator**: Real-time visual strength assessment
- **📝 Password History**: Keep track of generated passwords with export options
- **🔄 Multiple Generation Modes**:
  - **Random**: Customizable character sets with advanced options
  - **Memorable**: Word-based passwords for easier remembering
  - **PIN**: Numeric codes for secure access
- **⚡ Advanced Options**:
  - Exclude similar characters (0, O, 1, l, I)
  - Auto-generate on settings change
  - Export history to CSV or JSON
  - One-click copy to clipboard


## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React + React Icons
- **Password Generation**: secure-random-password
- **Toast Notifications**: Sonner
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**

```sh
   git clone https://github.com/asim-muhammad/key-genie.git
   cd key-genie
```

2. **Install dependencies**

```sh
   npm install
```

3. **Start development server**

```sh
   npm run dev
```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Build for Production

```sh
# Create production build
npm run build

# Start production server
npm run start
```

## 🔒 Security Features

- **Client-side only**: All password generation happens in your browser
- **No data transmission**: Passwords never leave your device
- **Cryptographically secure**: Uses proper entropy sources, not Math.random()
- **No tracking**: Zero analytics or user tracking
- **Local storage only**: History stored locally in your browser

## 🎯 Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📱 Mobile Support

Fully responsive design optimized for:
- iOS Safari
- Android Chrome
- Mobile Firefox
- All modern mobile browsers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Asim**

- 🌐 [Portfolio](https://your-portfolio.com)
- 🐦 [Instagram](https://www.instagram.com/dev_muhammad_asim/)
- 💼 [LinkedIn](https://www.linkedin.com/in/muhammad-asim-63057535a/)
- 🤖 [Reddit](https://www.reddit.com/user/Round-Surround6409/)

## ☕ Support

If you find this project helpful, consider buying me a coffee!

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/asimdevprov)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [secure-random-password](https://www.npmjs.com/package/secure-random-password) for cryptographically secure generation
- [Lucide](https://lucide.dev/) for clean icons

---

<div align="center">
  <p>Made with ❤️ by Asim</p>
  <p>🔐 Your passwords, your device, your security</p>
</div>