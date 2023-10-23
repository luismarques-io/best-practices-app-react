import { useCallback, useState } from 'react';

export const useUpdateFormVisibility = (initialValue = false) => {
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(initialValue);
  const showUpdateForm = useCallback(() => setIsUpdateFormVisible(true), []);
  const hideUpdateForm = useCallback(() => setIsUpdateFormVisible(false), []);
  return { isUpdateFormVisible, showUpdateForm, hideUpdateForm };
};
