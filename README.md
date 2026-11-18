<div align="center">

# 📚 Xog-Macallin-Arday

**"Teacher-Student Records": a lightweight school grade-management system with admin, teacher and student portals, written in vanilla JavaScript with Somali-language code comments.**

[![CI](https://github.com/mahamed7/xog-macallin-arday/actions/workflows/ci.yml/badge.svg)](https://github.com/mahamed7/xog-macallin-arday/actions/workflows/ci.yml)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Storage](https://img.shields.io/badge/storage-localStorage-blueviolet)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

**[▶ Live demo](https://mahamed7.github.io/xog-macallin-arday/)**

</div>

---

*Xog* = records, *Macallin* = teacher, *Arday* = student.

## Features

| Portal | What you can do |
| :-- | :-- |
| 🏠 **Home → Login** | Choose a role on the landing page, then sign in. The chosen role is passed to the login page in the URL (`login.html?role=teacher`). |
| 🛠️ **Admin** | Add and delete students, with **live search** |
| 👩‍🏫 **Teacher** | Record a grade for any student and subject, and filter the gradebook by student |
| 🎓 **Student** | See only your own grades, with **statistics**: total, average, highest and lowest. Search by subject. |
| 🌙 **Everywhere** | Dark-mode toggle, remembered between visits |

Data persists in the browser with `localStorage`, so grades and students added in one session are still there next time.

## Demo accounts

| Role | Username | Password |
| :-- | :-- | :-- |
| Admin | `admin` | `admin123` |
| Teacher | `macallin` | `macallin123` |
| Student | `arday` | `arday123` |

> All accounts and names in `data.js` are fictional sample data.

## How it is built

```
xog-macallin-arday/
├── index.html          # landing page: pick a role
├── login.html          # login form (role taken from ?role=)
├── admin.html  · admin.js
├── teacher.html · teacher.js
├── student.html · student.js
├── data.js             # dataStorage: seeds and reads/writes localStorage
├── script.js           # login handling + dark mode
└── styles.css
```

- **`dataStorage` data layer:** every page reads and writes through one object (`findUser`, `getStudentGrades`, and so on) instead of touching `localStorage` directly.
- **Seed on first run:** if there is no saved data, the initial users and grades are written once, then the saved copy is used.
- **Role guard:** each dashboard checks the signed-in user's role and sends anyone else back to the home page.
- **Session hygiene:** the signed-in user is stored **without** the password.

## Getting started

No build step is needed:

```bash
git clone https://github.com/mahamed7/xog-macallin-arday.git
cd xog-macallin-arday
python -m http.server 8000      # or just open index.html in a browser
```

To start again from the sample data, clear the site's `localStorage` (DevTools → Application → Local Storage).

## Security

This is a front-end learning project: credentials are checked in the browser and stored in plain text. A real deployment needs server-side authentication with hashed passwords and a database.

## Author

**Saabir Dahir Mahamud** · [Portfolio](https://mahamed7.github.io/Portfolio/) · [GitHub](https://github.com/mahamed7)

Released under the [MIT License](LICENSE).
