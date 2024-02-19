import { useState, useEffect } from 'react';
import { ShopCar } from '../../model/shop_car';
import { useHelmets } from '../../hooks/useHelmets';
import './shopCar_card.scss';
import { useShopCars } from '../../hooks/useShopcars';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type PropsType = {
  readonly shopcar: ShopCar;
};

export function ShopCarCard({ shopcar }: PropsType) {
  const [helmetDetails, setHelmetDetails] = useState<JSX.Element[] | null>(
    null
  );
  const { currentShopCar, updateShopCar } = useShopCars();
  const { loadHelmetById } = useHelmets();
  const navigate = useNavigate();
  const handleDeleteItem = async (shopcarId: string, helmetId: string) => {
    Swal.fire({
      title: 'Eliminar Item',
      text: 'Por favor confirmar?',
      icon: 'warning',
      background: 'white',
      color: 'black',
      iconColor: 'red',
      width: '15rem',
      showCancelButton: true,
      confirmButtonColor: 'limegreen',
      cancelButtonColor: 'red',
      confirmButtonText: 'Eliminar',
      customClass: {
        container: 'custom-swal-font',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(helmetId);
        const helmet = await loadHelmetById(helmetId);
        console.log(helmet);

        const updatedShopCar = currentShopCar ? { ...currentShopCar } : null;

        if (updatedShopCar && updatedShopCar.items) {
          const updatedItems = updatedShopCar.items.filter(
            (item) => item.helmetId !== helmet?.id
          );

          updatedShopCar.items = updatedItems;

          await updateShopCar(shopcarId, updatedShopCar);
          navigate('/helmets');
        }
      }
    });
  };
  const changeQuantity = async (
    index: number,
    shopcarId: string,
    helmetId: string
  ) => {
    const helmet = await loadHelmetById(helmetId);

    const updatedShopCar = currentShopCar ? { ...currentShopCar } : null;
    const updatedItems = [...(updatedShopCar?.items || [])];
    const itemToChangeIndex = updatedItems.findIndex(
      (item) => item.helmetId === helmet?.id
    );
    if (itemToChangeIndex !== -1) {
      const updatedItem = { ...updatedItems[itemToChangeIndex] };
      updatedItem.quantity += index;
      updatedItems[itemToChangeIndex] = updatedItem;
      updatedShopCar!.items = updatedItems;
      await updateShopCar(shopcarId, updatedShopCar!);
    }
  };

  useEffect(() => {
    const fetchHelmetDetails = async () => {
      const detailsPromises = shopcar.items.map(async (item) => {
        const element = await loadHelmetById(item.helmetId);
        const total = (Number(element?.price) * Number(item.quantity)).toFixed(
          2
        );

        return (
          <ul className="item-ul" key={item.helmetId}>
            <div className="image">
              <li>
                <img src={element?.images.url} alt="" width={120} />
              </li>
            </div>
            <div className="info">
              <li>Referencia: {element?.reference}</li>
              <li>Categoría: {element?.category}</li>
              <li>Precio: {element?.price}</li>
            </div>
            <div className="quantity-section">
              <button
                className="less-quantity-button"
                onClick={() => {
                  changeQuantity(-1, shopcar.id, element?.id!);
                }}
              >
                -
              </button>
              <p className="quantity"> {item.quantity.toString()}</p>
              <button
                className="more-quantity-button"
                onClick={() => {
                  changeQuantity(1, shopcar.id, element?.id!);
                }}
              >
                +
              </button>
            </div>
            <li>Total: {total.toString()}</li>
            <button
              className="delete-item"
              onClick={() => handleDeleteItem(shopcar.id, element!.id)}
            >
              <img
                src="delete_icon.png"
                alt="Ícono de eliminar"
                width={20}
                height={20}
              />
            </button>
          </ul>
        );
      });

      const details = await Promise.all(detailsPromises);
      setHelmetDetails(details);
    };

    fetchHelmetDetails();
  }, [currentShopCar]);

  return (
    <>
      {helmetDetails && (
        <ul className="item">
          <p>Estado: {shopcar.status}</p>
          {helmetDetails.map((detail, index) => (
            <li className="item-li" key={shopcar.items[index].helmetId}>
              {detail}
            </li>
          ))}
          <button>Pagar ahora</button>
        </ul>
      )}
    </>
  );
}
