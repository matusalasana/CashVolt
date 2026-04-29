import { Menu } from "lucide-react";

interface Props {
  onClickMenu: () => void;
}

const MenuButton = ({ onClickMenu }: Props) => {
  return (
    <button
      onClick={onClickMenu}
      className="lg:hidden btn btn-circle btn-primary fixed top-4 left-4 z-50"
    >
      <Menu size={18} />
    </button>
  );
};

export default MenuButton;