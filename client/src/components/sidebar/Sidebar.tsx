import { useState } from "react";
import MenuButton from "./MenuButton";
import SmallDevicesSidebar from "./SmallDevicesSidebar";
import LargeDevicesSidebar from "./LargeDevicesSidebar";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      <MenuButton onClickMenu={() => setIsMenuOpen(true)} />
      
      {/* Mobile drawer sidebar */}
      <SmallDevicesSidebar 
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      
      {/* Desktop persistent sidebar */}
      <LargeDevicesSidebar />
    </>
  );
}