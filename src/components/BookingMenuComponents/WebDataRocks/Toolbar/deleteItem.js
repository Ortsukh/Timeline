export default function deleteItemToolbar(toolbar) {
  const tab = toolbar.getTabs();
  toolbar.getTabs = () => {
    delete tab[0];
    return tab;
  };
}
