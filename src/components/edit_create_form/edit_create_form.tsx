import { Helmet } from '../../model/helmet';
import { SyntheticEvent, useState } from 'react';
import './edit_create_form.scss';
import { useHelmets } from '../../hooks/useHelmets';
import { useNavigate } from 'react-router-dom';
type PropsType = {
  helmet: Helmet;
};

export function HelmetsForm({ helmet }: PropsType) {
  const [reference, setReference] = useState(helmet.reference);
  const [inventory, setInventory] = useState(String(helmet.inventory));
  const [price, setPrice] = useState(String(helmet.price));
  const [category, setCategory] = useState(helmet.category);
  const [existImage, setExistImage] = useState(false);
  const navigate = useNavigate();

  const { createHelmet, updateHelmet } = useHelmets();

  const handleCreateHelmet = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    createHelmet(formData);
    navigate('/helmets');
  };

  const handleEditHelmet = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    updateHelmet(helmet.id, formData);
    navigate('/helmets');
  };

  return (
    <>
      <div className="helmet-container" data-testid="helmets-form">
        {helmet.id ? (
          <p className="create-helmet">Editar casco</p>
        ) : (
          <p className="create-helmet">Crear casco</p>
        )}

        <form
          className="helmet-form"
          name="helmet-form"
          onSubmit={helmet.id ? handleEditHelmet : handleCreateHelmet}
        >
          <div>
            <label htmlFor="reference">Referencia: </label>
            <input
              type="text"
              name="reference"
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="inventory">Inventario: </label>
            <input
              type="number"
              name="inventory"
              id="inventory"
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price">Precio: </label>
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category">Categoría: </label>
            <input
              type="text"
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="file-select" id="src-file1">
            <label htmlFor="images">Helmet image: </label>
            <input
              data-testid="file"
              type="file"
              name="images"
              aria-label="Archivo"
              onChange={() => setExistImage(!existImage)}
            />
          </div>

          {helmet.id ? (
            <button type="submit">Editar</button>
          ) : (
            <button type="submit">Crear</button>
          )}
        </form>
      </div>
    </>
  );
}
