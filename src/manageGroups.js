const { addGroupModal } = require("./modals");
const {
  setCalList,
  resetCalendar,
  openCalendar,
} = require("./manageCalendars.js");

/** HTML Element Declarations */
const displayName = document.getElementById("group-name");
const sidebar = document.getElementById("sidebar");
const groupName = document.getElementById("group-name-input");

const NON_DYNAMIC_SIDEBAR_ELEMENTS = 1;

/** Mapping buttons to their onClick functions */
document
  .getElementById("sidebar-toggle")
  .addEventListener("click", showGroupsSidebar);
document
  .getElementById("add-group-modal-open")
  .addEventListener("click", addGroup);
document
  .getElementById("setup-new-group")
  .addEventListener("click", setupNewGroup);

/** List of Uploaded Groups */
let groupList = [];

/** Toggles visibility of groups sidebar */
function showGroupsSidebar() {
  $(".ui.labeled.icon.sidebar")
    .sidebar({
      context: $("#content-body"),
      dimPage: false,
    })
    .sidebar("setting", "transition", "overlay")
    .sidebar("toggle");
}

/** Handles the Display of the Group When Sidebar Element is Clicked */
function openGroup(name) {
  displayName.innerHTML = name;
  const selectedGroup = groupList.filter((x) => x.name === name)[0];

  if (selectedGroup.calendarList.length === 0) {
    resetCalendar();
  } else {
    openCalendar(selectedGroup.calendarList[0].user);
  }
}

/** Handles creation of a new Group by the user */
function addGroup() {
  addGroupModal.modal("show");
}

/** Handles setup of a new Group */
function setupNewGroup() {
  addGroupModal.modal("hide");

  // TODO: Implement page content switching to new group and adding the content

  groupList.push({
    name: groupName.value,
    groupUrl: "",
    calendarList: [],
  });
  groupName.value = "";

  updateGroupList();
}

/** Handles setup of a new Group */
function updateGroupList() {
  const referenceNode = sidebar.children[0];

  // Repeats for however many items in the groupList not already represented as sidebar elements
  for (
    let i = sidebar.children.length - NON_DYNAMIC_SIDEBAR_ELEMENTS;
    i < groupList.length;
    i++
  ) {
    // Creates new entry in sidebar
    const link = document.createElement("a");
    const name = document.createElement("span");
    const icon = document.createElement("i");

    link.setAttribute("class", "item");
    link.appendChild(icon);
    link.appendChild(name);
    link.addEventListener("click", function () {
      openGroup(groupList[i].name);
    });

    name.innerHTML = groupList[i].name;

    icon.setAttribute("class", "user friends icon");

    sidebar.insertBefore(link, referenceNode);
  }
}

module.exports = {
  showGroups: showGroupsSidebar,
  addGroup,
  setupNewGroup,
};