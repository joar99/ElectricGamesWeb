import { useEffect, useState } from "react";

export default function DeleteGame({
  onDeleteGame,
  idToDelete,
  handleChangePopup,
}) {
  const [id, setId] = useState("");

  useEffect(() => {
    setId(idToDelete);
  });

  const deleteItem = () => {
    onDeleteGame(id);
    handleChangePopup();
  };

  return (
    <>
      <button className="popup-container-delete-btn" onClick={deleteItem}>
        Delete
      </button>
    </>
  );
}
