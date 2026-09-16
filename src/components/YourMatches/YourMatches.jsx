import React, { useState } from "react";
import styles from "./YourMatches.module.scss";
import { ReactComponent as DeleteIcon } from "../../assets/icons/deleteIcon.svg";
import Button from "../Button/Button";
import useScreenSize from "../../services/useScreenSize";

const YourMatches = ({
  title,
  arr,
  renderItem,
  onDelete,
  isMatchList = false,
  isAdmin = false,
  toggleIsAdmin = () => {}
}) => {
  const [isDeleteModeOn, setIsDeleteModeOn] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState([]);

  const isMobile = useScreenSize();

  const toggleSelect = (index) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const deleteSelected = () => {
    onDelete([...selectedIndices]);
    setSelectedIndices([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleButtonDiv}>
          <h3>{title}</h3>
          <h4 onClick={toggleIsAdmin} style={{ display: isMatchList ? 'flex' : 'none' }}>
            {isAdmin ? 'Founder' : 'Admin'} matches
          </h4>
        </div>

        <button
          onClick={() => setIsDeleteModeOn((prev) => !prev)}
          style={{ display: isAdmin ? 'none' : 'flex', pointerEvents: isAdmin ? 'none' : 'auto' }}
        >
          <DeleteIcon style={{ fill: isDeleteModeOn ? "red" : "white" }} />
        </button>
      </div>

      {isDeleteModeOn && selectedIndices.length > 0 && (
        <div className={styles.deleteDiv}>
          <Button color={"secondary"} size={'small'} action={deleteSelected}>Delete</Button>
        </div>
      )}

      {arr.length > 0 ? (
        <div className={styles.list}>
          {arr.map((item, index) =>
            renderItem(item, index, isDeleteModeOn, {
              checked: selectedIndices.includes(index),
              onCheck: () => toggleSelect(index),
            })
          )}
        </div>
      ) : (
        <div className={styles.noElementDiv}><h3>No element</h3></div>
      )}
    </div>
  );
};

export default YourMatches;
