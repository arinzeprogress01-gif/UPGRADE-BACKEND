console.log("JS LOADED");
const BASE = "http://localhost:5001/api";

function getToken() {
    return localStorage.getItem("token");
}


async function register() {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    document.getElementById("output").innerText =
        JSON.stringify(data, null, 2);
}

async function login() {
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;

    const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password })
    });

    const data = await res.json();

    // 🔥 SAVE TOKEN
    localStorage.setItem("token", data.token);

    document.getElementById("output").innerText =
        JSON.stringify(data, null, 2);
}

async function getProfile() {
    const id = document.getElementById('searchId').value;

    if (!id) {
        alert("Please enter a student ID");
        return;
    }

    try {
        const res = await fetch(`${BASE}/students/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            alert(`Error: ${errorData.message || res.status}`);
            return;
        }

        const student = await res.json();
        console.log(student);
        alert(`Student Name: ${student.name}, Age: ${student.age}`);
    } catch (err) {
        console.error(err);
        alert("Failed to fetch student");
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
    const res = await fetch(`${BASE}/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            class: document.getElementById("studentClass").value,
            course: document.getElementById("course").value,
            gender: document.getElementById("gender").value,
            age: document.getElementById("age").value
        })
    });

    const data = await res.json();
    console.log("Created:", data);
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
        alert("Click Edit first");
        return;
    }

    const res = await fetch(`${BASE}/students/${window.editId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            studentClass: document.getElementById("studentClass").value,
            course: document.getElementById("course").value,
            gender: document.getElementById("gender").value,
            age: document.getElementById("age").value
        })
    });

    const data = await res.json();
    console.log("Updated:", data);

}

// ================= DELETE =================
async function deleteStudent(id) {
    await fetch(`${BASE}/students/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });
    const data = await res.json();
    console.log("DELETE:", data);
}