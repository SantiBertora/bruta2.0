import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const safeId = (s) => String(s).replace(/[^a-z0-9_-]/gi, "_");

const ProductosOrdenables = ({ restauranteId, productos = [], categorias = [], cepas = [], onSave }) => {
  const [groupedData, setGroupedData] = useState({}); // clasificacion -> categoria -> cepa -> productos
  const [openLevels, setOpenLevels] = useState({});
  const initialPrioritiesRef = useRef({});
  const categoriasMap = categorias.reduce((acc, c) => { acc[c.id] = c; return acc; }, {});

  // --- Agrupar productos por clasificación / categoría / cepa ---
  useEffect(() => {
    const data = {};

    productos.forEach(p => {
      const clas = p.clasificacion || "sin clasificacion";
      const catObj = categoriasMap[p.cat];
      const cat = catObj ? catObj.id : "sin_categoria";
      const ubic = catObj ? catObj.ubicacion : "sin_ubicacion";

      if (!data[clas]) data[clas] = {};
      if (!data[clas][cat]) data[clas][cat] = {};

      // si es vino y tiene cepa
      if (ubic.toLowerCase() === "vinos" && p.cepa) {
        if (!data[clas][cat][p.cepa]) data[clas][cat][p.cepa] = [];
        data[clas][cat][p.cepa].push(p);
      } else {
        if (!data[clas][cat]["productos"]) data[clas][cat]["productos"] = [];
        data[clas][cat]["productos"].push(p);
      }
    });

    // Ordenar por prioridad
    Object.keys(data).forEach(clas => {
      Object.keys(data[clas]).forEach(cat => {
        Object.keys(data[clas][cat]).forEach(cepaKey => {
          data[clas][cat][cepaKey].sort((a,b) => (a.prioridad ?? 999) - (b.prioridad ?? 999));
        });
      });
    });

    // snapshot inicial
    const snap = {};
    productos.forEach(p => { snap[p.id] = p.prioridad ?? null });
    initialPrioritiesRef.current = snap;

    setGroupedData(data);

    // abrir todo cerrado por defecto
    const open = {};
    setOpenLevels(open);

  }, [productos, categorias]);

  const toggleLevel = (key) => {
    setOpenLevels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDragEnd = (result, productosArr) => {
    if (!result.destination) return;
    const items = Array.from(productosArr);
    const [moved] = items.splice(result.source.index,1);
    items.splice(result.destination.index,0,moved);
    return items;
  };

  const handleDelete = async (prodId) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try {
      await deleteDoc(doc(db, `restaurantes/${restauranteId}/productos/${prodId}`));
      alert("Producto eliminado");
      // actualizar localmente
      const newData = { ...groupedData };
      Object.keys(newData).forEach(clas => {
        Object.keys(newData[clas]).forEach(cat => {
          Object.keys(newData[clas][cat]).forEach(cepa => {
            newData[clas][cat][cepa] = newData[clas][cat][cepa].filter(p => p.id !== prodId);
          });
        });
      });
      setGroupedData(newData);
    } catch(err) {
      console.error(err);
      alert("Error eliminando producto");
    }
  };

  const handleSave = async () => {
    const updates = [];
    Object.keys(groupedData).forEach(clas => {
      Object.keys(groupedData[clas]).forEach(cat => {
        Object.keys(groupedData[clas][cat]).forEach(cepa => {
          groupedData[clas][cat][cepa].forEach((p, index) => {
            const prev = initialPrioritiesRef.current[p.id];
            if (prev !== index) updates.push({id: p.id, prioridad: index});
          });
        });
      });
    });

    if (updates.length === 0) { alert("No hay cambios para guardar"); return; }

    try {
      await Promise.all(updates.map(u => updateDoc(doc(db, `restaurantes/${restauranteId}/productos/${u.id}`), { prioridad: u.prioridad })));
      updates.forEach(u => { initialPrioritiesRef.current[u.id] = u.prioridad });
      alert(`✅ Guardadas ${updates.length} prioridades`);
      if (onSave) onSave();
    } catch(err) {
      console.error(err);
      alert("Error guardando prioridades");
    }
  };

  return (
    <div className="productos-admin">
      <button onClick={() => toggleLevel("root")} style={{ fontSize: 18 }}> 
        {openLevels["root"] ? "▼" : "▶"} Ordenar productos
      </button>
      {openLevels["root"] && Object.keys(groupedData).map(clas => (
        <div key={clas} style={{ marginLeft: 12 }}>
          <button onClick={() => toggleLevel(clas)}>
            {openLevels[clas] ? "▼" : "▶"} {clas.toUpperCase()}
          </button>
          {openLevels[clas] && Object.keys(groupedData[clas]).map(cat => {
            const catName = categoriasMap[cat]?.nombre ?? cat;
            const catKey = `${clas}-${cat}`;
            return (
              <div key={catKey} style={{ marginLeft: 24 }}>
                <button onClick={() => toggleLevel(catKey)}>
                  {openLevels[catKey] ? "▼" : "▶"} {catName}
                </button>
                {openLevels[catKey] && Object.keys(groupedData[clas][cat]).map(cepa => {
                  const cepaName = cepa !== "productos" ? cepa : null;
                  const cepaKey = `${catKey}-${cepa}`;
                  const items = groupedData[clas][cat][cepa];
                  return (
                    <div key={cepaKey} style={{ marginLeft: 36 }}>
                      {cepaName && <strong>{cepaName}</strong>}
                      <DragDropContext onDragEnd={(result) => {
                        const reordered = handleDragEnd(result, items);
                        const newData = { ...groupedData };
                        newData[clas][cat][cepa] = reordered;
                        setGroupedData(newData);
                      }}>
                        <Droppable droppableId={cepaKey}>
                          {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef} style={{ padding: 0 }}>
                              {items.map((p, idx) => (
                                <Draggable key={p.id} draggableId={String(p.id)} index={idx}>
                                  {(prov) => (
                                    <li
                                      ref={prov.innerRef}
                                      {...prov.draggableProps}
                                      {...prov.dragHandleProps}
                                      style={{ padding: 6, marginBottom:4, border:"1px solid #eee", listStyle:"none", background:"#fff", ...prov.draggableProps.style }}
                                    >
                                      <strong>{p.nombre}</strong> — ${p.precio ?? 0}
                                      <small style={{ color:"#666" }}> (prioridad: {p.prioridad ?? idx})</small>
                                      <button style={{ marginLeft: 8 }} onClick={()=>handleDelete(p.id)}>🗑️</button>
                                    </li>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </ul>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}

      {openLevels["root"] && (
        <div style={{ marginTop: 12 }}>
          <button onClick={handleSave} className="btn-save">Guardar prioridades</button>
        </div>
      )}
    </div>
  );
};

export default ProductosOrdenables;
