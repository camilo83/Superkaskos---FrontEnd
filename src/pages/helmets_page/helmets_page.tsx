import { List } from '../../components/list/list';
import './helmets_page.scss';
import { Filter } from '../../components/filter/filter';

export default function HelmetsPage() {
  return (
    <>
      <div className="home-page">
        <div className="filter" data-testid="filter-component">
          <Filter></Filter>
        </div>
        <div className="list" data-testid="list-component">
          <List></List>
        </div>
      </div>
    </>
  );
}
