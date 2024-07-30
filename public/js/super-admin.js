const navEls = document.querySelectorAll("li");

const disableNavEl = () => {
  navEls.forEach((el) => el.classList.remove("active"));
};

const showContent = async (tabName = "dashboard") => {
  const headerTitle = document.querySelector("header h1");
  headerTitle.textContent = tabName;

  if(tabName == "students"){
    await showStudentsContent()
  }

  showDashboardContent();
};

function showDashboardContent() {
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

  document.querySelector(".main-content").innerHTML = content;
}

async function showStudentsContent() {
  const res = await fetch("http://localhost:5000/students");
  const data = await res.json();
  console.log(data, "data");
}

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