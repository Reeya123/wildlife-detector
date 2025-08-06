# 🐾 Wildlife Detector - Frontend

**Empowering Every Explorer with Wildlife Knowledge**  
A React.js-based interactive web app that allows users to upload wildlife images and get AI-powered species identification.

![Demo Preview](./demo.gif)
---

## ✨ Features
- 🎨 **Upload Wildlife Images** – Users can upload images of wildlife to identify species.
- 🎯 **AI-powered Species Detection** – Images are analyzed using Amazon Rekognition & iNaturalist API.
- 🌍 **Educational & Interactive UI** – Beautifully designed species cards with hover animations.
- 🖥 **React.js & TailwindCSS** – Modern, responsive, and highly optimized frontend.
- 🔥 **Dynamic Animations** – Interactive effects using Tailwind & Framer Motion.
- 🔍 **Species Info Display** – Provides details like scientific name, habitat, conservation status, and fun facts.
- 📊 **Carousel Navigation** – View multiple matched species using a sleek carousel.
- 🎨 **Custom Design** – Circular species cards, background overlays, hover animations, and an engaging UI.

---

## 🚀 Tech Stack
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **State Management:** React useState & useEffect
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **API Integration:** Fetch API for AWS Lambda & API Gateway calls

---

## 📂 Project Structure
```
WILDLIFE-DETECTOR/
├── Backend/
│   ├── lambda_functions/
│   ├── README.md   ← documents the Lambda/API architecture
├── Frontend/
│   ├── src/
│   ├── public/
│   └── README.md   ← frontend-specific overview here
├── .gitignore      ← root ignore file
├── Architecture.png (visual diagram)
├── README.md       ← root README for whole project 

```
```
wildlife-detector-frontend/
│── public/                     # Static assets (images, icons, etc.)
│── src/
│   ├── components/              # Reusable UI components
│   │   ├── LandingSection.js    # Upload & Hero Section
│   │   ├── MatchedSpecies.js    # Results Section
│   │   ├── SampleSpecies.js     # Popular Species Cards
│   │   ├── SpeciesDetails.js    # Detailed view for a species
│   ├── pages/
│   │   ├── index.js             # Home page
│   │   └── species/[id].js      # Dynamic species details page
│   ├── styles/                  # Tailwind CSS & global styles
│   ├── utils/                    # Helper functions
│   ├── data/                     # Sample JSON data
│── .gitignore                   # Git ignore files
│── package.json                  # Project dependencies
│── tailwind.config.js            # Tailwind CSS Config
│── README.md                     # Project Documentation
```

---

## 🛠️ Installation & Setup
Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/wildlife-detector-frontend.git
cd wildlife-detector-frontend
```

### 2️⃣ Install Dependencies
```sh
npm install
```
#### Environment Variables

Create a `.env` file inside the `Frontend/` folder using the structure below:

```env
REACT_APP_API_BASE_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/prd

### 3️⃣ Start the Development Server
```sh
npm run dev
```
🔹 Open **`http://localhost:3000`** in your browser.

---

## 🔐 API Integration
The frontend interacts with the backend via AWS API Gateway endpoints.

---

## 🖼️ UI & Design
The frontend is **visually engaging** and designed for an intuitive user experience:
- 🐟 **Circular species cards**
- ✨ **Hover effects & animations**
- 😯 **Framer Motion interactions**
- 📱 **Mobile-friendly & fully responsive**

---

## 🖼️ Screenshots
### 🔍 **Landing Page**
![Landing Page](/images/LandingPage.jpg)

### 🎯 **Upload & Species Detection**
![Upload & Detection](/images/Results.jpg)

### 🦌 **Species Info & Cards**
![Species Cards](/images/Cards.jpg)
![Species Cards](/images/CardDetails.jpg)
---

## 📢 Contributing
Want to help improve this project? Follow these steps:
1. **Fork** this repo.
2. Create a **new branch** (`feature/new-animation`).
3. **Commit** your changes (`git commit -m "Added animation effect"`).
4. **Push** to GitHub (`git push origin feature/new-animation`).
5. **Create a Pull Request** 


---

## 💡 Credits & Acknowledgments
- **Developed by:** [Reeya Gupta](https://github.com/your-username)

---

 **Love this project?** Give it a ⭐ on [GitHub](https://github.com/your-username/wildlife-detector-frontend)!

