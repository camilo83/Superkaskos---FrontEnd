import { useState, useEffect } from 'react';
import { ShopCar } from '../../model/shop_car';
import { useHelmets } from '../../hooks/useHelmets';
import './shopCar_card.scss';

type PropsType = {
  shopcar: ShopCar;
};

export function ShopCarCard({ shopcar }: PropsType) {
  const { loadHelmetById } = useHelmets();
  const [helmetDetails, setHelmetDetails] = useState<JSX.Element[] | null>(
    null
  );

  useEffect(() => {
    const fetchHelmetDetails = async () => {
      const detailsPromises = shopcar.items.map(async (item) => {
        const element = await loadHelmetById(item.helmetId);
        const total = Number(element?.price) * Number(item.quantity);

        return (
          <ul className="item-ul" key={item.helmetId}>
            <div className="image">
              <li>
                <img src={element?.images.url} alt="" width={120} />
              </li>
            </div>
            <div className="info">
              <li>Cantidad: {item.quantity.toString()}</li>
              <li>Categoría: {element?.category}</li>
              <li>Referencia: {element?.reference}</li>
              <li>Precio: {element?.price}</li>
              <li>Total: {total.toString()}</li>
            </div>
          </ul>
        );
      });

      const details = await Promise.all(detailsPromises);
      setHelmetDetails(details);
    };

    fetchHelmetDetails();
  }, []);

  return (
    <>
      {helmetDetails && (
        <ul className="item">
          <p>Estado: {shopcar.status}</p>
          {helmetDetails.map((detail, index) => (
            <li className="item-li" key={index}>
              {detail}
            </li>
          ))}
          <button>Pagar ahora</button>
        </ul>
      )}
    </>
  );
}
