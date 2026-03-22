console.log("JS LOADED");
const BASE = "https://upgrade-backend-6sgc.onrender.com/api";

function getToken() {
    return localStorage.getItem("token");
}

function showOutput(message, type = "info") {
    const output = document.getElementById("output");

    const color =
        type === "error" ? "red" :
            type === "success" ? "lightgrey" :
                "white";

    output.innerHTML = `
        <p style="color:${color}; font-weight:bold;">
            ${message}
        </p>
    `;
}


async function register() {
    try {
        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();

        if (!name || !email || !password) {
            return showOutput("All fields are required", "error");
        }

        const res = await fetch(`${BASE}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            return showOutput(data.error || "Registration failed", "error");
        }

        showOutput("✅ Registered successfully", "success");

    } catch (err) {
        showOutput("❌ Network error", "error");
    }
}


async function login() {
    try {
        const email = logEmail.value;
        const password = logPassword.value;

        const res = await fetch(`${BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            return showOutput(data.error || "Login failed", "error");
        }

        localStorage.setItem("token", data.token);

        showOutput("✅ Login successful", "success");

    } catch {
        showOutput("❌ Network error", "error");
    }
}
async function getProfile() {
    const id = searchId.value;

    if (!id) return showOutput("Enter ID", "error");

    try {
        const res = await fetch(`${BASE}/students/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            return showOutput(data.error || "Not found", "error");
        }
        showOutput(`
            <div style="padding:10px; border:1px solid #444; border-radius:8px;">
                <h3>👤 Student Profile</h3>
                <p><b>ID:</b> ${data._id}</p>
                <p><b>Name:</b> ${data.name}</p>
                <p><b>Class:</b> ${data.class}</p>
                <p><b>Course:</b> ${data.course}</p>
                <p><b>Gender:</b> ${data.gender}</p>
                <p><b>Age:</b> ${data.age}</p>

                <button onclick="fillForm('${data._id}', '${data.name}', '${data.class}', '${data.course}', '${data.gender}', '${data.age}')">
                    ✏️ Edit
                </button>

                <button onclick="deleteStudent('${data._id}')">
                    🗑️ Delete
                </button>
            </div>
        `, "success");;

    } catch {
        showOutput("❌ Failed to fetch", "error");
    }
}

// ================= GET =================
async function getStudents() {
    const res = await fetch(`${BASE}/students`, {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    const students = await res.json();

    const container = document.getElementById("students");
    container.innerHTML = "";

    students.forEach(s => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p>
                ${s.name} | ${s.studentClass} | ${s.course} | ${s.gender} | ${s.age}
            </p>

            <button onclick="fillForm('${s._id}', '${s.name}', '${s.studentClass}', '${s.course}', '${s.gender}', '${s.age}')">
                Edit
            </button>

            <button onclick="deleteStudent('${s._id}')">
                Delete
            </button>
        `;

        container.appendChild(div);
    });
}


// ================= CREATE =================
async function createStudent() {
    try {
        const studentName = document.getElementById("name").value.trim();
        const studentClass = document.getElementById("studentClass").value.trim();
        const studentCourse = document.getElementById("course").value.trim();
        const studentGender = document.getElementById("gender").value.trim();
        const studentAge = document.getElementById("age").value.trim();

        if (!studentName || !studentClass || !studentCourse || !studentGender || !studentAge) {
            return showOutput("All fields are required", "error");
        }

        const res = await fetch(`${BASE}/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                name: studentName,
                class: studentClass,
                course: studentCourse,
                gender: studentGender,
                age: studentAge
            })
        });

        const data = await res.json();

        if (!res.ok) {
            return showOutput(data.error || "Create failed", "error");
        }

        showOutput(`
            ✅ Student Created Successfully<br><br>
            <b>ID:</b> ${data._id}<br>
            <b>Name:</b> ${data.name}<br>
            <b>Class:</b> ${data.class}<br>
            <b>Age:</b> ${data._age}<br>
            <b>Gender:</b> ${data._gender}<br>
            <b>Course:</b> ${data.course}
        `, "success");

        getStudents();

    } catch {
        showOutput("❌ Network error", "error");
    }
}

// ================= FILL FORM (EDIT) =================
function fillForm(id, name, studentClass, course, gender, age) {
    window.editId = id;

    document.getElementById("name").value = name;
    document.getElementById("studentClass").value = studentClass;
    document.getElementById("course").value = course;
    document.getElementById("gender").value = gender;
    document.getElementById("age").value = age;
}

// ================= UPDATE =================
async function updateStudent() {
    if (!window.editId) {
        return showOutput("Select a student first", "error");
    }

    const studentName = document.getElementById("name").value.trim();
    const studentClass = document.getElementById("studentClass").value.trim();
    const studentCourse = document.getElementById("course").value.trim();
    const studentGender = document.getElementById("gender").value.trim();
    const studentAge = document.getElementById("age").value.trim();

    const res = await fetch(`${BASE}/students/${window.editId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            name: studentName,
            class: studentClass,
            course: studentCourse,
            gender: studentGender,
            age: studentAge
        })
    });

    const data = await res.json();

    if (!res.ok) {
        return showOutput(data.error || "Update failed", "error");
    }

    showOutput("✅ Updated successfully", "success");

    getStudents();
}

// ================= DELETE =================
async function deleteStudent(id) {
    try {
        const res = await fetch(`${BASE}/students/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            return showOutput(data.error || "Delete failed", "error");
        }

        showOutput("🗑️ Deleted successfully", "success");

        getStudents();

    } catch {
        showOutput("❌ Network error", "error");
    }
}