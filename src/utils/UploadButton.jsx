import React, { useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/firebaseConfig"; // ajusta la ruta según tu proyecto
import { doc, updateDoc } from "firebase/firestore";

const UploadButton = ({ productId, onUpload, restauranteId }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validación de tamaño
    if (file.size > 150 * 1024) { // 150 KB
      const comprimir = window.confirm(
        `La imagen excede los 150 KB.\nHaz clic en "Aceptar" para abrir una herramienta en línea y comprimir/redimensionar la imagen.`
      );
      if (comprimir) {
        window.open("https://compressjpeg.com/es/", "_blank");
      }
      return;
    }

    try {
      const fileRef = ref(storage, `productos/${productId}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      // Actualizamos Firestore directamente
      await updateDoc(doc(db, `restaurantes/${restauranteId}/productos`, productId), { img: url });

      alert("Imagen subida con éxito!");

        // Refrescar la página automáticamente
  window.location.reload();
  
    } catch (err) {
      console.error("Error subiendo archivo:", err);
      alert("Error subiendo la imagen");
    }
  };

  return (
    <>
      <button onClick={handleButtonClick} className="btn-upload">
        Subir Foto
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default UploadButton;
