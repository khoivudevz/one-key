# One Key - Local Password Manager 🔐

One Key is a secure, browser-based password manager designed to help you manage multiple account credentials locally. With a unique terminal-style interface, it offers a modern and intuitive way to handle your sensitive data securely.

## ✨ Key Features

- 🔒 **Local Storage**: All data is stored locally in your browser, ensuring no server communication.
- 🔑 **AES Encryption**: Protects your stored passwords with military-grade encryption.
- 💻 **Terminal Interface**: Provides a familiar command-line style interaction.
- 📝 **Password Management**: Easily create, edit, view, and delete password entries.
- 🔄 **Import/Export**: Backup and restore your encrypted data effortlessly.
- 🎨 **Dark Theme**: Enjoy a modern dark interface that's easy on the eyes.
- 🛡️ **Secure by Design**: No data leaves your device.

## 🛠️ Technical Stack

- **Frontend**: React 19 + TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Encryption**: CryptoJS (AES)
- **UI Components**: React Terminal
- **Date Handling**: Day.js

## 📋 Available Commands

### General

- `help` - Show all available commands
- `clear` - Clear terminal screen
- `quit`, `exit` - Close application

### Account Management

- `new` - Create new storage
- `import` - Import existing data
- `export` - Export encrypted data
- `logout` - Log out current session

### Password Operations

- `key-list` - View all passwords
- `create-key` - Add new password
- `edit-key [id]` - Edit password
- `delete-key [id]` - Remove password
- `show-key [id]` - Display password details

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/one-key
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Run development server:
   ```bash
   bun dev
   ```

## 🔒 Security Features

- All data is encrypted using AES encryption.
- Passwords are never stored in plain text.
- No network requests - everything stays on your device.
- Encrypted export files for secure backups.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add some feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
