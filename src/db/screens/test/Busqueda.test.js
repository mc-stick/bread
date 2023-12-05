
//EMY MATISTA   1-19-1061.


import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Busqueda from './Busqueda';

// Mock de Firebase
jest.mock('./mockData', () => ({
  mockProducts: [
    {
      id: '1',
      nombre: 'Producto 1',
      descripcion: 'Descripción del Producto 1',
      imagen: 'imagen1.jpg',
      precio: 10.99,
      disp: 'Disponible',
      categoria: 'Categoría A',
      ingrediente: 'Ingrediente del Producto 1',
    },
    // ... otros productos ficticios
  ],
}));

describe('Busqueda Component', () => {
  
  test('Verificar si los elementos clave dentro del componente \'Busqueda\' se renderizan correctamente', () => {
    const { getByText, getByPlaceholderText } = render(<Busqueda />);
    
    const searchInput = getByPlaceholderText('Buscar item');
    const searchButton = getByText('Buscar');

    expect(searchInput).toBeDefined();
    expect(searchButton).toBeDefined();
  });

  test('Borra el termino de busqueda despues de realizar una busqueda', () => {
    const { getByPlaceholderText, getByText } = render(<Busqueda />);
    const searchInput = getByPlaceholderText('Buscar item');
    const searchButton = getByText('Buscar');

    fireEvent.changeText(searchInput, 'Producto 1');
    fireEvent.press(searchButton);

    expect(searchInput.props.value).toBe(undefined);
  });

  test('No se muestran resultados cuando no se ingresa ningún término de búsqueda', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Busqueda />);
    const searchInput = getByPlaceholderText('Buscar item');
    const searchButton = getByText('Buscar');

    fireEvent.press(searchButton);

    const noResultsMessage = queryByText('Toca el boton buscar para mostrar los resultados.');
    expect(noResultsMessage).toBeDefined();
  });

  test('Realiza búsqueda y muestra resultados', () => {
    const { getByPlaceholderText, getByText } = render(<Busqueda />);
    const searchInput = getByPlaceholderText('Buscar item');
    const searchButton = getByText('Buscar');

    fireEvent.changeText(searchInput, 'Producto 1');
    fireEvent.press(searchButton);

    const foundProduct = getByText('Producto 1');
    expect(foundProduct).toBeDefined();
  });

  test('Muestra un mensaje cuando no se ingresa ningún término de búsqueda', () => {
    const { getByText } = render(<Busqueda />);
    const infoMessage = getByText('Escribe una palabra o frase para comenzar con la busqueda.');

    expect(infoMessage).toBeDefined();
  });

  test('Muestra un mensaje cuando no se encuentran resultados', () => {
    const { getByPlaceholderText, getByText } = render(<Busqueda />);
    const searchInput = getByPlaceholderText('Buscar item');
    const searchButton = getByText('Buscar');

    fireEvent.changeText(searchInput, 'Producto Inexistente');
    fireEvent.press(searchButton);

    const noResultsMessage = getByText('Toca el boton buscar para mostrar los resultados.');
    expect(noResultsMessage).toBeDefined();
  });

});


