interface AppOverlayProps {
  onClose: () => void;
}

export const AppOverlay: React.FC<AppOverlayProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-20 lg:hidden"
      onClick={onClose}
    ></div>
  )
}
