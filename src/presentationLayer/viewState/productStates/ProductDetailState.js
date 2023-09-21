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

  const [data, setData] = useState({});

  const [parse, setParse] = useState({});

  const ref = {};
  const state = {
    selected,
    receivedData,
    wishlisted,
    loading,
    data,
    parse,
  };

  const actions = {
    setSelected,
    setReceivedData,
    setWishlisted,
    setLoading,
    setData,
    setParse,
  };

  return (
    <ProductDetailViewContext.Provider value={{ref, state, actions}}>
      {children}
    </ProductDetailViewContext.Provider>
  );
};
