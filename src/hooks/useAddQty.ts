import { useCallback, useState } from 'react';

interface AddQtyButtonProps {
  initialQty?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const useAddQty = ({
  initialQty = 1,
  min = 1,
  max = 99,
  onChange,
}: AddQtyButtonProps) => {
  const [qty, setQty] = useState(initialQty);

  const updateQty = useCallback(
    (newQty: number) => {
      // Clamp the value within min/max bounds
      const clampedQty = Math.min(Math.max(newQty, min), max);
      setQty(clampedQty);
      onChange?.(clampedQty);
    },
    [min, max, onChange]
  );

  const handleDecrease = useCallback(() => {
    if (qty > min) updateQty(qty - 1);
  }, [qty, min, updateQty]);

  const handleIncrease = useCallback(() => {
    if (qty < max) updateQty(qty + 1);
  }, [qty, max, updateQty]);

  return { qty, setQty, handleDecrease, handleIncrease };
};

export default useAddQty;
