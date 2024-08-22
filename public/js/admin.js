const navEls = document.querySelectorAll(".list-group-item");

const contentArr = [
  {
    tab: "dashboard",
    title: "Dashboard",
    dataLink: "/api/v1/statistics",
    buttonText: null,
    tabContent: "<h1>Dashboard content</h1>",
  },
  {
    tab: "teachers",
    title: "Oqituvchilar",
    dataLink: "/api/v1/users/?role=teacher",
    buttonText: "O'qituvchi qo'shish",
    tabContent: `<table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Username</th>
                  <th scope="col">Birth date</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
            </table>`,
  },
  {
    tab: "students",
    title: "O'quvchilar",
    dataLink: "/api/v1/users/?role=student",
    buttonText: "O'quvchi qo'shish",
    tabContent: `<table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Username</th>
                  <th scope="col">Birth date</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
            </table>`,
  },
  {
    tab: "groups",
    title: "Guruhlar",
    dataLink: "/api/v1/groups",
    buttonText: "Guruh qo'shish",
    tabContent: `<table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td class="text-warning">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </td>
                  <td class="text-danger"><i class="fa-solid fa-trash"></i></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td class="text-warning">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </td>
                  <td class="text-danger"><i class="fa-solid fa-trash"></i></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                  <td class="text-warning">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </td>
                  <td class="text-danger"><i class="fa-solid fa-trash"></i></td>
                </tr>
              </tbody>
            </table>`,
  },
];

const disableNavEl = () => {
  navEls.forEach((el) => el.classList.remove("active"));
};

const showContent = async (tabName = "dashboard") => {
  const tabData = contentArr.find((el) => el.tab == tabName);

  const mainContentEl = document.querySelector(".main-body__content-table");
  const headerTitle = document.querySelector(".main-body__actions h2");

  const buttonText = document.querySelector(".main-body__actions-btn");

  if (tabData.buttonText) {
    buttonText.textContent = tabData.buttonText;
  } else {
    buttonText.style.display = "none";
  }

  headerTitle.textContent = tabData.title;
  mainContentEl.innerHTML = tabData.tabContent;

  const serverLink = window.location.origin;

  const data = await (await fetch(serverLink + tabData.dataLink)).json();

  if (data.data?.length) {
    const tableBodyEl = document.createElement("tbody");

    if (tabName == "students" || tabName == "teachers") {
      data.data.forEach((e, i) => {
        tableBodyEl.insertAdjacentHTML(
          "beforeend",
          `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${e.first_name} ${e.last_name || ""}</td>
                    <td>${e.phone}</td>
                    <td>${e.username}</td>
                    <td>${e.birthDate.slice(0, 10)}</td>
                    <td class="text-warning">
                      <i class="fa-regular fa-pen-to-square"></i>
                    </td>
                    <td class="text-danger"><i class="fa-solid fa-trash"></i></td>
                  </tr>`
        );
      });
    }

    document
      .querySelector(".table")
      .insertAdjacentElement("beforeend", tableBodyEl);
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
