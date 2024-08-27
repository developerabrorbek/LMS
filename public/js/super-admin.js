const navEls = document.querySelectorAll("li");

let studentTableContent = `<table class="students-table">
          <thead class="tbl-header">
            <tr>
              <th>№</th>
              <th>Image</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Birthday</th>
              <th>Created at</th>
              <th>Password</th>
              <th>Username</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {%tbody%}
          </tbody>
        </table>`;

const disableNavEl = () => {
  navEls.forEach((el) => el.classList.remove("active"));
};

const getAllStudents = async () => {
  const res = await fetch("http://localhost:5000/api/v1/users");
  return await res.json();
};

const showContent = async (tabName = "dashboard") => {
  const mainContentEl = document.querySelector(".main-content");
  const headerTitle = document.querySelector("header h1");
  headerTitle.textContent = tabName;

  let content = `<ul class="main-statistics">
          <li>
            <img
              width="60"
              src="/public/images/student-image.png"
              alt="Students image"
            />
            <span>100 ta</span>
          </li>
          <li>
            <img
              width="60"
              src="/public/images/teacher-svg-image.svg"
              alt="Teachers image"
            />
            <span>100 ta</span>
          </li>
          <li>
            <img
              width="60"
              src="/public/images/admin-image.png"
              alt="Admin image"
            />
            <span>100 ta</span>
          </li>
        </ul>`;

  mainContentEl.innerHTML = content;

  if (tabName == "students") {
    const allStudents = await getAllStudents();
    console.log(allStudents);
    let studentContent = "";
    allStudents?.data?.forEach((d) => {
      studentContent += `<tr>
              <td>${d.id}</td>
              <td><img src="${d.image_url}" alt="Student image"></td>
              <td>${d.first_name} ${d.last_name}</td>
              <td>+${d.phone_number}</td>
              <td>${d.birth_date}</td>
              <td>${d.created_at}</td>
              <td>${d.password}</td>
              <td>${d.username}</td>
              <td><i class="fa-regular fa-pen-to-square"></i></td>
              <td><i class="fa-solid fa-trash"></i></td>
            </tr>`;

      const newContent = studentTableContent.replace(
        "{%tbody%}",
        studentContent
      );
      mainContentEl.innerHTML = newContent;
    });
  }
};

const activateNavEl = async () => {
  disableNavEl();

  const tab = window.location.href.split("?tab=")[1];

  if (!tab) {
    await showContent();
    document.querySelector(".dashboard").classList.add("active");
    return;
  }

  await showContent(tab);
  document.querySelector(`.${tab}`).classList.add("active");
};

await activateNavEl();
