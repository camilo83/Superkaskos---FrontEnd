import { useEffect, useRef, useState } from 'react';
import { useHelmets } from '../../../hooks/useHelmets';
import { Helmet } from '../../../model/helmet';
import { HomeCard } from '../home_card/home_card';
import './home_list.scss';
import { Circle } from '../../page_indicator/page_indicator';

export function HomeList() {
  const { favorites } = useHelmets();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);
  const [page, setPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleChangePage(index: number) {
    setPage((prevPage) => {
      const newPage = prevPage + index;
      if (newPage < 0) {
        return favorites.length - 1;
      } else if (newPage >= favorites.length) {
        return 0;
      }
      return newPage;
    });
  }

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 500);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (containerRef.current) {
        const scrollLeft = containerRef.current.scrollLeft;
        const newPage = Math.floor(scrollLeft / window.innerWidth);
        setPage(newPage);
      }
    }

    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="home-list">
      <div className="promotions">
        <p>Promociones</p>
      </div>
      {!isSmallScreen ? (
        <>
          <ul className="home-list-ul">
            {favorites.map((item: Helmet) => (
              <HomeCard helmet={item} key={item.id}></HomeCard>
            ))}
          </ul>
        </>
      ) : (
        <div className="small-list">
          <div
            ref={containerRef}
            className="scroll-container"
            style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}
          >
            <p
              data-testid="page-changer"
              className="page-changer"
              onClick={() => handleChangePage(-1)}
            >
              ◄
            </p>
            <ul className="home-list-ul">
              <HomeCard
                helmet={favorites[page]}
                key={favorites[page].id}
              ></HomeCard>
            </ul>
            <p
              data-testid="page-changer"
              className="page-changer"
              onClick={() => handleChangePage(+1)}
            >
              ►
            </p>
          </div>
          <div>
            <ul>
              {favorites.map((_favorite, index) => (
                <li key={index}>
                  <Circle filled={index === page} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
