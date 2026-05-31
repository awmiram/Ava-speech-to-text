
# 🎙️ AVA Speech-to-Text

A modern, high-performance Single Page Application (SPA) engineered to provide seamless speech-to-text conversion, media uploading, and audio archive management. Built with a heavy emphasis on clean architecture, performance optimization, and an accessible User Experience (UX).

<div align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite_8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/SWR-FFFFFF?style=for-the-badge&logo=vercel&logoColor=black" alt="SWR" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

---
## 🛠️ Tech Stack Overview

The application leverages a modern ecosystem of libraries to ensure maintainability and scalability:

* **Core:** React.js built with Vite for rapid HMR and optimized bundling.
* **State Management:** Redux Toolkit (managing complex asynchronous transcription states).
* **Data Fetching:** SWR (for caching and revalidation) and Axios.
* **Styling & UI:** Tailwind CSS (utility-first styling), Headless UI (accessible unstyled components), and React Hot Toast.
* **Routing:** React Router DOM.
---

## ✨ Highlights & Features

- **Custom Audio Player Engine:** highly flexible audio player . It features precise timeline seeking, dynamic theme injection based on the active tab context, and buffering states.
- **Advanced React Memoization:** The Archive data table is heavily optimized using `memo` and `useCallback`. This prevents the "Flex Blowout" effect and expensive re-renders of the entire DOM tree when a single row is expanded or deleted, maintaining a smooth experience.
- **Multi-Source Transcription:** - 🎤 Native `MediaRecorder` API integration for live browser audio capturing.
  - 📁 Seamless handling of `FormData` for local audio/video file uploads.
  - 🔗 Direct URL parsing capabilities.

---

## 💻 Installation & Local Development

1. **Clone the repository:**

  
2. **Install the dependencies:**
```bash
npm install

```


3. **Spin up the Vite development server:**
```bash
npm run dev

```


*The application will compile instantly and be available at `http://localhost:5173`.*

---

**Amirhossein Abdollahabadi**

* GitHub: [@awmiram](https://www.google.com/search?q=https://github.com/awmiram)
* Role: Junior React Developer & Computer Engineering Student

*Developed as a showcase of modern Front-End engineering practices and clean architecture.*
