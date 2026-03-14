import { useState, useEffect } from "react";
import { validateInputField } from "../helpers/Form-validator"

function ProjectAreaForm({ onSave, onCancel }) {

  // Exemple : formulaire pour nom et commentaire
  const [area, setArea] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const onSubmitForm = (e) => {
    e.preventDefault();

    setError(null)
    
    
    // We pass each field of the form through the validation form to check their validity

    let errorArea = validateInputField("Superficie", "area", area)
    if (errorArea !== true) {
      setError(errorArea)
      return
    }
    
    
    let errorComment = validateInputField("Commentaire", "comment", comment)
    if (errorComment !== true) {
      setError(errorComment)
      return
    }
    
    // We call the save function declared in the DrawControlsn component to save the geometry and its attributes (area, comment)
    onSave({
      area,
      comment,
    });

    onCancel(); // Close the form without saving anything (geometry or attributes)
  };


  return (
    <div className="project_area_form">
    {error !== null && <p style={{color: "red"}}>{error}</p>}
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Superficie (en m2)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <textarea
          placeholder="Commentaire"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Enregistrer</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </form>
    </div>
  );
}


export default ProjectAreaForm
