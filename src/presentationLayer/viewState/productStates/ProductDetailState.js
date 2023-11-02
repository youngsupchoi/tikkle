import {createContext, useContext, useState, useRef} from 'react';
import {Animated} from 'react-native';
const ProductDetailViewContext = createContext();

export const useProductDetailViewState = () => {
  const context = useContext(ProductDetailViewContext);
  if (!context) {
    throw new Error(
      'useProductDetailViewState must be used within a ProductDetailViewStateProvider',
    );
  }
  return context;
};

export const ProductDetailViewStateProvider = ({children}) => {
  const [selected, setSelected] = useState('상세정보');
  const [receivedData, setReceivedData] = useState();
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [parse, setParse] = useState({});

  const [isTikkling, setIsTikkling] = useState(false);

  const [detail_images, setDetail_images] = useState({});
  const [components, setComponents] = useState([]);

  const ref = {};
  const state = {
    selected,
    receivedData,
    wishlisted,
    loading,
    parse,
    isTikkling,
    detail_images,
    components,
  };

  const actions = {
    setSelected,
    setReceivedData,
    setWishlisted,
    setLoading,
    setParse,
    setIsTikkling,
    setDetail_images,
    setComponents,
  };

  return (
    <ProductDetailViewContext.Provider value={{ref, state, actions}}>
      {children}
    </ProductDetailViewContext.Provider>
  );
};
