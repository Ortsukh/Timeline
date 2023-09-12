function getPrevTheme() {
  let linkTags = document.head.getElementsByTagName("link");
  const prevThemeTags = [];
  for (let i = 0; i < linkTags.length; i++) {
    if (linkTags[i].href.indexOf("webdatarocks.min.css") > -1 || linkTags[i].href.indexOf("webdatarocks.css") > -1) {
      prevThemeTags.push(linkTags[i]);
    }
  }
  linkTags = document.body.getElementsByTagName("link");
  for (let i = 0; i < linkTags.length; i++) {
    if (linkTags[i].href.indexOf("webdatarocks.min.css") > -1 || linkTags[i].href.indexOf("webdatarocks.css") > -1) {
      prevThemeTags.push(linkTags[i]);
    }
  }
  return prevThemeTags;
}

function setTheme(color) {
  const prevThemeTags = getPrevTheme();
  const link = document.createElement("link");
  link.href = `https://cdn.webdatarocks.com/latest${color}/webdatarocks.min.css`;
  link.rel = "stylesheet";
  link.type = "text/css";
  link.onload = () => {
    if (prevThemeTags != null) {
      for (let i = 0; i < prevThemeTags.length; i++) {
        if (window.ActiveXObject || "ActiveXObject" in window) {
          prevThemeTags[i].removeNode(true);
        } else {
          prevThemeTags[i].remove();
        }
      }
    }
  };
  document.body.appendChild(link);
}
// Default
// Dark
// Light blue
// Orange
// Teal
// Green
// Striped-Blue
// Striped-Teal

export default function addThemeToolbar(toolbar) {
  const tabs = toolbar.getTabs();
  toolbar.getTabs = () => {
    tabs.unshift({
      id: "wdr-tab-theme",
      title: "Theme",
      // icon: this.icons.theme,
      menu: [
        {
          id: "wdr-tab-default",
          title: "Default",
          handler: () => setTheme(""),
          // icon: this.icons.format,
        },
        {
          id: "wdr-tab-lightblue",
          title: "LightBlue",
          handler: () => setTheme("/theme/lightblue"),
          // icon: this.icons.format,
        },
        {
          id: "wdr-tab-lightblue",
          title: "Orange",
          handler: () => setTheme("/theme/orange"),
          // icon: this.icons.format,
        },
      ],
    });
    return tabs;
  };
}
