import { useEffect, useState } from 'react';

export default function SelectOverlay({ open }: { open: boolean }) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    }
    setVisible(true);
    return () => {};
  }, [open]);

  return visible ? (
    <div className="fixed inset-0" onClick={(e) => e.stopPropagation()}></div>
  ) : null;
}
