import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';

export const usePostTypes = () => {
  const postTypes = useSelect((select) => {
    const { getPostTypes } = select(coreStore);
    const excludedPostTypes = ['attachment'];
    const filteredPostTypes = getPostTypes({per_page: -1})?.filter(
      ({viewable, slug}) => viewable && !excludedPostTypes.includes(slug)
    );
    return filteredPostTypes;
  }, []);


  const postTypesOptions = useMemo(() => {
    return (postTypes || []).map(({labels, slug}) => ({
      label: labels.singular_name,
      value: slug,
    }));

  }, [postTypes]);

  return { postTypesOptions };
};
