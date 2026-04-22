# ☀️ SunnyCDN

**SunnyCDN** is an open-source, plug-and-play CDN (Content Delivery Network) built with Vue.
It’s designed to serve data, assets, and configuration files quickly and efficiently with minimal setup.

---

## 🚀 Overview

SunnyCDN is a lightweight data server that allows developers to easily distribute content across applications. Whether you're serving JSON, static assets, or dynamic resources like language files, SunnyCDN provides a simple and scalable solution.

---

## ✨ Features

* ⚡ Fast and lightweight
* 🔌 Plug & play integration
* 🌐 Open-source and customizable
* 📦 Modular architecture
* 🔄 Dynamic data loading (e.g. user-based or language-based)
* 🎨 Built with Vue
* 🗂 Clean and organized file structure

---

## 📁 Project Structure

```
src/
├── css/          # Global styles (reset, colors, layout)
├── js/           # Scripts and utilities
├── lang/         # Language JSON files
├── App.vue       # Root Vue component
```

---

## 🛠 Installation

```bash
git clone https://github.com/your-username/sunnycdn.git
cd sunnycdn
npm install
```

---

## ▶️ Development

```bash
npm run dev
```

Starts the development server (Vite).

---

## 📦 Build

```bash
npm run build
```

Builds the project for production.

---

## 🔌 Usage

SunnyCDN is designed to be **plug-and-play**.

Example: dynamically loading a language file

```js
const lang = await import(`../lang/en.json`)
console.log(lang.default)
```

You can also integrate it with external systems using `window.postMessage` or APIs to dynamically update content.

---

## 🌍 Use Cases

* Serving language/localization files
* Hosting configuration data
* Lightweight asset delivery
* Frontend-driven CDN systems
* Game/UI data distribution (e.g. overlays, dashboards)

---

## 🤝 Contributing

Contributions are welcome!
Feel free to open issues or submit pull requests to improve SunnyCDN.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## ☀️ Why SunnyCDN?

SunnyCDN focuses on simplicity:

* No heavy infrastructure required
* Easy to deploy
* Flexible for many use cases

Perfect for developers who want a **quick, clean, and customizable CDN solution**.
