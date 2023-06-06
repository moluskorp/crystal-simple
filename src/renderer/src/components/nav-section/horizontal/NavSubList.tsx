import { NavListProps } from '../type';
import NavList from './NavList';

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
};

export function NavSubList({ data, depth }: NavListSubProps) {
  return (
    <>
      {data.map(list => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChildren={!!list.children}
        />
      ))}
    </>
  );
}
