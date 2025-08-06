# 🐾 Wildlife Detector - Frontend

**Empowering Every Explorer with Wildlife Knowledge**  
A React.js-based interactive web app that allows users to upload wildlife images and get AI-powered species identification.

![Demo Preview](./Demo.gif)
---

## Key Features
-  **Upload Wildlife Images** – Identify wild species via simple image upload.
-  **AI-powered Species Detection** – Images are analyzed using Amazon Rekognition & iNaturalist API.
- 🌍 **Dynamic Species Cards** – Interactive design with hover animations.
- 🖥 **React.js & TailwindCSS** – Modern, responsive, and highly optimized frontend.
- 🔥 **Responsive UI** – Built with React.js & Tailwind CSS.
- 🔍 **Species Info Display** – Provides details like scientific name, habitat, conservation status, and fun facts.

---

## Tech Stack
- **Frontend:** React.js,[TailwindCSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **API Integration:** AWS Lambda, API Gateway, Amazon Rekognition, iNaturalist

---

## 📂 Project Structure
```
WILDLIFE-DETECTOR/
├── Backend/                   # Lambda function code (for reference)
├── Frontend/                 
│   ├── src/                  
│   │   └── components/       # Upload, result cards, detail views
│   └── public/               
├── demo.gif                  # Demo video (GIF)
├── README.md                 
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

## 🖼️ Screenshots
### 🔍 **Landing Page**
![Landing Page](./Frontend/public/images/LandingPage.jpg)

### 🎯 **Upload & Species Detection**
![Upload & Detection](./Frontend/public/images/Results.jpg)

### 🦌 **Species Info & Cards**
![Species Cards](./Frontend/public/images/Cards.jpg)
![Species Cards](./Frontend/public/images/CardDetails.jpg)
---

## 📢 Contributing
Want to help improve this project? Follow these steps:
1. **Fork** this repo.
2. Create a **new branch** (`feature/new-animation`).
3. **Commit** your changes (`git commit -m "Added animation effect"`).
4. **Push** to GitHub (`git push origin feature/new-animation`).
5. **Create a Pull Request** 


---

- **Developed by:** [Reeya Gupta](https://github.com/reeya123)

---

 **Love this project?** Please consider starring it on GitHub! It helps others discover it and shows your support 

