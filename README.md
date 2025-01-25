````markdown
One Key - Secure Password Manager 🔑

A secure, terminal-style password manager built with React, TypeScript, and modern web technologies. Store and manage your passwords with encryption in an intuitive command-line interface.

## 🚀 Features

- 🔐 Secure password encryption using AES
- 💻 Terminal-style interface
- 📁 Import/Export functionality
- 🔑 Password management with descriptions
- 🎨 Dark theme with customizable UI
- ⚡️ Built with React 19 and TypeScript
- 🎨 Styled with Tailwind CSS
- 📦 Powered by Vite
- 🏪 State management with Zustand
- 🔄 File handling with drag & drop
- 🕒 Date handling with Day.js

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- Bun (latest version)

## 📦 Installation

```bash
Clone the repository
git clone https://github.com/yourusername/one-key
Install dependencies
bun install
## 🚀 Development
bash
Start development server
bun dev # Development mode
bun dev:stg # Staging mode
bun dev:prod # Production mode
Build for production
bun build # Production build
bun build:stg # Staging build
bun build:dev # Development build
```

## 💻 Terminal Commands

### General Commands

- `help` - Show available commands
- `clear` - Clear the terminal
- `quit`, `exit` - Close the application

### Data Management

- `new` - Create new data storage
- `import` - Import existing data
- `export` - Export your data
- `logout` - Log out of current session

### Password Management

- `key-list` - View all stored passwords
- `create-key` - Add a new password entry
- `edit-key [id]` - Edit existing password
- `delete-key [id]` - Delete password entry
- `show-key [id]` - Show password details

## 📁 Project Structure

src/
├── components/ # Reusable UI components
├── configs/ # Configuration files
├── constants/ # Constants and enums
├── hooks/ # Custom React hooks
├── layouts/ # Layout components
├── pages/ # Page components
├── providers/ # React providers
├── router/ # Routing configuration
├── services/ # API and storage services
├── store/ # Zustand store
├── styles/ # Global styles
├── types/ # TypeScript types
├── utils/ # Utility functions
└── views/ # View components

## 🔒 Security

- AES encryption for stored passwords
- No server-side storage - all data is kept locally
- Encrypted export/import functionality

## 🔧 Environment Variables

Create `.env` files for different environments:
VITE_ENV=development
VITE_API_URL=your_api_url

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
````
