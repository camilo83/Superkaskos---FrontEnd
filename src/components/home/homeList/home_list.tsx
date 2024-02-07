import { useHelmets } from '../../../hooks/useHelmets';
import { Helmet } from '../../../model/helmet';
import { HomeCard } from '../home_card/home_card';
import './home_list.scss';

export function HomeList() {
  const { favorites } = useHelmets();

  return (
    <>
      <div className="home-list">
        <p>Promociones</p>
        <ul className="home-list-ul">
          {favorites.map((item: Helmet) => (
            <HomeCard helmet={item} key={item.id}></HomeCard>
          ))}
        </ul>
      </div>
    </>
  );
}
